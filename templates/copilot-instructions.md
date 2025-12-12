# Copilot Instructions

> **Copy this file to your project's `.github/copilot-instructions.md`**

---

## PROMPT Protocol Active

This repository uses the **PROMPT Protocol** defined in `.github/prompt-system.md`.

When you see a comment or chat message with `PROMPT X-[level]`:

1. **Parse the tag** (e.g., `PROMPT O-[std] P-[min]`)
2. **Look up corresponding rules** in `prompt-system.md`
3. **Apply those rules** to generated code
4. **Combine rules** from multiple categories if specified

---

## Quick Reference

### Syntax

```
PROMPT X-[level]
```

- `X` = Category letter: **P**, **R**, **O**, **M**, **P**, **T**
- `[level]` = Depth: **min**, **std**, **max**

### Levels

- `[min]` = First 3 rules (minimal) - Use for MVPs
- `[std]` = First 6-9 rules (standard) - Default for production
- `[max]` = All 12 rules (maximum) - Critical features

### Categories

| Letter | Focus Area |
|--------|------------|
| **P** | Performance (Speed, optimization, bundle size) |
| **R** | Rules & Structure (Architecture, organization) |
| **O** | Output & UX (Design, accessibility, UI) |
| **M** | Modeling (Database schema, types, validation) |
| **P** | Patterns (Code quality, testing, maintainability) |
| **T** | Types (TypeScript, validation, error handling) |

---

## Usage Examples

### In Code Comments

```typescript
// PROMPT O-[std] M-[min]
// Create a product card component with image, title, and price
export function ProductCard(props: ProductCardProps) {
  // Apply: UX/Design rules 1-9 + Modeling rules 1-3
}
```

### In Chat

```
PROMPT M-[std] T-[std]

Create a Supabase schema for user authentication with:
- users table (email, password_hash, created_at)
- Include Zod validation schemas
- Add RLS policies
```

### Multiple Categories

```typescript
// PROMPT O-[std] P-[std] M-[min] T-[min]
// Full production feature with balanced quality
```

---

## Common Combinations

| Scenario | Tag | Description |
|----------|-----|-------------|
| Quick UI prototype | `PROMPT O-[min] P-[min]` | Fast UI, essential quality |
| Production feature | `PROMPT O-[std] P-[std] M-[min]` | Good UX, solid code |
| Backend API | `PROMPT M-[std] T-[std] R-[min]` | Schema, types, structure |
| Performance critical | `PROMPT P-[max] T-[std]` | Max optimization |
| Complete best practice | `PROMPT O-[std] P-[std] M-[std] R-[std] T-[std]` | Balanced production |

---

## Default Behavior

**If no PROMPT tag is specified:**
- Use balanced judgment across all categories
- Prioritize code quality and maintainability
- Follow general best practices

**When PROMPT is specified:**
- Strictly follow the activated rules
- Prioritize specified categories in order
- Combine rules logically when multiple categories are used

---

## Validation

After generating code with PROMPT tags:

1. **Check the rules** - Verify activated rules were applied
2. **Use checklists** - See validation section in `prompt-system.md`
3. **Review markers**:
   - ✓ = Should be automatically validatable
   - ◐ = Requires manual review

---

## Project Context

**Tech Stack:** [Add your stack here]
- Framework: Next.js, React, Vue, etc.
- Database: Supabase, PostgreSQL, etc.
- Styling: Tailwind CSS, shadcn/ui, etc.
- Testing: Vitest, Jest, Playwright, etc.

**Custom Rules:** [Add project-specific rules here]

---

## Resources

- Full documentation: See `PROMPT-Protocol-Web-v2.1.md`
- Rule reference: See `.github/prompt-system.md`
- Examples: See `examples/` directory

---

**PROMPT Protocol Version:** 2.1.0  
**Last Updated:** 2025-12-12  
**Works With:** GitHub Copilot, Claude, Cursor, ChatGPT, any LLM
