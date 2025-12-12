import type { PromptTag, ParsedPrompt } from './types';
/**
 * Parse PROMPT tags from a comment string
 *
 * @example
 * parsePromptTags("// PROMPT O-[std] P-[min]")
 * // Returns: [{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }]
 */
export declare function parsePromptTags(comment: string): PromptTag[];
/**
 * Extract all PROMPT comments from code
 *
 * @param code - Source code content
 * @returns Array of parsed PROMPT comments with line numbers
 */
export declare function extractPromptComments(code: string): ParsedPrompt[];
/**
 * Format a PROMPT tag as a string
 *
 * @example
 * formatPromptTag({ category: 'O', level: 'std' }) // "O-[std]"
 */
export declare function formatPromptTag(tag: PromptTag): string;
/**
 * Format multiple PROMPT tags
 *
 * @example
 * formatPromptTags([{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }])
 * // "O-[std] P-[min]"
 */
export declare function formatPromptTags(tags: PromptTag[]): string;
/**
 * Check if a specific tag is activated
 */
export declare function hasTag(tags: PromptTag[], category: PromptTag['category'], level?: PromptTag['level']): boolean;
/**
 * Get the level for a specific category
 * Returns undefined if category is not activated
 */
export declare function getLevel(tags: PromptTag[], category: PromptTag['category']): PromptTag['level'] | undefined;
/**
 * Validate if PROMPT tags are properly formatted
 */
export declare function isValidPromptComment(comment: string): boolean;
