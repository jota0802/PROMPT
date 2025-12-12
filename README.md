# PROMPT Protocol

```
 ____  ____   ___  __  __ ____ _____   ____  ____   ___ _____ ___   ____ ___  _     
|  _ \|  _ \ / _ \|  \/  |  _ \_   _| |  _ \|  _ \ / _ \_   _/ _ \ / ___/ _ \| |    
| |_) | |_) | | | | |\/| | |_) || |   | |_) | |_) | | | || || | | | |  | | | | |    
|  __/|  _ <| |_| | |  | |  __/ | |   |  __/|  _ <| |_| || || |_| | |__| |_| | |___ 
|_|   |_| \_\\___/|_|  |_|_|    |_|   |_|   |_| \_\\___/ |_| \___/ \____\___/|_____|
                                                                                      
```

<div align="center">

**Structured AI-Assisted Development Protocol**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/yourusername/prompt-protocol)
[![Status](https://img.shields.io/badge/status-stable-green.svg)](https://github.com/yourusername/prompt-protocol)
[![AI Compatible](https://img.shields.io/badge/AI-Copilot%20%7C%20Claude%20%7C%20Cursor-purple.svg)](https://github.com/yourusername/prompt-protocol)

[Quick Start](#-quick-start) • [Documentation](docs/GETTING_STARTED.md) • [Examples](examples/) • [Contribute](CONTRIBUTING.md)

</div>

---

## 🎯 What is PROMPT Protocol?

**PROMPT** is a structured tagging system that guides AI code assistants (GitHub Copilot, Claude, Cursor) to follow specific development rules and best practices. Instead of hoping the AI understands your requirements, you use explicit tags to activate predefined rule sets.

### The Problem

❌ AI generates inconsistent code across features  
❌ Hard to enforce performance vs design vs code quality priorities  
❌ Need to repeat the same instructions in every prompt  
❌ Difficult to maintain quality standards in team projects

### The Solution

✅ **Single tag activates 3-12 relevant rules** automatically  
✅ **Combine categories** for complex requirements  
✅ **3 depth levels**: minimal (MVP), standard (production), maximum (critical)  
✅ **Works with any AI assistant** - Copilot, Claude, Cursor, ChatGPT  
✅ **Scalable**: From prototype to production-grade code

---

## 🚀 Quick Start

### 1. Add to Your Project

Copy these files to your repository:

```bash
curl -o .github/prompt-system.md https://raw.githubusercontent.com/yourusername/prompt-protocol/main/templates/prompt-system.md
curl -o .github/copilot-instructions.md https://raw.githubusercontent.com/yourusername/prompt-protocol/main/templates/copilot-instructions.md
```

### 2. Use in Code Comments

```typescript
// PROMPT O-[std] P-[min]
// Create a product card component with image, title, and price
export function ProductCard(props: ProductCardProps) {
  // AI will now follow UX/Design rules (standard) + Patterns rules (minimal)
}
```

### 3. Use in AI Chat

```
PROMPT M-[std] T-[min]

Create a Supabase schema for a blog with posts, authors, and categories.
Include Zod validation and RLS policies.
```

### 4. Track in Commits

```bash
git commit -m "feat: add checkout flow [PROMPT O-[std] M-[std]]"
```

---

## 📋 The P.R.O.M.P.T Categories

Each letter represents a focus area with specific rules:

| Category | Focus | Rules at [min] | Rules at [std] | Rules at [max] |
|----------|-------|----------------|----------------|----------------|
| **P** - Performance | Speed, optimization, bundle size | 3 | 9 | 12 |
| **R** - Rules & Structure | Architecture, code organization | 3 | 9 | 12 |
| **O** - Output & UX | Design, accessibility, UI | 3 | 9 | 12 |
| **M** - Modeling | Database schema, types, validation | 3 | 9 | 12 |
| **P** - Patterns | Code quality, testing, maintainability | 3 | 9 | 12 |
| **T** - Types | TypeScript, validation, error handling | 3 | 9 | 12 |

### Syntax

```
PROMPT X-[level]
```

- `X` = Category letter (P, R, O, M, P, T)
- `level` = min (MVP), std (production), max (critical)

**Combine multiple categories:**
```
PROMPT O-[std] M-[min] T-[std]
```

---

## 💡 Common Use Cases

### Quick UI Component (MVP)
```typescript
// PROMPT O-[min] P-[min]
```
Fast development with essential UX and code quality.

### Production Feature
```typescript
// PROMPT O-[std] P-[std] M-[min]
```
Good UX, solid code quality, basic data structure.

### Backend API
```typescript
// PROMPT M-[std] T-[std] R-[min]
```
Solid schema, type safety, good architecture.

### Performance Critical
```typescript
// PROMPT P-[max] T-[std]
```
Maximum optimization with solid type safety.

### Complete Best Practice
```typescript
// PROMPT O-[std] P-[std] M-[std] R-[std] T-[std]
```
Balanced, production-ready approach.

---

## 📚 Documentation

- **[Getting Started](docs/GETTING_STARTED.md)** - Installation and basic usage
- **[Validation Guide](docs/VALIDATION_GUIDE.md)** - How to verify AI followed the rules
- **[Examples](docs/EXAMPLES.md)** - Real-world usage patterns
- **[Complete Rules](PROMPT-Protocol-Web-v2.1.md)** - Full reference documentation

---

## 🎨 Examples

Explore practical implementations:

- [Next.js App](examples/nextjs-app/) - Full application using PROMPT
- [React Components](examples/react-component/) - UI components with different PROMPT levels
- [Supabase Schema](examples/supabase-schema/) - Database modeling with PROMPT

---

## 🗺️ Roadmap

### ✅ Phase 1: Manual Validation (Current - v2.1)
- Manual checklists after AI code generation
- Works with any AI assistant
- Optimized for web development

### 🚧 Phase 2: Specializations (In Progress)
- PROMPT-Backend (APIs, microservices)
- PROMPT-Frontend (UI/design systems)
- PROMPT-Mobile (React Native, Flutter)
- PROMPT-DevOps (infrastructure, CI/CD)

### 📋 Phase 3: VS Code Extension (Planned)
- Automatic PROMPT tag parsing
- Inline validation (✅/❌)
- ESLint integration
- Quick fixes suggestions

### 🔮 Phase 4: Advanced Features (Future)
- PROMPT-Universal meta-protocol
- Compliance dashboard
- CLI validator for CI/CD
- Team shared configurations

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- How to propose new rules
- Specialization development (Backend, Mobile, etc.)
- Bug reports and feature requests
- Code examples and use cases

### Proposing a Specialization

Want to create **PROMPT-Backend** or **PROMPT-Mobile**? Check our [Specialization Proposal Template](.github/ISSUE_TEMPLATE/specialization_proposal.md).

---

## 📄 License

MIT License - Use, modify, and distribute freely. Credit appreciated but not required.

---

## 🌟 Why PROMPT Protocol?

**For Individual Developers:**
- Stop repeating yourself to AI assistants
- Maintain consistent code quality
- Switch between speed and quality easily
- Document your code standards automatically

**For Teams:**
- Shared development standards
- Onboard new developers faster
- Maintain quality across AI-assisted code
- Track compliance in commits

**For AI Assistants:**
- Clear, structured instructions
- Combine multiple concerns elegantly
- Prioritize conflicting requirements
- Generate production-ready code

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/prompt-protocol/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/prompt-protocol/discussions)
- **Questions**: Use the `question` label in Issues

---

<div align="center">

**Built for developers who want AI assistance without sacrificing quality**

[⭐ Star this repo](https://github.com/yourusername/prompt-protocol) if you find it useful!

**Version:** 2.1.0 | **Focus:** Web Development | **Status:** Stable

</div>
