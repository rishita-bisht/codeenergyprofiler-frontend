// Message handler for VS Code extension communication
import { webviewHost } from './webviewHost';
import type { EnergySummary, Hotspot, FileAnalysis } from '@/types';

type MessageCallback = (data: any) => void;

export class MessageHandler {
  private callbacks: Map<string, MessageCallback[]> = new Map();

  constructor() {
    this.setupHandlers();
  }

  private setupHandlers() {
    // Register handlers for different message types
    webviewHost.onMessage('analysisResults', (data) => {
      this.trigger('analysisResults', data);
    });

    webviewHost.onMessage('hotspotData', (data) => {
      this.trigger('hotspotData', data);
    });

    webviewHost.onMessage('energySummary', (data) => {
      this.trigger('energySummary', data);
    });

    webviewHost.onMessage('modeChanged', (data) => {
      this.trigger('modeChanged', data);
    });

    webviewHost.onMessage('fileAnalysis', (data) => {
      this.trigger('fileAnalysis', data);
    });

    webviewHost.onMessage('achievementUnlocked', (data) => {
      this.trigger('achievementUnlocked', data);
    });

    webviewHost.onMessage('xpGained', (data) => {
      this.trigger('xpGained', data);
    });
  }

  /**
   * Subscribe to a message type
   */
  on(messageType: string, callback: MessageCallback) {
    if (!this.callbacks.has(messageType)) {
      this.callbacks.set(messageType, []);
    }
    this.callbacks.get(messageType)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(messageType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Trigger all callbacks for a message type
   */
  private trigger(messageType: string, data: any) {
    const callbacks = this.callbacks.get(messageType);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * Clear all callbacks for a message type
   */
  clear(messageType?: string) {
    if (messageType) {
      this.callbacks.delete(messageType);
    } else {
      this.callbacks.clear();
    }
  }
}

// Singleton instance
export const messageHandler = new MessageHandler();

// Utility hooks and functions for React components
export const useMessageSubscription = (
  messageType: string,
  callback: MessageCallback,
  deps: any[] = []
) => {
  const { useEffect } = require('react');
  
  useEffect(() => {
    const unsubscribe = messageHandler.on(messageType, callback);
    return unsubscribe;
  }, deps);
};
