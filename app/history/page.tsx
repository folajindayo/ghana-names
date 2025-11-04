'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WalletConnect } from '@/components/wallet-connect'
import { NameHistoryTimeline } from '@/components/name-history-timeline'
import { Clock, ArrowLeft, Download, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface NameHistory {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  explanation?: string
  isAIGenerated: boolean
  timestamp: string
  claimed?: boolean
  ipfsUrl?: string
}

export default function HistoryPage() {
  const { address, isConnected } = useAccount()
  const [history, setHistory] = useState<NameHistory[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (isConnected && address) {
      fetchHistory()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const fetchHistory = async () => {
    if (!address) return

    setLoading(true)
    try {
      const response = await fetch(`/api/names/history?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        setHistory(data.history || [])
      } else {
        throw new Error('Failed to fetch history')
      }
    } catch (error) {
      console.error('Error fetching history:', error)
      toast({
        title: "Error",
        description: "Failed to load history. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-center">Name History</CardTitle>
            <CardDescription className="text-white/70 text-center">
              Connect your wallet to view your name generation history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WalletConnect />
            <Link href="/">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                Back to Generator
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Clock className="h-8 w-8" />
              Name History
            </h1>
            <p className="text-white/70">Your claimed names timeline</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-white/70 py-12">
            <Sparkles className="h-8 w-8 animate-spin mx-auto mb-4" />
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <Clock className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-4">No name history yet</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  Generate Your First Name
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-yellow-400">
                          {item.name} {item.lastName}
                        </h3>
                        {item.claimed && (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            Claimed
                          </Badge>
                        )}
                        {item.isAIGenerated && (
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            AI-Generated
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/80 text-lg mb-3">"{item.meaning}"</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tribe && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {item.tribe} Tribe
                          </Badge>
                        )}
                        {item.gender && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                            {item.gender === 'male' ? 'Male' : 'Female'}
                          </Badge>
                        )}
                      </div>
                      {item.explanation && (
                        <p className="text-white/70 text-sm mb-3">{item.explanation}</p>
                      )}
                      <p className="text-white/60 text-xs">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {item.ipfsUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(item.ipfsUrl, '_blank')}
                        className="bg-white/10 border-white/20 text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Timeline View */}
        <NameHistoryTimeline />
      </div>
    </div>
  )
}

