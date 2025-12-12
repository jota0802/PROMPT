import * as vscode from 'vscode';
import { DiagnosticsProvider } from './diagnosticsProvider';
import { StatusBarManager } from './statusBar';

let diagnosticsProvider: DiagnosticsProvider;
let statusBarManager: StatusBarManager;

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('PROMPT Protocol Extension activated');
  
  // Initialize diagnostics provider
  diagnosticsProvider = new DiagnosticsProvider();
  
  // Initialize status bar
  statusBarManager = new StatusBarManager();
  context.subscriptions.push(statusBarManager);
  
  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('promptProtocol.validateCurrentFile', async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        await diagnosticsProvider.validateDocument(editor.document);
        vscode.window.showInformationMessage('PROMPT validation complete');
      }
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('promptProtocol.validateWorkspace', async () => {
      await diagnosticsProvider.validateWorkspace();
      vscode.window.showInformationMessage('Workspace validation complete');
    })
  );
  
  context.subscriptions.push(
    vscode.commands.registerCommand('promptProtocol.clearDiagnostics', () => {
      diagnosticsProvider.clear();
      vscode.window.showInformationMessage('Diagnostics cleared');
    })
  );
  
  // Validate on save
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(async (document) => {
      const config = vscode.workspace.getConfiguration('promptProtocol');
      if (config.get('validateOnSave')) {
        await diagnosticsProvider.validateDocument(document);
      }
    })
  );
  
  // Validate on change (if enabled)
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(async (event) => {
      const config = vscode.workspace.getConfiguration('promptProtocol');
      if (config.get('validateOnType')) {
        await diagnosticsProvider.validateDocument(event.document);
      }
    })
  );
  
  // Validate open files on activation
  vscode.workspace.textDocuments.forEach(async (document) => {
    if (shouldValidateDocument(document)) {
      await diagnosticsProvider.validateDocument(document);
    }
  });
}

/**
 * Extension deactivation
 */
export function deactivate() {
  if (diagnosticsProvider) {
    diagnosticsProvider.clear();
  }
}

/**
 * Check if document should be validated
 */
function shouldValidateDocument(document: vscode.TextDocument): boolean {
  const supportedLanguages = ['typescript', 'typescriptreact', 'javascript', 'javascriptreact'];
  return supportedLanguages.includes(document.languageId);
}
