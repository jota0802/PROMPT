import { z } from 'zod';
/**
 * PROMPT Protocol Categories
 */
export type PromptCategory = 'P' | 'R' | 'O' | 'M' | 'Patterns' | 'T';
/**
 * PROMPT Protocol Levels
 */
export type PromptLevel = 'min' | 'std' | 'max';
/**
 * Individual PROMPT tag (e.g., "O-[std]")
 */
export interface PromptTag {
    category: PromptCategory;
    level: PromptLevel;
}
/**
 * Parsed PROMPT comment
 */
export interface ParsedPrompt {
    tags: PromptTag[];
    raw: string;
    line: number;
}
/**
 * Validation severity
 */
export type ValidationSeverity = 'error' | 'warning' | 'info';
/**
 * Validation result for a single rule
 */
export interface ValidationResult {
    rule: string;
    category: PromptCategory;
    level: PromptLevel;
    ruleNumber: number;
    severity: ValidationSeverity;
    message: string;
    line?: number;
    column?: number;
    endLine?: number;
    endColumn?: number;
    quickFix?: QuickFix;
}
/**
 * Quick fix suggestion
 */
export interface QuickFix {
    title: string;
    edit: CodeEdit;
}
/**
 * Code edit operation
 */
export interface CodeEdit {
    range: {
        start: {
            line: number;
            character: number;
        };
        end: {
            line: number;
            character: number;
        };
    };
    newText: string;
}
/**
 * Validation rule definition
 */
export interface ValidationRule {
    id: string;
    category: PromptCategory;
    level: PromptLevel;
    ruleNumber: number;
    description: string;
    validate: (code: string, context: ValidationContext) => Promise<ValidationResult[]>;
}
/**
 * Validation context
 */
export interface ValidationContext {
    filePath: string;
    fileContent: string;
    activatedTags: PromptTag[];
    projectRoot: string;
    workspaceConfig?: WorkspaceConfig;
}
/**
 * Workspace configuration
 */
export interface WorkspaceConfig {
    enabled: boolean;
    validateOnSave: boolean;
    validateOnType: boolean;
    showStatusBar: boolean;
    severity: {
        min: ValidationSeverity;
        std: ValidationSeverity;
        max: ValidationSeverity;
    };
    customRules: Record<string, CustomRule>;
}
/**
 * Custom validation rule
 */
export interface CustomRule {
    pattern: string;
    message: string;
    severity?: ValidationSeverity;
}
/**
 * Zod schemas for validation
 */
export declare const PromptTagSchema: z.ZodObject<{
    category: z.ZodEnum<["P", "R", "O", "M", "Patterns", "T"]>;
    level: z.ZodEnum<["min", "std", "max"]>;
}, "strip", z.ZodTypeAny, {
    category: "P" | "R" | "O" | "M" | "Patterns" | "T";
    level: "min" | "std" | "max";
}, {
    category: "P" | "R" | "O" | "M" | "Patterns" | "T";
    level: "min" | "std" | "max";
}>;
export declare const ParsedPromptSchema: z.ZodObject<{
    tags: z.ZodArray<z.ZodObject<{
        category: z.ZodEnum<["P", "R", "O", "M", "Patterns", "T"]>;
        level: z.ZodEnum<["min", "std", "max"]>;
    }, "strip", z.ZodTypeAny, {
        category: "P" | "R" | "O" | "M" | "Patterns" | "T";
        level: "min" | "std" | "max";
    }, {
        category: "P" | "R" | "O" | "M" | "Patterns" | "T";
        level: "min" | "std" | "max";
    }>, "many">;
    raw: z.ZodString;
    line: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    tags: {
        category: "P" | "R" | "O" | "M" | "Patterns" | "T";
        level: "min" | "std" | "max";
    }[];
    raw: string;
    line: number;
}, {
    tags: {
        category: "P" | "R" | "O" | "M" | "Patterns" | "T";
        level: "min" | "std" | "max";
    }[];
    raw: string;
    line: number;
}>;
export declare const ValidationResultSchema: z.ZodObject<{
    rule: z.ZodString;
    category: z.ZodEnum<["P", "R", "O", "M", "Patterns", "T"]>;
    level: z.ZodEnum<["min", "std", "max"]>;
    ruleNumber: z.ZodNumber;
    severity: z.ZodEnum<["error", "warning", "info"]>;
    message: z.ZodString;
    line: z.ZodOptional<z.ZodNumber>;
    column: z.ZodOptional<z.ZodNumber>;
    endLine: z.ZodOptional<z.ZodNumber>;
    endColumn: z.ZodOptional<z.ZodNumber>;
    quickFix: z.ZodOptional<z.ZodObject<{
        title: z.ZodString;
        edit: z.ZodObject<{
            range: z.ZodObject<{
                start: z.ZodObject<{
                    line: z.ZodNumber;
                    character: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    line: number;
                    character: number;
                }, {
                    line: number;
                    character: number;
                }>;
                end: z.ZodObject<{
                    line: z.ZodNumber;
                    character: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    line: number;
                    character: number;
                }, {
                    line: number;
                    character: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            }, {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            }>;
            newText: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        }, {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        edit: {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        };
    }, {
        title: string;
        edit: {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    category: "P" | "R" | "O" | "M" | "Patterns" | "T";
    message: string;
    level: "min" | "std" | "max";
    rule: string;
    ruleNumber: number;
    severity: "error" | "warning" | "info";
    line?: number | undefined;
    column?: number | undefined;
    endLine?: number | undefined;
    endColumn?: number | undefined;
    quickFix?: {
        title: string;
        edit: {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        };
    } | undefined;
}, {
    category: "P" | "R" | "O" | "M" | "Patterns" | "T";
    message: string;
    level: "min" | "std" | "max";
    rule: string;
    ruleNumber: number;
    severity: "error" | "warning" | "info";
    line?: number | undefined;
    column?: number | undefined;
    endLine?: number | undefined;
    endColumn?: number | undefined;
    quickFix?: {
        title: string;
        edit: {
            range: {
                start: {
                    line: number;
                    character: number;
                };
                end: {
                    line: number;
                    character: number;
                };
            };
            newText: string;
        };
    } | undefined;
}>;
