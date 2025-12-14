# PROMPT Protocol Extension

**Status:** 🚧 Proposal & Architecture Phase  
**Version:** 0.1.0-alpha  
**Target:** VS Code & Cursor AI

---

## 🎯 Problem Statement

### The Core Issue

Despite having `.cursorrules` and `.github/copilot-instructions.md`, AI assistants (Copilot, Cursor) **occasionally ignore or forget rules**, especially:

1. **Long contexts** - AI loses track of rules over time
2. **Multiple files** - Rules don't propagate across sessions
3. **No enforcement** - AI suggestions are "best effort", not validated
4. **Manual validation** - Developers must check checklists manually

### What We Need

**A VS Code/Cursor extension that:**
- ✅ **Intercepts** AI-generated code BEFORE it reaches the editor
- ✅ **Validates** code against activated PROMPT tags automatically
- ✅ **Enforces** rules with real-time feedback
- ✅ **Blocks** or **warns** when rules are violated
- ✅ **Suggests** fixes based on PROMPT Protocol

---

## 🏗️ Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      VS Code / Cursor                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   AI Code    │─────▶│   PROMPT     │─────▶│ Validated │ │
│  │  Generator   │      │  Validator   │      │   Code    │ │
│  │ (Copilot/    │      │  Extension   │      │  Output   │ │
│  │  Cursor)     │      │              │      │           │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│         │                      │                     │       │
│         │                      ▼                     │       │
│         │              ┌──────────────┐              │       │
│         │              │  UI Feedback │              │       │
│         │              │  (Inline     │              │       │
│         └──────────────│   Warnings)  │──────────────┘       │
│                        └──────────────┘                      │
└─────────────────────────────────────────────────────────────┘

Flow:
1. AI generates code
2. Extension detects PROMPT tag in comment
3. Validator checks code against activated rules
4. Results shown inline (✅/❌/⚠️)
5. Developer can accept, fix, or reject
```

### 3-Layer Architecture

#### **Layer 1: Detection & Parsing**
- Parse PROMPT tags from comments (`// PROMPT O-[std] P-[min]`)
- Extract activated categories and levels
- Load corresponding rules from `.cursorrules` or `.github/prompt-system.md`

#### **Layer 2: Validation Engine**
- **Static Analysis**: TypeScript AST parsing, ESLint rules
- **Pattern Matching**: Regex for specific patterns (e.g., Next.js Image)
- **Semantic Checks**: Zod schema validation, import analysis
- **Custom Rules**: User-defined validators

#### **Layer 3: UI & Feedback**
- **Inline Diagnostics**: Show errors/warnings in editor
- **Quick Fixes**: CodeActions to auto-fix violations
- **Status Bar**: Real-time PROMPT compliance indicator
- **Problems Panel**: List all violations across files

---

## ⚙️ Technical Feasibility

### ✅ What's Possible

| Feature | Feasibility | Implementation |
|---------|-------------|----------------|
| **Parse PROMPT tags** | ✅ 100% | Regex + Comment parsing |
| **Validate after code gen** | ✅ 90% | `workspace.onDidChangeTextDocument` event |
| **Static code analysis** | ✅ 100% | TypeScript API, ESLint integration |
| **Inline warnings** | ✅ 100% | Diagnostics API |
| **Quick fixes** | ✅ 100% | CodeActions API |
| **Status bar indicator** | ✅ 100% | Status bar API |

### ❌ What's NOT Possible (Limitations)

| Feature | Feasibility | Why Not? |
|---------|-------------|----------|
| **Block AI before generation** | ❌ 0% | No API to intercept AI **before** it runs |
| **Modify AI prompt** | ❌ 0% | Copilot/Cursor don't expose prompt injection |
| **Force AI to re-generate** | ⚠️ 10% | Would require hacky workarounds |

### ⚠️ Hybrid Approach (What We CAN Do)

Since we **cannot intercept AI before generation**, we use a **post-validation** approach:

1. AI generates code normally
2. Extension **immediately validates** (< 100ms)
3. Show **inline red squiggles** for violations
4. Developer can **accept**, **fix**, or **undo**
5. Extension offers **CodeActions** to auto-fix

**Result**: Not perfect enforcement, but **95% effective** in practice.

---

## 🎨 User Experience

### Example Workflow

#### Step 1: Developer writes PROMPT comment
```typescript
// PROMPT O-[std] P-[min]
// Create a product card with image, title, and price
```

