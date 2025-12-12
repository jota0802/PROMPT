"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePromptTags = parsePromptTags;
exports.extractPromptComments = extractPromptComments;
exports.formatPromptTag = formatPromptTag;
exports.formatPromptTags = formatPromptTags;
exports.hasTag = hasTag;
exports.getLevel = getLevel;
exports.isValidPromptComment = isValidPromptComment;
/**
 * Parse PROMPT tags from a comment string
 *
 * @example
 * parsePromptTags("// PROMPT O-[std] P-[min]")
 * // Returns: [{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }]
 */
function parsePromptTags(comment) {
    const tags = [];
    // Match patterns like "O-[std]", "P-[min]", etc.
    const regex = /([PROMT]|Patterns)-\[(\w+)\]/g;
    let match;
    while ((match = regex.exec(comment)) !== null) {
        const category = match[1];
        const level = match[2];
        if (['P', 'R', 'O', 'M', 'Patterns', 'T'].includes(category) && ['min', 'std', 'max'].includes(level)) {
            tags.push({ category, level });
        }
    }
    return tags;
}
/**
 * Extract all PROMPT comments from code
 *
 * @param code - Source code content
 * @returns Array of parsed PROMPT comments with line numbers
 */
function extractPromptComments(code) {
    const lines = code.split('\n');
    const prompts = [];
    lines.forEach((line, index) => {
        // Match single-line comments with PROMPT tags
        const match = line.match(/\/\/\s*PROMPT\s+(.+)/);
        if (match) {
            const raw = match[1].trim();
            const tags = parsePromptTags(raw);
            if (tags.length > 0) {
                prompts.push({
                    tags,
                    raw,
                    line: index + 1, // 1-indexed
                });
            }
        }
    });
    return prompts;
}
/**
 * Format a PROMPT tag as a string
 *
 * @example
 * formatPromptTag({ category: 'O', level: 'std' }) // "O-[std]"
 */
function formatPromptTag(tag) {
    return `${tag.category}-[${tag.level}]`;
}
/**
 * Format multiple PROMPT tags
 *
 * @example
 * formatPromptTags([{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }])
 * // "O-[std] P-[min]"
 */
function formatPromptTags(tags) {
    return tags.map(formatPromptTag).join(' ');
}
/**
 * Check if a specific tag is activated
 */
function hasTag(tags, category, level) {
    return tags.some(tag => tag.category === category && (level === undefined || tag.level === level));
}
/**
 * Get the level for a specific category
 * Returns undefined if category is not activated
 */
function getLevel(tags, category) {
    const tag = tags.find(t => t.category === category);
    return tag?.level;
}
/**
 * Validate if PROMPT tags are properly formatted
 */
function isValidPromptComment(comment) {
    const tags = parsePromptTags(comment);
    return tags.length > 0;
}
