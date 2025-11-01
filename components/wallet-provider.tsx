'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { useState, useEffect } from 'react'

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || '5c4d877bba011237894e33bce008ddd1'

// Create wagmi config
const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

let appKitInitialized = false

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [appKitReady, setAppKitReady] = useState(false)

  useEffect(() => {
    // Initialize AppKit only on client side
    if (typeof window !== 'undefined' && !appKitInitialized) {
      const wagmiAdapter = new WagmiAdapter({
        networks: [mainnet],
        projectId,
      })

      const metadata = {
        name: 'Ghanaian Name Generator',
        description: 'Discover your authentic Ghanaian name',
        url: window.location.origin,
        icons: ['https://ghanaian-names.vercel.app/placeholder-logo.png'],
      }

      createAppKit({
        adapters: [wagmiAdapter],
        networks: [mainnet],
        projectId,
        metadata,
        features: {
          analytics: true,
        },
        themeMode: 'light',
        themeVariables: {
          '--w3m-accent': '#f59e0b',
        },
      })
      
      appKitInitialized = true
      setAppKitReady(true)
    } else if (typeof window === 'undefined') {
      // On server, mark as ready (won't use AppKit anyway)
      setAppKitReady(true)
    } else if (appKitInitialized) {
      setAppKitReady(true)
    }
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {appKitReady ? children : <div>Loading wallet...</div>}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
