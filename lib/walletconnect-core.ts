/**
 * Advanced WalletConnect Core Integration
 * Uses @walletconnect/core for protocol-level control
 */

// Core WalletConnect functionality using @walletconnect/core
export class WalletConnectCore {
  private core: any = null
  private projectId: string
  private initialized: boolean = false

  constructor(projectId: string) {
    if (!projectId) {
      throw new Error('WalletConnect project ID is required')
    }
    this.projectId = projectId
  }

  /**
   * Initialize WalletConnect Core
   * This provides protocol-level control beyond AppKit
   */
  async initialize(): Promise<any | null> {
    if (typeof window === 'undefined') {
      console.warn('WalletConnect Core: Skipping initialization on server side')
      return null
    }

    if (this.initialized && this.core) {
      return this.core
    }

    try {
      // Dynamic import to avoid SSR issues
      const { Core } = await import('@walletconnect/core')
      
      const options = {
        projectId: this.projectId,
        metadata: {
          name: 'Ghanaian Name Generator',
          description: 'Discover your authentic Ghanaian name with Web3',
          url: window.location.origin,
          icons: [`${window.location.origin}/logo.png`],
        },
      }

      this.core = new Core(options)
      this.initialized = true
      
      console.log('✅ WalletConnect Core initialized successfully')
      return this.core
    } catch (error) {
      console.error('❌ Failed to initialize WalletConnect Core:', error)
      // Don't throw in production, allow app to continue
      if (process.env.NODE_ENV === 'development') {
        throw error
      }
      return null
    }
  }

  /**
   * Get core instance for advanced operations
   */
  getCore(): any | null {
    return this.core
  }

  /**
   * Check if core is initialized
   */
  isInitialized(): boolean {
    return this.initialized && this.core !== null
  }

  /**
   * Subscribe to core events
   * Note: Event names may vary based on WalletConnect Core version
   */
  subscribeToEvents(callback: (event: any) => void): void {
    if (!this.core || !this.isInitialized()) {
      console.warn('WalletConnect Core not initialized. Cannot subscribe to events.')
      return
    }

    try {
      // WalletConnect Core v2 events
      if (typeof this.core.on === 'function') {
        // Session proposal events
        if (this.core.pairing && typeof this.core.pairing.on === 'function') {
          this.core.pairing.on('pairing_proposal', callback)
          this.core.pairing.on('pairing_created', callback)
        }
        
        // Generic event handler if available
        if (this.core.on) {
          this.core.on('core_event', callback)
        }
      }
    } catch (error) {
      console.warn('Failed to subscribe to WalletConnect Core events:', error)
    }
  }

  /**
   * Cleanup and disconnect
   */
  async disconnect(): Promise<void> {
    if (this.core) {
      try {
        // Cleanup logic if needed
        this.core = null
        this.initialized = false
      } catch (error) {
        console.error('Error disconnecting WalletConnect Core:', error)
      }
    }
  }
}

// Singleton instance
let walletConnectCoreInstance: WalletConnectCore | null = null

/**
 * Get or create WalletConnect Core instance
 */
export function getWalletConnectCore(): WalletConnectCore {
  if (!walletConnectCoreInstance) {
    // Use dynamic import to avoid SSR issues
    let getWalletConnectProjectIdSafe: () => string
    
    try {
      // Try ES6 import first (for client-side)
      if (typeof window !== 'undefined') {
        getWalletConnectProjectIdSafe = require('./wallet-config').getWalletConnectProjectIdSafe
      } else {
        // Server-side: return a safe wrapper
        const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''
        getWalletConnectProjectIdSafe = () => projectId
      }
    } catch (error) {
      // Fallback if require fails
      getWalletConnectProjectIdSafe = () => process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || ''
    }
    
    const projectId = getWalletConnectProjectIdSafe()
    
    if (!projectId) {
      throw new Error(
        'WalletConnect Project ID not configured. ' +
        'Please set NEXT_PUBLIC_REOWN_PROJECT_ID in .env.local. ' +
        'Get your project ID from https://cloud.reown.com'
      )
    }
    
    walletConnectCoreInstance = new WalletConnectCore(projectId)
  }
  return walletConnectCoreInstance
}
