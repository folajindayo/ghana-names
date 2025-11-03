'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useWalletConnectAdvanced } from '@/hooks/use-walletconnect-advanced'
import { CheckCircle, XCircle, Info } from 'lucide-react'

/**
 * Advanced wallet information component using WalletConnect core
 */
export function WalletAdvancedInfo() {
  const { coreInitialized, sessionInfo, formattedAddress, chainName, isValidAddress } = useWalletConnectAdvanced()

  if (!sessionInfo?.connected) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Info className="h-5 w-5" />
          Advanced Wallet Info
        </CardTitle>
        <CardDescription className="text-white/70">
          Protocol-level connection details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/70">Protocol Status</span>
          <Badge className={coreInitialized ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
            {coreInitialized ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Core Active
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Initializing
              </>
            )}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/70">Address</span>
          <span className="text-white font-mono text-sm">{formattedAddress}</span>
        </div>

        {chainName && (
          <div className="flex items-center justify-between">
            <span className="text-white/70">Network</span>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              {chainName}
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-white/70">Address Valid</span>
          {isValidAddress ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <XCircle className="h-4 w-4 text-red-400" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

