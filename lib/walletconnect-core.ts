/**
 * Advanced WalletConnect Core Integration
 * Uses @walletconnect/core for protocol-level control
 */

// Note: Types will be available once @walletconnect/core and @walletconnect/types are installed
// import type { IWalletConnectOptions } from '@walletconnect/types'
// import type { ICore } from '@walletconnect/types'

// Core WalletConnect functionality using @walletconnect/core
export class WalletConnectCore {
  private core: any | null = null // ICore type once library is installed
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
      
      // Note: IWalletConnectOptions type will be available once library is installed
      const options: any = {
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

    // Event subscriptions - exact events depend on WalletConnect Core API
    try {
      if (this.core.on) {
        this.core.on('session_proposal', callback)
        this.core.on('session_request', callback)
        this.core.on('session_delete', callback)
      }
    } catch (error) {
      console.warn('WalletConnect Core events not available:', error)
    }
  }
}

// Singleton instance
let walletConnectCoreInstance: WalletConnectCore | null = null

export function getWalletConnectCore() {
  if (!walletConnectCoreInstance) {
    // Dynamic import to avoid SSR issues
    const { getWalletConnectProjectIdSafe } = require('./wallet-config')
    const projectId = getWalletConnectProjectIdSafe()
    
    if (!projectId) {
      throw new Error('WalletConnect Project ID not configured. Please set NEXT_PUBLIC_REOWN_PROJECT_ID in .env.local')
    }
    
    walletConnectCoreInstance = new WalletConnectCore(projectId)
  }
  return walletConnectCoreInstance
}

