import type { ValidationRule } from './types';

/**
 * Load validation rules from configuration files
 * (.cursorrules, .github/prompt-system.md, etc.)
 */
export class RuleLoader {
  private rules: ValidationRule[] = [];
  
  /**
   * Load rules from a file path
   */
  async loadFromFile(filePath: string): Promise<void> {
    // TODO: Implement file parsing
    // Read .cursorrules or .github/prompt-system.md
    // Parse rule definitions
    // Create ValidationRule objects
    console.log(`Loading rules from ${filePath}`);
  }
  
  /**
   * Get all loaded rules
   */
  getRules(): ValidationRule[] {
    return this.rules;
  }
  
  /**
   * Get rules for a specific category and level
   */
  getRulesForTag(category: string, level: string): ValidationRule[] {
    return this.rules.filter(
      rule => rule.category === category && rule.level === level
    );
  }
}

/**
 * Create a new rule loader instance
 */
export function createRuleLoader(): RuleLoader {
  return new RuleLoader();
}
