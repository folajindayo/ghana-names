'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Trophy, Heart, MessageSquare, ThumbsUp } from 'lucide-react'
import { useAccount } from 'wagmi'

interface UserNameStatsProps {
  walletAddress?: string
}

export function UserNameStats({ walletAddress: propWalletAddress }: UserNameStatsProps) {
  const { address } = useAccount()
  const walletAddress = propWalletAddress || address
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walletAddress) {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [walletAddress])

  const fetchStats = async () => {
    if (!walletAddress) return
    setLoading(true)
    try {
      const response = await fetch(`/api/names/user-stats?walletAddress=${walletAddress}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!walletAddress) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Connect your wallet to view your name statistics
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Loading statistics...
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Your Name Statistics
        </CardTitle>
        <CardDescription className="text-white/70">
          Detailed breakdown of your name activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white/5 rounded">
            <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{stats.totalNames || 0}</p>
            <p className="text-white/60 text-xs">Names Claimed</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded">
            <Heart className="h-6 w-6 text-red-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{stats.totalFavorites || 0}</p>
            <p className="text-white/60 text-xs">Favorites</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded">
            <ThumbsUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{stats.totalVotes || 0}</p>
            <p className="text-white/60 text-xs">Votes Cast</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded">
            <MessageSquare className="h-6 w-6 text-blue-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{stats.totalComments || 0}</p>
            <p className="text-white/60 text-xs">Comments</p>
          </div>
        </div>

        {/* Most Voted Name */}
        {stats.mostVotedName && (
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              <h4 className="text-white font-semibold">Most Popular Name</h4>
            </div>
            <p className="text-white font-bold text-lg">
              {stats.mostVotedName.name} {stats.mostVotedName.lastName}
            </p>
            <Badge className="bg-yellow-500/20 text-yellow-300 mt-2">
              Score: {stats.mostVotedName.score > 0 ? '+' : ''}{stats.mostVotedName.score}
            </Badge>
          </div>
        )}

        {/* Names by Tribe */}
        {stats.namesByTribe && stats.namesByTribe.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3">Names by Tribe</h4>
            <div className="space-y-2">
              {stats.namesByTribe.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white">{item.tribe}</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Names by Gender */}
        {stats.namesByGender && stats.namesByGender.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3">Names by Gender</h4>
            <div className="space-y-2">
              {stats.namesByGender.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white capitalize">{item.gender}</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

