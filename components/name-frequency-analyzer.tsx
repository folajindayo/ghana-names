'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Search, TrendingUp, TrendingDown } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FrequencyData {
  name: string
  frequency: number
  trend: 'up' | 'down' | 'stable'
  rank: number
  percentage: number
}

export function NameFrequencyAnalyzer() {
  const [name, setName] = useState('')
  const [data, setData] = useState<FrequencyData | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const analyzeFrequency = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate API call - in real app, this would fetch from analytics
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data based on name
      const mockData: Record<string, FrequencyData> = {
        kwame: {
          name: 'Kwame',
          frequency: 1250,
          trend: 'up',
          rank: 1,
          percentage: 12.5,
        },
        akosua: {
          name: 'Akosua',
          frequency: 890,
          trend: 'up',
          rank: 2,
          percentage: 8.9,
        },
        kofi: {
          name: 'Kofi',
          frequency: 750,
          trend: 'stable',
          rank: 3,
          percentage: 7.5,
        },
        ama: {
          name: 'Ama',
          frequency: 620,
          trend: 'up',
          rank: 4,
          percentage: 6.2,
        },
      }

      const normalized = name.toLowerCase().trim()
      const found = mockData[normalized]

      if (found) {
        setData(found)
        toast({
          title: "Analysis complete!",
          description: `${found.name} is ranked #${found.rank}`,
        })
      } else {
        // Generate random data for unknown names
        const randomData: FrequencyData = {
          name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
          frequency: Math.floor(Math.random() * 500) + 100,
          trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
          rank: Math.floor(Math.random() * 50) + 10,
          percentage: Math.random() * 5,
        }
        setData(randomData)
        toast({
          title: "Analysis complete!",
          description: `Frequency data for ${randomData.name}`,
        })
      }
    } catch (error) {
      console.error('Analysis error:', error)
      toast({
        title: "Analysis failed",
        description: "Unable to analyze frequency",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getTrendIcon = () => {
    if (!data) return null
    switch (data.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <BarChart3 className="h-4 w-4 text-blue-400" />
    }
  }

  const getTrendColor = () => {
    if (!data) return ''
    switch (data.trend) {
      case 'up':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'down':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      default:
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Name Frequency Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze how popular a name is
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeFrequency()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeFrequency}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading && (
          <div className="py-8 text-center">
            <BarChart3 className="h-8 w-8 animate-pulse text-blue-400 mx-auto" />
          </div>
        )}

        {data && !loading && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{data.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                {getTrendIcon()}
                <Badge variant="secondary" className={`${getTrendColor()} font-semibold`}>
                  {data.trend.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Total Usage</p>
                <p className="text-2xl font-bold text-white">{data.frequency.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Rank</p>
                <p className="text-2xl font-bold text-white">#{data.rank}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/70 text-sm">Market Share</p>
                <p className="text-white font-semibold">{data.percentage.toFixed(1)}%</p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(data.percentage * 10, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {name && !data && !loading && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click search to analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

