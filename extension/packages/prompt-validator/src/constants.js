"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_SECTION = exports.EXTENSION_NAME = exports.EXTENSION_ID = exports.RULE_COUNTS = exports.DEFAULT_CONFIG = exports.LEVELS = exports.CATEGORIES = void 0;
/**
 * PROMPT Protocol Categories
 */
exports.CATEGORIES = {
    P: 'Performance',
    R: 'Rules & Structure',
    O: 'Output & UX',
    M: 'Modeling',
    Patterns: 'Patterns',
    T: 'Types',
};
/**
 * PROMPT Protocol Levels
 */
exports.LEVELS = ['min', 'std', 'max'];
/**
 * Default configuration
 */
exports.DEFAULT_CONFIG = {
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
};
/**
 * Rule counts per category and level
 */
exports.RULE_COUNTS = {
    P: { min: 3, std: 6, max: 12 },
    R: { min: 3, std: 9, max: 12 },
    O: { min: 3, std: 6, max: 12 },
    M: { min: 3, std: 6, max: 12 },
    Patterns: { min: 3, std: 6, max: 12 },
    T: { min: 3, std: 6, max: 12 },
};
/**
 * Extension ID
 */
exports.EXTENSION_ID = 'prompt-protocol.validator';
/**
 * Extension display name
 */
exports.EXTENSION_NAME = 'PROMPT Protocol Validator';
/**
 * Configuration section
 */
exports.CONFIG_SECTION = 'promptProtocol';
