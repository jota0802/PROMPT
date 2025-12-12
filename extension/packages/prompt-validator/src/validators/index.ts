import type { ValidationRule } from '../types';
import { outputValidators } from './output';
import { performanceValidators } from './performance';

/**
 * Get all available validators
 */
export function getAllValidators(): ValidationRule[] {
  return [
    ...outputValidators,
    ...performanceValidators,
    // TODO: Add more validators
    // ...rulesValidators,
    // ...modelingValidators,
    // ...patternsValidators,
    // ...typesValidators,
  ];
}

export * from './output';
export * from './performance';
