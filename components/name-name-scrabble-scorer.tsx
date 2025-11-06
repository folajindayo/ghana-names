'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ScrabbleScore {
  name: string
  totalScore: number
  letterScores: Array<{ letter: string; score: number }>
  wordMultipliers: {
    double: boolean
    triple: boolean
  }
  maxPossibleScore: number
  breakdown: string[]
}

const scrabbleValues: Record<string, number> = {
  a: 1, e: 1, i: 1, o: 1, u: 1, l: 1, n: 1, r: 1, s: 1, t: 1,
  d: 2, g: 2,
  b: 3, c: 3, m: 3, p: 3,
  f: 4, h: 4, v: 4, w: 4, y: 4,
  k: 5,
  j: 8, x: 8,
  q: 10, z: 10,
}

export function NameScrabbleScorer() {
  const [name, setName] = useState('')
  const [score, setScore] = useState<ScrabbleScore | null>(null)
  const { toast } = useToast()

  const calculateScore = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim().replace(/\s/g, '')
    let totalScore = 0
    const letterScores: Array<{ letter: string; score: number }> = []

    for (const char of normalized) {
      const letterScore = scrabbleValues[char] || 0
      totalScore += letterScore
      letterScores.push({
        letter: char.toUpperCase(),
        score: letterScore,
      })
    }

    // Calculate max possible with word multipliers
    const maxPossibleScore = totalScore * 3 // Triple word score

    const breakdown: string[] = []
    breakdown.push(`Base score: ${totalScore} points`)
    if (normalized.length >= 7) {
      breakdown.push('Bonus: 50 points for using all 7+ letters')
    }
    breakdown.push(`Max possible (with multipliers): ${maxPossibleScore} points`)

    setScore({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      totalScore,
      letterScores,
      wordMultipliers: {
        double: false,
        triple: false,
      },
      maxPossibleScore,
      breakdown,
    })

    toast({
      title: "Score calculated!",
      description: `${totalScore} points in Scrabble`,
    })
  }

  const getScoreColor = () => {
    if (!score) return ''
    if (score.totalScore >= 20) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (score.totalScore >= 10) return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Scrabble Scorer
        </CardTitle>
        <CardDescription className="text-white/70">
          Calculate Scrabble scores for names
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
              onKeyPress={(e) => e.key === 'Enter' && calculateScore()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculateScore}
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
                <Trophy className="h-8 w-8 text-yellow-400" />
                <div className="text-4xl font-bold text-white">{score.totalScore}</div>
                <span className="text-white/60">points</span>
              </div>
              <Badge variant="secondary" className={`${getScoreColor()} font-semibold text-lg px-4 py-2`}>
                Scrabble Score
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Letter Scores</h4>
              <div className="flex flex-wrap gap-2">
                {score.letterScores.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 font-bold text-sm px-2 py-1">
                      {item.letter}
                    </Badge>
                    <span className="text-white/80 text-xs mt-1">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Score Breakdown</h4>
              <ul className="space-y-1">
                {score.breakdown.map((item, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <Trophy className="h-3 w-3 text-yellow-400 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Max Possible Score</span>
                <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 font-bold">
                  {score.maxPossibleScore}
                </Badge>
              </div>
              <p className="text-white/70 text-xs mt-2">With triple word score multiplier</p>
            </div>
          </div>
        )}

        {name && !score && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to calculate score</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

