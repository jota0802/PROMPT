# PROMPT Protocol: AI-Assisted Development Guide
## For Web Development (Fullstack)

> **Copy this file to your project's `.github/prompt-system.md`**

---

## Overview

PROMPT is a structured protocol for guiding AI code assistants (GitHub Copilot, Claude, Cursor, etc.) toward specific development goals. Instead of hoping the AI understands your intention, you use explicit PROMPT tags to activate predefined rule sets.

**This version (v2.1):** Optimized for **web development** (fullstack, Next.js, React, APIs with databases)

---

## The PROMPT Categories

**P**: Performance (Speed, optimization, bundle size)  
**R**: Rules & Structure (Architecture, code organization, patterns)  
**O**: Output & UX (Design, user experience, accessibility, UI)  
**M**: Modeling (Database schema, types, data validation)  
**P**: Patterns (Code quality, testing, maintainability)  
**T**: Types (TypeScript, validation, error handling)

### Syntax

```
PROMPT X-[level]
```

Where:
- `X` = Category letter (P, R, O, M, P, T)
- `[level]` = Depth level (min, std, max)

**Levels:**
- `[min]` = Minimal (first 3 rules) - Use for MVPs
- `[std]` = Standard (6-9 rules) - Default for production
- `[max]` = Maximum (all 12 rules) - Use for critical features

**Combine categories:**
```
PROMPT O-[std] M-[min] T-[std]
```

---

## Complete Rules Reference

### P: Performance

**Focus:** Speed, bundle size, query efficiency, resource usage, optimization

#### Level [min] - Minimal (3 rules)

1. ✓ Use Next.js Image component for all images
2. ✓ Avoid N+1 database queries (use joins or relation includes)
3. ✓ Add loading states for all async operations

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Implement caching strategy (SWR, React Query, or Next.js cache)
5. ✓ Lazy load routes with dynamic imports (React.lazy, dynamic())
6. ✓ Use indexes on frequently queried database fields
7. ✓ Compress and convert images to WebP format
8. ✓ Debounce search inputs and expensive operations
9. ✓ Optimize bundle size with next/bundle-analyzer

#### Level [max] - Maximum (+3 rules, total 12)

10. ◐ Profile performance with Lighthouse (target >90 score)
11. ◐ Use edge functions and CDN for static assets
12. ◐ Implement incremental static regeneration (ISR) when applicable

---

### R: Rules & Structure

**Focus:** Architecture, code organization, design patterns, project structure

#### Level [min] - Minimal (3 rules)

1. ✓ Use meaningful file/folder names (no abbreviations)
2. ✓ Separate concerns (components, utils, hooks, services)
3. ✓ Follow consistent naming conventions across the project

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Design APIs following REST conventions or tRPC patterns
5. ✓ Use custom hooks to extract reusable logic
6. ✓ Keep functions under 50 lines of code
7. ✓ Organize imports at top (types, libs, utils, components)
8. ✓ Use early returns to reduce nesting depth
9. ✓ Extract magic numbers and strings to named constants

#### Level [max] - Maximum (+3 rules, total 12)

10. ◐ Prefer composition over inheritance
11. ◐ Use functional programming patterns when applicable
12. ◐ Document complex logic and design decisions

---

### O: Output & UX

**Focus:** User interface, user experience, accessibility, design, responsiveness

#### Level [min] - Minimal (3 rules)

1. ✓ Use shadcn/ui components as base
2. ✓ Apply Tailwind CSS utility classes
3. ✓ Mobile-first responsive design (test sm, md, lg, xl breakpoints)

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Use semantic HTML (header, nav, main, article, section)
5. ✓ Implement loading, empty, and error UI states
6. ✓ Ensure keyboard navigation works (Tab, Enter, Escape)
7. ✓ Use Lucide React icons consistently
8. ✓ Add ARIA labels and attributes for accessibility
9. ✓ Test color contrast meets WCAG AA minimum (4.5:1)

#### Level [max] - Maximum (+3 rules, total 12)

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

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Add created_at and updated_at timestamps to all tables
5. ✓ Use UUIDs for primary keys instead of auto-increment
6. ✓ Add indexes on frequently queried fields
7. ✓ Use Zod schemas for runtime input validation
8. ✓ Implement RLS (Row Level Security) policies for Supabase
9. ✓ Document schema relationships and constraints

