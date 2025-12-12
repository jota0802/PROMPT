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
    start: { line: number; character: number };
    end: { line: number; character: number };
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
export const PromptTagSchema = z.object({
  category: z.enum(['P', 'R', 'O', 'M', 'Patterns', 'T']),
  level: z.enum(['min', 'std', 'max']),
});

export const ParsedPromptSchema = z.object({
  tags: z.array(PromptTagSchema),
  raw: z.string(),
  line: z.number(),
});

export const ValidationResultSchema = z.object({
  rule: z.string(),
  category: z.enum(['P', 'R', 'O', 'M', 'Patterns', 'T']),
  level: z.enum(['min', 'std', 'max']),
  ruleNumber: z.number(),
  severity: z.enum(['error', 'warning', 'info']),
  message: z.string(),
  line: z.number().optional(),
  column: z.number().optional(),
  endLine: z.number().optional(),
  endColumn: z.number().optional(),
  quickFix: z.object({
    title: z.string(),
    edit: z.object({
      range: z.object({
        start: z.object({ line: z.number(), character: z.number() }),
        end: z.object({ line: z.number(), character: z.number() }),
      }),
      newText: z.string(),
    }),
  }).optional(),
});
