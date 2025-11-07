'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Star } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  name: string
  score: number
  tribe: string
  change: number
  badge?: 'gold' | 'silver' | 'bronze'
}

interface TopUser {
  rank: number
  username: string
  namesGenerated: number
  favorites: number
  totalScore: number
}

const topNames: LeaderboardEntry[] = [
  { rank: 1, name: 'Kwame', score: 1245, tribe: 'Akan', change: 12, badge: 'gold' },
  { rank: 2, name: 'Akosua', score: 1123, tribe: 'Akan', change: 8, badge: 'silver' },
  { rank: 3, name: 'Kofi', score: 987, tribe: 'Akan', change: 15, badge: 'bronze' },
  { rank: 4, name: 'Ama', score: 856, tribe: 'Akan', change: -3 },
  { rank: 5, name: 'Kojo', score: 743, tribe: 'Akan', change: 5 },
  { rank: 6, name: 'Abena', score: 692, tribe: 'Akan', change: 9 },
  { rank: 7, name: 'Kwaku', score: 641, tribe: 'Akan', change: -2 },
  { rank: 8, name: 'Efua', score: 598, tribe: 'Akan', change: 7 },
  { rank: 9, name: 'Yaw', score: 567, tribe: 'Akan', change: 4 },
  { rank: 10, name: 'Adwoa', score: 534, tribe: 'Akan', change: 11 },
]

const topUsers: TopUser[] = [
  { rank: 1, username: 'AmaK', namesGenerated: 234, favorites: 45, totalScore: 1234 },
  { rank: 2, username: 'KofiM', namesGenerated: 198, favorites: 38, totalScore: 1098 },
  { rank: 3, username: 'KwameA', namesGenerated: 176, favorites: 32, totalScore: 987 },
  { rank: 4, username: 'AkosuaB', namesGenerated: 154, favorites: 28, totalScore: 856 },
  { rank: 5, username: 'YawK', namesGenerated: 142, favorites: 25, totalScore: 743 },
]

export function NameLeaderboard() {
  const [activeTab, setActiveTab] = useState<'names' | 'users'>('names')

  const getRankIcon = (rank: number, badge?: string) => {
    if (badge === 'gold' || rank === 1) {
      return <Crown className="h-5 w-5 text-yellow-400" />
    }
    if (badge === 'silver' || rank === 2) {
      return <Medal className="h-5 w-5 text-gray-300" />
    }
    if (badge === 'bronze' || rank === 3) {
      return <Award className="h-5 w-5 text-orange-400" />
    }
    return <span className="text-white/60 font-bold text-sm w-5 text-center">{rank}</span>
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20 border-yellow-400/50'
    if (rank === 2) return 'bg-gray-400/20 border-gray-300/50'
    if (rank === 3) return 'bg-orange-500/20 border-orange-400/50'
    return 'bg-white/5 border-white/10'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Leaderboard
        </CardTitle>
        <CardDescription className="text-white/70">
          Top names and most active users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={activeTab === 'names' ? 'default' : 'outline'}
            onClick={() => setActiveTab('names')}
            className={
              activeTab === 'names'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <Star className="h-4 w-4 mr-2" />
            Top Names
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'users' ? 'default' : 'outline'}
            onClick={() => setActiveTab('users')}
            className={
              activeTab === 'users'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <Users className="h-4 w-4 mr-2" />
            Top Users
          </Button>
        </div>

        {activeTab === 'names' && (
          <div className="space-y-2">
            {topNames.map((entry) => (
              <div
                key={entry.rank}
                className={`p-4 rounded-lg border ${getRankColor(entry.rank)} transition-colors hover:bg-white/10`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    {getRankIcon(entry.rank, entry.badge)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{entry.name}</h3>
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                          {entry.tribe}
                        </Badge>
                        {entry.badge && (
                          <Badge
                            variant="secondary"
                            className={`${
                              entry.badge === 'gold'
                                ? 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
                                : entry.badge === 'silver'
                                ? 'bg-gray-600/40 text-gray-100 border-gray-400/50'
                                : 'bg-orange-600/40 text-orange-100 border-orange-400/50'
                            } text-xs`}
                          >
                            {entry.badge === 'gold' ? '🥇' : entry.badge === 'silver' ? '🥈' : '🥉'}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-white/70">Score: {entry.score.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp
                            className={`h-4 w-4 ${
                              entry.change >= 0 ? 'text-green-400' : 'text-red-400 rotate-180'
                            }`}
                          />
                          <span
                            className={
                              entry.change >= 0 ? 'text-green-400' : 'text-red-400'
                            }
                          >
                            {entry.change >= 0 ? '+' : ''}{entry.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-2">
            {topUsers.map((user) => (
              <div
                key={user.rank}
                className={`p-4 rounded-lg border ${getRankColor(user.rank)} transition-colors hover:bg-white/10`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    {getRankIcon(user.rank)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{user.username}</h3>
                        {user.rank <= 3 && (
                          <Badge
                            variant="secondary"
                            className={`${
                              user.rank === 1
                                ? 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
                                : user.rank === 2
                                ? 'bg-gray-600/40 text-gray-100 border-gray-400/50'
                                : 'bg-orange-600/40 text-orange-100 border-orange-400/50'
                            } text-xs`}
                          >
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Generated: </span>
                          <span className="text-white font-semibold">{user.namesGenerated}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Favorites: </span>
                          <span className="text-white font-semibold">{user.favorites}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Score: </span>
                          <span className="text-white font-semibold">{user.totalScore.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span className="text-white font-semibold text-sm">How Rankings Work</span>
          </div>
          <p className="text-white/80 text-xs">
            Names are ranked by total engagement (views, favorites, shares). Users are ranked by activity and contributions to the platform.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

