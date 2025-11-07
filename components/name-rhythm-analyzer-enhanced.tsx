'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Music, Sparkles, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RhythmAnalysis {
  name: string
  syllables: number
  stressPattern: string
  flow: 'excellent' | 'good' | 'fair' | 'poor'
  rhythmScore: number
  vowelConsonantRatio: number
  recommendations: string[]
}

export function NameRhythmAnalyzerEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<RhythmAnalysis | null>(null)
  const { toast } = useToast()

  const analyze = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const vowels = (normalized.match(/[aeiouAEIOU]/g) || []).length
    const consonants = (normalized.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length
    const total = vowels + consonants
    const ratio = total > 0 ? (vowels / total) * 100 : 0

    // Simple syllable estimation
    const syllableEstimate = Math.max(1, Math.floor(vowels * 1.2))

    // Stress pattern (simple heuristic)
    let stressPattern = ''
    if (normalized.length <= 3) {
      stressPattern = 'Single stress'
    } else if (normalized.length <= 6) {
      stressPattern = 'Primary-secondary'
    } else {
      stressPattern = 'Multiple stress points'
    }

    // Flow assessment
    let flow: 'excellent' | 'good' | 'fair' | 'poor' = 'good'
    let rhythmScore = 70
    const recommendations: string[] = []

    if (ratio >= 40 && ratio <= 60) {
      flow = 'excellent'
      rhythmScore = 95
    } else if (ratio >= 30 && ratio <= 70) {
      flow = 'good'
      rhythmScore = 80
    } else if (ratio >= 20 && ratio <= 80) {
      flow = 'fair'
      rhythmScore = 65
    } else {
      flow = 'poor'
      rhythmScore = 50
      recommendations.push('Consider adjusting vowel-consonant balance')
    }

    if (syllableEstimate > 4) {
      recommendations.push('Name has many syllables - may be harder to pronounce')
    } else if (syllableEstimate < 2) {
      recommendations.push('Very short name - consider adding a syllable for better flow')
    }

    if (normalized.length > 10) {
      recommendations.push('Long name - may be difficult to remember')
    }

    setAnalysis({
      name: normalized,
      syllables: syllableEstimate,
      stressPattern,
      flow,
      rhythmScore,
      vowelConsonantRatio: ratio,
      recommendations,
    })

    toast({
      title: "Analysis complete!",
      description: `Rhythm score: ${rhythmScore}/100`,
    })
  }

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'excellent':
        return 'bg-green-500/40 text-green-100 border-green-400/50'
      case 'good':
        return 'bg-blue-500/40 text-blue-100 border-blue-400/50'
      case 'fair':
        return 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
      default:
        return 'bg-red-500/40 text-red-100 border-red-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="h-5 w-5 text-pink-400" />
          Enhanced Rhythm Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze name rhythm, flow, and pronunciation patterns
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
              onKeyPress={(e) => e.key === 'Enter' && analyze()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyze}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className={getFlowColor(analysis.flow)}>
                  {analysis.flow.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                  Score: {analysis.rhythmScore}/100
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Syllables</p>
                <p className="text-2xl font-bold text-white">{analysis.syllables}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Vowel Ratio</p>
                <p className="text-2xl font-bold text-white">{analysis.vowelConsonantRatio.toFixed(0)}%</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Stress Pattern</h4>
              <p className="text-white/80 text-sm">{analysis.stressPattern}</p>
            </div>

            {analysis.recommendations.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Recommendations</h4>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                      <TrendingUp className="h-3 w-3 text-pink-400 mt-1" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click analyze to see rhythm analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

