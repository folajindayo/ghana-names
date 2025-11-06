'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TrendData {
  name: string
  currentRank: number
  previousRank: number
  change: number
  trend: 'up' | 'down' | 'stable'
  popularity: number
  growthRate: number
}

export function NameTrendAnalyzer() {
  const [name, setName] = useState('')
  const [trend, setTrend] = useState<TrendData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()

  const analyzeTrend = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to analyze",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setTimeout(() => {
      const normalized = name.toLowerCase().trim()
      const mockTrend: TrendData = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        currentRank: Math.floor(Math.random() * 50) + 1,
        previousRank: Math.floor(Math.random() * 50) + 51,
        change: 0,
        trend: 'up',
        popularity: Math.floor(Math.random() * 40) + 60,
        growthRate: Math.floor(Math.random() * 30) + 10,
      }

      mockTrend.change = mockTrend.previousRank - mockTrend.currentRank
      if (mockTrend.change > 0) {
        mockTrend.trend = 'up'
      } else if (mockTrend.change < 0) {
        mockTrend.trend = 'down'
      } else {
        mockTrend.trend = 'stable'
      }

      setTrend(mockTrend)
      setIsAnalyzing(false)
      toast({
        title: "Trend analyzed!",
        description: `${mockTrend.name} is trending ${mockTrend.trend}`,
      })
    }, 800)
  }

  const getTrendIcon = () => {
    if (!trend) return null
    switch (trend.trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-400" />
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-400" />
      case 'stable':
        return <Minus className="h-5 w-5 text-yellow-400" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return ''
    switch (trend.trend) {
      case 'up':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'down':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      case 'stable':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Trend Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze name popularity trends over time
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeTrend()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeTrend}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {isAnalyzing ? (
                <Sparkles className="h-4 w-4 animate-pulse" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {trend && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{trend.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                {getTrendIcon()}
                <Badge variant="secondary" className={`${getTrendColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                  {trend.trend} Trend
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Current Rank</p>
                <p className="text-2xl font-bold text-white">#{trend.currentRank}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Previous Rank</p>
                <p className="text-2xl font-bold text-white">#{trend.previousRank}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Rank Change</span>
                <Badge
                  variant="secondary"
                  className={
                    trend.change > 0
                      ? 'bg-green-600/40 text-green-100 border-green-400/50 font-semibold'
                      : trend.change < 0
                      ? 'bg-red-600/40 text-red-100 border-red-400/50 font-semibold'
                      : 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50 font-semibold'
                  }
                >
                  {trend.change > 0 ? '+' : ''}
                  {trend.change}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/70 text-xs mb-1">Popularity</p>
                <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${trend.popularity}%` }}
                  />
                </div>
                <p className="text-white font-semibold text-sm">{trend.popularity}%</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/70 text-xs mb-1">Growth Rate</p>
                <p className="text-2xl font-bold text-white">{trend.growthRate}%</p>
                <p className="text-white/60 text-xs">per month</p>
              </div>
            </div>
          </div>
        )}

        {name && !trend && !isAnalyzing && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze trends</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

