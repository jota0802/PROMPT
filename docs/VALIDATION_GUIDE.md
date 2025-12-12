# PROMPT Validation Guide

This guide explains how to verify that AI-generated code follows PROMPT rules.

## Validation Workflow

```
1. Generate code with PROMPT tags
2. Run automated checks (TypeScript, linter, tests)
3. Manual validation using checklists
4. Iterate if needed
```

---

## Automated Validation

### TypeScript Check

```bash
npx tsc --noEmit
```

**Validates:**
- ✓ TypeScript strict mode (P-[min] rule #1, T-[min] rule #1)
- ✓ No `any` types (P-[min] rule #1)
- ✓ Type safety across modules (T-[std] rule #4)

### ESLint

```bash
npx eslint .
```

**Validates:**
- ✓ Import organization (R-[std] rule #7)
- ✓ React hooks usage (P-[std] rule #8)
- ✓ No warnings policy (P-[std] rule #7)

### Tests

```bash
npm run test
```

**Validates:**
- ✓ Unit tests exist (P-[std] rule #5)
- ✓ Business logic tested (P-[std] rule #5)
- ✓ Integration tests (P-[max] rule #10)

### Bundle Analyzer

```bash
npx @next/bundle-analyzer
```

**Validates:**
- ✓ Bundle size optimized (P-[std] rule #9)
- ✓ Code splitting applied (P-[std] rule #5)

---

## Manual Validation Checklists

### Performance (P)

#### [min] Level

```
[ ] Uses Next.js Image component for all images
    - Check: Search for <img> tags (should be <Image>)
    - File: Any component rendering images
    
[ ] No N+1 database queries
    - Check: Look for loops with database calls
    - File: API routes, server components
    
[ ] Loading states for async operations
    - Check: All async UI shows loading indicators
    - File: Components with useQuery, fetch, etc.
```

#### [std] Level (includes [min] + below)

```
[ ] Caching strategy implemented
    - Check: SWR, React Query, or cache() usage
    - File: API routes, data fetching functions
    
[ ] Lazy loading for routes
    - Check: dynamic() or React.lazy() usage
    - File: Page components, heavy components
    
[ ] Database indexes on queried fields
    - Check: Schema files, migrations
    - File: database/schema.sql, migrations/
    
[ ] Images in WebP format
    - Check: Image formats in public/
    - File: public/images/
    
[ ] Debouncing on expensive operations
    - Check: useDebounce or debounce() usage
    - File: Search inputs, filters
    
[ ] Bundle size analyzed
    - Check: bundle-analyzer in package.json
    - File: package.json
```

#### [max] Level (includes [std] + below)

```
[ ] Lighthouse score >90
    - Check: Run Lighthouse on deployed site
    - Tool: Chrome DevTools
    
[ ] Edge functions and CDN usage
    - Check: Middleware files, edge config
    - File: middleware.ts, next.config.js
    
[ ] ISR implemented where applicable
    - Check: revalidate in getStaticProps
    - File: Page components
```

---

### Rules & Structure (R)

#### [min] Level

```
[ ] Meaningful file/folder names
    - Check: No abbreviations like usr, btn, cmp
    - File: All files
    
[ ] Concerns separated
    - Check: Folders for components/, utils/, hooks/, services/
    - File: Project structure
    
[ ] Consistent naming conventions
    - Check: PascalCase for components, camelCase for functions
    - File: All files
```

#### [std] Level (includes [min] + below)

```
[ ] REST/tRPC conventions followed
    - Check: /api/users, /api/users/:id pattern
    - File: API routes
    
[ ] Custom hooks for reusable logic
    - Check: hooks/ directory with useX() functions
    - File: hooks/
    
[ ] Functions under 50 lines
    - Check: Scroll through each function
    - File: All files
    
[ ] Imports organized
    - Check: Types, libs, utils, components order
    - File: All files
    
[ ] Early returns used
    - Check: Reduced nesting depth
    - File: All files
    
[ ] Constants extracted
    - Check: No magic numbers/strings inline
    - File: All files, constants.ts
```

#### [max] Level (includes [std] + below)

```
[ ] Composition over inheritance
    - Check: No class extends, prefer hooks/composition
    - File: All files
    
[ ] Functional programming patterns
    - Check: map, filter, reduce instead of loops
    - File: All files
    
[ ] Complex logic documented
    - Check: JSDoc comments on non-trivial functions
    - File: All files
```

---

### Output & UX (O)

#### [min] Level

```
[ ] shadcn/ui components used
    - Check: Button, Input, etc. from @/components/ui
    - File: All components
    
[ ] Tailwind CSS classes
    - Check: className with Tailwind utilities
    - File: All components
    
[ ] Mobile-first responsive
    - Check: sm:, md:, lg:, xl: breakpoints
    - Test: Resize browser to mobile width
    - File: All components
```

#### [std] Level (includes [min] + below)

```
[ ] Semantic HTML used
    - Check: <header>, <nav>, <main>, <article>, <section>
    - File: Layout components, pages
    
[ ] Loading/empty/error states
    - Check: if (isLoading), if (error), if (data.length === 0)
    - File: All components with data
    
[ ] Keyboard navigation works
    - Check: Tab through UI, Enter to submit, Esc to close
    - Test: Don't use mouse
    - File: Forms, modals, dropdowns
    
[ ] Lucide React icons used consistently
    - Check: import { Icon } from 'lucide-react'
    - File: All components with icons
    
[ ] ARIA labels present
    - Check: aria-label, aria-describedby on interactive elements
    - File: Buttons, inputs, custom controls
    
[ ] Color contrast WCAG AA
    - Check: Use browser DevTools or contrast checker
    - Tool: WebAIM Contrast Checker
    - File: All components
```

#### [max] Level (includes [std] + below)

```
[ ] Dark mode support
    - Check: dark: classes or CSS variables
    - Test: Toggle theme
    - File: All components, globals.css
    
[ ] Smooth transitions
    - Check: transition-* or duration-* classes (100-300ms)
    - File: Interactive components
    
[ ] Real content (no lorem ipsum)
    - Check: Search for "lorem" in codebase
    - File: All files
```

---

### Modeling (M)

#### [min] Level

```
[ ] TypeScript types match schema
    - Check: Compare database types to TS types
    - File: types/, schema files
    
[ ] Foreign keys defined
    - Check: references or foreign key constraints
    - File: Schema files, migrations
    
[ ] Meaningful table/field names
    - Check: No abbreviations
    - File: Schema files
```

#### [std] Level (includes [min] + below)

```
[ ] created_at and updated_at timestamps
    - Check: All tables have these columns
    - File: Schema files
    
[ ] UUIDs for primary keys
    - Check: id uuid default gen_random_uuid()
    - File: Schema files
    
[ ] Indexes on queried fields
    - Check: create index on frequently used columns
    - File: Schema files, migrations
    
[ ] Zod schemas for validation
    - Check: z.object() definitions
    - File: schemas/, validations/
    
[ ] RLS policies implemented
    - Check: create policy statements
    - File: Schema files (Supabase)
    
[ ] Schema documented
    - Check: Comments in schema or separate docs
    - File: Schema files, README
```

#### [max] Level (includes [std] + below)

```
[ ] Normalization considered
    - Check: No obvious data duplication
    - File: Schema files
    
[ ] Migration plan exists
    - Check: migrations/ folder with versioned files
    - File: migrations/
    
[ ] Database constraints added
    - Check: CHECK, UNIQUE, NOT NULL
    - File: Schema files
```

---

### Patterns (Code Quality) (P)

#### [min] Level

```
[ ] TypeScript strict mode
    - Check: "strict": true in tsconfig.json
    - File: tsconfig.json
    
[ ] Zod validation on inputs
    - Check: schema.parse() or .safeParse()
    - File: API routes, forms
    
[ ] Explicit error handling
    - Check: try-catch, error boundaries
    - File: All async code, root layout
```

#### [std] Level (includes [min] + below)

```
[ ] Meaningful names
    - Check: No single letters (except i, x, y in obvious contexts)
    - File: All files
    
[ ] Unit tests written
    - Check: .test.ts or .spec.ts files
    - File: tests/, __tests__/
    
[ ] Complex logic documented
    - Check: JSDoc or inline comments
    - File: All files
    
[ ] ESLint rules followed
    - Check: No warnings, only errors allowed
    - Run: npm run lint
    
[ ] React hooks correct
    - Check: All dependencies in arrays, no missing deps
    - File: All components using hooks
    
[ ] Constants extracted
    - Check: CONSTANTS in all caps or separate file
    - File: constants.ts or top of files
```

#### [max] Level (includes [std] + below)

```
[ ] Integration/E2E tests
    - Check: tests/ with Playwright or Cypress
    - File: e2e/, tests/integration/
    
[ ] Consistent error patterns
    - Check: All errors use same format/helper
    - File: utils/errors.ts
    
[ ] Logging implemented
    - Check: console.log replaced with logger
    - File: All files
```

---

### Types (T)

#### [min] Level

```
[ ] TypeScript strict mode
    - Check: "strict": true in tsconfig.json
    - File: tsconfig.json
    
[ ] API inputs validated
    - Check: Zod schemas on all API routes
    - File: API routes
    
[ ] Errors handled explicitly
    - Check: try-catch around all throws
    - File: All files
```

#### [std] Level (includes [min] + below)

```
[ ] Types exported and reused
    - Check: export type X in types/ folder
    - File: types/, models/
    
[ ] Discriminated unions used
    - Check: type X = { kind: 'a', ... } | { kind: 'b', ... }
    - File: Complex types
    
[ ] Environment variables validated
    - Check: Zod or similar on process.env
    - File: env.ts, config.ts
    
[ ] Type guards present
    - Check: function isX(x): x is X
    - File: utils/type-guards.ts
    
[ ] Avoid type assertions
    - Check: Search for " as " in code
    - File: All files
    
[ ] Complex types documented
    - Check: JSDoc on type definitions
    - File: types/
```

#### [max] Level (includes [std] + below)

```
[ ] Branded types used
    - Check: type UserId = string & { __brand: 'UserId' }
    - File: types/
    
[ ] Exhaustive checking
    - Check: switch with never type
    - File: Reducers, complex branching
    
[ ] Utility types created
    - Check: Custom Pick, Omit variations
    - File: types/utils.ts
```

---

## Validation Tools

### Browser DevTools

**For Output & UX:**
- Lighthouse (Performance, Accessibility)
- Network tab (Image formats, caching)
- Elements tab (Semantic HTML, ARIA)

### VS Code Extensions

- **ESLint** - Auto-check R, P rules
- **Tailwind CSS IntelliSense** - Verify O rules
- **Prettier** - Code formatting consistency

### Online Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast (O-[std] rule #9)
- [WAVE](https://wave.webaim.org/) - Accessibility testing (O-[std])
- [BundlePhobia](https://bundlephobia.com/) - Package size (P-[std] rule #9)

---

## Example Validation Session

### Code Generated

```typescript
// PROMPT O-[std] P-[min]
// User profile card component
export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="p-4 rounded-lg border">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Validation Steps

1. **Automated:**
   ```bash
   npx tsc --noEmit  # ✅ Pass: TypeScript strict
   npx eslint .      # ✅ Pass: No warnings
   ```

2. **Manual - O-[std] Checklist:**
   - [ ] shadcn/ui components? ❌ Using raw div
   - [ ] Tailwind classes? ✅ Has className
   - [ ] Responsive? ❌ No breakpoints
   - [ ] Semantic HTML? ❌ Using div, not article
   - [ ] Loading states? ❌ No loading UI
   - [ ] Keyboard nav? ✅ Not applicable
   - [ ] Lucide icons? ❌ None present
   - [ ] ARIA labels? ❌ Missing alt on image
   - [ ] Color contrast? ⚠️ Need to test

3. **Manual - P-[min] Checklist:**
   - [ ] TypeScript strict? ✅ Has types
   - [ ] Zod validation? ⚠️ Not applicable here
   - [ ] Error handling? ⚠️ Not applicable

### Issues Found

1. Should use Next.js `<Image>` instead of `<img>` (P-[min] rule #1)
2. Missing shadcn/ui `<Card>` component (O-[min] rule #1)
3. No responsive breakpoints (O-[min] rule #3)
4. Not using semantic HTML `<article>` (O-[std] rule #4)

### Request Fix

```
Please fix these PROMPT rule violations:

1. Use Next.js Image component (P-[min] #1)
2. Use shadcn/ui Card component (O-[min] #1)
3. Add responsive breakpoints for mobile (O-[min] #3)
4. Use semantic <article> element (O-[std] #4)
```

---

## Tips for Effective Validation

1. **Validate incrementally** - Check after each feature, not at the end
2. **Automate what you can** - Set up pre-commit hooks
3. **Focus on critical rules** - Not all rules are equal
4. **Document violations** - Track common issues to improve prompts
5. **Iterate with AI** - Reference specific rule numbers when asking for fixes

---

**Next:** See [EXAMPLES.md](EXAMPLES.md) for real-world validation scenarios.
