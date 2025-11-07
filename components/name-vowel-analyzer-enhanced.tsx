'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Sparkles, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface VowelAnalysis {
  name: string
  vowels: string[]
  vowelCount: number
  vowelPercentage: number
  vowelTypes: {
    short: string[]
    long: string[]
  }
  vowelPattern: string
  recommendations: string[]
}

export function NameVowelAnalyzerEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<VowelAnalysis | null>(null)
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

    const normalized = name.trim().toLowerCase()
    const vowels = normalized.match(/[aeiou]/g) || []
    const totalChars = normalized.replace(/\s/g, '').length
    const vowelPercentage = totalChars > 0 ? (vowels.length / totalChars) * 100 : 0

    // Categorize vowels
    const shortVowels = vowels.filter((v) => ['a', 'e', 'i', 'o', 'u'].includes(v))
    const longVowels: string[] = [] // In a real implementation, would detect long vowel patterns

    // Determine pattern
    let pattern = 'Mixed'
    if (vowelPercentage > 50) {
      pattern = 'Vowel-heavy'
    } else if (vowelPercentage < 30) {
      pattern = 'Consonant-heavy'
    } else {
      pattern = 'Balanced'
    }

    const recommendations: string[] = []
    if (vowelPercentage > 60) {
      recommendations.push('Very vowel-heavy name - may sound melodic')
    } else if (vowelPercentage < 25) {
      recommendations.push('Consonant-heavy - may be harder to pronounce')
    }

    if (vowels.length === 0) {
      recommendations.push('No vowels found - check spelling')
    }

    setAnalysis({
      name: name.trim(),
      vowels: [...new Set(vowels)],
      vowelCount: vowels.length,
      vowelPercentage,
      vowelTypes: {
        short: [...new Set(shortVowels)],
        long: longVowels,
      },
      vowelPattern: pattern,
      recommendations,
    })

    toast({
      title: "Analysis complete!",
      description: `Found ${vowels.length} vowel(s)`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-purple-400" />
          Enhanced Vowel Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze vowel patterns and pronunciation
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50">
                {analysis.vowelPattern}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Vowel Count</p>
                <p className="text-2xl font-bold text-white">{analysis.vowelCount}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Vowel %</p>
                <p className="text-2xl font-bold text-white">{analysis.vowelPercentage.toFixed(1)}%</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Unique Vowels</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.vowels.map((vowel, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-lg px-3 py-1"
                  >
                    {vowel.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>

            {analysis.recommendations.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Insights</h4>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                      <TrendingUp className="h-3 w-3 text-purple-400 mt-1" />
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
            <p className="text-white/60 text-sm">Enter a name and click analyze to see vowel breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

