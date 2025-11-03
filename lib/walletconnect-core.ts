/**
 * Advanced WalletConnect Core Integration
 * Uses @walletconnect/core for protocol-level control
 */

import type { IWalletConnectOptions } from '@walletconnect/types'
import type { CoreTypes } from '@walletconnect/types'

// Core WalletConnect functionality using @walletconnect/core
export class WalletConnectCore {
  private core: CoreTypes.ICore | null = null
  private projectId: string

  constructor(projectId: string) {
    this.projectId = projectId
  }

  /**
   * Initialize WalletConnect Core
   * This provides protocol-level control beyond AppKit
   */
  async initialize() {
    if (typeof window === 'undefined') return

    try {
      // Dynamic import to avoid SSR issues
      const { Core } = await import('@walletconnect/core')
      
      const options: IWalletConnectOptions = {
        projectId: this.projectId,
        relayUrl: 'wss://relay.walletconnect.com',
        metadata: {
          name: 'Ghanaian Name Generator',
          description: 'Discover your authentic Ghanaian name with Web3',
          url: window.location.origin,
          icons: [`${window.location.origin}/logo.png`],
        },
      }

      this.core = new Core(options)
      
      console.log('WalletConnect Core initialized')
      return this.core
    } catch (error) {
      console.error('Failed to initialize WalletConnect Core:', error)
      throw error
    }
  }

  /**
   * Get core instance for advanced operations
   */
  getCore() {
    return this.core
  }

  /**
   * Subscribe to core events
   */
  subscribeToEvents(callback: (event: any) => void) {
    if (!this.core) return

    this.core.on('session_proposal', callback)
    this.core.on('session_request', callback)
    this.core.on('session_delete', callback)
  }
}

// Singleton instance
let walletConnectCoreInstance: WalletConnectCore | null = null

export function getWalletConnectCore() {
  if (!walletConnectCoreInstance) {
    const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '5c4d877bba011237894e33bce008ddd1'
    walletConnectCoreInstance = new WalletConnectCore(projectId)
  }
  return walletConnectCoreInstance
}

