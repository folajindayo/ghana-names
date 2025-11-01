'use client'

import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet, Download, Share2, ExternalLink, ArrowLeft, MapPin, BookOpen, Users } from 'lucide-react'
import { WalletConnect } from '@/components/wallet-connect'
import Link from 'next/link'

interface NameCard {
  _id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  ipfsHash: string
  ipfsUrl: string
  explanation?: string
  createdAt: string
}

interface Transaction {
  _id: string
  type: string
  fromAddress: string
  toAddress?: string
  ipfsHash?: string
  createdAt: string
  nameCardId?: NameCard
  metadata?: any
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [nameCards, setNameCards] = useState<NameCard[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const fetchUserData = async () => {
    if (!address) return

    try {
      setLoading(true)
      const [namesResponse, transactionsResponse] = await Promise.all([
        fetch(`/api/names/explore?walletAddress=${address}`),
        fetch(`/api/transactions/${address}`),
      ])

      if (namesResponse.ok) {
        const namesData = await namesResponse.json()
        setNameCards(namesData.nameCards || [])
      } else {
        console.warn('Failed to fetch names:', namesResponse.status)
        setNameCards([])
      }

      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json()
        setTransactions(transactionsData.transactions || [])
      } else {
        console.warn('Failed to fetch transactions:', transactionsResponse.status)
        setTransactions([])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      setNameCards([])
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white">Connect Your Wallet</CardTitle>
            <CardDescription className="text-white/70">
              Connect your wallet to view your profile and claimed names
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <WalletConnect />
              <Link href="/">
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Generator
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <WalletConnect />
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Your Profile
            </CardTitle>
            <CardDescription className="text-white/70">
              {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Claimed Names</h3>
                {loading ? (
                  <p className="text-white/70">Loading...</p>
                ) : nameCards.length === 0 ? (
                  <p className="text-white/70">You haven't claimed any names yet.</p>
                ) : (
                  <div className="space-y-3">
                    {nameCards.map((card) => (
                      <Card key={card._id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-yellow-400 mb-2">
                                {card.name} {card.lastName}
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                                  <BookOpen className="mr-1 h-3 w-3" />
                                  {card.meaning}
                                </Badge>
                                {card.tribe && (
                                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {card.tribe} Tribe
                                  </Badge>
                                )}
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open(card.ipfsUrl, '_blank')}
                                  className="bg-white/10 border-white/20 text-white"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  View IPFS
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    navigator.clipboard.writeText(card.ipfsUrl)
                                    alert('IPFS URL copied!')
                                  }}
                                  className="bg-white/10 border-white/20 text-white"
                                >
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/20">
                <h3 className="text-lg font-semibold text-white mb-2">Transaction History</h3>
                {loading ? (
                  <p className="text-white/70">Loading...</p>
                ) : transactions.length === 0 ? (
                  <p className="text-white/70">No transactions yet.</p>
                ) : (
                  <div className="space-y-2">
                    {transactions.slice(0, 10).map((tx) => (
                      <div
                        key={tx._id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className={
                              tx.type === 'claim'
                                ? 'bg-green-500/20 text-green-300'
                                : tx.type === 'gift'
                                  ? 'bg-purple-500/20 text-purple-300'
                                  : 'bg-blue-500/20 text-blue-300'
                            }
                          >
                            {tx.type.toUpperCase()}
                          </Badge>
                          <span className="text-white/80 text-sm">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {tx.ipfsHash && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              window.open(`https://gateway.pinata.cloud/ipfs/${tx.ipfsHash}`, '_blank')
                            }
                            className="text-white/70 hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

