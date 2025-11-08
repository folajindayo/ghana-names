'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextStatisticsEnhanced() {
  const [input, setInput] = useState('')
  const [stats, setStats] = useState<Record<string, number | string>>({})
  const { toast } = useToast()

  const calculateStats = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const words = input.trim().split(/\s+/).filter(w => w.length > 0)
    const chars = input.split('')
    const lines = input.split('\n').filter(l => l.trim().length > 0)
    const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0)

    const letterCount = chars.filter(c => /[a-zA-Z]/.test(c)).length
    const digitCount = chars.filter(c => /\d/.test(c)).length
    const spaceCount = chars.filter(c => /\s/.test(c)).length
    const punctuationCount = chars.filter(c => /[^\w\s]/.test(c)).length
    const uppercaseCount = chars.filter(c => /[A-Z]/.test(c)).length
    const lowercaseCount = chars.filter(c => /[a-z]/.test(c)).length

    const wordLengths = words.map(w => w.length)
    const avgWordLength = wordLengths.length > 0 
      ? (wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length).toFixed(2)
      : '0'

    const longestWord = words.length > 0 
      ? words.reduce((a, b) => a.length > b.length ? a : b)
      : ''

    const shortestWord = words.length > 0
      ? words.reduce((a, b) => a.length < b.length ? a : b)
      : ''

    setStats({
      characters: chars.length,
      charactersNoSpaces: chars.length - spaceCount,
      letters: letterCount,
      digits: digitCount,
      spaces: spaceCount,
      punctuation: punctuationCount,
      uppercase: uppercaseCount,
      lowercase: lowercaseCount,
      words: words.length,
      lines: lines.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      avgWordLength,
      longestWord,
      shortestWord,
    })

    toast({
      title: "Statistics calculated!",
      description: "Text statistics generated",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Enhanced Text Statistics
        </CardTitle>
        <CardDescription className="text-white/70">
          Calculate comprehensive statistics about your text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to analyze"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateStats()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={calculateStats}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Calculate Statistics
          </Button>
        </div>

        {Object.keys(stats).length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Characters</p>
                <p className="text-white text-lg font-bold">{stats.characters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Characters (no spaces)</p>
                <p className="text-white text-lg font-bold">{stats.charactersNoSpaces}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Letters</p>
                <p className="text-white text-lg font-bold">{stats.letters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Digits</p>
                <p className="text-white text-lg font-bold">{stats.digits}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Spaces</p>
                <p className="text-white text-lg font-bold">{stats.spaces}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Punctuation</p>
                <p className="text-white text-lg font-bold">{stats.punctuation}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Uppercase</p>
                <p className="text-white text-lg font-bold">{stats.uppercase}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Lowercase</p>
                <p className="text-white text-lg font-bold">{stats.lowercase}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Words</p>
                <p className="text-white text-lg font-bold">{stats.words}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Lines</p>
                <p className="text-white text-lg font-bold">{stats.lines}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Sentences</p>
                <p className="text-white text-lg font-bold">{stats.sentences}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Paragraphs</p>
                <p className="text-white text-lg font-bold">{stats.paragraphs}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Avg Word Length</p>
                <p className="text-white text-lg font-bold">{stats.avgWordLength}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 col-span-2">
                <p className="text-white/60 text-xs mb-1">Longest Word</p>
                <p className="text-white text-sm font-bold">{stats.longestWord || 'N/A'}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 col-span-2">
                <p className="text-white/60 text-xs mb-1">Shortest Word</p>
                <p className="text-white text-sm font-bold">{stats.shortestWord || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {input && Object.keys(stats).length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to calculate statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

