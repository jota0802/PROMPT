"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleLoader = void 0;
exports.createRuleLoader = createRuleLoader;
/**
 * Load validation rules from configuration files
 * (.cursorrules, .github/prompt-system.md, etc.)
 */
class RuleLoader {
    rules = [];
    /**
     * Load rules from a file path
     */
    async loadFromFile(filePath) {
        // TODO: Implement file parsing
        // Read .cursorrules or .github/prompt-system.md
        // Parse rule definitions
        // Create ValidationRule objects
        console.log(`Loading rules from ${filePath}`);
    }
    /**
     * Get all loaded rules
     */
    getRules() {
        return this.rules;
    }
    /**
     * Get rules for a specific category and level
     */
    getRulesForTag(category, level) {
        return this.rules.filter(rule => rule.category === category && rule.level === level);
    }
}
exports.RuleLoader = RuleLoader;
/**
 * Create a new rule loader instance
 */
function createRuleLoader() {
    return new RuleLoader();
}
