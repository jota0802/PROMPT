import * as vscode from 'vscode';
import { createValidationEngine } from './engine';
import type { ValidationContext, ValidationResult } from './types';

/**
 * Manages validation diagnostics for PROMPT Protocol
 */
export class DiagnosticsProvider {
  private diagnosticCollection: vscode.DiagnosticCollection;
  private validationEngine = createValidationEngine();
  
  constructor() {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('promptProtocol');
  }
  
  /**
   * Validate a document
   */
  async validateDocument(document: vscode.TextDocument): Promise<void> {
    const config = vscode.workspace.getConfiguration('promptProtocol');
    
    if (!config.get('enabled')) {
      return;
    }
    
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    const projectRoot = workspaceFolder?.uri.fsPath || '';
    
    const context: ValidationContext = {
      filePath: document.uri.fsPath,
      fileContent: document.getText(),
      activatedTags: [],
      projectRoot,
      workspaceConfig: {
        enabled: config.get('enabled', true),
        validateOnSave: config.get('validateOnSave', true),
        validateOnType: config.get('validateOnType', false),
        showStatusBar: config.get('showStatusBar', true),
        severity: {
          min: config.get('severity.min', 'error'),
          std: config.get('severity.std', 'warning'),
          max: config.get('severity.max', 'info'),
        },
        customRules: config.get('customRules', {}),
      },
    };
    
    try {
      const results = await this.validationEngine.validate(context);
      this.updateDiagnostics(document, results);
    } catch (error) {
      console.error('Validation error:', error);
    }
  }
  
  /**
   * Validate all files in workspace
   */
  async validateWorkspace(): Promise<void> {
    const files = await vscode.workspace.findFiles('**/*.{ts,tsx,js,jsx}', '**/node_modules/**');
    
    for (const file of files) {
      const document = await vscode.workspace.openTextDocument(file);
      await this.validateDocument(document);
    }
  }
  
  /**
   * Update diagnostics for a document
   */
  private updateDiagnostics(document: vscode.TextDocument, results: ValidationResult[]): void {
    const diagnostics: vscode.Diagnostic[] = results.map(result => {
      const line = (result.line || 1) - 1; // Convert to 0-indexed
      const column = result.column || 0;
      const endLine = (result.endLine || result.line || 1) - 1;
      const endColumn = result.endColumn || column + 1;
      
      const range = new vscode.Range(
        new vscode.Position(line, column),
        new vscode.Position(endLine, endColumn)
      );
      
      const severity = this.getSeverity(result.severity);
      const message = `[${result.rule}] ${result.message}`;
      
      const diagnostic = new vscode.Diagnostic(range, message, severity);
      diagnostic.source = 'PROMPT Protocol';
      diagnostic.code = result.rule;
      
      return diagnostic;
    });
    
    this.diagnosticCollection.set(document.uri, diagnostics);
  }
  
  /**
   * Convert validation severity to VS Code severity
   */
  private getSeverity(severity: string): vscode.DiagnosticSeverity {
    switch (severity) {
      case 'error':
        return vscode.DiagnosticSeverity.Error;
      case 'warning':
        return vscode.DiagnosticSeverity.Warning;
      case 'info':
        return vscode.DiagnosticSeverity.Information;
      default:
        return vscode.DiagnosticSeverity.Warning;
    }
  }
  
  /**
   * Clear all diagnostics
   */
  clear(): void {
    this.diagnosticCollection.clear();
  }
  
  /**
   * Dispose of resources
   */
  dispose(): void {
    this.diagnosticCollection.dispose();
  }
}
