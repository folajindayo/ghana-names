'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'
import { useAppKit } from '@reown/appkit/react'

export default function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { open } = useAppKit()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
          <Wallet className="h-4 w-4 text-white" />
          <span className="text-white text-sm font-medium">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => open()}
      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  )
}

