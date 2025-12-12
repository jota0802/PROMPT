# Next.js App Example

> **PROMPT Tags Used:** `PROMPT O-[std] P-[std] M-[min]`

This example demonstrates a complete Next.js 14 app using PROMPT Protocol for consistent code quality.

## Features

- Product listing with filters
- Responsive design (mobile-first)
- Loading and error states
- TypeScript strict mode
- Zod validation
- shadcn/ui components
- Tailwind CSS styling

## Structure

```
nextjs-app/
├── app/
│   ├── layout.tsx          # PROMPT O-[std] - Semantic layout
│   ├── page.tsx            # PROMPT O-[std] P-[min] - Homepage
│   └── products/
│       └── page.tsx        # PROMPT O-[std] P-[std] M-[min]
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── product-card.tsx    # PROMPT O-[std] P-[min]
├── lib/
│   └── db.ts              # Database client
└── types/
    └── product.ts         # PROMPT M-[min] T-[min]
```

## PROMPT Rules Applied

### O-[std] (Output & UX)
- ✓ shadcn/ui Button, Card, Input components
- ✓ Tailwind CSS for all styling
- ✓ Mobile-first responsive (sm:, md:, lg: breakpoints)
- ✓ Semantic HTML (header, main, article)
- ✓ Loading, empty, and error states
- ✓ Keyboard navigation support
- ✓ Lucide React icons
- ✓ ARIA labels on interactive elements

### P-[std] (Patterns)
- ✓ TypeScript strict mode
- ✓ Zod validation schemas
- ✓ Explicit error handling
- ✓ Meaningful variable names
- ✓ Functions under 50 lines
- ✓ React hooks used correctly

### M-[min] (Modeling)
- ✓ TypeScript types match schema
- ✓ Foreign keys defined
- ✓ Meaningful table/field names

## How to Run

```bash
# Install dependencies
npm install

# Copy templates
cp ../../templates/prompt-system.md .github/
cp ../../templates/copilot-instructions.md .github/

# Run development server
npm run dev
```

## Example Files

See the example implementation in this directory.

---

**Note:** This is a placeholder. Full implementation coming soon. Want to contribute? See [CONTRIBUTING.md](../CONTRIBUTING.md)
