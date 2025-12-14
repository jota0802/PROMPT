# 🚀 Guia Completo de Instalação - PROMPT Protocol Extension

Este guia te mostra **exatamente** como colocar a extensão funcionando no VSCode.

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- ✅ **Node.js** 18+ ([Download](https://nodejs.org/))
- ✅ **npm** 9+ (vem com Node.js)
- ✅ **VSCode** 1.85+ ([Download](https://code.visualstudio.com/))
- ✅ **Git** (opcional, mas recomendado)

### Verificar versões instaladas:

```bash
node --version   # Deve ser v18.0.0 ou superior
npm --version    # Deve ser 9.0.0 ou superior
code --version   # Deve ser 1.85.0 ou superior
```

---

## 🛠️ Passo 1: Preparar o Ambiente

### 1.1 Navegar até a pasta da extensão

```bash
cd "/home/jota/Área de trabalho/PROMPT/extension"
```

### 1.2 Instalar todas as dependências

```bash
npm run install:all
```

Este comando vai:
- Instalar dependências do root
- Instalar dependências de `packages/shared`
- Instalar dependências de `packages/prompt-validator`
- Instalar dependências de `packages/vscode-extension`

**Tempo estimado:** 2-3 minutos

---

## 🔨 Passo 2: Build da Extensão

### 2.1 Build de todos os pacotes

```bash
npm run build
```

Este comando compila:
- TypeScript → JavaScript
- Gera arquivos `.d.ts` (tipos)
- Cria bundle da extensão em `packages/vscode-extension/dist/extension.js`

**Tempo estimado:** 30 segundos

Se tudo deu certo, você deve ver:
```
✓ Built packages/shared
✓ Built packages/prompt-validator
✓ Built packages/vscode-extension
```

---

## 🎯 Passo 3: Testar a Extensão (Modo Desenvolvimento)

Existem **2 formas** de rodar a extensão:

### Opção A: Extension Development Host (Recomendado para testar)

1. **Abrir pasta da extensão no VSCode:**
   ```bash
   code packages/vscode-extension
   ```

2. **Pressionar F5** (ou ir em Run → Start Debugging)

3. **Uma nova janela do VSCode vai abrir** com a extensão carregada

4. **Nessa nova janela, criar um arquivo de teste:**
   - Criar `test.tsx`
   - Adicionar código:
   ```typescript
   // PROMPT O-[min] Patterns-[min]
   export function Button() {
     return <button>Click me</button>
   }
   ```

5. **Ver validações aparecerem:**
   - Abrir painel "Problems" (`Ctrl+Shift+M`)
   - Ver violações listadas
   - Ver status bar no canto inferior direito

---

### Opção B: Instalar Localmente (Produção)

Para instalar a extensão "de verdade" no seu VSCode:

#### 3.1 Instalar ferramenta vsce

```bash
npm install -g @vscode/vsce
```

#### 3.2 Empacotar extensão (.vsix)

```bash
cd packages/vscode-extension
vsce package
```

Isso cria: `prompt-protocol-vscode-0.1.0.vsix`

#### 3.3 Instalar no VSCode

**Via VSCode UI:**
1. Abrir VSCode
2. `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
3. Selecionar `prompt-protocol-vscode-0.1.0.vsix`
4. Reload VSCode

**Via linha de comando:**
```bash
code --install-extension prompt-protocol-vscode-0.1.0.vsix
```

#### 3.4 Verificar instalação

- Abrir Extensions panel (`Ctrl+Shift+X`)
- Procurar "PROMPT Protocol Validator"
- Deve aparecer como instalado

---

## ✅ Passo 4: Verificar que Está Funcionando

### 4.1 Criar arquivo de teste

```bash
# Na sua pasta de workspace
touch test-prompt.tsx
code test-prompt.tsx
```

### 4.2 Adicionar código com PROMPT tag

```typescript
// PROMPT O-[std] Patterns-[min] P-[min]
export function ProductCard({ product }: any) {
  return (
    <div>
      <img src={product.image} />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
    </div>
  );
}
```

### 4.3 Verificar validações

Você deve ver:

**Problems Panel (`Ctrl+Shift+M`):**
```
❌ [O-std-1] Should use shadcn/ui components instead of raw HTML/CSS
❌ [O-std-2] Should use Tailwind CSS for styling
❌ [P-min-1] Use Next.js Image component instead of <img> tag
❌ [Patterns-min-1] Avoid using "any" type
```

**Status Bar (canto inferior direito):**
```
⚠️ PROMPT (4)
```

**Editor:**
- Red squiggles sob violações

---

## 🎛️ Passo 5: Configurar a Extensão

### 5.1 Abrir Settings

`Ctrl+,` → Procurar "PROMPT Protocol"

### 5.2 Configurações disponíveis

```json
{
  // Ativar/desativar extensão
  "promptProtocol.enabled": true,
  
  // Validar ao salvar arquivo
  "promptProtocol.validateOnSave": true,
  
  // Validar enquanto digita (pode deixar lento)
  "promptProtocol.validateOnType": false,
  
  // Mostrar status bar
  "promptProtocol.showStatusBar": true,
  
  // Severidade por nível
  "promptProtocol.severity.min": "error",    // ❌ Erro
  "promptProtocol.severity.std": "warning",  // ⚠️ Warning
  "promptProtocol.severity.max": "info"      // ℹ️ Info
}
```

---

## 🐛 Troubleshooting

### ❌ Problema: "Cannot find module 'vscode'"

**Solução:**
```bash
cd packages/vscode-extension
npm install @types/vscode
npm run build
```

---

### ❌ Problema: "Extension not found"

**Solução:**
- Verificar que você está no Extension Development Host (janela com `[Extension Development Host]` no título)
- Ou se instalou via `.vsix`, fazer reload: `Ctrl+Shift+P` → "Reload Window"

---

### ❌ Problema: Nenhuma validação aparece

**Causa 1:** Arquivo não é TypeScript/JavaScript
- **Solução:** Usar arquivos `.ts`, `.tsx`, `.js`, `.jsx`

**Causa 2:** Sem PROMPT tag
- **Solução:** Adicionar `// PROMPT O-[min]` no arquivo

**Causa 3:** Extensão desabilitada
- **Solução:** Settings → `"promptProtocol.enabled": true`

---

### ❌ Problema: "vsce: command not found"

**Solução:**
```bash
npm install -g @vscode/vsce
```

---

## 📦 Passo 6: Publicar no Marketplace (Opcional)

Para disponibilizar a extensão publicamente:

### 6.1 Criar conta Publisher

1. Ir para https://marketplace.visualstudio.com/manage
2. Login com Microsoft Account
3. Create Publisher
4. Nome sugerido: `prompt-protocol` ou `jota0802`

### 6.2 Obter Personal Access Token

1. Ir para https://dev.azure.com
2. User Settings → Personal Access Tokens
3. New Token
4. Scopes: **Marketplace (Publish)**
5. Copiar token

### 6.3 Login com vsce

```bash
vsce login your-publisher-name
# Cole o token quando solicitado
```

### 6.4 Atualizar package.json

Editar `packages/vscode-extension/package.json`:

```json
{
  "publisher": "your-publisher-name",
  "repository": {
    "type": "git",
    "url": "https://github.com/jota0802/PROMPT.git"
  }
}
```

### 6.5 Publicar

```bash
cd packages/vscode-extension
vsce publish
```

**Pronto!** Extensão estará disponível em:
https://marketplace.visualstudio.com/items?itemName=your-publisher-name.prompt-protocol-vscode

---

## 🎉 Resumo dos Comandos

```bash
# 1. Instalar dependências
cd "/home/jota/Área de trabalho/PROMPT/extension"
npm run install:all

# 2. Build
npm run build

# 3. Testar (Development)
code packages/vscode-extension
# Pressionar F5

# 4. OU empacotar e instalar
cd packages/vscode-extension
npm install -g @vscode/vsce
vsce package
code --install-extension prompt-protocol-vscode-0.1.0.vsix

# 5. Publicar (opcional)
vsce login your-publisher
vsce publish
```

---

## 📞 Ajuda

Se algo não funcionar:

1. **Check logs:** `Ctrl+Shift+P` → "Developer: Toggle Developer Tools" → Console tab
2. **Rebuild:** `npm run clean && npm run build`
3. **Reinstall:** Deletar `node_modules` e rodar `npm run install:all` novamente

---

**Pronto! 🚀 Sua extensão PROMPT Protocol está funcionando!**
