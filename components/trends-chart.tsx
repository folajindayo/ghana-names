'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface DailyTrend {
  date: string
  count: number
}

interface TribeTrend {
  tribe: string
  count: number
}

export function TrendsChart() {
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([])
  const [tribeTrends, setTribeTrends] = useState<TribeTrend[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analytics/trends')
      if (response.ok) {
        const data = await response.json()
        setDailyTrends(data.dailyTrends || [])
        setTribeTrends(data.tribeTrends || [])
      }
    } catch (error) {
      console.error('Error fetching trends:', error)
    } finally {
      setLoading(false)
    }
  }

  const maxCount = Math.max(...dailyTrends.map(t => t.count), 1)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Name Trends (Last 30 Days)
        </CardTitle>
        <CardDescription className="text-white/70">
          Visual representation of name claiming trends
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="text-center py-8">
            <BarChart3 className="h-8 w-8 animate-spin text-white/70 mx-auto" />
          </div>
        ) : dailyTrends.length === 0 ? (
          <p className="text-white/70 text-center py-8">No trend data available yet</p>
        ) : (
          <>
            {/* Simple bar chart visualization */}
            <div className="space-y-2">
              <h4 className="text-white font-semibold mb-3">Daily Claims</h4>
              <div className="flex items-end gap-2 h-40">
                {dailyTrends.map((trend, index) => {
                  const height = (trend.count / maxCount) * 100
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-yellow-500 to-orange-500 rounded-t transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                        title={`${trend.date}: ${trend.count} claims`}
                      />
                      <span className="text-white/60 text-xs transform -rotate-45 origin-top-left whitespace-nowrap">
                        {new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tribe trends */}
            {tribeTrends.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-3">Popular Tribes</h4>
                <div className="space-y-2">
                  {tribeTrends.map((trend, index) => {
                    const percentage = (trend.count / dailyTrends.reduce((sum, d) => sum + d.count, 1)) * 100
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">{trend.tribe}</span>
                          <span className="text-white/70 text-sm">{trend.count} claims</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

