import { createConfig, http } from 'wagmi'
import { mainnet, arbitrum, polygon } from 'wagmi/chains'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { getWalletConnectProjectIdSafe } from './wallet-config'

// Define the project ID
const projectId = getWalletConnectProjectIdSafe()

// Configure networks
const networks = [mainnet, arbitrum, polygon]

// Create wagmi config
export const wagmiConfig = createConfig({
  chains: networks,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [polygon.id]: http(),
  },
})

// Create WagmiAdapter
export const wagmiAdapter = new WagmiAdapter({
  wagmiAdapter: { config: wagmiConfig },
  projectId,
})

// Metadata for AppKit
const metadata = {
  name: 'Ghanaian Name Generator',
  description: 'Discover your authentic Ghanaian name',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://ghanaian-names.vercel.app',
  icons: ['https://ghanaian-names.vercel.app/placeholder-logo.png'],
}

// Create AppKit instance
export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
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

export default appKit

