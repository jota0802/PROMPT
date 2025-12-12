import type { ValidationContext, ValidationResult, PromptTag } from './types';
import { extractPromptComments } from './utils';
import { getAllValidators } from './validators';

/**
 * Main validation engine
 */
export class ValidationEngine {
  /**
   * Validate code against PROMPT Protocol rules
   */
  async validate(context: ValidationContext): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    // Extract PROMPT tags from code
    const prompts = extractPromptComments(context.fileContent);
    
    if (prompts.length === 0) {
      return results; // No PROMPT tags found
    }
    
    // Merge all activated tags
    const activatedTags: PromptTag[] = [];
    prompts.forEach(prompt => {
      activatedTags.push(...prompt.tags);
    });
    
    // Update context with activated tags
    const enrichedContext: ValidationContext = {
      ...context,
      activatedTags,
    };
    
    // Get all validators
    const validators = getAllValidators();
    
    // Run validators for activated tags
    for (const validator of validators) {
      const isActivated = activatedTags.some(
        tag => tag.category === validator.category && tag.level === validator.level
      );
      
      if (isActivated) {
        try {
          const validationResults = await validator.validate(
            context.fileContent,
            enrichedContext
          );
          results.push(...validationResults);
        } catch (error) {
          console.error(`Validator ${validator.id} failed:`, error);
        }
      }
    }
    
    return results;
  }
}

/**
 * Create a new validation engine instance
 */
export function createValidationEngine(): ValidationEngine {
  return new ValidationEngine();
}
