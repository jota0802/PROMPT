# Getting Started with PROMPT Protocol

Welcome! This guide will help you integrate PROMPT Protocol into your development workflow.

## What You'll Learn

1. How to add PROMPT to your project
2. Basic usage in code and AI chat
3. Choosing the right PROMPT tags
4. Validating AI-generated code

---

## Installation

### Step 1: Copy Template Files

Copy these two files to your project's `.github/` directory:

```bash
# From your project root
mkdir -p .github

# Copy prompt-system.md (the rules reference)
curl -o .github/prompt-system.md https://raw.githubusercontent.com/yourusername/prompt-protocol/main/templates/prompt-system.md

# Copy copilot-instructions.md (AI assistant instructions)
curl -o .github/copilot-instructions.md https://raw.githubusercontent.com/yourusername/prompt-protocol/main/templates/copilot-instructions.md
```

**Or manually:**
1. Create `.github/` folder in your project
2. Copy `templates/prompt-system.md` → `.github/prompt-system.md`
3. Copy `templates/copilot-instructions.md` → `.github/copilot-instructions.md`

### Step 2: Customize (Optional)

Edit `.github/copilot-instructions.md` to add your project context:

```markdown
## Project Context

**Tech Stack:**
- Framework: Next.js 14
- Database: Supabase (PostgreSQL)
- Styling: Tailwind CSS + shadcn/ui
- Testing: Vitest + Playwright

**Custom Rules:**
- Always use server actions for mutations
- Prefer server components by default
```

---

## Basic Usage

### In Code Comments

The AI will read your comment and apply the corresponding rules:

```typescript
// PROMPT O-[std] P-[min]
// Create a user profile card with avatar, name, email, and edit button
export function UserProfileCard({ user }: UserProfileCardProps) {
  // AI generates code following:
  // - Output & UX rules 1-9 (shadcn/ui, Tailwind, responsive, semantic HTML, etc.)
  // - Patterns rules 1-3 (TypeScript strict, Zod validation, error handling)
}
```

### In AI Chat (Copilot, Claude, Cursor)

```
PROMPT M-[std] T-[min]

Create a Supabase schema for an e-commerce app with:
- products (name, description, price, stock)
- categories
- product_categories (many-to-many)

Include TypeScript types and Zod schemas.
```

The AI will:
- Add created_at/updated_at timestamps
- Use UUIDs for primary keys
- Add indexes on foreign keys
- Create Zod validation schemas
- Set up RLS policies

### In Commit Messages (Optional)

Track which PROMPT rules were used:

```bash
git commit -m "feat: add product listing page [PROMPT O-[std] M-[min]]"
```

This helps maintain consistency across features and during code review.

---

## Choosing the Right PROMPT

### Understanding Levels

| Level | Rules | Use When |
|-------|-------|----------|
| `[min]` | 3 rules | MVP, prototypes, learning |
| `[std]` | 6-9 rules | Production features (default) |
| `[max]` | 12 rules | Critical features, complex logic |

**Tip:** Start with `[min]`, upgrade to `[std]` when ready for production.

### Category Guide

| Category | When to Use |
|----------|-------------|
| **P** Performance | Loading large data, images, complex UI |
| **R** Rules & Structure | New features, refactoring, API design |
| **O** Output & UX | User-facing components, pages, forms |
| **M** Modeling | Database changes, new tables, schema updates |
| **P** Patterns | Any code (quality baseline) |
| **T** Types | APIs, data validation, complex types |

### Common Scenarios

#### Scenario 1: Quick UI Component

**Goal:** Build a simple button component fast

```typescript
// PROMPT O-[min]
// CTA button for landing page
```

**Why:** Minimal UX rules ensure responsive design and basic styling.

---

#### Scenario 2: Production Feature

**Goal:** User dashboard with data tables and filters

```typescript
// PROMPT O-[std] P-[std] M-[min]
// User dashboard with activity table and date filters
```

**Why:**
- `O-[std]` = Good UX (accessibility, states, semantic HTML)
- `P-[std]` = Solid code quality (tests, naming, error handling)
- `M-[min]` = Basic type safety for data

---

#### Scenario 3: Backend API

**Goal:** REST API endpoint for user registration

```typescript
// PROMPT M-[std] T-[std] R-[min]
// POST /api/auth/register - Create new user account
```

**Why:**
- `M-[std]` = Proper schema, validation, database setup
- `T-[std]` = Strong type safety and runtime validation
- `R-[min]` = Clean code organization

---

#### Scenario 4: Performance Critical

**Goal:** Image gallery with 1000+ images

