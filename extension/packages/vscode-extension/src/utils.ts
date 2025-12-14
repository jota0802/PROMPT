import type { ParsedPrompt, PromptTag, PromptCategory, PromptLevel } from './types';

/**
 * Parse PROMPT tags from code
 * Example: // PROMPT O-[std] P-[min]
 */
export function parsePromptTags(content: string): ParsedPrompt[] {
  const results: ParsedPrompt[] = [];
  const lines = content.split('\n');
  
  // Regex to match PROMPT tags
  // Matches: PROMPT O-[std] P-[min] etc.
  const promptRegex = /PROMPT\s+((?:[A-Z][a-z]*-\[(?:min|std|max)\](?:\s+|$))+)/i;
  const tagRegex = /([A-Z][a-z]*)-\[(min|std|max)\]/g;
  
  lines.forEach((line, index) => {
    const match = line.match(promptRegex);
    if (match) {
      const tags: PromptTag[] = [];
      const tagString = match[1];
      
      let tagMatch;
      while ((tagMatch = tagRegex.exec(tagString)) !== null) {
        const category = normalizeCategory(tagMatch[1]);
        const level = tagMatch[2] as PromptLevel;
        
        if (category) {
          tags.push({ category, level });
        }
      }
      
      if (tags.length > 0) {
        results.push({
          tags,
          raw: match[0],
          line: index + 1
        });
      }
    }
  });
  
  return results;
}

/**
 * Normalize category name
 */
function normalizeCategory(cat: string): PromptCategory | null {
  const normalized = cat.toUpperCase();
  const validCategories: PromptCategory[] = ['P', 'R', 'O', 'M', 'Patterns', 'T'];
  
  // Map variations
  if (normalized === 'PERFORMANCE') return 'P';
  if (normalized === 'RULES') return 'R';
  if (normalized === 'OUTPUT') return 'O';
  if (normalized === 'MODELING') return 'M';
  if (normalized === 'PATTERNS') return 'Patterns';
  if (normalized === 'TYPES') return 'T';
  
  // Single letter
  if (validCategories.includes(normalized as PromptCategory)) {
    return normalized as PromptCategory;
  }
  
  return null;
}

/**
 * Format rule ID
 */
export function formatRuleId(category: PromptCategory, level: PromptLevel, ruleNumber: number): string {
  return `${category}-${level}-${ruleNumber}`;
}

/**
 * Get line and column from position
 */
export function getPositionFromOffset(content: string, offset: number): { line: number; column: number } {
  const lines = content.substring(0, offset).split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length
  };
}