#### Level [max] - Maximum (+3 rules, total 12)

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

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Use meaningful variable/function names (no abbreviations)
5. ✓ Write unit tests for business logic (Vitest, Jest)
6. ✓ Document complex logic with JSDoc or comments
7. ✓ Follow ESLint rules (no warnings, only errors)
8. ✓ Use React hooks correctly (dependency arrays, custom hooks)
9. ✓ Extract magic numbers to named constants

#### Level [max] - Maximum (+3 rules, total 12)

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

#### Level [std] - Standard (+6 rules, total 9)

4. ✓ Export and reuse types across modules
5. ✓ Use discriminated unions for complex types
6. ✓ Validate environment variables at runtime
7. ✓ Use type guards for runtime type checking
8. ✓ Avoid type assertions (use `as`) unless absolutely necessary
9. ✓ Document complex types with JSDoc

#### Level [max] - Maximum (+3 rules, total 12)

10. ◐ Use branded types for domain-specific safety
11. ◐ Implement exhaustive checking with TypeScript's never type
12. ◐ Create utility types for common patterns

---

## Validation Checklist

**For PROMPT P (Performance):**
- [ ] Using Next.js Image for images?
- [ ] No N+1 queries?
- [ ] Loading states present?
- [ ] Caching implemented (if std or max)?
- [ ] Bundle size optimized (if std or max)?
- [ ] Lighthouse score >90 (if max)?

**For PROMPT R (Rules & Structure):**
- [ ] Clear folder structure?
- [ ] Consistent naming conventions?
- [ ] Concerns separated (components, utils, hooks)?
- [ ] Functions under 50 lines (if std or max)?
- [ ] Magic numbers extracted (if std or max)?

**For PROMPT O (Output & UX):**
- [ ] Uses shadcn/ui components?
- [ ] Has Tailwind classes?
- [ ] Responsive breakpoints?
- [ ] Semantic HTML (if std or max)?
- [ ] Loading/empty/error states (if std or max)?
- [ ] Keyboard navigation (if std or max)?
- [ ] Color contrast WCAG AA (if std or max)?
- [ ] Dark mode support (if max)?

**For PROMPT M (Modeling):**
- [ ] Types match database schema?
- [ ] Foreign keys defined?
- [ ] Meaningful table/field names?
- [ ] Timestamps (created_at, updated_at) (if std or max)?
- [ ] UUIDs for primary keys (if std or max)?
- [ ] RLS policies (if std or max)?
- [ ] Indexes on queried fields (if std or max)?

**For PROMPT P (Patterns):**
- [ ] No `any` types?
- [ ] Zod validation for inputs?
- [ ] Error handling present?
- [ ] Meaningful variable/function names (if std or max)?
- [ ] Unit tests written (if std or max)?
- [ ] ESLint rules followed (if std or max)?
- [ ] E2E tests for critical paths (if max)?

**For PROMPT T (Types):**
- [ ] TypeScript strict mode?
- [ ] API inputs validated?
- [ ] Errors handled explicitly?
- [ ] Types exported and reused (if std or max)?
- [ ] Environment variables validated (if std or max)?
- [ ] Type guards used (if std or max)?
- [ ] Branded types (if max)?

---

## Common Combinations

| Use Case | PROMPT Tag | Description |
|----------|-----------|-------------|
| Quick MVP UI | `PROMPT O-[min] P-[min]` | Fast UI, essential quality |
| Production Feature | `PROMPT O-[std] P-[std] M-[min]` | Good UX, solid code, basic data |
| Backend API | `PROMPT M-[std] T-[std] R-[min]` | Schema, types, architecture |
| Performance Critical | `PROMPT P-[max] T-[std]` | Maximum optimization |
| Complete Best Practice | `PROMPT O-[std] P-[std] M-[std] R-[std] T-[std]` | Production-ready, balanced |

---

**Legend:** ✓ = Auto-validatable | ◐ = Manual review

**Version:** 2.1.0  
**Last updated:** 2025-12-12  
**Works with:** GitHub Copilot, Claude, Cursor, any LLM
