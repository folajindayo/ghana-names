'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import to ensure AppKit is initialized
const WalletConnectButton = dynamic(() => import('./wallet-connect-button'), {
  ssr: false,
})

export function WalletConnect() {
  return <WalletConnectButton />
}
