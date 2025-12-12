# Contributing to PROMPT Protocol

Thank you for your interest in contributing! This document provides guidelines for different types of contributions.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Process](#development-process)
4. [Submitting Changes](#submitting-changes)
5. [Style Guidelines](#style-guidelines)

---

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers and answer questions
- Assume good intentions

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- AI assistant used (Copilot, Claude, Cursor)
- PROMPT tags involved

### 💡 Suggesting Features

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and explain:

- The problem you're trying to solve
- Your proposed solution
- Alternative approaches considered
- Impact on existing rules

### 🎯 Proposing New Rules

**For existing categories (P, R, O, M, P, T):**

1. Open an issue explaining the rule
2. Provide examples of good/bad code
3. Explain validation approach (automatic vs manual)
4. Suggest which level ([min], [std], [max])

**Requirements:**
- Rule must be actionable and specific
- Should be AI-verifiable when possible
- Must not conflict with existing rules
- Include 2-3 code examples

### 🚀 Creating Specializations

Want to create **PROMPT-Backend**, **PROMPT-Mobile**, or **PROMPT-DevOps**?

1. Use the [Specialization Proposal template](.github/ISSUE_TEMPLATE/specialization_proposal.md)
2. Define the 6 P.R.O.M.P.T categories for your domain
3. Provide 3-12 rules per category (min/std/max)
4. Include validation criteria
5. Add 3+ practical examples

**Specialization criteria:**
- Must follow P.R.O.M.P.T acronym structure
- Each category needs clear focus area
- Rules should be specific to the domain
- Include real-world examples
- Document how it differs from Web version

### 📝 Improving Documentation

- Fix typos, grammar, or clarity issues
- Add missing examples
- Improve explanations
- Translate to other languages

### 🎨 Contributing Examples

Add to `examples/` directory:

- Real-world code using PROMPT tags
- Before/after comparisons
- Edge cases and complex scenarios
- Different AI assistant results

---

## Development Process

### Setting Up

```bash
git clone https://github.com/yourusername/prompt-protocol.git
cd prompt-protocol
```

No build step required - this is a documentation-first project.

### Testing Your Changes

**For rule changes:**
1. Test with at least 2 different AI assistants
2. Verify rules don't conflict
3. Check validation criteria work
4. Update examples if needed

**For documentation:**
1. Check all links work
2. Verify markdown renders correctly
3. Ensure code examples are valid
4. Test instructions on fresh project

### Branch Naming

- `feature/rule-name` - New rules
- `fix/issue-description` - Bug fixes
- `docs/description` - Documentation updates
- `specialization/name` - New specializations

---

## Submitting Changes

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-new-rule
   ```

3. **Make your changes**
   - Follow style guidelines below
   - Update relevant documentation
   - Add examples if applicable

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: add caching rule to Performance [std]"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/my-new-rule
   ```

6. **Open Pull Request**
   - Use the PR template
   - Reference related issues
   - Explain your changes clearly

### PR Requirements

✅ Clear description of changes  
✅ References issue number (if applicable)  
✅ Follows style guidelines  
✅ Updates documentation  
✅ Includes examples (for rule changes)  
✅ No conflicts with main branch

---

## Style Guidelines

### Markdown

- Use ATX-style headers (`#`, `##`, `###`)
- Include blank lines between sections
- Use code fences with language tags
- Keep lines under 120 characters when possible

### Code Examples

```typescript
// PROMPT O-[std] P-[min]
// Good: Clear PROMPT tag and description
export function GoodExample() {
  // Implementation
}

// Bad: Missing PROMPT tag
export function BadExample() {
  // Implementation
}
```

### Rule Format

```markdown
#### Level [min] - Minimal (3 rules)

1. ✓ Use specific action verb (avoid, implement, ensure)
2. ✓ Provide measurable criteria when possible
3. ✓ Keep rule concise (one line preferred)
```

**Rule writing guidelines:**
- Start with action verb (Use, Avoid, Implement, Add, etc.)
- Be specific and actionable
- Include "why" if not obvious
- Mark as ✓ (auto-validatable) or ◐ (manual review)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new rule to Performance category
fix: correct example in Quick Start
docs: improve validation guide clarity
chore: update dependencies
```

**Types:**
- `feat`: New feature or rule
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

---

## Recognition

Contributors are recognized in:
- README.md (for significant contributions)
- CHANGELOG.md (all changes)
- GitHub contributors page

---

## Questions?

- **General questions**: Open a [Discussion](https://github.com/yourusername/prompt-protocol/discussions)
- **Bug reports**: Use [Issues](https://github.com/yourusername/prompt-protocol/issues)
- **Rule proposals**: Use issue templates

---

Thank you for helping make PROMPT Protocol better! 🚀
