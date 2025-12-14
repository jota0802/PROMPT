# PROMPT Protocol - AI Code Validator

**Ensure AI-generated code follows best practices automatically**

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎯 What is PROMPT Protocol?

PROMPT Protocol is a structured methodology for guiding AI code assistants (GitHub Copilot, Cursor, ChatGPT) to generate high-quality, production-ready code. This extension **validates** your code in real-time against PROMPT rules.

**Perfect for:**
- ✅ Next.js 13+ developers using AI assistants
- ✅ Teams enforcing code quality standards
- ✅ Developers learning best practices
- ✅ Projects with shadcn/ui, Tailwind, TypeScript

---

## ✨ Features

### 🔍 Real-Time Validation
See violations **instantly** as you code. No need to run separate linters or wait for CI/CD.

### 📊 3 Validation Categories

| Category | Focus | Rules |
|----------|-------|-------|
| **Output (O)** | UI/UX Design | shadcn/ui, Tailwind, Responsive, A11y |
| **Patterns** | Code Quality | TypeScript strict, Naming, Architecture |
| **Performance (P)** | Optimization | Next.js Image, Lazy loading, Memoization |

**27 rules implemented** across 3 levels: `[min]`, `[std]`, `[max]`

### 📍 Inline Diagnostics
- **Red squiggles** under violations
- **Problems panel** with detailed messages
- **Status bar** showing compliance count

### ⚙️ Fully Configurable
- Enable/disable validation
- Adjust severity per level (error/warning/info)
- Validate on save or while typing

---

## 🚀 Quick Start

### 1. Install Extension

Search for "PROMPT Protocol" in VS Code Extensions marketplace.

### 2. Add PROMPT Tags to Your Code

```typescript
// PROMPT O-[std] Patterns-[min]
export function ProductCard({ product }: ProductProps) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <Image src={product.image} alt={product.title} width={300} height={300} />
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-xl text-green-600">${product.price}</p>
    </Card>
  );
}
```

### 3. See Validation Results

Open **Problems panel** (`Ctrl+Shift+M`) to see:
- ✅ Rules that passed
- ❌ Rules that failed
- 💡 Suggestions to fix

---

## 📝 Usage Examples

### Example 1: Basic Component (Bad)

```typescript
// PROMPT O-[std] Patterns-[min]
export function Card({ data }: any) {
  return (
    <div>
      <img src={data.img} />
      <h3>{data.title}</h3>
    </div>
  );
}
```

**Violations:**
```
❌ [O-std-1] Should use shadcn/ui components instead of raw HTML
❌ [O-std-2] Should use Tailwind CSS for styling
❌ [Patterns-min-1] Avoid using "any" type. Use proper TypeScript types
❌ [P-min-1] Use Next.js Image component instead of <img> tag
```

### Example 2: Fixed Component (Good)

```typescript
// PROMPT O-[std] Patterns-[min]
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface CardProps {
  data: {
    img: string;
    title: string;
  };
}

export function CardComponent({ data }: CardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardContent>
        <Image 
          src={data.img} 
          alt={data.title}
          width={400} 
          height={300}
          className="rounded-lg"
        />
        <h3 className="mt-2 text-lg font-semibold">{data.title}</h3>
      </CardContent>
    </Card>
  );
}
```

**Result:** ✅ **0 violations** - All rules passed!

---

## 🎨 PROMPT Tag Syntax

```typescript
// PROMPT <Category>-[<Level>] <Category>-[<Level>] ...
```

### Categories

- **O** - Output/UX (shadcn/ui, Tailwind, responsive design)
- **Patterns** - Code patterns (TypeScript, naming, architecture)
- **P** - Performance (Next.js optimization, lazy loading)

### Levels

- **[min]** - Essential rules (3 rules)
- **[std]** - Standard rules (6 rules)
- **[max]** - Maximum rules (9 rules)

### Examples

```typescript
// PROMPT O-[min]                    → 3 Output rules
// PROMPT O-[std] Patterns-[min]     → 6 Output + 3 Patterns rules
// PROMPT O-[max] P-[std]            → 9 Output + 6 Performance rules
```

---

## ⚙️ Configuration

Open Settings (`Ctrl+,`) and search for "PROMPT Protocol":

```json
{
  // Enable/disable validation
  "promptProtocol.enabled": true,
  
  // Validate when saving files
  "promptProtocol.validateOnSave": true,
  
  // Validate while typing (may impact performance)
  "promptProtocol.validateOnType": false,
  
  // Show status bar indicator
  "promptProtocol.showStatusBar": true,
  
  // Severity levels
  "promptProtocol.severity.min": "error",    // 🔴 Red
  "promptProtocol.severity.std": "warning",  // 🟡 Yellow
  "promptProtocol.severity.max": "info"      // 🔵 Blue
}
```

