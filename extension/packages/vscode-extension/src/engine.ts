import type { ValidationContext, ValidationResult, ValidationEngine, PromptTag } from './types';
import { parsePromptTags } from './utils';
import { createOutputValidator } from './validators/output';
import { createPatternsValidator } from './validators/patterns';
import { createPerformanceValidator } from './validators/performance';

/**
 * Create validation engine
 */
export function createValidationEngine(): ValidationEngine {
  const outputValidator = createOutputValidator();
  const patternsValidator = createPatternsValidator();
  const performanceValidator = createPerformanceValidator();
  
  return {
    async validate(context: ValidationContext): Promise<ValidationResult[]> {
      const results: ValidationResult[] = [];
      
      // Parse PROMPT tags from file
      const tags = parsePromptTags(context.fileContent);
      
      if (tags.length === 0) {
        return results; // No PROMPT tags found
      }
      
      // Validate against each activated tag
      for (const tag of tags) {
        for (const promptTag of tag.tags) {
          // Validate based on category
          switch (promptTag.category) {
            case 'O':
              results.push(...await outputValidator.validate(context, promptTag));
              break;
            case 'Patterns':
              results.push(...await patternsValidator.validate(context, promptTag));
              break;
            case 'P': // Performance category
              results.push(...await performanceValidator.validate(context, promptTag));
              break;
            // Add more validators as needed
            default:
              // Unsupported category for now
              break;
          }
        }
      }
      
      return results;
    }
  };
}
