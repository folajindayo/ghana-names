'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface VowelAnalysis {
  name: string
  totalVowels: number
  uniqueVowels: number
  vowelFrequency: Array<{ vowel: string; count: number; percentage: number }>
  vowelPattern: string
  flow: 'smooth' | 'moderate' | 'choppy'
  characteristics: string[]
}

export function NameVowelAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<VowelAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeVowels = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const vowels = normalized.match(/[aeiou]/gi) || []
    const totalVowels = vowels.length
    const uniqueVowels = new Set(vowels.map((v) => v.toLowerCase())).size

    // Count each vowel
    const vowelCounts: Record<string, number> = {}
    vowels.forEach((v) => {
      const vowel = v.toLowerCase()
      vowelCounts[vowel] = (vowelCounts[vowel] || 0) + 1
    })

    const vowelFrequency = Object.entries(vowelCounts)
      .map(([vowel, count]) => ({
        vowel: vowel.toUpperCase(),
        count,
        percentage: Math.round((count / totalVowels) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    // Determine vowel pattern
    let vowelPattern = 'Mixed vowels'
    if (vowelFrequency.length === 1) {
      vowelPattern = `Dominant: ${vowelFrequency[0].vowel}`
    } else if (vowelFrequency.length === 2) {
      vowelPattern = `${vowelFrequency[0].vowel} and ${vowelFrequency[1].vowel}`
    }

    // Determine flow
    const vowelRatio = totalVowels / normalized.length
    let flow: 'smooth' | 'moderate' | 'choppy' = 'moderate'
    if (vowelRatio >= 0.4) {
      flow = 'smooth'
    } else if (vowelRatio < 0.25) {
      flow = 'choppy'
    }

    const characteristics: string[] = []
    if (totalVowels >= normalized.length * 0.4) {
      characteristics.push('Vowel-rich name')
      characteristics.push('Easy to pronounce')
    }
    if (uniqueVowels >= 3) {
      characteristics.push('Varied vowel sounds')
    }
    if (vowelRatio < 0.3) {
      characteristics.push('Consonant-heavy')
    }

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      totalVowels,
      uniqueVowels,
      vowelFrequency,
      vowelPattern,
      flow,
      characteristics,
    })

    toast({
      title: "Vowels analyzed!",
      description: `${totalVowels} vowels, ${uniqueVowels} unique - ${flow} flow`,
    })
  }

  const getFlowColor = () => {
    if (!analysis) return ''
    switch (analysis.flow) {
      case 'smooth':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'moderate':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'choppy':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mic className="h-5 w-5 text-pink-400" />
          Vowel Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze vowel patterns and pronunciation flow
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeVowels()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeVowels}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Total</p>
                  <p className="text-3xl font-bold text-white">{analysis.totalVowels}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Unique</p>
                  <p className="text-3xl font-bold text-white">{analysis.uniqueVowels}</p>
                </div>
              </div>
              <Badge variant="secondary" className={`${getFlowColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {analysis.flow} Flow
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Vowel Pattern</h4>
              <p className="text-white/90 text-base">{analysis.vowelPattern}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Vowel Frequency</h4>
              <div className="space-y-2">
                {analysis.vowelFrequency.map((freq, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {freq.vowel}
                    </Badge>
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all"
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

            {analysis.characteristics.length > 0 && (
              <div className="p-3 bg-pink-500/10 rounded border border-pink-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Characteristics</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.characteristics.map((char, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-pink-600/40 text-pink-100 border-pink-400/50 font-semibold text-xs"
                    >
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze vowels</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