---

## 🎛️ Commands

Press `Ctrl+Shift+P` and type:

| Command | Description |
|---------|-------------|
| **PROMPT: Validate Current File** | Validate the active file |
| **PROMPT: Validate Workspace** | Validate all TypeScript/JavaScript files |
| **PROMPT: Clear Diagnostics** | Clear all validation messages |

---

## 📋 Rules Reference

### Output (O) Category - 9 Rules

**Level: [min]** (Essential)
- [O-min-1] Use shadcn/ui components
- [O-min-2] Use Tailwind CSS for styling
- [O-min-3] Include responsive breakpoints (sm:, md:, lg:)

**Level: [std]** (Standard) - Includes [min] +
- [O-std-4] Use semantic HTML (header, nav, main, article)
- [O-std-5] Handle loading states
- [O-std-6] Handle error states

**Level: [max]** (Maximum) - Includes [std] +
- [O-max-7] Handle empty states
- [O-max-8] Include accessibility attributes (aria-*, role)
- [O-max-9] Support dark mode

### Patterns Category - 9 Rules

**Level: [min]**
- [Patterns-min-1] Avoid "any" type - use proper TypeScript types
- [Patterns-min-2] Use Zod for schema validation
- [Patterns-min-3] Include try-catch error handling

**Level: [std]** - Includes [min] +
- [Patterns-std-4] Use descriptive variable names
- [Patterns-std-5] Keep functions under 50 lines
- [Patterns-std-6] Consistent formatting (spaces, not tabs)

**Level: [max]** - Includes [std] +
- [Patterns-max-7] Include JSDoc comments
- [Patterns-max-8] Prefer const over let (immutability)
- [Patterns-max-9] Use async/await instead of .then()

### Performance (P) Category - 9 Rules

**Level: [min]**
- [P-min-1] Use Next.js Image component
- [P-min-2] Use dynamic() for code splitting
- [P-min-3] Avoid large dependencies (use date-fns, not moment)

**Level: [std]** - Includes [min] +
- [P-std-4] Wrap components with React.memo
- [P-std-5] Use useMemo/useCallback for expensive operations
- [P-std-6] Prefer Server Components (Next.js 13+)

**Level: [max]** - Includes [std] +
- [P-max-7] Implement lazy loading (loading="lazy", Suspense)
- [P-max-8] Use virtual scrolling for long lists
- [P-max-9] Use named imports (not wildcard imports)

---

## 🔧 Requirements

- **VS Code** 1.85.0 or higher
- **Project:** TypeScript, JavaScript, React, or Next.js
- **Optional:** shadcn/ui, Tailwind CSS for full validation

---

## 📚 Learn More

- **[PROMPT Protocol Documentation](https://github.com/jota0802/PROMPT)** - Complete guide
- **[Report Issues](https://github.com/jota0802/PROMPT/issues)** - Bug reports and features
- **[Contribute](https://github.com/jota0802/PROMPT/blob/main/CONTRIBUTING.md)** - Help improve

---

## 🗺️ Roadmap

### Current Version (v0.1.0) - MVP ✅
- ✅ 27 rules across 3 categories
- ✅ Real-time validation
- ✅ Inline diagnostics
- ✅ Status bar indicator

### Coming Soon (v0.2.0)
- ⏳ Quick Fixes (auto-fix violations)
- ⏳ More categories (Rules, Modeling, Types)
- ⏳ Hover information for rules
- ⏳ Better line/column precision

### Future (v0.3.0+)
- ⏳ Custom rules engine
- ⏳ CI/CD integration
- ⏳ Export validation reports
- ⏳ AI-powered suggestions

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/jota0802/PROMPT/blob/main/CONTRIBUTING.md).

---

## 📄 License

MIT © 2025 PROMPT Protocol Team

---

## 💡 Tips

### Tip 1: Start with [min] level
```typescript
// PROMPT O-[min] Patterns-[min]  // ✅ Good for beginners
```

### Tip 2: Gradually increase to [std]
```typescript
// PROMPT O-[std] Patterns-[std]  // ✅ For production code
```

### Tip 3: Use [max] for critical components
```typescript
// PROMPT O-[max] P-[max]  // ✅ For high-impact pages
```

### Tip 4: Combine categories based on need
```typescript
// PROMPT O-[std] P-[min]  // ✅ Focus on UI, basic performance
```

---

**⭐ If this extension helps you, please star the [GitHub repo](https://github.com/jota0802/PROMPT)!**
