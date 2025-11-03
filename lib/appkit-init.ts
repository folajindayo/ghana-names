// Initialize Reown AppKit
// This must be imported before any component that uses useAppKit

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet } from 'wagmi/chains'
import { createConfig, http } from 'wagmi'
import { getWalletConnectProjectIdSafe } from './wallet-config'

const projectId = getWalletConnectProjectIdSafe()

// Create wagmi config
export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

// Create WagmiAdapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet],
  projectId,
})

const metadata = {
  name: 'Ghanaian Name Generator',
  description: 'Discover your authentic Ghanaian name',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://ghanaian-names.vercel.app',
  icons: ['https://ghanaian-names.vercel.app/placeholder-logo.png'],
}

// Initialize AppKit only on client side
let appKitInitialized = false

if (typeof window !== 'undefined' && !appKitInitialized && projectId) {
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
}

