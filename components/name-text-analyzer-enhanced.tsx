'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextAnalyzerEnhanced() {
  const [input, setInput] = useState('')
  const [analysis, setAnalysis] = useState<Record<string, number | string>>({})
  const { toast } = useToast()

  const analyze = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const chars = input.split('')
    const words = input.trim().split(/\s+/).filter(w => w.length > 0)
    const lines = input.split('\n').filter(l => l.trim().length > 0)
    const sentences = input.split(/[.!?]+\s*/).filter(s => s.trim().length > 0)
    const paragraphs = input.split(/\n\s*\n/).filter(p => p.trim().length > 0)

    const letterCount = chars.filter(c => /[a-zA-Z]/.test(c)).length
    const digitCount = chars.filter(c => /\d/.test(c)).length
    const spaceCount = chars.filter(c => /\s/.test(c)).length
    const punctuationCount = chars.filter(c => /[^\w\s]/.test(c)).length
    const uppercaseCount = chars.filter(c => /[A-Z]/.test(c)).length
    const lowercaseCount = chars.filter(c => /[a-z]/.test(c)).length
    const vowelCount = chars.filter(c => /[aeiouAEIOU]/.test(c)).length
    const consonantCount = chars.filter(c => /[a-zA-Z]/.test(c) && !/[aeiouAEIOU]/.test(c)).length

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

    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size
    const uniqueChars = new Set(chars).size

    setAnalysis({
      characters: chars.length,
      charactersNoSpaces: chars.length - spaceCount,
      letters: letterCount,
      digits: digitCount,
      spaces: spaceCount,
      punctuation: punctuationCount,
      uppercase: uppercaseCount,
      lowercase: lowercaseCount,
      vowels: vowelCount,
      consonants: consonantCount,
      words: words.length,
      uniqueWords,
      lines: lines.length,
      sentences: sentences.length,
      paragraphs: paragraphs.length,
      avgWordLength,
      longestWord,
      shortestWord,
      uniqueChars,
    })

    toast({
      title: "Analyzed!",
      description: "Text analysis complete",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart className="h-5 w-5 text-purple-400" />
          Enhanced Text Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Comprehensive text analysis with detailed statistics
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
              onKeyPress={(e) => e.key === 'Enter' && analyze()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={analyze}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Analyze Text
          </Button>
        </div>

        {Object.keys(analysis).length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Characters</p>
                <p className="text-white text-lg font-bold">{analysis.characters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Characters (no spaces)</p>
                <p className="text-white text-lg font-bold">{analysis.charactersNoSpaces}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Letters</p>
                <p className="text-white text-lg font-bold">{analysis.letters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Digits</p>
                <p className="text-white text-lg font-bold">{analysis.digits}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Vowels</p>
                <p className="text-white text-lg font-bold">{analysis.vowels}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Consonants</p>
                <p className="text-white text-lg font-bold">{analysis.consonants}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Words</p>
                <p className="text-white text-lg font-bold">{analysis.words}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Unique Words</p>
                <p className="text-white text-lg font-bold">{analysis.uniqueWords}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Lines</p>
                <p className="text-white text-lg font-bold">{analysis.lines}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Sentences</p>
                <p className="text-white text-lg font-bold">{analysis.sentences}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Paragraphs</p>
                <p className="text-white text-lg font-bold">{analysis.paragraphs}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Avg Word Length</p>
                <p className="text-white text-lg font-bold">{analysis.avgWordLength}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 col-span-2">
                <p className="text-white/60 text-xs mb-1">Longest Word</p>
                <p className="text-white text-sm font-bold">{analysis.longestWord || 'N/A'}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 col-span-2">
                <p className="text-white/60 text-xs mb-1">Shortest Word</p>
                <p className="text-white text-sm font-bold">{analysis.shortestWord || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {input && Object.keys(analysis).length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

