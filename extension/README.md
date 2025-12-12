# PROMPT Protocol Extension

VS Code extension for validating AI-generated code against PROMPT Protocol rules.

## 🚀 Quick Start

### Installation (Development)

```bash
cd extension
npm install
npm run build
```

### Running the Extension

1. Open `extension/` folder in VS Code
2. Press `F5` to launch Extension Development Host
3. Open a TypeScript/JavaScript file
4. Add a PROMPT comment:
   ```typescript
   // PROMPT O-[min] P-[min]
   ```
5. Write or generate code
6. See validation results inline

## 📦 Project Structure

```
extension/
├── packages/
│   ├── vscode-extension/       # VS Code extension entry point
│   ├── prompt-validator/       # Core validation engine
│   └── shared/                 # Shared types and utilities
├── PROPOSAL.md                 # Technical proposal
└── README.md                   # This file
```

## 🛠️ Development

### Build All Packages

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

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

- **[PROPOSAL.md](./PROPOSAL.md)** - Complete technical proposal and architecture
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
