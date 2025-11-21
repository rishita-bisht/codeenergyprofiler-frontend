// VS Code Webview Bridge
// This file handles communication with the VS Code extension host

interface VSCodeAPI {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any): void;
}

declare global {
  interface Window {
    acquireVsCodeApi?: () => VSCodeAPI;
  }
}

class WebviewHost {
  private vscode: VSCodeAPI | null = null;
  private messageHandlers: Map<string, (data: any) => void> = new Map();

  constructor() {
    // Check if running in VS Code webview
    if (typeof window !== 'undefined' && window.acquireVsCodeApi) {
      this.vscode = window.acquireVsCodeApi();
      this.setupMessageListener();
    } else {
      console.warn('Not running in VS Code webview - using mock mode');
    }
  }

  private setupMessageListener() {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      const message = event.data;
      const handler = this.messageHandlers.get(message.type);
      
      if (handler) {
        handler(message.data);
      }
    });
  }

  /**
   * Send a message to the VS Code extension
   */
  postMessage(type: string, data?: any) {
    if (this.vscode) {
      this.vscode.postMessage({ type, data });
    } else {
      console.log('[Mock] Sending message to extension:', type, data);
    }
  }

  /**
   * Register a handler for incoming messages from the extension
   */
  onMessage(type: string, handler: (data: any) => void) {
    this.messageHandlers.set(type, handler);
  }

  /**
   * Remove a message handler
   */
  offMessage(type: string) {
    this.messageHandlers.delete(type);
  }

  /**
   * Get persisted state from VS Code
   */
  getState(): any {
    if (this.vscode) {
      return this.vscode.getState();
    }
    return null;
  }

  /**
   * Persist state to VS Code
   */
  setState(state: any) {
    if (this.vscode) {
      this.vscode.setState(state);
    }
  }

  /**
   * Check if running in VS Code webview
   */
  isInVSCode(): boolean {
    return this.vscode !== null;
  }

  /**
   * Request analysis from extension
   */
  requestAnalysis(mode: 'local' | 'cloud' = 'local') {
    this.postMessage('requestAnalysis', { mode });
  }

  /**
   * Request to fix a hotspot
   */
  fixHotspot(hotspotId: string) {
    this.postMessage('fixHotspot', { hotspotId });
  }

  /**
   * Open file at specific line in editor
   */
  openFile(fileName: string, lineNumber: number) {
    this.postMessage('openFile', { fileName, lineNumber });
  }

  /**
   * Toggle analysis mode
   */
  setAnalysisMode(mode: 'local' | 'cloud') {
    this.postMessage('setAnalysisMode', { mode });
  }
}

// Singleton instance
export const webviewHost = new WebviewHost();
