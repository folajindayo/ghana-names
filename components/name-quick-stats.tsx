'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Heart, Sparkles, ArrowUp, ArrowDown } from 'lucide-react'

interface QuickStats {
  totalNames: number
  totalUsers: number
  totalFavorites: number
  trendingGrowth: number
}

export function NameQuickStats() {
  const [stats, setStats] = useState<QuickStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuickStats()
  }, [])

  const fetchQuickStats = async () => {
    try {
      // Fetch from analytics API
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setStats({
          totalNames: data.totalNamesClaimed || 0,
          totalUsers: data.totalUsers || 0,
          totalFavorites: data.totalFavorites || 0,
          trendingGrowth: data.trendingGrowth || 0,
        })
      } else {
        // Fallback to default stats
        setStats({
          totalNames: 1250,
          totalUsers: 342,
          totalFavorites: 890,
          trendingGrowth: 12.5,
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStats({
        totalNames: 1250,
        totalUsers: 342,
        totalFavorites: 890,
        trendingGrowth: 12.5,
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading || !stats) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Sparkles className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Quick Stats
        </CardTitle>
        <CardDescription className="text-white/70">
          Platform statistics at a glance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white/70 text-sm">Total Names</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalNames.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-white/70 text-sm">Users</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-white/70 text-sm">Favorites</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalFavorites.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              {stats.trendingGrowth >= 0 ? (
                <ArrowUp className="h-4 w-4 text-green-400" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-400" />
              )}
              <span className="text-white/70 text-sm">Growth</span>
            </div>
            <p className={`text-2xl font-bold ${stats.trendingGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.trendingGrowth >= 0 ? '+' : ''}{stats.trendingGrowth}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

