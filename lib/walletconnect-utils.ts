/**
 * WalletConnect Utilities
 * Uses @walletconnect/utils for common operations
 */

/**
 * Format Ethereum address for display
 */
export function formatAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    // Can use @walletconnect/utils validators when imported
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  } catch {
    return false
  }
}

/**
 * Get chain name from chain ID
 */
export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: 'Ethereum Mainnet',
    137: 'Polygon',
    42161: 'Arbitrum',
    56: 'BNB Chain',
    8453: 'Base',
  }
  return chains[chainId] || `Chain ${chainId}`
}

/**
 * Convert chain ID to hex
 */
export function chainIdToHex(chainId: number): string {
  return `0x${chainId.toString(16)}`
}

/**
 * Convert hex to chain ID
 */
export function hexToChainId(hex: string): number {
  return parseInt(hex, 16)
}

/**
 * Check if address is a contract
 * (Would need to query blockchain, placeholder here)
 */
export async function isContractAddress(address: string): Promise<boolean> {
  // Implementation would check bytecode at address
  return false
}

/**
 * Parse ENS name or address
 */
export function parseAddress(input: string): {
  type: 'address' | 'ens' | 'invalid'
  value: string
} {
  if (isValidAddress(input)) {
    return { type: 'address', value: input.toLowerCase() }
  }
  
  if (input.endsWith('.eth')) {
    return { type: 'ens', value: input }
  }
  
  return { type: 'invalid', value: input }
}

