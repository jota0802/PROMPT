import * as vscode from 'vscode';

/**
 * Manages status bar item for PROMPT Protocol
 */
export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    
    this.statusBarItem.text = '$(check) PROMPT';
    this.statusBarItem.tooltip = 'PROMPT Protocol Validator';
    this.statusBarItem.command = 'promptProtocol.validateCurrentFile';
    
    this.show();
  }
  
  /**
   * Update status bar with validation results
   */
  update(diagnosticsCount: number): void {
    if (diagnosticsCount === 0) {
      this.statusBarItem.text = '$(check) PROMPT';
      this.statusBarItem.backgroundColor = undefined;
    } else {
      this.statusBarItem.text = `$(warning) PROMPT (${diagnosticsCount})`;
      this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
  }
  
  /**
   * Show status bar item
   */
  show(): void {
    const config = vscode.workspace.getConfiguration('promptProtocol');
    if (config.get('showStatusBar')) {
      this.statusBarItem.show();
    }
  }
  
  /**
   * Hide status bar item
   */
  hide(): void {
    this.statusBarItem.hide();
  }
  
  /**
   * Dispose of status bar item
   */
  dispose(): void {
    this.statusBarItem.dispose();
  }
}
