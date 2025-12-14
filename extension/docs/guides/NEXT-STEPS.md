# 🎯 PRÓXIMOS PASSOS - Como Usar a Extensão

## ✅ O Que Já Está Pronto

- ✅ Código da extensão completo
- ✅ Validators implementados (O, Patterns, P)
- ✅ Build funcionando sem erros
- ✅ Dependências instaladas
- ✅ Documentação completa

---

## 🚀 COMO TESTAR AGORA MESMO

### Opção 1: Modo Development (Mais Fácil) ⭐

1. **Abrir a pasta da extensão no VSCode:**
   ```bash
   code "/home/jota/Área de trabalho/PROMPT/extension/packages/vscode-extension"
   ```

2. **Pressionar F5** (ou ir em Run → Start Debugging)
   - Uma nova janela VSCode vai abrir com `[Extension Development Host]` no título

3. **Nessa nova janela, abrir o arquivo de teste:**
   ```bash
   # Dentro do Extension Development Host, abrir:
   File → Open File → 
   "/home/jota/Área de trabalho/PROMPT/extension/test-example.tsx"
   ```

4. **Ver as validações:**
   - Abrir Problems panel: `Ctrl+Shift+M`
   - Você deve ver 4 violações:
     - ❌ [O-std-1] Should use shadcn/ui components
     - ❌ [O-std-2] Should use Tailwind CSS
     - ❌ [Patterns-min-1] Avoid using "any" type
     - ❌ [P-min-1] Use Next.js Image component
   
   - Status bar (canto inferior direito): `⚠️ PROMPT (4)`

5. **Testar arquivo correto:**
   - Abrir `test-example-fixed.tsx`
   - Não deve ter violações (✅)
   - Status bar: `✓ PROMPT`

---

### Opção 2: Instalar Como Extensão Real

#### Passo 1: Instalar vsce (ferramenta de empacotamento)

```bash
npm install -g @vscode/vsce
```

#### Passo 2: Empacotar extensão

```bash
cd "/home/jota/Área de trabalho/PROMPT/extension/packages/vscode-extension"
vsce package
```

Isso cria: `prompt-protocol-vscode-0.1.0.vsix`

#### Passo 3: Instalar no VSCode

```bash
code --install-extension prompt-protocol-vscode-0.1.0.vsix
```

OU via VSCode:
- `Ctrl+Shift+P`
- Digitar "Install from VSIX"
- Selecionar o arquivo `.vsix`

#### Passo 4: Reload VSCode

```bash
Ctrl+Shift+P → "Reload Window"
```

#### Passo 5: Verificar instalação

- `Ctrl+Shift+X` (Extensions)
- Procurar "PROMPT Protocol"
- Deve aparecer instalado

---

## 📝 Como Usar no Seu Projeto

### 1. Criar arquivo com PROMPT tag

```typescript
// PROMPT O-[min] Patterns-[min]
export function MyComponent() {
  // Seu código aqui
}
```

### 2. Validações automáticas

A extensão vai validar:
- ✅ Ao abrir arquivo
- ✅ Ao salvar (`Ctrl+S`)
- ⚠️ Ao digitar (se ativar em settings)

### 3. Ver problemas

- **Problems Panel**: `Ctrl+Shift+M`
- **Status Bar**: Canto inferior direito
- **Inline**: Red squiggles no editor

---

## 🎨 Comandos Disponíveis

Pressionar `Ctrl+Shift+P` e digitar:

- **PROMPT: Validate Current File** - Validar arquivo atual
- **PROMPT: Validate Workspace** - Validar todos arquivos
- **PROMPT: Clear Diagnostics** - Limpar violations

---

## ⚙️ Configurações

`Ctrl+,` → Procurar "PROMPT Protocol"

```json
{
  "promptProtocol.enabled": true,
  "promptProtocol.validateOnSave": true,
  "promptProtocol.validateOnType": false,
  "promptProtocol.showStatusBar": true
}
```

---

## 📦 PRÓXIMO PASSO: Publicar no Marketplace

Se quiser disponibilizar publicamente:

### 1. Criar Publisher

1. Ir para: https://marketplace.visualstudio.com/manage
2. Login com Microsoft Account
3. Create New Publisher
4. Nome: `jota0802` ou `prompt-protocol`

### 2. Obter Token

1. https://dev.azure.com
2. User Settings → Personal Access Tokens
3. New Token
4. Scopes: **Marketplace (Publish)**
5. Copiar token

### 3. Login

```bash
vsce login jota0802
# Cole o token
```

### 4. Publicar

```bash
cd "/home/jota/Área de trabalho/PROMPT/extension/packages/vscode-extension"
vsce publish
```

**Pronto!** Extensão estará em:
https://marketplace.visualstudio.com/items?itemName=jota0802.prompt-protocol-vscode

---

## 🎯 Resumo do Que Fazer AGORA

```bash
# 1. Abrir extensão no VSCode
code "/home/jota/Área de trabalho/PROMPT/extension/packages/vscode-extension"

# 2. Pressionar F5

# 3. Na janela que abrir, abrir arquivo de teste
# File → Open File → test-example.tsx

# 4. Ver validações no Problems panel (Ctrl+Shift+M)
```

**Ou instalar como extensão:**

```bash
# 1. Instalar vsce
npm install -g @vscode/vsce

# 2. Empacotar
cd "/home/jota/Área de trabalho/PROMPT/extension/packages/vscode-extension"
vsce package

# 3. Instalar
code --install-extension prompt-protocol-vscode-0.1.0.vsix
```

---

## 🐛 Se Algo Der Errado

### Build falhou?
```bash
cd "/home/jota/Área de trabalho/PROMPT/extension"
npm run clean
npm run install:all
npm run build
```

### Extensão não aparece?
- Verificar se está no Extension Development Host
- Ou fazer reload: `Ctrl+Shift+P` → "Reload Window"

### Nenhuma validação?
- Arquivo precisa ter tag: `// PROMPT O-[min]`
- Arquivo precisa ser `.ts`, `.tsx`, `.js`, `.jsx`
- Settings: `"promptProtocol.enabled": true`

---

**🎉 TUDO PRONTO! A extensão está funcionando!**

**Próximo passo:** Testar no modo Development (F5) ou instalar via .vsix
