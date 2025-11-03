'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, PieChart } from 'lucide-react'
import { useAccount } from 'wagmi'

interface StatsData {
  totalNames: number
  byTribe: Array<{ tribe: string; count: number }>
  byGender: Array<{ gender: string; count: number }>
  recentActivity: Array<{ date: string; count: number }>
}

export function NameStatsVisualization() {
  const { address } = useAccount()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (address) {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [address])

  const fetchStats = async () => {
    if (!address) return
    setLoading(true)
    try {
      const response = await fetch(`/api/names/user-stats?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        setStats({
          totalNames: data.totalNames || 0,
          byTribe: data.namesByTribe || [],
          byGender: data.namesByGender || [],
          recentActivity: [], // Would need separate endpoint
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!address) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Connect your wallet to view statistics
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <BarChart3 className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!stats || stats.totalNames === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          No statistics available yet
        </CardContent>
      </Card>
    )
  }

  const maxTribeCount = Math.max(...(stats.byTribe.map((t) => t.count) || [0]), 1)
  const maxGenderCount = Math.max(...(stats.byGender.map((g) => g.count) || [0]), 1)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PieChart className="h-5 w-5 text-green-400" />
          Statistics Visualization
        </CardTitle>
        <CardDescription className="text-white/70">
          Visual breakdown of your name collection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Names */}
        <div className="text-center p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-6 w-6 text-yellow-400" />
            <p className="text-white/70 text-sm">Total Names Claimed</p>
          </div>
          <p className="text-4xl font-bold text-yellow-400">{stats.totalNames}</p>
        </div>

        {/* By Tribe */}
        {stats.byTribe.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Names by Tribe
            </h4>
            <div className="space-y-2">
              {stats.byTribe.map((item, index) => {
                const percentage = (item.count / maxTribeCount) * 100
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">{item.tribe}</span>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                        {item.count}
                      </Badge>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* By Gender */}
        {stats.byGender.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3">Names by Gender</h4>
            <div className="grid grid-cols-2 gap-4">
              {stats.byGender.map((item, index) => {
                const percentage = (item.count / maxGenderCount) * 100
                const color = item.gender === 'male' ? 'from-blue-500 to-cyan-500' : 'from-pink-500 to-rose-500'
                return (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/70 text-xs mb-2 capitalize">{item.gender}</p>
                    <p className="text-2xl font-bold text-white mb-2">{item.count}</p>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

