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
  edits: TextEdit[];
}

/**
 * Text edit
 */
export interface TextEdit {
  range: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  newText: string;
}

/**
 * Validation context
 */
export interface ValidationContext {
  filePath: string;
  fileContent: string;
  activatedTags: PromptTag[];
  projectRoot: string;
  workspaceConfig: WorkspaceConfig;
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
    min: string;
    std: string;
    max: string;
  };
  customRules: Record<string, any>;
}

/**
 * Validation engine
 */
export interface ValidationEngine {
  validate(context: ValidationContext): Promise<ValidationResult[]>;
}

/**
 * Category validator
 */
export interface CategoryValidator {
  validate(context: ValidationContext, tag: PromptTag): Promise<ValidationResult[]>;
}
