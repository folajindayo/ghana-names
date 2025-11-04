'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WalletConnect } from '@/components/wallet-connect'
import { BarChart3, Trophy, ArrowLeft, Sparkles, Heart, Gift, Package, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { UserBadges } from '@/components/user-badges'
import { NameStatsVisualization } from '@/components/name-stats-visualization'
import { NameCalendarView } from '@/components/name-calendar-view'
import { NameAchievements } from '@/components/name-achievements'

interface UserStats {
  overview: {
    totalNamesClaimed: number
    totalFavorites: number
    totalGiftsSent: number
    totalGiftsReceived: number
  }
  distribution: {
    byTribe: Array<{ tribe: string; count: number }>
    byGender: Array<{ gender: string; count: number }>
  }
  recentActivity: Array<{
    name: string
    meaning: string
    tribe?: string
    createdAt: string
  }>
  achievements: {
    collector: boolean
    enthusiast: boolean
    sharer: boolean
    popular: boolean
  }
}

export default function StatsPage() {
  const { address, isConnected } = useAccount()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const fetchStats = async () => {
    if (!address) return

    setLoading(true)
    try {
      const response = await fetch(`/api/user/stats?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-center">Your Statistics</CardTitle>
            <CardDescription className="text-white/70 text-center">
              Connect your wallet to view your detailed statistics
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center text-white/70">
          <BarChart3 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p>Loading your statistics...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <p className="text-white/70">No statistics available yet. Start claiming names!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Your Statistics
            </h1>
            <p className="text-white/70">Detailed insights about your name journey</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Names Claimed</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.overview.totalNamesClaimed}</p>
                </div>
                <Sparkles className="h-8 w-8 text-yellow-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Favorites</p>
                  <p className="text-3xl font-bold text-red-400">{stats.overview.totalFavorites}</p>
                </div>
                <Heart className="h-8 w-8 text-red-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Gifts Sent</p>
                  <p className="text-3xl font-bold text-purple-400">{stats.overview.totalGiftsSent}</p>
                </div>
                <Gift className="h-8 w-8 text-purple-400/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Gifts Received</p>
                  <p className="text-3xl font-bold text-green-400">{stats.overview.totalGiftsReceived}</p>
                </div>
                <Package className="h-8 w-8 text-green-400/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UserBadges
              achievements={stats.achievements}
              totalNames={stats.overview.totalNamesClaimed}
              totalGifts={stats.overview.totalGiftsSent}
            />
          </CardContent>
        </Card>

        {/* Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Names by Tribe
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.distribution.byTribe.length > 0 ? (
                <div className="space-y-2">
                  {stats.distribution.byTribe.map((item) => (
                    <div key={item.tribe} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white">{item.tribe}</span>
                      <Badge className="bg-blue-500/20 text-blue-300">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-center py-4">No tribe data available</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5" />
                Names by Gender
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.distribution.byGender.length > 0 ? (
                <div className="space-y-2">
                  {stats.distribution.byGender.map((item) => (
                    <div key={item.gender} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white capitalize">{item.gender}</span>
                      <Badge className="bg-green-500/20 text-green-300">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60 text-center py-4">No gender data available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length > 0 ? (
              <div className="space-y-2">
                {stats.recentActivity.map((activity, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{activity.name}</p>
                        <p className="text-white/60 text-sm">{activity.meaning}</p>
                        {activity.tribe && (
                          <Badge variant="secondary" className="mt-1 bg-blue-500/20 text-blue-300 text-xs">
                            {activity.tribe}
                          </Badge>
                        )}
                      </div>
                      <p className="text-white/50 text-xs">
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>

        {/* User Name Stats */}
        <UserNameStats />

        {/* Statistics Visualization */}
        <NameStatsVisualization />

        {/* Day Name Calendar */}
        <NameCalendarView />

        {/* Achievements */}
        <NameAchievements />
      </div>
    </div>
  )
}

