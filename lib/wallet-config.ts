/**
 * Shared Wallet Configuration
 * Centralized configuration for WalletConnect/Reown
 */

/**
 * Get WalletConnect project ID from environment variables
 * Throws error if not set (no hardcoded fallbacks)
 */
export function getWalletConnectProjectId(): string {
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_REOWN_PROJECT_ID is not set. ' +
      'Please add it to your .env.local file. ' +
      'Get your project ID from https://cloud.reown.com'
    )
  }

  return projectId
}

/**
 * Get WalletConnect project ID with optional fallback for development
 * Only use in development, never in production
 */
export function getWalletConnectProjectIdSafe(): string {
  const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

  if (!projectId) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'NEXT_PUBLIC_REOWN_PROJECT_ID is required in production. ' +
        'Please add it to your environment variables. ' +
        'Get your project ID from https://cloud.reown.com'
      )
    }
    
    console.warn(
      '⚠️  NEXT_PUBLIC_REOWN_PROJECT_ID is not set. ' +
      'WalletConnect features may not work properly. ' +
      'Get your project ID from https://cloud.reown.com'
    )
    
    // Return empty string in development if not set
    // This allows the app to load but WalletConnect won't work
    return ''
  }

  return projectId
}

