'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LetterFrequency {
  letter: string
  count: number
  percentage: number
}

interface FrequencyAnalysis {
  name: string
  totalLetters: number
  vowels: number
  consonants: number
  letterFrequencies: LetterFrequency[]
  mostCommon: string[]
  leastCommon: string[]
}

export function NameFrequencyCounter() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<FrequencyAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeFrequency = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().replace(/\s/g, '')
    const letterCounts: Record<string, number> = {}

    // Count each letter
    for (const char of normalized) {
      if (/[a-z]/.test(char)) {
        letterCounts[char] = (letterCounts[char] || 0) + 1
      }
    }

    const totalLetters = normalized.length
    const vowels = (normalized.match(/[aeiou]/gi) || []).length
    const consonants = totalLetters - vowels

    // Calculate frequencies
    const letterFrequencies: LetterFrequency[] = Object.entries(letterCounts)
      .map(([letter, count]) => ({
        letter: letter.toUpperCase(),
        count,
        percentage: Math.round((count / totalLetters) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    const mostCommon = letterFrequencies
      .filter((f) => f.count === letterFrequencies[0]?.count)
      .map((f) => f.letter)
    const leastCommon = letterFrequencies
      .filter((f) => f.count === letterFrequencies[letterFrequencies.length - 1]?.count)
      .map((f) => f.letter)

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      totalLetters,
      vowels,
      consonants,
      letterFrequencies,
      mostCommon,
      leastCommon,
    })

    toast({
      title: "Frequency analyzed!",
      description: `${totalLetters} letters, ${vowels} vowels, ${consonants} consonants`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-indigo-400" />
          Frequency Counter
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze letter frequency in names
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
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{analysis.name}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Total</p>
                <p className="text-2xl font-bold text-white">{analysis.totalLetters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Vowels</p>
                <p className="text-2xl font-bold text-white">{analysis.vowels}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Consonants</p>
                <p className="text-2xl font-bold text-white">{analysis.consonants}</p>
              </div>
            </div>

            {analysis.mostCommon.length > 0 && (
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Most Common Letter(s)</h4>
                <div className="flex gap-2">
                  {analysis.mostCommon.map((letter, index) => (
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

            {analysis.leastCommon.length > 0 && analysis.leastCommon[0] !== analysis.mostCommon[0] && (
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Least Common Letter(s)</h4>
                <div className="flex gap-2">
                  {analysis.leastCommon.map((letter, index) => (
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
              <h4 className="text-white font-semibold mb-2 text-sm">Letter Frequencies</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analysis.letterFrequencies.map((freq, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {freq.letter}
                    </Badge>
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${freq.percentage}%` }}
                      />
                    </div>
                    <span className="text-white/80 text-xs font-semibold min-w-[3rem] text-right">
                      {freq.count} ({freq.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze frequency</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

