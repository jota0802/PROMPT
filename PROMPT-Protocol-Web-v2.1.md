# PROMPT Protocol: AI-Assisted Development Guide
## For Web Development (Fullstack)

## Table of Contents
1. [Overview](#overview)
2. [Core Concept](#core-concept)
3. [Quick Start](#quick-start)
4. [Complete Rules Reference](#complete-rules-reference)
5. [Usage Examples](#usage-examples)
6. [Implementation Guide](#implementation-guide)
7. [Roadmap](#roadmap)

---

## Overview

PROMPT is a structured protocol for guiding AI code assistants (GitHub Copilot, Claude, Cursor, etc.) toward specific development goals. Instead of hoping the AI understands your intention, you use explicit PROMPT tags to activate predefined rule sets.

**This version (v1):** Optimized for **web development** (fullstack, Next.js, React, APIs with databases)

**Problem it solves:**
- AI sometimes ignores repository context or best practices
- Inconsistent code quality when switching between features
- Need to repeat the same instructions across multiple prompts
- Hard to enforce performance vs design vs code quality priorities

**Solution:**
- Single PROMPT tag in a comment activates 3-10 relevant rules
- Rules are documented in `.github/prompt-system.md`
- Can be combined for complex requirements
- Scalable from MVP to production-grade code

---

## Core Concept

### The PROMPT Categories

**P**: Performance (Speed, optimization, bundle size)
**R**: Rules & Structure (Architecture, code organization, patterns)
**O**: Output & UX (Design, user experience, accessibility, UI)
**M**: Modeling (Database schema, types, data validation)
**P**: Patterns (Code quality, testing, maintainability)
**T**: Types (TypeScript, validation, error handling)

Each letter represents a focus area with specific rules.

### Syntax

```
PROMPT X-[level]
```

Where:
- `X` = Category letter (P, R, O, M, P, T)
- `[level]` = Depth level (min, std, max)

**Levels explained:**
- `[min]` = Minimal (first 3 rules) - Use for MVPs and quick iterations
- `[std]` = Standard (first 6-7 rules) - Default for production features
- `[max]` = Maximum (all rules) - Use for critical/complex features

**Multiple modes:**
```
PROMPT O-[std] M-[min]
```
Apply UX/Design standard rules + Modeling minimal rules

---

## Quick Start

### Step 1: Add Files to Your Project

Create `.github/prompt-system.md` and `.github/copilot-instructions.md` in your repo.

### Step 2: Use in Comments

```typescript
// PROMPT O-[std] M-[min]
// Create a product card component with image, title, and price
export function ProductCard(props: ProductCardProps) {
  // AI will now follow UX rules 1-6 and Modeling rules 1-3
}
```

### Step 3: In Copilot Chat

```
PROMPT R-[std] M-[min]
Create a Supabase schema for user authentication with email/password
```

### Step 4: In Commit Messages

```bash
git commit -m "feat: add checkout page [PROMPT O-[std] M-[std]]"
```

---

## Complete Rules Reference

### P: Performance

**Focus:** Speed, bundle size, query efficiency, resource usage, optimization

#### Level [min] - Minimal (3 rules)

1. ✓ Use Next.js Image component for all images
2. ✓ Avoid N+1 database queries (use joins or relation includes)
3. ✓ Add loading states for all async operations

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Implement caching strategy (SWR, React Query, or Next.js cache)
5. ✓ Lazy load routes with dynamic imports (React.lazy, dynamic())
6. ✓ Use indexes on frequently queried database fields
7. ✓ Compress and convert images to WebP format
8. ✓ Debounce search inputs and expensive operations
9. ✓ Optimize bundle size with next/bundle-analyzer

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Profile performance with Lighthouse (target >90 score)
11. ◐ Use edge functions and CDN for static assets
12. ◐ Implement incremental static regeneration (ISR) when applicable

**Legend:** ✓ = Auto-validatable | ◐ = Manual review

---

### R: Rules & Structure

**Focus:** Architecture, code organization, design patterns, project structure

#### Level [min] - Minimal (3 rules)

1. ✓ Use meaningful file/folder names (no abbreviations)
2. ✓ Separate concerns (components, utils, hooks, services)
3. ✓ Follow consistent naming conventions across the project

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Design APIs following REST conventions or tRPC patterns
5. ✓ Use custom hooks to extract reusable logic
6. ✓ Keep functions under 50 lines of code
7. ✓ Organize imports at top (types, libs, utils, components)
8. ✓ Use early returns to reduce nesting depth
9. ✓ Extract magic numbers and strings to named constants

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Prefer composition over inheritance
11. ◐ Use functional programming patterns when applicable
12. ◐ Document complex logic and design decisions

---

### O: Output & UX

**Focus:** User interface, user experience, accessibility, design, responsiveness

⚠️ **Note:** This category is optimized for web UI (React/Next.js). For backend APIs, DevOps, or mobile-first projects, see future PROMPT specializations (PROMPT-Backend, PROMPT-Mobile, etc.)

#### Level [min] - Minimal (3 rules)

1. ✓ Use shadcn/ui components as base
2. ✓ Apply Tailwind CSS utility classes
3. ✓ Mobile-first responsive design (test sm, md, lg, xl breakpoints)

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Use semantic HTML (header, nav, main, article, section)
5. ✓ Implement loading, empty, and error UI states
6. ✓ Ensure keyboard navigation works (Tab, Enter, Escape)
7. ✓ Use Lucide React icons consistently
8. ✓ Add ARIA labels and attributes for accessibility
9. ✓ Test color contrast meets WCAG AA minimum (4.5:1)

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Support dark mode with proper color tokens
11. ◐ Add smooth transitions (100-300ms) for interactions
12. ◐ Test with real content (never use lorem ipsum in production)

---

### M: Modeling

**Focus:** Database schema, data structure, relationships, types, validation

#### Level [min] - Minimal (3 rules)

1. ✓ Use TypeScript types matching database schema
2. ✓ Define foreign keys and relationships explicitly
3. ✓ Use meaningful table/field names (no abbreviations)

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Add created_at and updated_at timestamps to all tables
5. ✓ Use UUIDs for primary keys instead of auto-increment
6. ✓ Add indexes on frequently queried fields
7. ✓ Use Zod schemas for runtime input validation
8. ✓ Implement RLS (Row Level Security) policies for Supabase
9. ✓ Document schema relationships and constraints

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Consider database normalization vs denormalization trade-offs
11. ◐ Plan for data migrations and schema versioning
12. ◐ Add database constraints (CHECK, UNIQUE, NOT NULL)

---

### P: Patterns (Code Quality & Testing)

**Focus:** Code quality, testing, maintainability, best practices

#### Level [min] - Minimal (3 rules)

1. ✓ Use TypeScript strict mode (no `any` types)
2. ✓ Validate all inputs with Zod schemas
3. ✓ Handle errors explicitly (try-catch, error boundaries)

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Use meaningful variable/function names (no abbreviations)
5. ✓ Write unit tests for business logic (Vitest, Jest)
6. ✓ Document complex logic with JSDoc or comments
7. ✓ Follow ESLint rules (no warnings, only errors)
8. ✓ Use React hooks correctly (dependency arrays, custom hooks)
9. ✓ Extract magic numbers to named constants

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Add integration and E2E tests for critical paths
11. ◐ Use consistent error handling patterns across codebase
12. ◐ Implement proper logging and debugging capabilities

---

### T: Types (TypeScript & Validation)

**Focus:** Type safety, validation, error handling, runtime checks

#### Level [min] - Minimal (3 rules)

1. ✓ Use TypeScript in strict mode
2. ✓ Validate API inputs with Zod or similar
3. ✓ Handle errors explicitly with try-catch

#### Level [std] - Standard (6 more rules, total 9)

4. ✓ Export and reuse types across modules
5. ✓ Use discriminated unions for complex types
6. ✓ Validate environment variables at runtime
7. ✓ Use type guards for runtime type checking
8. ✓ Avoid type assertions (use `as`) unless absolutely necessary
9. ✓ Document complex types with JSDoc

#### Level [max] - Maximum (3 more rules, total 12)

10. ◐ Use branded types for domain-specific safety
11. ◐ Implement exhaustive checking with TypeScript's never type
12. ◐ Create utility types for common patterns

---

## Usage Examples

### Example 1: Quick UI Component (MVP)

```typescript
// PROMPT O-[min] P-[min]
// Simple button component for hero section
export function HeroButton() {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Get Started
    </button>
  );
}
```

**What it means:**
- UX/Design minimal rules (shadcn/ui, Tailwind, responsive)
- Patterns minimal rules (TypeScript strict, validation, error handling)

---

### Example 2: Production Feature with Full Design

```typescript
// PROMPT O-[std] P-[std] M-[min]
// Product listing page with pagination, filters, and sorting
export function ProductListing() {
  // Uses standard UX + standard patterns + minimal modeling
}
```

**What it means:**
- UX/Design standard (9 rules including accessibility, states, navigation)
- Patterns standard (9 rules including tests, naming, error handling)
- Modeling minimal (3 rules for basic type safety)

---

### Example 3: Database Architecture

```typescript
// PROMPT M-[std] R-[std] T-[std]
// Supabase schema for multi-tenant SaaS with RLS
```

**What it means:**
- Modeling standard (9 rules with RLS, validation, indexing)
- Rules & Structure standard (9 rules for organization and patterns)
- Types standard (9 rules for validation and type safety)

---

### Example 4: Performance Critical Feature

```typescript
// PROMPT P-[max] O-[std] T-[min]
// Dashboard that loads 10,000 data points without lag
```

**What it means:**
- Performance is PRIORITY (all 12 rules, optimizations first)
- UX/Design standard (user-facing requirements)
- Types minimal (basic validation)

---

### Example 5: In Copilot Chat

```
PROMPT M-[std] T-[min]

Create a Supabase table for a blog with:
- posts (title, content, published_at, author_id)
- authors (name, email)
- categories (name)
- post_categories (junction table)

Include Zod schemas and RLS policies.
```

---

## Implementation Guide

### For Your Repository

#### Step 1: Create `.github/prompt-system.md`

Place the complete PROMPT rules reference in your repository (this file can be used as that).

#### Step 2: Create `.github/copilot-instructions.md`

```markdown
# Copilot Instructions

## PROMPT Protocol Active

This repository uses the PROMPT protocol defined in `.github/prompt-system.md`.

When you see a comment with `PROMPT X-[level]`:

1. Parse the tag (e.g., `PROMPT O-[std] P-[min]`)
2. Look up corresponding rules in prompt-system.md
3. Apply those rules to generated code
4. Combine rules from multiple categories if specified

## Quick Reference

- `[min]` = First 3 rules (minimal)
- `[std]` = First 6-9 rules (standard)
- `[max]` = All rules (maximum)

## Default behavior

If no PROMPT is specified, use balanced judgment across all categories.
```

#### Step 3: Start Using in Comments

```typescript
// PROMPT O-[std] P-[min]
// Your code request here
```

#### Step 4: Validate Generated Code

Use the checklist below to ensure AI followed the rules.

---

## Validation Checklist

**For PROMPT O (Output & UX):**
- [ ] Uses shadcn/ui components?
- [ ] Has Tailwind classes?
- [ ] Responsive breakpoints for mobile/tablet/desktop?
- [ ] Semantic HTML tags (header, nav, main)?
- [ ] Loading/empty/error states implemented (if std or max)?
- [ ] Keyboard navigation works (if std or max)?
- [ ] Color contrast is good (if std or max)?

**For PROMPT P (Patterns/Code Quality):**
- [ ] No `any` types in TypeScript?
- [ ] Has Zod validation for inputs?
- [ ] Error handling present (try-catch)?
- [ ] Variable names are descriptive?
- [ ] Functions under 50 lines (if std or max)?
- [ ] Unit tests written (if std or max)?

**For PROMPT M (Modeling):**
- [ ] Types match database schema?
- [ ] Foreign keys defined?
- [ ] Timestamps added (created_at, updated_at)?
- [ ] RLS policies set up (if std or max)?
- [ ] Indexes on queried fields (if std or max)?

**For PROMPT R (Rules & Structure):**
- [ ] Clear folder structure?
- [ ] Consistent naming conventions?
- [ ] Concerns separated (components, utils, hooks)?
- [ ] Magic numbers extracted (if std or max)?

**For PROMPT T (Types):**
- [ ] TypeScript strict mode?
- [ ] Inputs validated?
- [ ] Error handling present?
- [ ] Types exported and reused (if std or max)?

**For PROMPT P (Performance):**
- [ ] Using Next.js Image for images?
- [ ] No N+1 queries?
- [ ] Loading states present?
- [ ] Caching implemented (if std or max)?
- [ ] Bundle size optimized (if std or max)?

---

## Common PROMPT Combinations

### Quick Component (MVP)
```
PROMPT O-[min] P-[min]
```
Fast UI, essential code quality

### Production Feature
```
PROMPT O-[std] P-[std] M-[min]
```
Good UX, solid code, basic structure

### API/Backend Feature
```
PROMPT M-[std] T-[std] R-[std]
```
Solid schema, type safety, good structure

### Performance Critical
```
PROMPT P-[max] O-[std]
```
Optimized first, good UX second

### Complete/Best Practice
```
PROMPT O-[std] P-[std] M-[std] R-[std] T-[std]
```
Balanced, production-ready approach

---

## Tips for Success

1. **Start with [min]**: Use minimal levels for MVPs and learning. Easier to follow.

2. **Be consistent**: Use the same PROMPT combinations for similar features.

3. **Combine strategically**: 
   - Frontend component: `O-[std] P-[min]` (design > logic)
   - API endpoint: `M-[std] T-[std] R-[min]` (structure > code quality)
   - Critical path: `P-[max] T-[std]` (quality > speed)

4. **Reference in commits**: Include PROMPT in commit messages for history.

5. **Update as you go**: Keep `.github/prompt-system.md` updated as your stack evolves.

---

## FAQ

**Q: Does the AI always follow PROMPT rules?**
A: Not perfectly. It's a strong suggestion, not a guarantee. Validation is still needed.

**Q: Can I customize the rules?**
A: Yes. `.github/prompt-system.md` is yours to modify. Adapt to your tech stack.

**Q: Which level should I use by default?**
A: `[std]` (standard). Use `[min]` for MVPs, `[max]` for critical features.

**Q: Can I combine all PROMPT categories at once?**
A: Yes: `PROMPT O-[std] P-[std] M-[std] R-[std] T-[std]` covers everything balanced.

**Q: Is PROMPT only for Next.js?**
A: No. This version (v1) works with any JavaScript/TypeScript web project (React, Vue, Svelte, Next.js, etc.). Future versions will specialize for backend, mobile, DevOps, etc.

**Q: Do I need VS Code extension to use PROMPT?**
A: No. Manual validation works. Extension automates it (coming in Phase 2).

**Q: Is PROMPT universal for all development types?**
A: Not yet. v1 is optimized for **web development** (frontend + fullstack). Future specializations planned:
- PROMPT-Backend (APIs, microservices, non-web services)
- PROMPT-Frontend (UI-only, design systems)
- PROMPT-Mobile (React Native, Flutter, native iOS/Android)
- PROMPT-DevOps (infrastructure, CI/CD, deployment)
- PROMPT-Universal (meta-protocol that adapts to any context)

---

## Future Roadmap

### Phase 1: Manual Validation (Current - v1)
- You check checklists manually after AI generates code
- Works with any AI tool (Copilot, Claude, Cursor)
- Optimized for web development

### Phase 2: Specializations (Next)
- PROMPT-Backend for pure API/database development
- PROMPT-Frontend for UI/design system focus
- PROMPT-Mobile for React Native/Flutter/native apps
- Each with tailored P.R.O.M.P.T categories

### Phase 3: VS Code Extension (Planned)
- Parse PROMPT comments in your code
- Run ESLint rules based on PROMPT
- Show inline validation (✅ passed, ❌ failed)
- Suggest quick fixes

### Phase 4: Advanced Features (Future)
- PROMPT-Universal meta-protocol
- Dashboard showing PROMPT compliance across project
- Team shared configurations
- CLI validator for CI/CD
- Automated report generation

---

## Next Steps

1. Copy `.github/prompt-system.md` to your projects
2. Reference rules in `.github/copilot-instructions.md`
3. Start using PROMPT tags in comments
4. Validate against checklists
5. Refine rules based on your experience
6. Share with your team/community
7. Provide feedback for future specializations

---

## Contributing & Specializations

Want to create PROMPT-Backend or PROMPT-Frontend? Visit the repository and submit a discussion or PR with your specialized categories.

---

## License

MIT - Use, modify, and distribute freely. Credit appreciated but not required.

---

**Version:** 2.1.0 (Web Development Focused)
**Last updated:** 2025-12-12
**Stack tested on:** Next.js 14+, Supabase, shadcn/ui, Tailwind CSS, React 18+
**Works with:** GitHub Copilot, Claude, Cursor, any LLM
**Status:** Stable for web development. Specializations in development.

---

## Acknowledgments

Built with focus on practical, achievable rules that work with current AI capabilities while maintaining room for growth into specializations for other development domains.

Happy AI-assisted coding!