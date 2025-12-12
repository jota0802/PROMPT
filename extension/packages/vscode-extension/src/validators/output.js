"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputValidators = void 0;
/**
 * O-[min] Rule #1: Use shadcn/ui components
 */
const oMinRule1 = {
    id: 'O-min-1',
    category: 'O',
    level: 'min',
    ruleNumber: 1,
    description: 'Use shadcn/ui components',
    async validate(code, context) {
        const results = [];
        // Check if shadcn/ui is imported
        const hasShadcnImport = code.includes('@/components/ui/');
        // Check for raw HTML elements that should use shadcn
        const problematicPatterns = [
            { pattern: /<button[^>]*>/, component: 'Button', line: 0 },
            { pattern: /<input[^>]*>/, component: 'Input', line: 0 },
            { pattern: /className=".*card.*"/, component: 'Card', line: 0 },
        ];
        for (const { pattern, component } of problematicPatterns) {
            const match = code.match(pattern);
            if (match && !hasShadcnImport) {
                results.push({
                    rule: 'O-min-1',
                    category: 'O',
                    level: 'min',
                    ruleNumber: 1,
                    severity: 'warning',
                    message: `Use shadcn/ui ${component} component instead of raw HTML`,
                    quickFix: {
                        title: `Import shadcn/ui ${component}`,
                        edit: {
                            range: {
                                start: { line: 0, character: 0 },
                                end: { line: 0, character: 0 },
                            },
                            newText: `import { ${component} } from '@/components/ui/${component.toLowerCase()}';\n`,
                        },
                    },
                });
            }
        }
        return results;
    },
};
/**
 * All O (Output & UX) validators
 */
exports.outputValidators = [
    oMinRule1,
    // TODO: Add more O-[min], O-[std], O-[max] validators
];
