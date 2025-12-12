import type { ValidationRule, ValidationResult, ValidationContext } from '../types';

/**
 * P-[min] Rule #1: TypeScript strict mode
 */
const pMinRule1: ValidationRule = {
  id: 'P-min-1',
  category: 'P',
  level: 'min',
  ruleNumber: 1,
  description: 'Use TypeScript strict mode with explicit types',
  
  async validate(code: string, context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Check for missing type annotations
    const lines = code.split('\n');
    
    lines.forEach((line, index) => {
      // Check for function parameters without types
      const funcMatch = line.match(/function\s+\w+\s*\(([^)]+)\)/);
      if (funcMatch) {
        const params = funcMatch[1];
        if (params && !params.includes(':')) {
          results.push({
            rule: 'P-min-1',
            category: 'P',
            level: 'min',
            ruleNumber: 1,
            severity: 'error',
            message: 'Function parameters must have explicit type annotations',
            line: index + 1,
            column: line.indexOf('function'),
          });
        }
      }
      
      // Check for variables without type annotations
      const varMatch = line.match(/(?:const|let|var)\s+(\w+)\s*=/);
      if (varMatch && !line.includes(':')) {
        const varName = varMatch[1];
        // Allow simple literals to be inferred
        if (!line.match(/=\s*(?:\d+|true|false|'.*'|".*"|`.*`)/)) {
          results.push({
            rule: 'P-min-1',
            category: 'P',
            level: 'min',
            ruleNumber: 1,
            severity: 'warning',
            message: `Variable '${varName}' should have an explicit type annotation`,
            line: index + 1,
            column: line.indexOf(varName),
          });
        }
      }
    });
    
    return results;
  },
};

/**
 * P-[std] Rule #1: Use Next.js Image component
 */
const pStdRule1: ValidationRule = {
  id: 'P-std-1',
  category: 'P',
  level: 'std',
  ruleNumber: 1,
  description: 'Use Next.js Image component for optimization',
  
  async validate(code: string, context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Check for raw <img> tags
    const imgRegex = /<img\s+[^>]*src=/g;
    let match: RegExpExecArray | null;
    
    while ((match = imgRegex.exec(code)) !== null) {
      const line = code.substring(0, match.index).split('\n').length;
      
      results.push({
        rule: 'P-std-1',
        category: 'P',
        level: 'std',
        ruleNumber: 1,
        severity: 'error',
        message: 'Use Next.js Image component instead of <img> tag for automatic optimization',
        line,
        quickFix: {
          title: 'Replace with Next.js Image',
          edit: {
            range: {
              start: { line: line - 1, character: 0 },
              end: { line: line - 1, character: 0 },
            },
            newText: "import Image from 'next/image';\n",
          },
        },
      });
    }
    
    return results;
  },
};

/**
 * All P (Performance) validators
 */
export const performanceValidators: ValidationRule[] = [
  pMinRule1,
  pStdRule1,
  // TODO: Add more P-[min], P-[std], P-[max] validators
];
