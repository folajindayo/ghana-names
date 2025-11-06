'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ConsonantAnalysis {
  name: string
  totalConsonants: number
  uniqueConsonants: number
  consonantFrequency: Array<{ consonant: string; count: number; percentage: number }>
  clusters: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  characteristics: string[]
}

export function NameConsonantAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<ConsonantAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeConsonants = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const consonants = normalized.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []
    const totalConsonants = consonants.length
    const uniqueConsonants = new Set(consonants.map((c) => c.toLowerCase())).size

    // Count each consonant
    const consonantCounts: Record<string, number> = {}
    consonants.forEach((c) => {
      const consonant = c.toLowerCase()
      consonantCounts[consonant] = (consonantCounts[consonant] || 0) + 1
    })

    const consonantFrequency = Object.entries(consonantCounts)
      .map(([consonant, count]) => ({
        consonant: consonant.toUpperCase(),
        count,
        percentage: Math.round((count / totalConsonants) * 100),
      }))
      .sort((a, b) => b.count - a.count)

    // Find consonant clusters
    const clusters: string[] = []
    for (let i = 0; i < normalized.length - 1; i++) {
      const char1 = normalized[i]
      const char2 = normalized[i + 1]
      if (/[bcdfghjklmnpqrstvwxyz]/.test(char1) && /[bcdfghjklmnpqrstvwxyz]/.test(char2)) {
        const cluster = char1 + char2
        if (!clusters.includes(cluster)) {
          clusters.push(cluster)
        }
      }
    }

    // Determine difficulty
    let difficulty: 'easy' | 'medium' | 'hard' = 'easy'
    if (clusters.length > 2 || clusters.some((c) => ['kw', 'gy', 'ts', 'dz'].includes(c))) {
      difficulty = 'hard'
    } else if (clusters.length > 0 || totalConsonants > normalized.length * 0.6) {
      difficulty = 'medium'
    }

    const characteristics: string[] = []
    if (clusters.length > 0) {
      characteristics.push(`${clusters.length} consonant cluster${clusters.length !== 1 ? 's' : ''}`)
    }
    if (totalConsonants >= normalized.length * 0.6) {
      characteristics.push('Consonant-heavy name')
    }
    if (uniqueConsonants >= 5) {
      characteristics.push('Varied consonant sounds')
    }
    if (difficulty === 'hard') {
      characteristics.push('May require practice to pronounce')
    } else if (difficulty === 'easy') {
      characteristics.push('Easy to pronounce')
    }

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      totalConsonants,
      uniqueConsonants,
      consonantFrequency,
      clusters,
      difficulty,
      characteristics,
    })

    toast({
      title: "Consonants analyzed!",
      description: `${totalConsonants} consonants, ${uniqueConsonants} unique - ${difficulty} difficulty`,
    })
  }

  const getDifficultyColor = () => {
    if (!analysis) return ''
    switch (analysis.difficulty) {
      case 'easy':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'medium':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'hard':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-400" />
          Consonant Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze consonant patterns and pronunciation difficulty
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeConsonants()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeConsonants}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
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
                  <p className="text-3xl font-bold text-white">{analysis.totalConsonants}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Unique</p>
                  <p className="text-3xl font-bold text-white">{analysis.uniqueConsonants}</p>
                </div>
              </div>
              <Badge variant="secondary" className={`${getDifficultyColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {analysis.difficulty} Difficulty
              </Badge>
            </div>

            {analysis.clusters.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Consonant Clusters</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.clusters.map((cluster, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-bold text-sm px-3 py-1"
                    >
                      {cluster.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Consonant Frequency</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {analysis.consonantFrequency.map((freq, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {freq.consonant}
                    </Badge>
                    <div className="flex-1 bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
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
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Characteristics</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.characteristics.map((char, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs"
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
            <p className="text-white/60 text-sm">Enter a name and click to analyze consonants</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

