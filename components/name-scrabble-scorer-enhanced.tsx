'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Sparkles, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ScrabbleScore {
  name: string
  totalScore: number
  letterScores: Array<{ letter: string; score: number }>
  wordMultiplier: number
  bonusPoints: number
  breakdown: string
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

export function NameScrabbleScorerEnhanced() {
  const [name, setName] = useState('')
  const [score, setScore] = useState<ScrabbleScore | null>(null)
  const { toast } = useToast()

  const calculate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().toLowerCase().replace(/\s/g, '')
    const letterScores: Array<{ letter: string; score: number }> = []
    let totalScore = 0
    let bonusPoints = 0

    for (const char of normalized) {
      const letterScore = scrabbleValues[char] || 0
      letterScores.push({
        letter: char.toUpperCase(),
        score: letterScore,
      })
      totalScore += letterScore
    }

    // Bonus for length
    if (normalized.length >= 7) {
      bonusPoints += 50
    } else if (normalized.length >= 5) {
      bonusPoints += 10
    }

    // Bonus for using all vowels
    const vowels = ['a', 'e', 'i', 'o', 'u']
    const hasAllVowels = vowels.every((v) => normalized.includes(v))
    if (hasAllVowels) {
      bonusPoints += 20
    }

    const finalScore = totalScore + bonusPoints
    const breakdown = letterScores.map((ls) => `${ls.letter}(${ls.score})`).join(' + ')

    setScore({
      name: name.trim(),
      totalScore: finalScore,
      letterScores,
      wordMultiplier: 1,
      bonusPoints,
      breakdown,
    })

    toast({
      title: "Score calculated!",
      description: `Scrabble score: ${finalScore} points`,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 50) return 'bg-green-500/40 text-green-100 border-green-400/50'
    if (score >= 30) return 'bg-blue-500/40 text-blue-100 border-blue-400/50'
    if (score >= 15) return 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
    return 'bg-orange-500/40 text-orange-100 border-orange-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-400" />
          Enhanced Scrabble Scorer
        </CardTitle>
        <CardDescription className="text-white/70">
          Calculate Scrabble score for names with bonuses
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
              onKeyPress={(e) => e.key === 'Enter' && calculate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {score && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">{score.name}</h3>
              </div>
              <Badge variant="secondary" className={getScoreColor(score.totalScore)}>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="text-2xl font-bold">{score.totalScore} Points</span>
                </div>
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Score Breakdown</h4>
              <p className="text-white/80 text-sm font-mono mb-2">{score.breakdown}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Base Score:</span>
                <span className="text-white font-semibold">{score.totalScore - score.bonusPoints} points</span>
              </div>
              {score.bonusPoints > 0 && (
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-white/70">Bonus Points:</span>
                  <span className="text-green-400 font-semibold">+{score.bonusPoints} points</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Letter Scores</h4>
              <div className="flex flex-wrap gap-2">
                {score.letterScores.map((ls, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 text-xs"
                  >
                    {ls.letter}: {ls.score}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !score && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click calculate to see Scrabble score</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

