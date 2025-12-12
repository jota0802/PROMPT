# React Component Example

> **PROMPT Tags Used:** `PROMPT O-[std] P-[min]`

This example demonstrates reusable React components built with PROMPT Protocol.

## Components

### 1. Button Component (Minimal)
- **PROMPT:** `O-[min]`
- **Rules:** shadcn/ui, Tailwind, responsive

### 2. Product Card (Standard)
- **PROMPT:** `O-[std] P-[min]`
- **Rules:** Full UX standards + basic code quality

### 3. Form Component (Production)
- **PROMPT:** `O-[std] P-[std] T-[std]`
- **Rules:** Complete accessibility + testing + validation

## Structure

```
react-component/
├── button.tsx              # PROMPT O-[min]
├── product-card.tsx        # PROMPT O-[std] P-[min]
├── contact-form.tsx        # PROMPT O-[std] P-[std] T-[std]
└── README.md
```

## Usage Examples

Each component demonstrates progressive enhancement:

- **Level [min]:** Quick prototype, essential quality
- **Level [std]:** Production-ready, accessible
- **Level [max]:** Critical features, complete testing

## How to Use

```bash
# Copy a component to your project
cp product-card.tsx your-project/components/

# Ensure you have PROMPT templates
cp ../../templates/prompt-system.md your-project/.github/
```

## Validation

Run these checks after copying:

```bash
# TypeScript
npx tsc --noEmit

# ESLint
npx eslint .

# Accessibility
npm run test:a11y
```

---

**Note:** This is a placeholder. Full implementation coming soon. Want to contribute? See [CONTRIBUTING.md](../CONTRIBUTING.md)
