'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BackwardsAnalysis {
  name: string
  reversed: string
  reversedWords: string[]
  isReversible: boolean
  wordCount: number
  characteristics: string[]
}

export function NameBackwardsReader() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<BackwardsAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeBackwards = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const reversed = normalized.split('').reverse().join('')
    const words = normalized.split(/\s+/)
    const reversedWords = words.map((word) => word.split('').reverse().join(''))
    const isReversible = normalized.toLowerCase().replace(/\s/g, '') === reversed.toLowerCase().replace(/\s/g, '')

    const characteristics: string[] = []
    if (isReversible) {
      characteristics.push('Fully reversible - same forwards and backwards')
      characteristics.push('Symmetrical structure')
    } else {
      characteristics.push('Reversed: ' + reversed)
      if (words.length > 1) {
        characteristics.push(`${words.length} word${words.length !== 1 ? 's' : ''} reversed individually`)
      }
    }

    setAnalysis({
      name: normalized,
      reversed,
      reversedWords,
      isReversible,
      wordCount: words.length,
      characteristics,
    })

    toast({
      title: "Backwards analysis complete!",
      description: isReversible ? "Name is reversible!" : `Reversed: ${reversed}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-pink-400" />
          Backwards Reader
        </CardTitle>
        <CardDescription className="text-white/70">
          Read names backwards and analyze reversibility
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeBackwards()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeBackwards}
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
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Forward</p>
                  <p className="text-white font-mono text-lg">{analysis.name}</p>
                </div>
                <RotateCcw className="h-5 w-5 text-white/60" />
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Backward</p>
                  <p className="text-white font-mono text-lg">{analysis.reversed}</p>
                </div>
              </div>
              {analysis.isReversible && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-sm px-4 py-2">
                  Reversible
                </Badge>
              )}
            </div>

            {analysis.wordCount > 1 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Word-by-Word Reversal</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.reversedWords.map((word, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-pink-600/40 text-pink-100 border-pink-400/50 font-semibold text-sm px-3 py-1"
                    >
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Analysis</h4>
              <ul className="space-y-1">
                {analysis.characteristics.map((char, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <span className="text-pink-400">•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.isReversible && (
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-400" />
                  Reversible Name
                </h4>
                <p className="text-white/80 text-xs">
                  This name reads the same forwards and backwards, making it a palindrome!
                </p>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to read backwards</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

