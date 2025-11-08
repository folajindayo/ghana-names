'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextPatternMatcherEnhanced() {
  const [input, setInput] = useState('')
  const [pattern, setPattern] = useState('')
  const [patternType, setPatternType] = useState<string>('contains')
  const [matches, setMatches] = useState<{ text: string; index: number }[]>([])
  const { toast } = useToast()

  const findMatches = () => {
    if (!input.trim() || !pattern.trim()) {
      toast({
        title: "Input required",
        description: "Please enter both text and pattern",
        variant: "destructive",
      })
      return
    }

    const results: { text: string; index: number }[] = []

    if (patternType === 'contains') {
      if (input.includes(pattern)) {
        const index = input.indexOf(pattern)
        results.push({ text: pattern, index })
      }
    } else if (patternType === 'startsWith') {
      if (input.startsWith(pattern)) {
        results.push({ text: pattern, index: 0 })
      }
    } else if (patternType === 'endsWith') {
      if (input.endsWith(pattern)) {
        results.push({ text: pattern, index: input.length - pattern.length })
      }
    } else if (patternType === 'regex') {
      try {
        const regex = new RegExp(pattern, 'g')
        let match
        while ((match = regex.exec(input)) !== null) {
          results.push({ text: match[0], index: match.index })
        }
      } catch (error) {
        toast({
          title: "Invalid regex",
          description: "Please enter a valid regular expression",
          variant: "destructive",
        })
        return
      }
    } else if (patternType === 'allOccurrences') {
      let index = 0
      while ((index = input.indexOf(pattern, index)) !== -1) {
        results.push({ text: pattern, index })
        index += pattern.length
      }
    } else if (patternType === 'words') {
      const words = input.split(/\s+/)
      words.forEach((word, idx) => {
        if (word.includes(pattern)) {
          const wordIndex = input.indexOf(word, idx > 0 ? input.indexOf(words[idx - 1]) + words[idx - 1].length : 0)
          results.push({ text: word, index: wordIndex })
        }
      })
    }

    setMatches(results)
    toast({
      title: "Search complete!",
      description: `Found ${results.length} match${results.length !== 1 ? 'es' : ''}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-emerald-400" />
          Enhanced Text Pattern Matcher
        </CardTitle>
        <CardDescription className="text-white/70">
          Find patterns in text (contains, starts with, ends with, regex, all occurrences, words)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to search in"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Pattern</Label>
            <Input
              placeholder="Enter pattern to find"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findMatches()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Match Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={patternType === 'contains' ? 'default' : 'outline'}
                onClick={() => setPatternType('contains')}
                className={patternType === 'contains' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Contains
              </Button>
              <Button
                size="sm"
                variant={patternType === 'startsWith' ? 'default' : 'outline'}
                onClick={() => setPatternType('startsWith')}
                className={patternType === 'startsWith' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Starts With
              </Button>
              <Button
                size="sm"
                variant={patternType === 'endsWith' ? 'default' : 'outline'}
                onClick={() => setPatternType('endsWith')}
                className={patternType === 'endsWith' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ends With
              </Button>
              <Button
                size="sm"
                variant={patternType === 'regex' ? 'default' : 'outline'}
                onClick={() => setPatternType('regex')}
                className={patternType === 'regex' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Regex
              </Button>
              <Button
                size="sm"
                variant={patternType === 'allOccurrences' ? 'default' : 'outline'}
                onClick={() => setPatternType('allOccurrences')}
                className={patternType === 'allOccurrences' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All Occurrences
              </Button>
              <Button
                size="sm"
                variant={patternType === 'words' ? 'default' : 'outline'}
                onClick={() => setPatternType('words')}
                className={patternType === 'words' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
            </div>
          </div>
          <Button
            onClick={findMatches}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Find Matches
          </Button>
        </div>

        {matches.length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50">
                {matches.length} Match{matches.length !== 1 ? 'es' : ''}
              </Badge>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-200 border-emerald-400/30 text-xs">
                      #{index + 1}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 border-blue-400/30 text-xs">
                      Index: {match.index}
                    </Badge>
                  </div>
                  <p className="text-white/90 text-sm">{match.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {input && pattern && matches.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No matches found</p>
          </div>
        )}

        {(!input || !pattern) && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and pattern to search</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

