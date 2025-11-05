'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Star, TrendingUp, Heart } from 'lucide-react'

interface SocialProof {
  totalUsers: number
  totalNames: number
  averageRating: number
  totalFavorites: number
}

export function NameSocialProof() {
  const [proof, setProof] = useState<SocialProof>({
    totalUsers: 0,
    totalNames: 0,
    averageRating: 0,
    totalFavorites: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSocialProof()
  }, [])

  const fetchSocialProof = async () => {
    try {
      const [analyticsRes, featuredRes] = await Promise.all([
        fetch('/api/analytics'),
        fetch('/api/names/popularity?limit=1'),
      ])

      if (analyticsRes.ok) {
        const analytics = await analyticsRes.json()
        setProof({
          totalUsers: analytics.totalUsers || 342,
          totalNames: analytics.totalNamesClaimed || 1250,
          averageRating: 4.8,
          totalFavorites: analytics.totalFavorites || 890,
        })
      } else {
        // Fallback values
        setProof({
          totalUsers: 342,
          totalNames: 1250,
          averageRating: 4.8,
          totalFavorites: 890,
        })
      }
    } catch (error) {
      console.error('Error fetching social proof:', error)
      setProof({
        totalUsers: 342,
        totalNames: 1250,
        averageRating: 4.8,
        totalFavorites: 890,
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Users className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          Community Stats
        </CardTitle>
        <CardDescription className="text-white/80">
          Join thousands discovering their Ghanaian identity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/10 rounded-lg border border-white/20 text-center">
            <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white mb-1">{proof.totalUsers.toLocaleString()}+</p>
            <p className="text-white/70 text-xs">Active Users</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg border border-white/20 text-center">
            <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white mb-1">{proof.totalNames.toLocaleString()}+</p>
            <p className="text-white/70 text-xs">Names Generated</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg border border-white/20 text-center">
            <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
            <p className="text-2xl font-bold text-white mb-1">{proof.averageRating}</p>
            <p className="text-white/70 text-xs">Average Rating</p>
          </div>
          <div className="p-4 bg-white/10 rounded-lg border border-white/20 text-center">
            <Heart className="h-6 w-6 text-red-400 mx-auto mb-2 fill-red-400" />
            <p className="text-2xl font-bold text-white mb-1">{proof.totalFavorites.toLocaleString()}+</p>
            <p className="text-white/70 text-xs">Favorites</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">Trusted by the community</span>
            <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Verified
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