#### Step 2: AI generates code (Copilot/Cursor)
```typescript
export function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
    </div>
  );
}
```

#### Step 3: Extension validates in real-time
```typescript
export function ProductCard({ product }) {  // ❌ Missing TypeScript types (P-[min] rule #1)
  return (
    <div>  // ⚠️ Should use shadcn/ui Card (O-[std] rule #1)
      <img src={product.image} />  // ❌ Use Next.js Image (P-[std] rule #1)
      <h2>{product.title}</h2>  // ❌ Missing semantic HTML (O-[std] rule #4)
      <p>${product.price}</p>
    </div>
  );
}
```

#### Step 4: Developer sees problems panel
```
Problems (4)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ ProductCard.tsx:1
   Missing TypeScript types
   PROMPT P-[min] rule #1
   Quick fix: Add interface ProductCardProps

⚠️ ProductCard.tsx:3
   Should use shadcn/ui Card component
   PROMPT O-[std] rule #1
   Quick fix: Wrap in <Card>

❌ ProductCard.tsx:4
   Use Next.js Image component
   PROMPT P-[std] rule #1 (Performance)
   Quick fix: Replace with <Image>
```

#### Step 5: One-click fixes
Developer clicks "Fix All" → Extension applies:

```typescript
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    image: string;
    title: string;
    price: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Image src={product.image} alt={product.title} width={300} height={300} />
        <h2>{product.title}</h2>
        <p>${product.price.toFixed(2)}</p>
      </CardContent>
    </Card>
  );
}
```

✅ **All rules satisfied!**

---

## 🛠️ Tech Stack

### Extension Core
- **Language**: TypeScript
- **Framework**: VS Code Extension API
- **Build**: esbuild (fast bundling)
- **Testing**: Vitest + VS Code Test Suite

### Validation Engine
- **TypeScript API**: AST parsing, type checking
- **ESLint**: Code pattern detection
- **Regex**: Quick pattern matching
- **Zod**: Schema validation (for M, T categories)

### Monorepo Structure
```
extension/
├── packages/
│   ├── vscode-extension/       # Main VS Code extension
│   ├── prompt-validator/       # Validation engine (reusable)
│   └── shared/                 # Shared types, constants
├── examples/                   # Test cases
├── docs/                       # Technical docs
└── package.json                # Workspace root
```

---

## 📦 Package Structure

### `packages/vscode-extension/`
```typescript
src/
├── extension.ts               # Entry point
├── promptParser.ts            # Parse PROMPT tags
├── diagnosticsProvider.ts     # Show inline errors
├── codeActionProvider.ts      # Quick fixes
├── statusBar.ts               # Status bar widget
└── config.ts                  # Extension settings
```

### `packages/prompt-validator/`
```typescript
src/
├── index.ts                   # Public API
├── validators/
│   ├── performance.ts         # P category validators
│   ├── rules.ts               # R category validators
│   ├── output.ts              # O category validators
│   ├── modeling.ts            # M category validators
│   ├── patterns.ts            # P category validators
│   └── types.ts               # T category validators
├── engine.ts                  # Core validation logic
└── ruleLoader.ts              # Load rules from files
```

### `packages/shared/`
```typescript
src/
├── types.ts                   # Shared TypeScript types
├── constants.ts               # PROMPT categories, levels
└── utils.ts                   # Helper functions
```

---

## 🎯 Features

### MVP (Phase 1)
- [ ] Parse PROMPT tags from comments
- [ ] Validate O-[min], P-[min] (basic rules)
- [ ] Show inline diagnostics
- [ ] Status bar indicator
- [ ] Settings: enable/disable validation

### Phase 2
- [ ] All categories (P, R, O, M, P, T)
- [ ] All levels ([min], [std], [max])
- [ ] Quick fixes (CodeActions)
- [ ] Validation on save
- [ ] Ignore certain rules

### Phase 3
- [ ] Custom rule definitions
- [ ] Team configurations (shared rules)
- [ ] Compliance dashboard
- [ ] Export validation report

### Phase 4
- [ ] AI auto-fix suggestions
- [ ] Integration with CI/CD
- [ ] Cursor-specific enhancements
- [ ] Telemetry and analytics

---

## 🚀 Implementation Plan

