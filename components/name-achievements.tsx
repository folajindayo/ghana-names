'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Award, Crown, Zap, Heart, Gift, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export function NameAchievements() {
  const { address } = useAccount()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (address) {
      fetchAchievements()
    } else {
      setLoading(false)
    }
  }, [address])

  const fetchAchievements = async () => {
    if (!address) return
    setLoading(true)
    try {
      // Fetch user stats to calculate achievements
      const response = await fetch(`/api/names/user-stats?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        calculateAchievements(data)
      }
    } catch (error) {
      console.error('Error fetching achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAchievements = (stats: any) => {
    const allAchievements: Achievement[] = [
      {
        id: 'first-name',
        title: 'First Steps',
        description: 'Claim your first Ghanaian name',
        icon: <Star className="h-5 w-5" />,
        unlocked: (stats.totalNames || 0) >= 1,
        progress: Math.min(stats.totalNames || 0, 1),
        maxProgress: 1,
        rarity: 'common',
      },
      {
        id: 'collector-10',
        title: 'Name Collector',
        description: 'Claim 10 names',
        icon: <Trophy className="h-5 w-5" />,
        unlocked: (stats.totalNames || 0) >= 10,
        progress: Math.min(stats.totalNames || 0, 10),
        maxProgress: 10,
        rarity: 'rare',
      },
      {
        id: 'collector-50',
        title: 'Master Collector',
        description: 'Claim 50 names',
        icon: <Crown className="h-5 w-5" />,
        unlocked: (stats.totalNames || 0) >= 50,
        progress: Math.min(stats.totalNames || 0, 50),
        maxProgress: 50,
        rarity: 'epic',
      },
      {
        id: 'favorite-5',
        title: 'Curator',
        description: 'Add 5 names to favorites',
        icon: <Heart className="h-5 w-5" />,
        unlocked: (stats.totalFavorites || 0) >= 5,
        progress: Math.min(stats.totalFavorites || 0, 5),
        maxProgress: 5,
        rarity: 'common',
      },
      {
        id: 'gift-3',
        title: 'Generous',
        description: 'Gift 3 names to others',
        icon: <Gift className="h-5 w-5" />,
        unlocked: (stats.totalGiftsSent || 0) >= 3,
        progress: Math.min(stats.totalGiftsSent || 0, 3),
        maxProgress: 3,
        rarity: 'rare',
      },
      {
        id: 'vote-10',
        title: 'Community Voice',
        description: 'Cast 10 votes on names',
        icon: <Zap className="h-5 w-5" />,
        unlocked: (stats.totalVotes || 0) >= 10,
        progress: Math.min(stats.totalVotes || 0, 10),
        maxProgress: 10,
        rarity: 'common',
      },
      {
        id: 'comment-5',
        title: 'Storyteller',
        description: 'Leave 5 comments on names',
        icon: <Sparkles className="h-5 w-5" />,
        unlocked: (stats.totalComments || 0) >= 5,
        progress: Math.min(stats.totalComments || 0, 5),
        maxProgress: 5,
        rarity: 'common',
      },
      {
        id: 'all-tribes',
        title: 'Cultural Explorer',
        description: 'Claim names from all major tribes',
        icon: <Award className="h-5 w-5" />,
        unlocked: (stats.namesByTribe?.length || 0) >= 5,
        progress: Math.min(stats.namesByTribe?.length || 0, 5),
        maxProgress: 5,
        rarity: 'epic',
      },
    ]

    setAchievements(allAchievements)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
      case 'rare':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'legendary':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (!address) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Connect your wallet to view achievements
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Trophy className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Achievements
        </CardTitle>
        <CardDescription className="text-white/70">
          {unlockedCount} of {achievements.length} unlocked
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? getRarityColor(achievement.rarity)
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded ${
                    achievement.unlocked ? 'bg-white/10' : 'bg-white/5'
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-semibold">{achievement.title}</h4>
                    {achievement.unlocked && (
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/70 text-sm mb-2">{achievement.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60">Progress</span>
                      <span className="text-white/80">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          achievement.unlocked ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{
                          width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

