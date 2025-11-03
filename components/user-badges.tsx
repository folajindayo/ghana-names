'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Award, Star, Zap } from 'lucide-react'

interface UserBadgesProps {
  achievements: {
    collector: boolean
    enthusiast: boolean
    sharer: boolean
    popular: boolean
  }
  totalNames?: number
  totalGifts?: number
}

export function UserBadges({ achievements, totalNames = 0, totalGifts = 0 }: UserBadgesProps) {
  const badgeConfig = [
    {
      id: 'collector',
      label: 'Collector',
      icon: Trophy,
      description: 'Claimed 10+ names',
      unlocked: achievements.collector,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
    },
    {
      id: 'enthusiast',
      label: 'Enthusiast',
      icon: Star,
      description: 'Claimed 5+ names',
      unlocked: achievements.enthusiast,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'sharer',
      label: 'Sharer',
      icon: Zap,
      description: 'Sent 3+ gifts',
      unlocked: achievements.sharer,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'popular',
      label: 'Popular',
      icon: Award,
      description: 'Received 5+ gifts',
      unlocked: achievements.popular,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
    },
  ]

  const unlockedCount = badgeConfig.filter(b => b.unlocked).length

  if (unlockedCount === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/70 text-sm">No badges yet. Start claiming names to unlock achievements!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {badgeConfig.map((badge) => {
        const Icon = badge.icon
        return (
          <Card
            key={badge.id}
            className={`${badge.unlocked ? badge.bgColor + ' ' + badge.borderColor + ' border-2' : 'bg-white/5 border-white/10'} backdrop-blur-sm transition-all hover:scale-105`}
          >
            <CardContent className="p-4 text-center">
              <Icon
                className={`h-8 w-8 mx-auto mb-2 ${badge.unlocked ? badge.color : 'text-white/30'}`}
              />
              <p
                className={`text-sm font-semibold mb-1 ${badge.unlocked ? 'text-white' : 'text-white/50'}`}
              >
                {badge.label}
              </p>
              <p className={`text-xs ${badge.unlocked ? 'text-white/70' : 'text-white/40'}`}>
                {badge.description}
              </p>
              {badge.unlocked && (
                <Badge className="mt-2 bg-white/20 text-white text-xs">Unlocked</Badge>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

