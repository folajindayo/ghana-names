'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getWalletConnectCore } from '@/lib/walletconnect-core'
import { formatAddress, isValidAddress, getChainName } from '@/lib/walletconnect-utils'

/**
 * Advanced WalletConnect hook with protocol-level features
 */
export function useWalletConnectAdvanced() {
  const { address, chainId, isConnected } = useAccount()
  const [coreInitialized, setCoreInitialized] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<{
    connected: boolean
    address?: string
    chainId?: number
  } | null>(null)

  useEffect(() => {
    async function initializeCore() {
      if (typeof window === 'undefined') return

      try {
        const core = getWalletConnectCore()
        await core.initialize()
        
        // Subscribe to events
        core.subscribeToEvents((event) => {
          console.log('WalletConnect event:', event)
        })

        setCoreInitialized(true)
      } catch (error) {
        console.error('Failed to initialize WalletConnect core:', error)
      }
    }

    if (isConnected) {
      initializeCore()
    }
  }, [isConnected])

  useEffect(() => {
    if (isConnected && address && chainId) {
      setSessionInfo({
        connected: true,
        address,
        chainId,
      })
    } else {
      setSessionInfo(null)
    }
  }, [isConnected, address, chainId])

  return {
    coreInitialized,
    sessionInfo,
    formattedAddress: address ? formatAddress(address) : null,
    chainName: chainId ? getChainName(chainId) : null,
    isValidAddress: address ? isValidAddress(address) : false,
  }
}

