'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, BookOpen, Users, Download, Share2, ExternalLink, ArrowLeft } from 'lucide-react'
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
  walletAddress: string
  createdAt: string
}

export default function ExplorePage() {
  const [nameCards, setNameCards] = useState<NameCard[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchNameCards()
  }, [])

  const fetchNameCards = async (reset = false) => {
    try {
      setLoading(true)
      const currentOffset = reset ? 0 : offset
      const response = await fetch(`/api/names/explore?limit=20&offset=${currentOffset}`)

      if (response.ok) {
        const data = await response.json()
        if (reset) {
          setNameCards(data.nameCards || [])
        } else {
          setNameCards((prev) => [...prev, ...(data.nameCards || [])])
        }
        setHasMore(data.nameCards.length === 20)
        setOffset(currentOffset + (data.nameCards?.length || 0))
      }
    } catch (error) {
      console.error('Error fetching name cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchNameCards()
    }
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Explore Claimed Names</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && nameCards.length === 0 ? (
              <p className="text-white/70 text-center py-8">Loading...</p>
            ) : nameCards.length === 0 ? (
              <p className="text-white/70 text-center py-8">No names have been claimed yet.</p>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nameCards.map((card) => (
                    <Card key={card._id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-xl font-bold text-yellow-400 mb-2">
                              {card.name} {card.lastName}
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {card.meaning}
                              </Badge>
                              {card.tribe && (
                                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {card.tribe}
                                </Badge>
                              )}
                            </div>
                            <p className="text-white/60 text-xs">
                              {card.walletAddress.slice(0, 6)}...{card.walletAddress.slice(-4)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(card.ipfsUrl, '_blank')}
                              className="flex-1 bg-white/10 border-white/20 text-white"
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
                              className="flex-1 bg-white/10 border-white/20 text-white"
                            >
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {hasMore && (
                  <div className="text-center pt-4">
                    <Button
                      onClick={loadMore}
                      disabled={loading}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

