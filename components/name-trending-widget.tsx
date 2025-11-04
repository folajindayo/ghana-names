'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Flame, ArrowUp, ArrowDown } from 'lucide-react'

interface TrendingName {
  name: string
  meaning?: string
  tribe?: string
  growth: number
  trend: 'up' | 'down' | 'stable'
}

export function NameTrendingWidget() {
  const [trendingNames, setTrendingNames] = useState<TrendingName[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrendingNames()
  }, [])

  const fetchTrendingNames = async () => {
    try {
      const response = await fetch('/api/analytics/trends')
      if (response.ok) {
        const data = await response.json()
        // Process trending data
        const trending = (data.trendingNames || []).slice(0, 5).map((name: any) => ({
          name: name.name || 'Unknown',
          meaning: name.meaning,
          tribe: name.tribe,
          growth: name.growth || 0,
          trend: name.growth > 0 ? 'up' : name.growth < 0 ? 'down' : 'stable',
        }))
        setTrendingNames(trending)
      } else {
        // Fallback data
        setTrendingNames([
          { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', growth: 25.5, trend: 'up' },
          { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', growth: 18.2, trend: 'up' },
          { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', growth: 12.8, trend: 'up' },
        ])
      }
    } catch (error) {
      console.error('Error fetching trending names:', error)
      setTrendingNames([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Flame className="h-8 w-8 animate-pulse text-orange-400 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (trendingNames.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            Trending Names
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-white/70">
          No trending data available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" />
          Trending Names
        </CardTitle>
        <CardDescription className="text-white/80">
          Names gaining popularity this week
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingNames.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/30 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{item.name}</h4>
                  {item.meaning && (
                    <p className="text-white/80 text-sm">"{item.meaning}"</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-400" />
                ) : item.trend === 'down' ? (
                  <ArrowDown className="h-4 w-4 text-red-400" />
                ) : null}
                <Badge
                  variant="secondary"
                  className={`${
                    item.trend === 'up'
                      ? 'bg-green-600/40 text-green-100 border-green-400/50'
                      : item.trend === 'down'
                      ? 'bg-red-600/40 text-red-100 border-red-400/50'
                      : 'bg-gray-600/40 text-gray-100 border-gray-400/50'
                  } font-semibold`}
                >
                  {item.growth > 0 ? '+' : ''}{item.growth.toFixed(1)}%
                </Badge>
              </div>
            </div>
            {item.tribe && (
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold">
                {item.tribe} Tribe
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

