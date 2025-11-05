'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Music, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RhythmAnalysis {
  name: string
  syllables: number
  stressPattern: string
  rhythm: 'smooth' | 'rhythmic' | 'staccato' | 'flowing'
  flow: string
  meter: string
}

export function NameRhythmAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<RhythmAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeRhythm = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    
    // Count syllables (simple approximation)
    const vowels = normalized.match(/[aeiou]/gi) || []
    const syllables = Math.max(1, vowels.length)

    // Determine stress pattern
    let stressPattern = ''
    let rhythm: RhythmAnalysis['rhythm'] = 'smooth'
    let flow = ''
    let meter = ''

    if (syllables === 1) {
      stressPattern = '●'
      rhythm = 'staccato'
      flow = 'Short and punchy'
      meter = 'Monosyllabic'
    } else if (syllables === 2) {
      stressPattern = '● ○'
      rhythm = 'rhythmic'
      flow = 'Balanced and rhythmic'
      meter = 'Trochaic'
    } else if (syllables === 3) {
      stressPattern = '● ○ ○'
      rhythm = 'flowing'
      flow = 'Elegant and flowing'
      meter = 'Dactylic'
    } else {
      stressPattern = '● ○ ○ ○'
      rhythm = 'flowing'
      flow = 'Complex and melodic'
      meter = 'Polysyllabic'
    }

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      syllables,
      stressPattern,
      rhythm,
      flow,
      meter,
    })

    toast({
      title: "Rhythm analyzed!",
      description: `${analysis?.name || name} has ${syllables} syllable${syllables !== 1 ? 's' : ''}`,
    })
  }

  const getRhythmColor = () => {
    if (!analysis) return ''
    switch (analysis.rhythm) {
      case 'smooth':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'rhythmic':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'staccato':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'flowing':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="h-5 w-5 text-pink-400" />
          Name Rhythm Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze the rhythm and flow of names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeRhythm()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeRhythm}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Music className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <Badge variant="secondary" className={`${getRhythmColor()} font-semibold text-sm px-3 py-1`}>
                {analysis.rhythm.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Syllables</p>
                <p className="text-2xl font-bold text-white">{analysis.syllables}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Meter</p>
                <p className="text-white font-semibold text-sm">{analysis.meter}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <p className="text-white/70 text-xs mb-2">Stress Pattern</p>
              <p className="text-white font-mono text-xl text-center">{analysis.stressPattern}</p>
              <p className="text-white/60 text-xs text-center mt-1">● = Stressed, ○ = Unstressed</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <p className="text-white/70 text-xs mb-1">Flow</p>
              <p className="text-white/90 text-sm">{analysis.flow}</p>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

