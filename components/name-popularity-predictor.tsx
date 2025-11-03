'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'

interface NamePopularityPredictorProps {
  name: string
  tribe?: string
  gender?: 'male' | 'female'
}

interface PopularityData {
  name: string
  currentRank?: number
  trend: 'rising' | 'falling' | 'stable'
  prediction: string
  confidence: number
}

export function NamePopularityPredictor({ name, tribe, gender }: NamePopularityPredictorProps) {
  const [popularity, setPopularity] = useState<PopularityData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (name) {
      predictPopularity()
    }
  }, [name, tribe, gender])

  const predictPopularity = async () => {
    setLoading(true)
    try {
      // Fetch current popularity data
      const response = await fetch('/api/names/popularity')
      if (response.ok) {
        const data = await response.json()
        const popularNames = data.popularNames || []

        // Find if this name is in the popular list
        const nameIndex = popularNames.findIndex(
          (n: any) =>
            n.name.toLowerCase() === name.toLowerCase() &&
            (!tribe || n.tribe === tribe) &&
            (!gender || n.gender === gender)
        )

        // Simple prediction logic
        let trend: 'rising' | 'falling' | 'stable' = 'stable'
        let prediction = 'This name has moderate popularity.'
        let confidence = 50

        if (nameIndex >= 0 && nameIndex < 5) {
          trend = 'rising'
          prediction = 'This name is very popular and trending!'
          confidence = 85
        } else if (nameIndex >= 5 && nameIndex < 10) {
          trend = 'rising'
          prediction = 'This name is gaining popularity.'
          confidence = 70
        } else {
          // Check if similar names are popular
          const similarNames = popularNames.filter((n: any) =>
            n.name.toLowerCase().startsWith(name.toLowerCase().charAt(0))
          )
          if (similarNames.length > 0) {
            trend = 'rising'
            prediction = 'Similar names are popular, this could trend.'
            confidence = 60
          } else {
            trend = 'stable'
            prediction = 'This name maintains steady popularity.'
            confidence = 50
          }
        }

        setPopularity({
          name,
          currentRank: nameIndex >= 0 ? nameIndex + 1 : undefined,
          trend,
          prediction,
          confidence,
        })
      }
    } catch (error) {
      console.error('Error predicting popularity:', error)
      // Default prediction
      setPopularity({
        name,
        trend: 'stable',
        prediction: 'Unable to determine popularity trend.',
        confidence: 30,
      })
    } finally {
      setLoading(false)
    }
  }

  if (!name) return null

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Sparkles className="h-6 w-6 animate-spin text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (!popularity) return null

  const getTrendIcon = () => {
    switch (popularity.trend) {
      case 'rising':
        return <TrendingUp className="h-5 w-5 text-green-400" />
      case 'falling':
        return <TrendingDown className="h-5 w-5 text-red-400" />
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />
    }
  }

  const getTrendColor = () => {
    switch (popularity.trend) {
      case 'rising':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'falling':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    }
  }

  return (
    <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border-indigo-500/30 border">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          {getTrendIcon()}
          Popularity Prediction
        </CardTitle>
        <CardDescription className="text-white/70">
          AI-powered popularity trend analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={getTrendColor()}>
            {popularity.trend.toUpperCase()}
          </Badge>
          {popularity.currentRank && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              Rank #{popularity.currentRank}
            </Badge>
          )}
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            {popularity.confidence}% confidence
          </Badge>
        </div>

        <p className="text-white/90 leading-relaxed">{popularity.prediction}</p>

        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">Confidence Level</span>
            <span className="text-white text-sm">{popularity.confidence}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${popularity.confidence}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

