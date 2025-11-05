'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, Heart, Share2, Sparkles } from 'lucide-react'

interface Activity {
  id: string
  type: 'claim' | 'favorite' | 'share' | 'generate'
  userName?: string
  name: string
  timestamp: string
}

export function NameRecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
    // Refresh every 30 seconds
    const interval = setInterval(fetchRecentActivity, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch('/api/names/explore?limit=5&sort=recent')
      if (response.ok) {
        const data = await response.json()
        const activities: Activity[] = (data.nameCards || []).map((card: any) => ({
          id: card._id || card.id,
          type: 'claim',
          userName: card.walletAddress?.slice(0, 6) + '...' || 'User',
          name: card.name || 'Unknown',
          timestamp: card.createdAt || new Date().toISOString(),
        }))
        setActivities(activities)
      } else {
        // Fallback: generate sample activities
        setActivities([
          {
            id: '1',
            type: 'claim',
            userName: '0x1234...',
            name: 'Kwame',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          },
          {
            id: '2',
            type: 'favorite',
            userName: '0x5678...',
            name: 'Akosua',
            timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          },
          {
            id: '3',
            type: 'share',
            userName: '0x9abc...',
            name: 'Kofi',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching activity:', error)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'claim':
        return <Sparkles className="h-4 w-4 text-yellow-400" />
      case 'favorite':
        return <Heart className="h-4 w-4 text-red-400" />
      case 'share':
        return <Share2 className="h-4 w-4 text-blue-400" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'claim':
        return `claimed`
      case 'favorite':
        return `favorited`
      case 'share':
        return `shared`
      case 'generate':
        return `generated`
      default:
        return `interacted with`
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Clock className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Recent Activity
        </CardTitle>
        <CardDescription className="text-white/70">
          Latest community interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-white/60 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">
                    <span className="font-semibold text-white/90">{activity.userName || 'User'}</span>
                    {' '}
                    <span className="text-white/70">{getActivityText(activity)}</span>
                    {' '}
                    <span className="font-semibold text-yellow-400">{activity.name}</span>
                  </p>
                  <p className="text-white/50 text-xs mt-1">{formatTimeAgo(activity.timestamp)}</p>
                </div>
                <Badge
                  variant="secondary"
                  className={`${
                    activity.type === 'claim'
                      ? 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
                      : activity.type === 'favorite'
                      ? 'bg-red-600/40 text-red-100 border-red-400/50'
                      : 'bg-blue-600/40 text-blue-100 border-blue-400/50'
                  } text-xs font-semibold`}
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

