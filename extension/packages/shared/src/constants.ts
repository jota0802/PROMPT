import type { PromptCategory } from './types';

/**
 * PROMPT Protocol Categories
 */
export const CATEGORIES = {
  P: 'Performance',
  R: 'Rules & Structure',
  O: 'Output & UX',
  M: 'Modeling',
  Patterns: 'Patterns',
  T: 'Types',
} as const;

/**
 * PROMPT Protocol Levels
 */
export const LEVELS = ['min', 'std', 'max'] as const;

/**
 * Default configuration
 */
export const DEFAULT_CONFIG = {
  enabled: true,
  validateOnSave: true,
  validateOnType: false,
  showStatusBar: true,
  severity: {
    min: 'error',
    std: 'warning',
    max: 'info',
  },
  customRules: {},
} as const;

/**
 * Rule counts per category and level
 */
export const RULE_COUNTS = {
  P: { min: 3, std: 6, max: 12 },
  R: { min: 3, std: 9, max: 12 },
  O: { min: 3, std: 6, max: 12 },
  M: { min: 3, std: 6, max: 12 },
  Patterns: { min: 3, std: 6, max: 12 },
  T: { min: 3, std: 6, max: 12 },
} as const;

/**
 * Extension ID
 */
export const EXTENSION_ID = 'prompt-protocol.validator';

/**
 * Extension display name
 */
export const EXTENSION_NAME = 'PROMPT Protocol Validator';

/**
 * Configuration section
 */
export const CONFIG_SECTION = 'promptProtocol';
