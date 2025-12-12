import { describe, it, expect } from 'vitest';
import { createValidationEngine } from '../src/engine';
import type { ValidationContext } from '@prompt-protocol/shared';

describe('ValidationEngine', () => {
  it('should validate code with PROMPT tags', async () => {
    const engine = createValidationEngine();
    
    const code = `
// PROMPT O-[min] P-[min]
export function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} />
      <h2>{product.title}</h2>
    </div>
  );
}
`.trim();

    const context: ValidationContext = {
      filePath: '/test/ProductCard.tsx',
      fileContent: code,
      activatedTags: [],
      projectRoot: '/test',
    };

    const results = await engine.validate(context);
    
    // Should find violations
    expect(results.length).toBeGreaterThan(0);
    
    // Should have O-min-1 violation (shadcn/ui)
    expect(results.some(r => r.rule === 'O-min-1')).toBe(true);
    
    // Should have P-min-1 violation (missing types)
    expect(results.some(r => r.rule === 'P-min-1')).toBe(true);
  });

  it('should not validate code without PROMPT tags', async () => {
    const engine = createValidationEngine();
    
    const code = `
export function test() {
  return true;
}
`.trim();

    const context: ValidationContext = {
      filePath: '/test/test.ts',
      fileContent: code,
      activatedTags: [],
      projectRoot: '/test',
    };

    const results = await engine.validate(context);
    expect(results).toHaveLength(0);
  });
});
