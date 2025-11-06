'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface UniquenessScore {
  name: string
  score: number
  level: 'very common' | 'common' | 'uncommon' | 'rare' | 'very rare'
  factors: {
    length: number
    letterVariety: number
    patternComplexity: number
    culturalRarity: number
  }
  breakdown: string[]
  recommendations: string[]
}

export function NameUniquenessScorer() {
  const [name, setName] = useState('')
  const [score, setScore] = useState<UniquenessScore | null>(null)
  const { toast } = useToast()

  const calculateUniqueness = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const length = normalized.length
    const uniqueLetters = new Set(normalized.split('')).size
    const letterVariety = Math.round((uniqueLetters / length) * 100)
    
    // Pattern complexity (check for repeated patterns)
    const hasRepeatedPattern = /(.{2,})\1/.test(normalized)
    const patternComplexity = hasRepeatedPattern ? 30 : 70

    // Cultural rarity (based on common Ghanaian name patterns)
    const commonPatterns = ['kw', 'ak', 'ko', 'ya', 'ma']
    const hasCommonPattern = commonPatterns.some((p) => normalized.includes(p))
    const culturalRarity = hasCommonPattern ? 40 : 80

    // Calculate overall score
    const totalScore = Math.round(
      (length * 10 + letterVariety * 0.3 + patternComplexity * 0.3 + culturalRarity * 0.4) / 2
    )
    const finalScore = Math.min(100, Math.max(0, totalScore))

    let level: UniquenessScore['level'] = 'common'
    if (finalScore >= 80) level = 'very rare'
    else if (finalScore >= 60) level = 'rare'
    else if (finalScore >= 40) level = 'uncommon'
    else if (finalScore >= 20) level = 'common'
    else level = 'very common'

    const breakdown: string[] = []
    breakdown.push(`Length: ${length} characters (${length > 7 ? 'long' : length < 4 ? 'short' : 'medium'})`)
    breakdown.push(`Letter variety: ${letterVariety}% (${uniqueLetters} unique letters)`)
    breakdown.push(`Pattern complexity: ${patternComplexity}%`)
    breakdown.push(`Cultural rarity: ${culturalRarity}%`)

    const recommendations: string[] = []
    if (finalScore < 50) {
      recommendations.push('Consider a longer or more unique spelling')
      recommendations.push('Try combining traditional elements in new ways')
    } else if (finalScore >= 80) {
      recommendations.push('This is a very unique name!')
      recommendations.push('May need pronunciation guidance for others')
    }

    setScore({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      score: finalScore,
      level,
      factors: {
        length,
        letterVariety,
        patternComplexity,
        culturalRarity,
      },
      breakdown,
      recommendations,
    })

    toast({
      title: "Uniqueness calculated!",
      description: `${finalScore}% unique - ${level}`,
    })
  }

  const getLevelColor = () => {
    if (!score) return ''
    switch (score.level) {
      case 'very rare':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'rare':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'uncommon':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'common':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
      case 'very common':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Uniqueness Scorer
        </CardTitle>
        <CardDescription className="text-white/70">
          Calculate how unique a name is
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
              onKeyPress={(e) => e.key === 'Enter' && calculateUniqueness()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculateUniqueness}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {score && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{score.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-4xl font-bold text-white">{score.score}</div>
                <span className="text-white/60">/ 100</span>
              </div>
              <Badge variant="secondary" className={`${getLevelColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {score.level}
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="w-full bg-white/10 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all"
                  style={{ width: `${score.score}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2 text-center">Uniqueness Score</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Length</p>
                <p className="text-2xl font-bold text-white">{score.factors.length}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Letter Variety</p>
                <p className="text-2xl font-bold text-white">{score.factors.letterVariety}%</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Pattern</p>
                <p className="text-2xl font-bold text-white">{score.factors.patternComplexity}%</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Cultural Rarity</p>
                <p className="text-2xl font-bold text-white">{score.factors.culturalRarity}%</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Score Breakdown</h4>
              <ul className="space-y-1">
                {score.breakdown.map((item, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <Star className="h-3 w-3 text-yellow-400 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {score.recommendations.length > 0 && (
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Recommendations</h4>
                <ul className="space-y-1">
                  {score.recommendations.map((rec, index) => (
                    <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                      <Sparkles className="h-3 w-3 text-blue-400 mt-1" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !score && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to calculate uniqueness</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

