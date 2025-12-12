import type { ValidationContext, ValidationResult } from './types';
/**
 * Main validation engine
 */
export declare class ValidationEngine {
    /**
     * Validate code against PROMPT Protocol rules
     */
    validate(context: ValidationContext): Promise<ValidationResult[]>;
}
/**
 * Create a new validation engine instance
 */
export declare function createValidationEngine(): ValidationEngine;
