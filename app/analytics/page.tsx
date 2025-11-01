'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Users, Heart, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface Analytics {
  overview: {
    totalNamesClaimed: number
    totalUsers: number
    totalFavorites: number
    totalTransactions: number
    namesLast30Days: number
    avgNamesPerUser: number
  }
  trends: {
    recentNamesLast7Days: number
    growthRate: string
  }
  popular: {
    tribes: Array<{ tribe: string; count: number }>
    names: Array<{ name: string; count: number }>
  }
  distribution: {
    gender: Array<{ gender: string; count: number }>
  }
  timestamp: string
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        if (data.analytics) {
          setAnalytics(data.analytics)
        } else {
          setError(data.note || 'Analytics data not available')
        }
      } else {
        setError('Failed to load analytics')
      }
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) {
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
        <div className="max-w-6xl mx-auto flex items-center justify-center h-screen">
          <div className="text-center text-white">
            <BarChart3 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p>Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !analytics) {
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
        <div className="max-w-6xl mx-auto space-y-6 pt-8">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <p className="text-white/70 mb-4">{error || 'Analytics not available'}</p>
              <Button
                onClick={fetchAnalytics}
                variant="outline"
                className="bg-white/10 border-white/20 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
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
      <div className="max-w-6xl mx-auto space-y-6 pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
              <BarChart3 className="h-8 w-8" />
              Analytics Dashboard
            </h1>
            <p className="text-white/70">Statistics and insights about Ghanaian names</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchAnalytics}
              variant="outline"
              className="bg-white/10 border-white/20 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Names Claimed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-400">{analytics.overview.totalNamesClaimed}</p>
              <p className="text-xs text-white/60 mt-1">
                {analytics.trends.recentNamesLast7Days} in last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{analytics.overview.totalUsers}</p>
              <p className="text-xs text-white/60 mt-1">
                Avg {analytics.overview.avgNamesPerUser} names/user
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-400" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">{analytics.overview.totalFavorites}</p>
              <p className="text-xs text-white/60 mt-1">Saved names</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                30-Day Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">{analytics.overview.namesLast30Days}</p>
              <p className="text-xs text-white/60 mt-1">New names this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Popular Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Popular Tribes</CardTitle>
              <CardDescription className="text-white/70">
                Most represented tribes in claimed names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.popular.tribes.length > 0 ? (
                  analytics.popular.tribes.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white font-medium">{item.tribe}</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {item.count}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-center py-4">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Popular Names</CardTitle>
              <CardDescription className="text-white/70">
                Most frequently claimed names
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.popular.names.length > 0 ? (
                  analytics.popular.names.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white font-medium">{item.name}</span>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        {item.count}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-center py-4">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gender Distribution */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Gender Distribution</CardTitle>
            <CardDescription className="text-white/70">
              Distribution of names by gender
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {analytics.distribution.gender.map((item, idx) => (
                <div key={idx} className="text-center p-4 bg-white/5 rounded">
                  <p className="text-2xl font-bold text-yellow-400">{item.count}</p>
                  <p className="text-white/70 text-sm mt-1 capitalize">{item.gender}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/60 text-sm">
          Last updated: {new Date(analytics.timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  )
}

