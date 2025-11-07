'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles, Music } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SyllableAnalysis {
  name: string
  syllableCount: number
  syllables: string[]
  syllablePattern: string
  stressPattern: string
  recommendations: string[]
}

export function NameSyllableCounterEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<SyllableAnalysis | null>(null)
  const { toast } = useToast()

  const countSyllables = (word: string): number => {
    word = word.toLowerCase()
    if (word.length <= 3) return 1
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, '')
    const matches = word.match(/[aeiouy]{1,2}/g)
    return matches ? matches.length : 1
  }

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
    const words = normalized.split(/\s+/)
    let totalSyllables = 0
    const syllableList: string[] = []

    words.forEach((word) => {
      const count = countSyllables(word)
      totalSyllables += count
      syllableList.push(`${word} (${count})`)
    })

    // Determine pattern
    let pattern = 'Simple'
    if (totalSyllables === 1) {
      pattern = 'Monosyllabic'
    } else if (totalSyllables === 2) {
      pattern = 'Disyllabic'
    } else if (totalSyllables === 3) {
      pattern = 'Trisyllabic'
    } else {
      pattern = 'Polysyllabic'
    }

    // Stress pattern (simple heuristic)
    let stressPattern = 'First syllable'
    if (totalSyllables === 1) {
      stressPattern = 'Single stress'
    } else if (totalSyllables === 2) {
      stressPattern = 'First syllable stressed'
    } else if (totalSyllables >= 3) {
      stressPattern = 'Primary on first, secondary on third'
    }

    const recommendations: string[] = []
    if (totalSyllables === 1) {
      recommendations.push('Very short - easy to pronounce and remember')
    } else if (totalSyllables === 2) {
      recommendations.push('Two syllables - good balance of simplicity and character')
    } else if (totalSyllables === 3) {
      recommendations.push('Three syllables - melodic and distinctive')
    } else if (totalSyllables >= 4) {
      recommendations.push('Multiple syllables - may be more complex to pronounce')
    }

    setAnalysis({
      name: normalized,
      syllableCount: totalSyllables,
      syllables: syllableList,
      syllablePattern: pattern,
      stressPattern,
      recommendations,
    })

    toast({
      title: "Analysis complete!",
      description: `Found ${totalSyllables} syllable(s)`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-rose-400" />
          Enhanced Syllable Counter
        </CardTitle>
        <CardDescription className="text-white/70">
          Count syllables and analyze pronunciation patterns
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
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
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
                <Badge variant="secondary" className="bg-rose-600/40 text-rose-100 border-rose-400/50 text-lg px-3 py-1">
                  {analysis.syllableCount} Syllable{analysis.syllableCount !== 1 ? 's' : ''}
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                  {analysis.syllablePattern}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Music className="h-4 w-4 text-rose-400" />
                Syllable Breakdown
              </h4>
              <div className="space-y-1">
                {analysis.syllables.map((syllable, index) => (
                  <div key={index} className="text-white/80 text-sm">
                    {syllable}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Stress Pattern</h4>
              <p className="text-white/80 text-sm">{analysis.stressPattern}</p>
            </div>

            {analysis.recommendations.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Insights</h4>
                <ul className="space-y-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-white/80 text-sm">
                      • {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click analyze to count syllables</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

