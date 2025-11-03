'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, RefreshCw, ExternalLink, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { formatAddress } from '@/lib/walletconnect-utils'

interface RecentClaim {
  _id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  walletAddress: string
  createdAt: string
  ipfsUrl?: string
}

export function RecentClaimsFeed() {
  const [claims, setClaims] = useState<RecentClaim[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRecentClaims()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchRecentClaims, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchRecentClaims = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/names/explore?limit=10&offset=0')
      if (response.ok) {
        const data = await response.json()
        setClaims(data.nameCards || [])
      }
    } catch (error) {
      console.error('Error fetching recent claims:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const claimDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - claimDate.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Recent Claims
            </CardTitle>
            <CardDescription className="text-white/70">
              Latest Ghanaian names claimed by the community
            </CardDescription>
          </div>
          <Button
            onClick={fetchRecentClaims}
            variant="ghost"
            size="icon"
            disabled={loading}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && claims.length === 0 ? (
          <div className="text-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-white/70 mx-auto mb-2" />
            <p className="text-white/70 text-sm">Loading recent claims...</p>
          </div>
        ) : claims.length === 0 ? (
          <p className="text-white/70 text-center py-8">No recent claims yet</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {claims.map((claim) => (
              <div
                key={claim._id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">
                        {claim.name} {claim.lastName}
                      </span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs">
                        New
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm mb-2">"{claim.meaning}"</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {claim.tribe && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                          {claim.tribe}
                        </Badge>
                      )}
                      {claim.gender && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                          {claim.gender}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(claim.createdAt)}</span>
                      <span>•</span>
                      <span>{formatAddress(claim.walletAddress)}</span>
                    </div>
                  </div>
                  {claim.ipfsUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(claim.ipfsUrl, '_blank')}
                      className="text-white/70 hover:text-white h-8 w-8"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

