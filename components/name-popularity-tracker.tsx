'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Sparkles, BarChart3, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PopularityData {
  name: string
  currentRank: number
  previousRank: number
  change: number
  views: number
  favorites: number
  shares: number
  trend: 'up' | 'down' | 'stable'
}

const sampleData: Record<string, PopularityData> = {
  Kwame: {
    name: 'Kwame',
    currentRank: 1,
    previousRank: 2,
    change: 1,
    views: 1245,
    favorites: 342,
    shares: 89,
    trend: 'up',
  },
  Akosua: {
    name: 'Akosua',
    currentRank: 2,
    previousRank: 1,
    change: -1,
    views: 1123,
    favorites: 298,
    shares: 76,
    trend: 'down',
  },
  Kofi: {
    name: 'Kofi',
    currentRank: 3,
    previousRank: 3,
    change: 0,
    views: 987,
    favorites: 256,
    shares: 65,
    trend: 'stable',
  },
}

export function NamePopularityTracker() {
  const [name, setName] = useState('')
  const [data, setData] = useState<PopularityData | null>(null)
  const { toast } = useToast()

  const track = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const found = sampleData[normalized]

    if (found) {
      setData(found)
      toast({
        title: "Popularity data found!",
        description: `Rank: #${found.currentRank}`,
      })
    } else {
      // Generate mock data for names not in database
      const mockData: PopularityData = {
        name: normalized,
        currentRank: Math.floor(Math.random() * 50) + 1,
        previousRank: Math.floor(Math.random() * 50) + 1,
        change: Math.floor(Math.random() * 10) - 5,
        views: Math.floor(Math.random() * 1000) + 100,
        favorites: Math.floor(Math.random() * 300) + 50,
        shares: Math.floor(Math.random() * 100) + 10,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable',
      }
      mockData.change = mockData.currentRank - mockData.previousRank
      if (mockData.change > 0) mockData.trend = 'down'
      else if (mockData.change < 0) mockData.trend = 'up'
      else mockData.trend = 'stable'
      setData(mockData)
      toast({
        title: "Tracking started!",
        description: `Now tracking ${normalized}`,
      })
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-500/40 text-green-100 border-green-400/50'
      case 'down':
        return 'bg-red-500/40 text-red-100 border-red-400/50'
      default:
        return 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      default:
        return <BarChart3 className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Popularity Tracker
        </CardTitle>
        <CardDescription className="text-white/70">
          Track name popularity and ranking changes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && track()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={track}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{data.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-lg px-3 py-1">
                  Rank #{data.currentRank}
                </Badge>
                <Badge variant="secondary" className={getTrendColor(data.trend)}>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(data.trend)}
                    <span>
                      {data.change > 0 ? `+${data.change}` : data.change < 0 ? data.change : 'No change'}
                    </span>
                  </div>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span className="text-white/70 text-xs">Views</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.views.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-4 w-4 text-red-400" />
                  <span className="text-white/70 text-xs">Favorites</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.favorites.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="h-4 w-4 text-green-400" />
                  <span className="text-white/70 text-xs">Shares</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.shares.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Ranking History</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Previous Rank:</span>
                <span className="text-white font-semibold">#{data.previousRank}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-white/70">Current Rank:</span>
                <span className="text-white font-semibold">#{data.currentRank}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-white/70">Change:</span>
                <span
                  className={`font-semibold ${
                    data.change > 0 ? 'text-green-400' : data.change < 0 ? 'text-red-400' : 'text-yellow-400'
                  }`}
                >
                  {data.change > 0 ? `↑ +${data.change}` : data.change < 0 ? `↓ ${data.change}` : '→ No change'}
                </span>
              </div>
            </div>
          </div>
        )}

        {name && !data && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click track to see popularity data</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