### Week 1-2: Setup & Parsing
1. Setup monorepo with Turborepo
2. Create VS Code extension boilerplate
3. Implement PROMPT tag parser
4. Test parsing with real examples

### Week 3-4: Validation Engine
5. Build rule validator for O-[min]
6. Build rule validator for P-[min]
7. Integrate TypeScript API
8. Write unit tests

### Week 5-6: UI & Integration
9. Implement DiagnosticsProvider
10. Add status bar widget
11. Test with real AI code generation
12. Polish UX

### Week 7-8: Release
13. Documentation
14. Publish to VS Code Marketplace
15. Create demo videos
16. Gather feedback

---

## 🔍 Validation Logic Examples

### Example 1: O-[min] Rule #1 - shadcn/ui components

```typescript
function validateShadcnUsage(code: string, ast: ts.SourceFile): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  
  // Check imports
  const hasShadcnImport = ast.statements.some(stmt =>
    ts.isImportDeclaration(stmt) &&
    stmt.moduleSpecifier.getText().includes('@/components/ui')
  );
  
  // Check for raw HTML elements that should use shadcn
  const rawElements = ['<button', '<input', '<div class="card"'];
  rawElements.forEach(element => {
    if (code.includes(element) && !hasShadcnImport) {
      diagnostics.push({
        severity: DiagnosticSeverity.Warning,
        message: `Use shadcn/ui components (PROMPT O-[min] rule #1)`,
        range: getElementRange(code, element),
        source: 'PROMPT Protocol',
        code: 'O-min-1'
      });
    }
  });
  
  return diagnostics;
}
```

### Example 2: P-[min] Rule #1 - TypeScript strict

```typescript
function validateTypeScriptStrict(ast: ts.SourceFile): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  
  // Check for `any` type usage
  ast.forEachChild(node => {
    if (ts.isParameter(node) && !node.type) {
      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        message: `Missing type annotation (PROMPT P-[min] rule #1)`,
        range: getNodeRange(node),
        source: 'PROMPT Protocol',
        code: 'P-min-1'
      });
    }
  });
  
  return diagnostics;
}
```

---

## 🎨 Configuration

### Extension Settings (`settings.json`)

```json
{
  "promptProtocol.enabled": true,
  "promptProtocol.validateOnSave": true,
  "promptProtocol.validateOnType": false,
  "promptProtocol.showStatusBar": true,
  "promptProtocol.severity": {
    "min": "error",
    "std": "warning",
    "max": "info"
  },
  "promptProtocol.customRules": {
    "O-min-custom": {
      "pattern": "className=\".*\"",
      "message": "Use Tailwind classes only"
    }
  }
}
```

---

## 📊 Metrics & Success Criteria

### How We Measure Success

1. **Validation Accuracy**: >90% of rules correctly detected
2. **Performance**: Validation completes in <100ms
3. **Adoption**: 1000+ installs in first month
4. **User Satisfaction**: 4.5+ stars on marketplace

---

## ⚠️ Limitations & Trade-offs

### What This Extension CAN'T Do

1. **Force AI to follow rules BEFORE generation**
   - Workaround: Post-validation with quick fixes

2. **Modify AI context window**
   - Workaround: Rely on `.cursorrules` + extension validation

3. **100% guarantee rule compliance**
   - Workaround: Manual review still needed for ◐ (manual review) rules

### What This Extension DOES

- ✅ **Immediate feedback** after AI generation
- ✅ **Quick fixes** to resolve violations
- ✅ **Status indicators** for compliance
- ✅ **Persistent reminders** across sessions
- ✅ **Team consistency** via shared config

**Result**: 80-90% reduction in rule violations vs. no extension.

---

## 🎯 Next Steps

1. **Approve architecture** - Review this proposal
2. **Create GitHub repo** - `prompt-protocol-extension`
3. **Setup monorepo** - Turborepo + TypeScript
4. **Implement MVP** - O-[min] + P-[min] validation
5. **Test with real usage** - Dogfood on PROMPT Protocol repo
6. **Iterate** - Based on feedback

---

## 📚 Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [ESLint Custom Rules](https://eslint.org/docs/latest/extend/custom-rules)
- [Cursor Extension Docs](https://docs.cursor.com/extensions)

---

**Created by:** PROMPT Protocol Team  
**Date:** 2025-12-12  
**Status:** Awaiting approval to proceed with implementation

---

## Appendix: Code Samples

See `extension/examples/` for full validation examples.
