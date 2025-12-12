import { describe, it, expect } from 'vitest';
import { parsePromptTags, extractPromptComments, formatPromptTag, hasTag, getLevel } from '../src/utils';

describe('parsePromptTags', () => {
  it('should parse single tag', () => {
    const result = parsePromptTags('O-[std]');
    expect(result).toEqual([{ category: 'O', level: 'std' }]);
  });

  it('should parse multiple tags', () => {
    const result = parsePromptTags('O-[std] P-[min] T-[max]');
    expect(result).toEqual([
      { category: 'O', level: 'std' },
      { category: 'P', level: 'min' },
      { category: 'T', level: 'max' },
    ]);
  });

  it('should ignore invalid tags', () => {
    const result = parsePromptTags('O-[std] X-[invalid] P-[min]');
    expect(result).toEqual([
      { category: 'O', level: 'std' },
      { category: 'P', level: 'min' },
    ]);
  });
});

describe('extractPromptComments', () => {
  it('should extract PROMPT comments from code', () => {
    const code = `
// PROMPT O-[std] P-[min]
function test() {
  // Regular comment
  return true;
}
// PROMPT T-[max]
`.trim();

    const result = extractPromptComments(code);
    expect(result).toHaveLength(2);
    expect(result[0].tags).toEqual([
      { category: 'O', level: 'std' },
      { category: 'P', level: 'min' },
    ]);
    expect(result[1].tags).toEqual([{ category: 'T', level: 'max' }]);
  });
});

describe('formatPromptTag', () => {
  it('should format tag correctly', () => {
    expect(formatPromptTag({ category: 'O', level: 'std' })).toBe('O-[std]');
    expect(formatPromptTag({ category: 'P', level: 'min' })).toBe('P-[min]');
  });
});

describe('hasTag', () => {
  const tags = [
    { category: 'O' as const, level: 'std' as const },
    { category: 'P' as const, level: 'min' as const },
  ];

  it('should find existing tag', () => {
    expect(hasTag(tags, 'O')).toBe(true);
    expect(hasTag(tags, 'O', 'std')).toBe(true);
  });

  it('should not find non-existing tag', () => {
    expect(hasTag(tags, 'T')).toBe(false);
    expect(hasTag(tags, 'O', 'min')).toBe(false);
  });
});

describe('getLevel', () => {
  const tags = [
    { category: 'O' as const, level: 'std' as const },
    { category: 'P' as const, level: 'min' as const },
  ];

  it('should get correct level', () => {
    expect(getLevel(tags, 'O')).toBe('std');
    expect(getLevel(tags, 'P')).toBe('min');
  });

  it('should return undefined for non-existing category', () => {
    expect(getLevel(tags, 'T')).toBeUndefined();
  });
});
