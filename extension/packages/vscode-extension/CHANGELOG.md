# Changelog

All notable changes to the PROMPT Protocol VSCode Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2025-12-14

### 🎉 Initial Release - MVP

First public release of PROMPT Protocol VSCode Extension with core validation features.

### ✨ Added

#### Core Features
- **PROMPT Tag Parser** - Detects and parses `// PROMPT O-[std] P-[min]` comments
- **Validation Engine** - Real-time code validation against PROMPT rules
- **Diagnostics Provider** - Inline error/warning/info messages in editor
- **Status Bar Integration** - Visual indicator showing validation status
- **Problems Panel** - Detailed list of all violations with descriptions

#### Validators (27 Rules Total)

**Output (O) Category** - 9 rules
- [min] shadcn/ui components, Tailwind CSS, responsive design
- [std] semantic HTML, loading/error states
- [max] empty states, accessibility, dark mode

**Patterns Category** - 9 rules
- [min] TypeScript strict (no any), Zod validation, error handling
- [std] descriptive naming, function length, consistent formatting
- [max] JSDoc comments, immutability, async/await

**Performance (P) Category** - 9 rules
- [min] Next.js Image, dynamic imports, avoid large deps
- [std] React.memo, useMemo/useCallback, Server Components
- [max] lazy loading, virtual scrolling, named imports

#### Commands
- `PROMPT: Validate Current File` - Validate active file
- `PROMPT: Validate Workspace` - Validate all TypeScript/JavaScript files
- `PROMPT: Clear Diagnostics` - Clear all validation messages

#### Configuration Options
- `promptProtocol.enabled` - Enable/disable validation (default: true)
- `promptProtocol.validateOnSave` - Validate on file save (default: true)
- `promptProtocol.validateOnType` - Validate while typing (default: false)
- `promptProtocol.showStatusBar` - Show status bar indicator (default: true)
- `promptProtocol.severity.min` - Severity for [min] violations (default: error)
- `promptProtocol.severity.std` - Severity for [std] violations (default: warning)
- `promptProtocol.severity.max` - Severity for [max] violations (default: info)

#### Documentation
- Comprehensive README with usage examples
- Installation guide (INSTALLATION.md)
- Technical proposal (PROPOSAL.md)
- Implementation summary (IMPLEMENTATION-SUMMARY.md)
- Feature analysis (FEATURE-ANALYSIS.md)

### 📦 Technical Details

- **Languages Supported:** TypeScript (.ts, .tsx), JavaScript (.js, .jsx)
- **Build System:** esbuild for fast bundling
- **Package Manager:** npm workspaces (monorepo)
- **VS Code API Version:** 1.85.0+
- **Bundle Size:** ~31 KB

### 🎯 Known Limitations

- **Line/Column Precision:** Currently shows violations at line 1, column 0 (not pinpoint accurate)
- **Categories:** Only 3 of 6 PROMPT categories implemented (R, M, T categories pending)
- **Quick Fixes:** Not yet available (manual fixes required)
- **Custom Rules:** Cannot define custom rules via settings yet
- **Multi-language:** Only TypeScript/JavaScript supported

### 📊 MVP Status

**What Works:**
- ✅ Real-time validation
- ✅ 27 functional rules
- ✅ VSCode integration
- ✅ Configurable settings
- ✅ Status bar indicator

**What's Missing:**
- ❌ Quick fix suggestions (CodeActions)
- ❌ R, M, T category validators
- ❌ Hover tooltips for rules
- ❌ Code Lens integration
- ❌ CI/CD integration

### 🚀 Installation

```bash
# Install from VSIX
code --install-extension prompt-protocol-vscode-0.1.0.vsix

# Or via VS Code Marketplace (coming soon)
```

### 🐛 Bug Fixes

None (initial release)

---

## [Unreleased]

### 🔮 Planned for v0.2.0

#### High Priority
- [ ] **Quick Fixes (CodeActions)** - Auto-fix common violations
- [ ] **R Category (Rules & Structure)** - 12 rules for project organization
- [ ] **M Category (Modeling)** - 12 rules for data modeling
- [ ] **T Category (Types)** - 12 rules for TypeScript types
- [ ] **Precise Line/Column** - Point to exact violation location
- [ ] **Hover Information** - Show rule details on hover

#### Medium Priority
- [ ] **Code Lens** - Show validation summary above components
- [ ] **Custom Rules** - Define project-specific rules in settings
- [ ] **Validation Cache** - Performance optimization for large files
- [ ] **Load Rules from .cursorrules** - Sync with project config

#### Low Priority
- [ ] **Export Reports** - JSON/HTML validation reports
- [ ] **CI/CD Integration** - GitHub Actions, GitLab CI
- [ ] **Multi-language Support** - Python, Go, Rust
- [ ] **Walkthrough Tutorial** - Interactive onboarding

### 🔮 Planned for v0.3.0+

- [ ] **AI-Powered Suggestions** - LLM integration for smart fixes
- [ ] **Team Dashboards** - Compliance metrics across teams
- [ ] **Fine-tuned Validation Model** - Custom AI model (Technical Guide Phase 4)
- [ ] **Real-time Collaboration** - Shared validation in Live Share

---

## Version History

| Version | Release Date | Status | Key Features |
|---------|--------------|--------|--------------|
| **0.1.0** | 2025-12-14 | ✅ Released | MVP - 27 rules, 3 categories, real-time validation |
| **0.2.0** | TBD | 📅 Planned | Quick Fixes, R/M/T categories, hover info |
| **0.3.0** | TBD | 🔮 Future | AI suggestions, CI/CD, custom rules |
| **1.0.0** | TBD | 🎯 Goal | Full feature parity, 72 rules, production-ready |

---

## Migration Guide

### From v0.0.x to v0.1.0

Not applicable (initial release)

---

## Contributing

See [CONTRIBUTING.md](https://github.com/jota0802/PROMPT/blob/main/CONTRIBUTING.md) for guidelines.

---

## Support

- **Documentation:** https://github.com/jota0802/PROMPT
- **Issues:** https://github.com/jota0802/PROMPT/issues
- **Discussions:** https://github.com/jota0802/PROMPT/discussions

---

**[⬆ back to top](#changelog)**
