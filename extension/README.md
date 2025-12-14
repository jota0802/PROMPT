# PROMPT Protocol Extension

**Real-time validation of AI-generated code against PROMPT Protocol rules**

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![VSCode](https://img.shields.io/badge/VSCode-^1.85.0-blue)
![Status](https://img.shields.io/badge/status-MVP-green)

---

## 🎯 What This Extension Does

Validates your code **in real-time** against [PROMPT Protocol](../PROMPT-Protocol-Web-v2.1.md) rules, showing violations instantly as you code with AI assistants like GitHub Copilot or Cursor.

### Current Status: **MVP v0.1.0** ✅

**✅ What Works Now:**
- Real-time validation of 27 rules across 3 categories
- Inline diagnostics (red squiggles)
- Problems panel integration
- Status bar indicator
- Configurable severity levels
- Validate on save/type

**⏳ Coming Soon (v0.2.0):**
- Quick Fixes (auto-fix violations)
- More categories (R, M, T - 36 additional rules)
- Hover tooltips for rules
- Better line/column precision

See [docs/technical/FEATURE-ANALYSIS.md](docs/technical/FEATURE-ANALYSIS.md) for complete roadmap.

---

## 📦 What's Implemented

### ✅ Validators (27 Rules)

| Category | Level | Rules | Status |
|----------|-------|-------|--------|
| **Output (O)** | min (3) | shadcn/ui, Tailwind, responsive | ✅ |
| **Output (O)** | std (6) | + semantic HTML, loading/error states | ✅ |
| **Output (O)** | max (9) | + empty states, a11y, dark mode | ✅ |
| **Patterns** | min (3) | TypeScript strict, Zod, error handling | ✅ |
| **Patterns** | std (6) | + naming, function length, formatting | ✅ |
| **Patterns** | max (9) | + JSDoc, immutability, async/await | ✅ |
| **Performance (P)** | min (3) | Next.js Image, dynamic imports, deps | ✅ |
| **Performance (P)** | std (6) | + memo, useMemo/Callback, Server Components | ✅ |
| **Performance (P)** | max (9) | + lazy loading, virtual scroll, named imports | ✅ |
| **Rules (R)** | all | Project structure, architecture | ⏳ v0.2.0 |
| **Modeling (M)** | all | Data schemas, Supabase, Zod | ⏳ v0.2.0 |
| **Types (T)** | all | TypeScript types, type safety | ⏳ v0.2.0 |

---

## 🚀 Installation & Usage

### Quick Install

```bash
# Build extension
cd extension
npm run install:all
npm run build

# Package
cd packages/vscode-extension
npm install -g @vscode/vsce
vsce package

# Install
code --install-extension prompt-protocol-vscode-0.1.0.vsix
```

### Usage Example

```typescript
// PROMPT O-[std] Patterns-[min]
export function ProductCard({ product }: any) {
  return (
    <div>
      <img src={product.image} />
      <h2>{product.title}</h2>
    </div>
  );
}
```

**Violations shown:**
- ❌ [O-std-1] Should use shadcn/ui components
- ❌ [O-std-2] Should use Tailwind CSS
- ❌ [Patterns-min-1] Avoid "any" type
- ❌ [P-min-1] Use Next.js Image component

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[INDEX.md](INDEX.md)** | 📚 Navigation hub for all documentation |
| **[docs/guides/INSTALLATION.md](docs/guides/INSTALLATION.md)** | Step-by-step installation guide |
| **[docs/guides/NEXT-STEPS.md](docs/guides/NEXT-STEPS.md)** | How to use after installation |
| **[docs/guides/USER-GUIDE.md](docs/guides/USER-GUIDE.md)** | User guide in Portuguese |
| **[docs/technical/FEATURE-ANALYSIS.md](docs/technical/FEATURE-ANALYSIS.md)** | What's implemented vs what's missing |
| **[docs/technical/IMPLEMENTATION-SUMMARY.md](docs/technical/IMPLEMENTATION-SUMMARY.md)** | Technical overview |
| **[docs/technical/PROPOSAL.md](docs/technical/PROPOSAL.md)** | Original technical proposal |
| **[packages/vscode-extension/CHANGELOG.md](packages/vscode-extension/CHANGELOG.md)** | Version history |
| **[packages/vscode-extension/README.md](packages/vscode-extension/README.md)** | Extension marketplace README |

---

## 🛠️ Development

### Project Structure

```
extension/
├── packages/
│   ├── vscode-extension/       # Main VS Code extension
│   │   ├── src/
│   │   │   ├── extension.ts           # Entry point
│   │   │   ├── diagnosticsProvider.ts # Diagnostics
│   │   │   ├── engine.ts              # Validation engine
│   │   │   ├── utils.ts               # PROMPT tag parser
│   │   │   ├── types.ts               # TypeScript types
│   │   │   ├── statusBar.ts           # Status bar
│   │   │   └── validators/            # Category validators
│   │   │       ├── output.ts          # O category (9 rules)
│   │   │       ├── patterns.ts        # Patterns category (9 rules)
│   │   │       └── performance.ts     # P category (9 rules)
│   │   └── package.json
│   ├── prompt-validator/       # Core validation engine (shared)
│   └── shared/                 # Shared types and utilities
├── test-example.tsx            # Example with violations
├── test-example-fixed.tsx      # Example with fixes
└── package.json                # Monorepo root
```

### Build Commands

```bash
# Install all dependencies
npm run install:all

# Build all packages
npm run build

# Watch mode (auto-rebuild on changes)
npm run dev

# Package extension (.vsix)
cd packages/vscode-extension
vsce package

# Test extension (F5 in VSCode)
code packages/vscode-extension
# Press F5 to launch Extension Development Host
```

---

## 📊 Completeness Status

### MVP Features (v0.1.0) - **75% Complete** ✅

| Feature | Status |
|---------|--------|
| Parse PROMPT tags | ✅ 100% |
| Validators (3/6 categories) | ✅ 50% |
| Inline diagnostics | ✅ 100% |
| Status bar | ✅ 100% |
| Commands | ✅ 100% |
| Settings | ✅ 100% |

### Advanced Features - **20% Complete** ⏳

| Feature | Status | Priority |
|---------|--------|----------|
| Quick Fixes | ❌ 0% | High |
| R, M, T categories | ❌ 0% | High |
| Hover tooltips | ❌ 0% | Medium |
| Code Lens | ❌ 0% | Low |
| Precise line/column | 🟡 30% | High |
| Validation cache | ❌ 0% | Medium |
| CI/CD integration | ❌ 0% | High |

---

## 🗺️ Roadmap

### v0.1.0 (Current) - MVP ✅
- ✅ 27 rules (O, Patterns, P)
- ✅ Real-time validation
- ✅ Basic diagnostics

### v0.2.0 (Next) - Enhanced Validation
- ⏳ Quick Fixes (CodeActions)
- ⏳ R, M, T categories (+36 rules)
- ⏳ Hover information
- ⏳ Better precision

### v0.3.0 - Integration
- ⏳ Load rules from `.cursorrules`
- ⏳ Export reports (JSON/HTML)
- ⏳ CI/CD integration
- ⏳ Custom rules engine

### v1.0.0 - Production Ready
- ⏳ All 72 rules implemented
- ⏳ Full Quick Fixes
- ⏳ Multi-language support
- ⏳ AI-powered suggestions

---

## 🐛 Known Issues

### Current Limitations

1. **Line/Column Precision** - All violations show at `line: 1, column: 0`
   - **Impact:** Hard to find exact violation location
   - **Workaround:** Check Problems panel message
   - **Fix:** Coming in v0.2.0 with AST parsing

2. **No Quick Fixes** - Must manually fix violations
   - **Impact:** More time to fix issues
   - **Workaround:** Follow suggestion in message
   - **Fix:** Coming in v0.2.0

3. **Only 3 Categories** - R, M, T not yet implemented
   - **Impact:** Can't validate structure, modeling, types
   - **Workaround:** Use manual code review
   - **Fix:** Coming in v0.2.0

4. **TypeScript/JavaScript Only** - No Python, Go, etc.
   - **Impact:** Limited to TS/JS projects
   - **Workaround:** Use for TS/JS, manual for others
   - **Fix:** Future versions

---

## 🤝 Contributing

See [../CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

**Priority Areas:**
1. Implement R, M, T category validators
2. Add Quick Fixes (CodeActions)
3. Improve line/column precision
4. Add hover tooltips

---

## 📄 License

MIT © 2025 PROMPT Protocol Team

---

## 🎯 Quick Links

- **Main Repository:** https://github.com/jota0802/PROMPT
- **Issues:** https://github.com/jota0802/PROMPT/issues
- **PROMPT Protocol Docs:** [../PROMPT-Protocol-Web-v2.1.md](../PROMPT-Protocol-Web-v2.1.md)
- **Technical Implementation Guide:** [../PROMPT-Technical-Implementation.md](../PROMPT-Technical-Implementation.md)

---

**Built with ❤️ for developers using AI assistants**

### Run Tests

```bash
npm run test
```

### Package Extension

```bash
cd packages/vscode-extension
npx vsce package
```

## 📖 Documentation

- **[INDEX.md](INDEX.md)** - 📚 Complete documentation navigation hub
- **[docs/technical/PROPOSAL.md](docs/technical/PROPOSAL.md)** - Technical proposal and architecture
- **[docs/guides/](docs/guides/)** - User guides and tutorials
- **[examples/](examples/)** - Code examples
- **[Parent README](../README.md)** - PROMPT Protocol documentation

## 🎯 Current Status

- ✅ Monorepo structure created
- ✅ Type system defined
- ✅ Validation engine core implemented
- ✅ VS Code extension scaffolded
- ✅ Basic validators (O-[min], P-[min], P-[std])
- ⏳ Complete all 72 rules
- ⏳ CodeActions (quick fixes)
- ⏳ Testing
- ⏳ VS Code Marketplace publication

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT - See [LICENSE](../LICENSE)
