'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Users, Heart, Share2, MessageSquare } from 'lucide-react'

interface StatsData {
  totalNames: number
  totalUsers: number
  totalClaims: number
  totalFavorites: number
  totalShares: number
  totalComments: number
  trendingNames: Array<{ name: string; count: number }>
  recentActivity: number
}

export function NameStatsDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching stats
    const fetchStats = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setStats({
        totalNames: 1247,
        totalUsers: 342,
        totalClaims: 892,
        totalFavorites: 1563,
        totalShares: 234,
        totalComments: 89,
        trendingNames: [
          { name: 'Kwame', count: 45 },
          { name: 'Akosua', count: 38 },
          { name: 'Kofi', count: 32 },
        ],
        recentActivity: 12,
      })
      setIsLoading(false)
    }
    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Statistics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-white/70">
          Loading statistics...
        </CardContent>
      </Card>
    )
  }

  if (!stats) return null

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Statistics Dashboard
        </CardTitle>
        <CardDescription className="text-white/70">
          Platform-wide statistics and insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              <p className="text-white/70 text-xs">Total Names</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalNames.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-green-400" />
              <p className="text-white/70 text-xs">Total Users</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-yellow-400" />
              <p className="text-white/70 text-xs">Claims</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalClaims.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="h-4 w-4 text-pink-400" />
              <p className="text-white/70 text-xs">Favorites</p>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalFavorites.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-semibold text-sm">Engagement</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Share2 className="h-3 w-3 text-blue-400" />
              <span className="text-white/80 text-xs">{stats.totalShares} Shares</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-3 w-3 text-green-400" />
              <span className="text-white/80 text-xs">{stats.totalComments} Comments</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded border border-white/10">
          <p className="text-white font-semibold text-sm mb-2">Trending Names</p>
          <div className="space-y-2">
            {stats.trendingNames.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/80 text-sm">{item.name}</span>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <p className="text-white font-semibold text-sm">Recent Activity</p>
          </div>
          <p className="text-white/80 text-xs mt-1">{stats.recentActivity} new activities in the last hour</p>
        </div>
      </CardContent>
    </Card>
  )
}

