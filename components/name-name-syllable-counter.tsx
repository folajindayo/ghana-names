'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SyllableAnalysis {
  name: string
  syllableCount: number
  syllables: string[]
  stressPattern: string
  rhythm: 'monosyllabic' | 'disyllabic' | 'trisyllabic' | 'polysyllabic'
  pronunciation: string
}

export function NameSyllableCounter() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<SyllableAnalysis | null>(null)
  const { toast } = useToast()

  const countSyllables = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    
    // Simple syllable counting algorithm
    const vowels = normalized.match(/[aeiouy]+/gi) || []
    let syllableCount = vowels.length

    // Adjust for silent e
    if (normalized.endsWith('e') && syllableCount > 1) {
      syllableCount--
    }

    // Adjust for diphthongs
    const diphthongs = normalized.match(/[aeiou]{2}/gi) || []
    syllableCount -= diphthongs.length

    // Ensure at least 1 syllable
    syllableCount = Math.max(1, syllableCount)

    // Split into syllables (simplified)
    const syllables: string[] = []
    let currentSyllable = ''
    let vowelFound = false

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i]
      const isVowel = /[aeiouy]/.test(char)
      
      if (isVowel) {
        if (vowelFound && currentSyllable.length > 0) {
          syllables.push(currentSyllable)
          currentSyllable = char
        } else {
          currentSyllable += char
        }
        vowelFound = true
      } else {
        currentSyllable += char
      }
    }
    
    if (currentSyllable) {
      syllables.push(currentSyllable)
    }

    // Ensure syllables match count
    if (syllables.length !== syllableCount) {
      // Simple split if count doesn't match
      const splitPoint = Math.ceil(normalized.length / syllableCount)
      syllables.length = 0
      for (let i = 0; i < syllableCount; i++) {
        const start = i * splitPoint
        const end = Math.min(start + splitPoint, normalized.length)
        syllables.push(normalized.slice(start, end))
      }
    }

    // Determine stress pattern
    let stressPattern = 'First syllable stressed'
    if (syllableCount === 1) {
      stressPattern = 'Single syllable'
    } else if (syllableCount >= 3) {
      stressPattern = 'Multiple stress points'
    }

    // Determine rhythm
    let rhythm: SyllableAnalysis['rhythm'] = 'monosyllabic'
    if (syllableCount === 2) rhythm = 'disyllabic'
    else if (syllableCount === 3) rhythm = 'trisyllabic'
    else if (syllableCount > 3) rhythm = 'polysyllabic'

    const pronunciation = syllables.join('-').toUpperCase()

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      syllableCount,
      syllables,
      stressPattern,
      rhythm,
      pronunciation,
    })

    toast({
      title: "Syllables counted!",
      description: `${syllableCount} syllable${syllableCount !== 1 ? 's' : ''} - ${rhythm}`,
    })
  }

  const getRhythmColor = () => {
    if (!analysis) return ''
    switch (analysis.rhythm) {
      case 'monosyllabic':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'disyllabic':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'trisyllabic':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'polysyllabic':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-cyan-400" />
          Syllable Counter
        </CardTitle>
        <CardDescription className="text-white/70">
          Count and analyze syllables in names
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
              onKeyPress={(e) => e.key === 'Enter' && countSyllables()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={countSyllables}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-4xl font-bold text-white">{analysis.syllableCount}</div>
                <span className="text-white/60">syllable{analysis.syllableCount !== 1 ? 's' : ''}</span>
              </div>
              <Badge variant="secondary" className={`${getRhythmColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {analysis.rhythm}
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Syllables</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.syllables.map((syllable, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 font-bold text-sm px-3 py-1"
                  >
                    {syllable.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Pronunciation</h4>
              <p className="text-white/90 text-base font-mono">{analysis.pronunciation}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Stress Pattern</h4>
              <p className="text-white/80 text-sm">{analysis.stressPattern}</p>
            </div>

            <div className="p-3 bg-cyan-500/10 rounded border border-cyan-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm">Rhythm Type</h4>
              <p className="text-white/80 text-xs">
                {analysis.rhythm === 'monosyllabic' && 'Single syllable names are short and punchy'}
                {analysis.rhythm === 'disyllabic' && 'Two-syllable names have a balanced rhythm'}
                {analysis.rhythm === 'trisyllabic' && 'Three-syllable names flow smoothly'}
                {analysis.rhythm === 'polysyllabic' && 'Multi-syllable names are elegant and distinctive'}
              </p>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to count syllables</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

