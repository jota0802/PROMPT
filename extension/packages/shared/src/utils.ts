import type { PromptTag, ParsedPrompt } from './types';

/**
 * Parse PROMPT tags from a comment string
 * 
 * @example
 * parsePromptTags("// PROMPT O-[std] P-[min]")
 * // Returns: [{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }]
 */
export function parsePromptTags(comment: string): PromptTag[] {
  const tags: PromptTag[] = [];
  
  // Match patterns like "O-[std]", "P-[min]", etc.
  const regex = /([PROMT]|Patterns)-\[(\w+)\]/g;
  let match: RegExpExecArray | null;
  
  while ((match = regex.exec(comment)) !== null) {
    const category = match[1] as PromptTag['category'];
    const level = match[2] as PromptTag['level'];
    
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
export function extractPromptComments(code: string): ParsedPrompt[] {
  const lines = code.split('\n');
  const prompts: ParsedPrompt[] = [];
  
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
export function formatPromptTag(tag: PromptTag): string {
  return `${tag.category}-[${tag.level}]`;
}

/**
 * Format multiple PROMPT tags
 * 
 * @example
 * formatPromptTags([{ category: 'O', level: 'std' }, { category: 'P', level: 'min' }])
 * // "O-[std] P-[min]"
 */
export function formatPromptTags(tags: PromptTag[]): string {
  return tags.map(formatPromptTag).join(' ');
}

/**
 * Check if a specific tag is activated
 */
export function hasTag(tags: PromptTag[], category: PromptTag['category'], level?: PromptTag['level']): boolean {
  return tags.some(tag => 
    tag.category === category && (level === undefined || tag.level === level)
  );
}

/**
 * Get the level for a specific category
 * Returns undefined if category is not activated
 */
export function getLevel(tags: PromptTag[], category: PromptTag['category']): PromptTag['level'] | undefined {
  const tag = tags.find(t => t.category === category);
  return tag?.level;
}

/**
 * Validate if PROMPT tags are properly formatted
 */
export function isValidPromptComment(comment: string): boolean {
  const tags = parsePromptTags(comment);
  return tags.length > 0;
}
