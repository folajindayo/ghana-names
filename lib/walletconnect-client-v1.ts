/**
 * WalletConnect v1 Client Integration
 * For legacy wallet support
 * @note WalletConnect v1 is deprecated but some wallets still use it
 */

import type { IClientMeta } from '@walletconnect/types'

/**
 * Initialize WalletConnect v1 client for legacy support
 */
export async function createWalletConnectV1Client() {
  if (typeof window === 'undefined') return null

  try {
    // Dynamic import to avoid SSR issues
    const WalletConnect = (await import('@walletconnect/client')).default

    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // WC v1 bridge
      qrcodeModal: {
        open: (uri: string, cb: () => void) => {
          // Custom QR code modal implementation
          console.log('WC v1 URI:', uri)
          // Could use qrcode.react here
          cb()
        },
        close: () => {
          // Close modal
        },
      },
    })

    return connector
  } catch (error) {
    console.error('Failed to create WalletConnect v1 client:', error)
    return null
  }
}

/**
 * Check if wallet supports WalletConnect v1
 */
export function supportsWalletConnectV1(walletName: string): boolean {
  const v1OnlyWallets = [
    'MetaMask Mobile (old)',
    'Trust Wallet (old)',
  ]
  
  return v1OnlyWallets.some(name => walletName.toLowerCase().includes(name.toLowerCase()))
}

