'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, RefreshCw, BookOpen, MapPin, Users } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'
import type { GhanaianName } from '@/lib/ghanaian-names'

interface RecommendationsProps {
  lastName: string
  onSelectName?: (name: GhanaianName) => void
}

export function NameRecommendations({ lastName, onSelectName }: RecommendationsProps) {
  const { address, isConnected } = useAccount()
  const [recommendations, setRecommendations] = useState<GhanaianName[]>([])
  const [loading, setLoading] = useState(false)
  const [basedOn, setBasedOn] = useState<{ tribe: string; gender: string } | null>(null)
  const { toast } = useToast()

  const fetchRecommendations = async () => {
    if (!lastName.trim()) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (isConnected && address) {
        params.append('walletAddress', address)
      }

      const response = await fetch(`/api/names/recommend?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setRecommendations(data.recommendations || [])
        setBasedOn(data.basedOn)
      } else {
        throw new Error('Failed to fetch recommendations')
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      toast({
        title: "Error",
        description: "Could not load recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (lastName.trim()) {
      fetchRecommendations()
    }
  }, [lastName, isConnected, address])

  if (!lastName.trim()) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Recommended Names for You
            </CardTitle>
            <CardDescription className="text-white/70">
              {basedOn && `Based on ${basedOn.tribe !== 'all' ? basedOn.tribe : 'all tribes'} • ${basedOn.gender !== 'any' ? basedOn.gender : 'any gender'}`}
            </CardDescription>
          </div>
          <Button
            onClick={fetchRecommendations}
            variant="outline"
            size="sm"
            disabled={loading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && recommendations.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <Sparkles className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Finding perfect names for you...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <p>No recommendations available. Generate a name first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {recommendations.map((name, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => onSelectName?.(name)}
              >
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-yellow-400">
                      {name.name} {lastName}
                    </h4>
                    <p className="text-sm text-white/80">{name.meaning}</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                        <MapPin className="mr-1 h-2 w-2" />
                        {name.tribe}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        <Users className="mr-1 h-2 w-2" />
                        {name.gender === 'male' ? 'Male' : 'Female'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

