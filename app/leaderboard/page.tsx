'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Medal, ArrowLeft, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { formatAddress } from '@/lib/walletconnect-utils'

interface TopUser {
  rank: number
  walletAddress: string
  totalNamesClaimed: number
}

interface TopName {
  name: string
  lastName: string
  score: number
  totalVotes: number
}

export default function LeaderboardPage() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([])
  const [topNames, setTopNames] = useState<TopName[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setTopUsers(data.topUsers || [])
        setTopNames(data.topNames || [])
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-400" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />
    if (rank === 3) return <Medal className="h-6 w-6 text-orange-400" />
    return <span className="text-white/70 font-bold">{rank}</span>
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              Leaderboard
            </h1>
            <p className="text-white/70">Top users and most popular names</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Users */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Collectors
              </CardTitle>
              <CardDescription className="text-white/70">
                Users with the most names claimed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-white/70 text-center py-8">Loading...</p>
              ) : topUsers.length === 0 ? (
                <p className="text-white/70 text-center py-8">No data available</p>
              ) : (
                <div className="space-y-3">
                  {topUsers.map((user) => (
                    <div
                      key={user.walletAddress}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        {getRankIcon(user.rank)}
                        <div>
                          <p className="text-white font-medium">
                            {formatAddress(user.walletAddress)}
                          </p>
                          <p className="text-white/60 text-xs">
                            {user.totalNamesClaimed} {user.totalNamesClaimed === 1 ? 'name' : 'names'}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-300">
                        Rank #{user.rank}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Names */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Most Popular Names
              </CardTitle>
              <CardDescription className="text-white/70">
                Names with the highest vote scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-white/70 text-center py-8">Loading...</p>
              ) : topNames.length === 0 ? (
                <p className="text-white/70 text-center py-8">No voting data available</p>
              ) : (
                <div className="space-y-3">
                  {topNames.map((name, index) => (
                    <div
                      key={`${name.name}-${name.lastName}-${index}`}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex-1">
                        <p className="text-white font-semibold">
                          {name.name} {name.lastName}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Badge
                            variant="secondary"
                            className={
                              name.score > 0
                                ? 'bg-green-500/20 text-green-300'
                                : name.score < 0
                                  ? 'bg-red-500/20 text-red-300'
                                  : 'bg-white/20 text-white/70'
                            }
                          >
                            Score: {name.score > 0 ? '+' : ''}{name.score}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                            {name.totalVotes} votes
                          </Badge>
                        </div>
                      </div>
                      <div className="text-yellow-400 font-bold text-xl">
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

