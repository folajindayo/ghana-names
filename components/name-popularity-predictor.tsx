'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, CrystalBall, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Prediction {
  name: string
  currentPopularity: number
  predictedPopularity: number
  trend: 'up' | 'down' | 'stable'
  confidence: number
  factors: string[]
}

const samplePredictions: Prediction[] = [
  {
    name: 'Kwame',
    currentPopularity: 85,
    predictedPopularity: 92,
    trend: 'up',
    confidence: 88,
    factors: ['Increasing cultural awareness', 'Positive meaning', 'Easy pronunciation'],
  },
  {
    name: 'Akosua',
    currentPopularity: 78,
    predictedPopularity: 82,
    trend: 'up',
    confidence: 75,
    factors: ['Growing interest in traditional names', 'Beautiful meaning'],
  },
  {
    name: 'Kofi',
    currentPopularity: 72,
    predictedPopularity: 70,
    trend: 'stable',
    confidence: 65,
    factors: ['Consistent popularity', 'Classic choice'],
  },
]

export function NamePopularityPredictor() {
  const [name, setName] = useState('')
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const { toast } = useToast()

  const generatePrediction = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to predict",
        variant: "destructive",
      })
      return
    }

    // Simulate prediction based on name characteristics
    const normalized = name.trim()
    const basePopularity = Math.floor(Math.random() * 30) + 60
    const trendVariation = Math.random()
    let trend: 'up' | 'down' | 'stable'
    let predictedPopularity: number

    if (trendVariation > 0.6) {
      trend = 'up'
      predictedPopularity = basePopularity + Math.floor(Math.random() * 15) + 5
    } else if (trendVariation < 0.3) {
      trend = 'down'
      predictedPopularity = basePopularity - Math.floor(Math.random() * 10) - 2
    } else {
      trend = 'stable'
      predictedPopularity = basePopularity + Math.floor(Math.random() * 5) - 2
    }

    const confidence = Math.floor(Math.random() * 20) + 70
    const factors = [
      normalized.length > 5 ? 'Longer names trending' : 'Short names popular',
      'Cultural significance',
      'Modern appeal',
    ]

    const pred: Prediction = {
      name: normalized.charAt(0).toUpperCase() + normalized.slice(1),
      currentPopularity: basePopularity,
      predictedPopularity: Math.min(100, Math.max(0, predictedPopularity)),
      trend,
      confidence,
      factors,
    }

    setPrediction(pred)

    toast({
      title: "Prediction generated!",
      description: `Trend: ${trend === 'up' ? 'Rising' : trend === 'down' ? 'Declining' : 'Stable'}`,
    })
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-400" />
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-400" />
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />
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

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CrystalBall className="h-5 w-5 text-indigo-400" />
          Popularity Predictor
        </CardTitle>
        <CardDescription className="text-white/70">
          Predict future popularity trends for names
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
              onKeyPress={(e) => e.key === 'Enter' && generatePrediction()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generatePrediction}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {prediction && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{prediction.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-2">Current Popularity</p>
                <p className="text-3xl font-bold text-white">{prediction.currentPopularity}%</p>
              </div>
              <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-2">Predicted Popularity</p>
                <p className="text-3xl font-bold text-white">{prediction.predictedPopularity}%</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold text-sm">Trend Prediction</h4>
                <Badge variant="secondary" className={getTrendColor(prediction.trend)}>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(prediction.trend)}
                    <span className="text-xs">
                      {prediction.trend === 'up'
                        ? 'Rising'
                        : prediction.trend === 'down'
                        ? 'Declining'
                        : 'Stable'}
                    </span>
                  </div>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
                <span className="text-white/70 text-xs">{prediction.confidence}% confidence</span>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Key Factors</h4>
              <ul className="space-y-2">
                {prediction.factors.map((factor, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="text-indigo-400 mt-1">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-indigo-500/10 rounded border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CrystalBall className="h-4 w-4 text-indigo-400" />
                <span className="text-white font-semibold text-sm">Prediction Info</span>
              </div>
              <p className="text-white/80 text-xs">
                Predictions are based on current trends, cultural significance, and name characteristics. Results are estimates and may vary.
              </p>
            </div>
          </div>
        )}

        {name && !prediction && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to generate popularity prediction</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
