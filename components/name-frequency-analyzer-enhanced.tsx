'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Sparkles, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FrequencyData {
  name: string
  letterCounts: Record<string, number>
  mostCommon: string[]
  leastCommon: string[]
  totalLetters: number
  uniqueLetters: number
  doubleLetters: string[]
}

export function NameFrequencyAnalyzerEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<FrequencyData | null>(null)
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
    const letterCounts: Record<string, number> = {}

    // Count letters
    for (const char of normalized) {
      if (/[a-z]/.test(char)) {
        letterCounts[char] = (letterCounts[char] || 0) + 1
      }
    }

    // Find most and least common
    const sorted = Object.entries(letterCounts).sort((a, b) => b[1] - a[1])
    const mostCommon = sorted.slice(0, 3).map(([letter]) => letter.toUpperCase())
    const leastCommon = sorted.slice(-3).map(([letter]) => letter.toUpperCase())

    // Find double letters
    const doubleLetters: string[] = []
    for (let i = 0; i < normalized.length - 1; i++) {
      if (normalized[i] === normalized[i + 1]) {
        doubleLetters.push(normalized[i].toUpperCase())
      }
    }

    setAnalysis({
      name: name.trim(),
      letterCounts,
      mostCommon,
      leastCommon,
      totalLetters: normalized.length,
      uniqueLetters: Object.keys(letterCounts).length,
      doubleLetters: [...new Set(doubleLetters)],
    })

    toast({
      title: "Analysis complete!",
      description: `Analyzed ${normalized.length} letters`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-400" />
          Enhanced Frequency Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze letter frequency and patterns in names
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
                <p className="text-white/70 text-xs mb-1">Total Letters</p>
                <p className="text-2xl font-bold text-white">{analysis.totalLetters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Unique Letters</p>
                <p className="text-2xl font-bold text-white">{analysis.uniqueLetters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Double Letters</p>
                <p className="text-2xl font-bold text-white">{analysis.doubleLetters.length}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                Most Common Letters
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.mostCommon.map((letter, index) => {
                  const count = analysis.letterCounts[letter.toLowerCase()]
                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 text-sm px-3 py-1"
                    >
                      {letter}: {count}x
                    </Badge>
                  )
                })}
              </div>
            </div>

            {analysis.leastCommon.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Least Common Letters</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.leastCommon.map((letter, index) => {
                    const count = analysis.letterCounts[letter.toLowerCase()]
                    return (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs"
                      >
                        {letter}: {count}x
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {analysis.doubleLetters.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Double Letters</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.doubleLetters.map((letter, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-600/40 text-green-100 border-green-400/50 text-xs"
                    >
                      {letter}{letter}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">All Letter Counts</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(analysis.letterCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([letter, count]) => (
                    <Badge
                      key={letter}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs"
                    >
                      {letter.toUpperCase()}: {count}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click analyze to see frequency breakdown</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