```typescript
// PROMPT P-[max] O-[std]
// Image gallery with lazy loading and virtualization
```

**Why:**
- `P-[max]` = All performance optimizations (priority)
- `O-[std]` = Good UX without compromising speed

---

## Validation Workflow

After AI generates code with PROMPT tags:

### 1. Quick Visual Check

- Does the code look right?
- Are imports organized?
- Is TypeScript being used?

### 2. Use Checklists

Open `.github/prompt-system.md` and find the validation checklist for your categories.

**Example for `PROMPT O-[std] P-[min]`:**

**Output & UX (std):**
- [ ] Uses shadcn/ui components?
- [ ] Has Tailwind classes?
- [ ] Responsive breakpoints?
- [ ] Semantic HTML tags?
- [ ] Loading/empty/error states?
- [ ] Keyboard navigation?

**Patterns (min):**
- [ ] No `any` types?
- [ ] Zod validation for inputs?
- [ ] Error handling present?

### 3. Test the Code

```bash
# Run type check
npm run type-check

# Run linter
npm run lint

# Run tests
npm run test

# Preview in browser (for UI)
npm run dev
```

### 4. Iterate if Needed

If rules weren't followed:
- Ask AI to fix specific issues
- Reference the rule number: "Apply rule O-[std] #5 (loading states)"
- Provide the checklist item that failed

---

## Tips for Success

### 1. Start Simple

```typescript
// ✅ Good: Start with minimal
// PROMPT O-[min] P-[min]

// ❌ Avoid: Too many rules at first
// PROMPT O-[max] P-[max] M-[max] R-[max] T-[max]
```

### 2. Be Specific in Descriptions

```typescript
// ✅ Good: Clear requirement
// PROMPT O-[std] M-[min]
// Product card with image, title, price, and "Add to Cart" button

// ❌ Vague: Unclear intent
// PROMPT O-[std] M-[min]
// Make a component
```

### 3. Combine Categories Logically

**Frontend components:**
```
PROMPT O-[std] P-[min]  ← Design + Basic quality
```

**Backend logic:**
```
PROMPT M-[std] T-[std] R-[min]  ← Schema + Types + Structure
```

**Full-stack features:**
```
PROMPT O-[std] M-[std] P-[std] T-[min]  ← Balanced
```

### 4. Upgrade Gradually

```typescript
// Week 1: MVP
// PROMPT O-[min] P-[min]

// Week 2: Add quality
// PROMPT O-[std] P-[min]

// Week 3: Production ready
// PROMPT O-[std] P-[std] M-[std]
```

### 5. Document Patterns

In `.github/copilot-instructions.md`, add your team's preferred combinations:

```markdown
## Team Standards

- **New pages**: `PROMPT O-[std] P-[std] M-[min]`
- **Reusable components**: `PROMPT O-[std] P-[min]`
- **API routes**: `PROMPT M-[std] T-[std] R-[min]`
- **Critical features**: Add `P-[max]` for performance
```

---

## Troubleshooting

### AI Ignores PROMPT Tags

**Cause:** AI context might be too large or missing `.github/copilot-instructions.md`

**Solution:**
1. Verify `.github/copilot-instructions.md` exists
2. Mention the rules explicitly: "Follow PROMPT O-[std] rules 1-9"
3. Provide checklist in the prompt

---

### Generated Code Doesn't Follow Rules

**Cause:** Rules might conflict or be unclear

**Solution:**
1. Use fewer categories (max 3-4)
2. Be more specific: "Use shadcn/ui Button component (rule O-[min] #1)"
3. Validate manually and iterate

---

### Too Many Rules to Track

**Cause:** Using `[max]` on too many categories

**Solution:**
1. Use `[std]` as default
2. Only use `[max]` for critical areas
3. Focus on 2-3 categories per feature

---

## Next Steps

1. **Try it:** Add PROMPT tags to a simple component
2. **Validate:** Use checklists to verify
3. **Iterate:** Adjust rules and levels based on results
4. **Share:** Document patterns with your team
5. **Explore:** Check [examples/](../examples/) for real-world usage

---

## Resources

- [PROMPT-Protocol-Web-v2.1.md](../PROMPT-Protocol-Web-v2.1.md) - Complete reference
- [Validation Guide](VALIDATION_GUIDE.md) - Detailed validation steps
- [Examples](EXAMPLES.md) - Real-world patterns
- [Contributing](../CONTRIBUTING.md) - Propose new rules

---

**Questions?** Open an issue or discussion in the repository.

Happy AI-assisted coding! 🚀
