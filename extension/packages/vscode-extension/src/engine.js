"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationEngine = void 0;
exports.createValidationEngine = createValidationEngine;
const utils_1 = require("./utils");
const validators_1 = require("./validators");
/**
 * Main validation engine
 */
class ValidationEngine {
    /**
     * Validate code against PROMPT Protocol rules
     */
    async validate(context) {
        const results = [];
        // Extract PROMPT tags from code
        const prompts = (0, utils_1.extractPromptComments)(context.fileContent);
        if (prompts.length === 0) {
            return results; // No PROMPT tags found
        }
        // Merge all activated tags
        const activatedTags = [];
        prompts.forEach(prompt => {
            activatedTags.push(...prompt.tags);
        });
        // Update context with activated tags
        const enrichedContext = {
            ...context,
            activatedTags,
        };
        // Get all validators
        const validators = (0, validators_1.getAllValidators)();
        // Run validators for activated tags
        for (const validator of validators) {
            const isActivated = activatedTags.some(tag => tag.category === validator.category && tag.level === validator.level);
            if (isActivated) {
                try {
                    const validationResults = await validator.validate(context.fileContent, enrichedContext);
                    results.push(...validationResults);
                }
                catch (error) {
                    console.error(`Validator ${validator.id} failed:`, error);
                }
            }
        }
        return results;
    }
}
exports.ValidationEngine = ValidationEngine;
/**
 * Create a new validation engine instance
 */
function createValidationEngine() {
    return new ValidationEngine();
}
