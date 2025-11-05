'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, TrendingUp, Star, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'

interface FavoriteStats {
  totalFavorites: number
  favoriteTribe?: string
  favoriteGender?: string
  mostFavoritedName?: string
  favoriteCount?: number
}

export function NameFavoritesStats() {
  const { address, isConnected } = useAccount()
  const [stats, setStats] = useState<FavoriteStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      fetchFavoritesStats()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const fetchFavoritesStats = async () => {
    if (!address) return
    setLoading(true)
    try {
      const response = await fetch(`/api/favorites?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        const favorites = data.favorites || []

        // Calculate stats
        const tribeCounts: Record<string, number> = {}
        const genderCounts: Record<string, number> = {}
        const nameCounts: Record<string, number> = {}

        favorites.forEach((fav: any) => {
          if (fav.tribe) {
            tribeCounts[fav.tribe] = (tribeCounts[fav.tribe] || 0) + 1
          }
          if (fav.gender) {
            genderCounts[fav.gender] = (genderCounts[fav.gender] || 0) + 1
          }
          const fullName = `${fav.name} ${fav.lastName}`
          nameCounts[fullName] = (nameCounts[fullName] || 0) + 1
        })

        const favoriteTribe = Object.entries(tribeCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
        const favoriteGender = Object.entries(genderCounts).sort((a, b) => b[1] - a[1])[0]?.[0]
        const mostFavorited = Object.entries(nameCounts).sort((a, b) => b[1] - a[1])[0]

        setStats({
          totalFavorites: favorites.length,
          favoriteTribe,
          favoriteGender: favoriteGender as 'male' | 'female',
          mostFavoritedName: mostFavorited?.[0],
          favoriteCount: mostFavorited?.[1],
        })
      }
    } catch (error) {
      console.error('Error fetching favorites stats:', error)
      setStats({
        totalFavorites: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Connect your wallet to view favorites statistics
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Heart className="h-8 w-8 animate-pulse text-red-400 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border-red-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400 fill-red-400" />
          Your Favorites Stats
        </CardTitle>
        <CardDescription className="text-white/80">
          Insights into your favorite names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-white/10 rounded-lg border border-white/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <p className="text-3xl font-bold text-white">{stats?.totalFavorites || 0}</p>
          </div>
          <p className="text-white/80 text-sm">Total Favorites</p>
        </div>

        {stats && stats.totalFavorites > 0 && (
          <div className="space-y-3">
            {stats.favoriteTribe && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Favorite Tribe</span>
                  <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                    {stats.favoriteTribe}
                  </Badge>
                </div>
              </div>
            )}

            {stats.favoriteGender && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Preferred Gender</span>
                  <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                    {stats.favoriteGender}
                  </Badge>
                </div>
              </div>
            )}

            {stats.mostFavoritedName && (
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Most Favorited</span>
                  <div className="text-right">
                    <p className="text-white font-semibold">{stats.mostFavoritedName}</p>
                    {stats.favoriteCount && stats.favoriteCount > 1 && (
                      <p className="text-white/60 text-xs">{stats.favoriteCount} times</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {stats && stats.totalFavorites === 0 && (
          <p className="text-white/60 text-center py-4">Start favoriting names to see your stats!</p>
        )}
      </CardContent>
    </Card>
  )
}

