'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PieChart, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LetterDistribution {
  name: string
  totalLetters: number
  letterCounts: Array<{ letter: string; count: number; percentage: number }>
  distribution: {
    vowels: number
    consonants: number
    numbers: number
    special: number
  }
  mostFrequent: string[]
  leastFrequent: string[]
}

export function NameLetterDistribution() {
  const [name, setName] = useState('')
  const [distribution, setDistribution] = useState<LetterDistribution | null>(null)
  const { toast } = useToast()

  const analyzeDistribution = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const letterCounts: Record<string, number> = {}
    let vowels = 0
    let consonants = 0
    let numbers = 0
    let special = 0

    for (const char of normalized) {
      if (/[a-z]/.test(char)) {
        letterCounts[char] = (letterCounts[char] || 0) + 1
        if (/[aeiou]/.test(char)) {
          vowels++
        } else {
          consonants++
        }
      } else if (/[0-9]/.test(char)) {
        numbers++
      } else {
        special++
      }
    }

    const totalLetters = normalized.length
    const letterDistribution = Object.entries(letterCounts)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage: Math.round((count / totalLetters) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    const maxCount = letterDistribution[0]?.count || 0
    const minCount = letterDistribution[letterDistribution.length - 1]?.count || 0
    const mostFrequent = letterDistribution
      .filter((l) => l.count === maxCount)
      .map((l) => l.letter)
    const leastFrequent = letterDistribution
      .filter((l) => l.count === minCount)
      .map((l) => l.letter)

    setDistribution({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      totalLetters,
      letterCounts: letterDistribution,
      distribution: {
        vowels,
        consonants,
        numbers,
        special,
      },
      mostFrequent,
      leastFrequent,
    })

    toast({
      title: "Distribution analyzed!",
      description: `${vowels} vowels, ${consonants} consonants`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <PieChart className="h-5 w-5 text-purple-400" />
          Letter Distribution
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze letter distribution in names
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeDistribution()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeDistribution}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {distribution && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{distribution.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Vowels</p>
                <p className="text-2xl font-bold text-white">{distribution.distribution.vowels}</p>
                <p className="text-white/60 text-xs mt-1">
                  {Math.round((distribution.distribution.vowels / distribution.totalLetters) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Consonants</p>
                <p className="text-2xl font-bold text-white">{distribution.distribution.consonants}</p>
                <p className="text-white/60 text-xs mt-1">
                  {Math.round((distribution.distribution.consonants / distribution.totalLetters) * 100)}%
                </p>
              </div>
            </div>

            {distribution.mostFrequent.length > 0 && (
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Most Frequent</h4>
                <div className="flex flex-wrap gap-2">
                  {distribution.mostFrequent.map((letter, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-600/40 text-green-100 border-green-400/50 font-bold text-lg px-3 py-1"
                    >
                      {letter}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {distribution.leastFrequent.length > 0 && distribution.leastFrequent[0] !== distribution.mostFrequent[0] && (
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Least Frequent</h4>
                <div className="flex flex-wrap gap-2">
                  {distribution.leastFrequent.map((letter, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-bold text-lg px-3 py-1"
                    >
                      {letter}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Full Distribution</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {distribution.letterCounts.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {item.letter}
                    </Badge>
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-semibold min-w-[3rem] text-right">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !distribution && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze distribution</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

