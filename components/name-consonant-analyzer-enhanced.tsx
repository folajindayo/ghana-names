'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles, BarChart3 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ConsonantAnalysis {
  name: string
  consonants: string[]
  consonantCount: number
  consonantPercentage: number
  consonantTypes: {
    stops: string[]
    fricatives: string[]
    nasals: string[]
    liquids: string[]
  }
  doubleConsonants: string[]
  recommendations: string[]
}

export function NameConsonantAnalyzerEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<ConsonantAnalysis | null>(null)
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

    const normalized = name.trim().toLowerCase().replace(/\s/g, '')
    const consonants = normalized.match(/[bcdfghjklmnpqrstvwxyz]/g) || []
    const totalChars = normalized.length
    const consonantPercentage = totalChars > 0 ? (consonants.length / totalChars) * 100 : 0

    // Categorize consonants
    const stops = consonants.filter((c) => ['b', 'd', 'g', 'k', 'p', 't'].includes(c))
    const fricatives = consonants.filter((c) => ['f', 'h', 's', 'v', 'z'].includes(c))
    const nasals = consonants.filter((c) => ['m', 'n'].includes(c))
    const liquids = consonants.filter((c) => ['l', 'r'].includes(c))

    // Find double consonants
    const doubleConsonants: string[] = []
    for (let i = 0; i < normalized.length - 1; i++) {
      const char = normalized[i]
      if (char === normalized[i + 1] && /[bcdfghjklmnpqrstvwxyz]/.test(char)) {
        doubleConsonants.push(char.toUpperCase())
      }
    }

    const recommendations: string[] = []
    if (consonantPercentage > 70) {
      recommendations.push('Very consonant-heavy - may be harder to pronounce')
    } else if (consonantPercentage < 30) {
      recommendations.push('Vowel-heavy - may sound more melodic')
    }

    if (doubleConsonants.length > 0) {
      recommendations.push('Contains double consonants - adds emphasis')
    }

    setAnalysis({
      name: name.trim(),
      consonants: [...new Set(consonants)],
      consonantCount: consonants.length,
      consonantPercentage,
      consonantTypes: {
        stops: [...new Set(stops)],
        fricatives: [...new Set(fricatives)],
        nasals: [...new Set(nasals)],
        liquids: [...new Set(liquids)],
      },
      doubleConsonants: [...new Set(doubleConsonants)],
      recommendations,
    })

    toast({
      title: "Analysis complete!",
      description: `Found ${consonants.length} consonant(s)`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-teal-400" />
          Enhanced Consonant Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze consonant patterns and sound structure
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
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Consonant Count</p>
                <p className="text-2xl font-bold text-white">{analysis.consonantCount}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Consonant %</p>
                <p className="text-2xl font-bold text-white">{analysis.consonantPercentage.toFixed(1)}%</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-teal-400" />
                Consonant Types
              </h4>
              <div className="space-y-2">
                {analysis.consonantTypes.stops.length > 0 && (
                  <div>
                    <span className="text-white/70 text-xs">Stops: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysis.consonantTypes.stops.map((c, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs"
                        >
                          {c.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.consonantTypes.fricatives.length > 0 && (
                  <div>
                    <span className="text-white/70 text-xs">Fricatives: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysis.consonantTypes.fricatives.map((c, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-green-600/40 text-green-100 border-green-400/50 text-xs"
                        >
                          {c.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.consonantTypes.nasals.length > 0 && (
                  <div>
                    <span className="text-white/70 text-xs">Nasals: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysis.consonantTypes.nasals.map((c, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs"
                        >
                          {c.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.consonantTypes.liquids.length > 0 && (
                  <div>
                    <span className="text-white/70 text-xs">Liquids: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysis.consonantTypes.liquids.map((c, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs"
                        >
                          {c.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {analysis.doubleConsonants.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Double Consonants</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.doubleConsonants.map((c, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-teal-600/40 text-teal-100 border-teal-400/50 text-xs"
                    >
                      {c}{c}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

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
            <p className="text-white/60 text-sm">Enter a name and click analyze to see consonant breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

