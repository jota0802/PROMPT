import type { ValidationRule } from './types';
/**
 * Load validation rules from configuration files
 * (.cursorrules, .github/prompt-system.md, etc.)
 */
export declare class RuleLoader {
    private rules;
    /**
     * Load rules from a file path
     */
    loadFromFile(filePath: string): Promise<void>;
    /**
     * Get all loaded rules
     */
    getRules(): ValidationRule[];
    /**
     * Get rules for a specific category and level
     */
    getRulesForTag(category: string, level: string): ValidationRule[];
}
/**
 * Create a new rule loader instance
 */
export declare function createRuleLoader(): RuleLoader;
