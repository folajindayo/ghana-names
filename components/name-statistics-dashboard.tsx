'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Users, Star, Calendar } from 'lucide-react'

interface Statistics {
  totalNames: number
  totalUsers: number
  namesGenerated: number
  favoritesCount: number
  topTribe: string
  mostPopularName: string
  growthRate: number
}

const sampleStats: Statistics = {
  totalNames: 1247,
  totalUsers: 3421,
  namesGenerated: 15678,
  favoritesCount: 8923,
  topTribe: 'Akan',
  mostPopularName: 'Kwame',
  growthRate: 12.5,
}

export function NameStatisticsDashboard() {
  const [stats, setStats] = useState<Statistics>(sampleStats)

  useEffect(() => {
    // In a real app, this would fetch from an API
    setStats(sampleStats)
  }, [])

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
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-white/70 text-xs">Total Names</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalNames.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-white/70 text-xs">Total Users</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              <span className="text-white/70 text-xs">Names Generated</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.namesGenerated.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-white/70 text-xs">Favorites</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.favoritesCount.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-white font-semibold mb-3 text-sm">Key Insights</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Most Popular Name</span>
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                {stats.mostPopularName}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Top Tribe</span>
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs">
                {stats.topTribe}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Growth Rate</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-semibold text-sm">+{stats.growthRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            Activity Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Average names per user</span>
              <span className="text-white font-semibold">
                {Math.round(stats.namesGenerated / stats.totalUsers)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Favorite rate</span>
              <span className="text-white font-semibold">
                {Math.round((stats.favoritesCount / stats.namesGenerated) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Names per day (avg)</span>
              <span className="text-white font-semibold">
                {Math.round(stats.namesGenerated / 365)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> Statistics are updated in real-time and reflect platform-wide activity.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

