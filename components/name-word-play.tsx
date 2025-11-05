'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WordPlay {
  type: 'acronym' | 'anagram' | 'alliteration' | 'rhyme'
  result: string
  description: string
}

export function NameWordPlay() {
  const [name, setName] = useState('')
  const [plays, setPlays] = useState<WordPlay[]>([])
  const { toast } = useToast()

  const generateWordPlay = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const results: WordPlay[] = []

    // Acronym play
    const words = name.split(' ').filter((w) => w.length > 0)
    if (words.length >= 2) {
      const acronym = words.map((w) => w[0].toUpperCase()).join('')
      results.push({
        type: 'acronym',
        result: acronym,
        description: `Acronym from words: ${words.join(', ')}`,
      })
    }

    // Alliteration check
    const firstLetters = normalized.split(' ').map((w) => w[0])
    const allSame = firstLetters.every((letter) => letter === firstLetters[0])
    if (allSame && words.length >= 2) {
      results.push({
        type: 'alliteration',
        result: name,
        description: `Alliteration: All words start with "${firstLetters[0].toUpperCase()}"`,
      })
    }

    // Rhyme suggestions
    const commonRhymes: Record<string, string[]> = {
      a: ['ah', 'ma', 'pa', 'da'],
      e: ['ee', 'me', 'be', 'de'],
      i: ['ai', 'hi', 'pi', 'di'],
      o: ['oh', 'mo', 'no', 'go'],
      u: ['oo', 'mu', 'nu', 'du'],
    }

    const lastLetter = normalized[normalized.length - 1]
    if (commonRhymes[lastLetter]) {
      const rhyme = commonRhymes[lastLetter][0]
      results.push({
        type: 'rhyme',
        result: `${normalized.slice(0, -1)}${rhyme}`,
        description: `Rhymes with "${name}"`,
      })
    }

    // Anagram (if short enough)
    if (normalized.length <= 6) {
      const shuffled = normalized.split('').sort(() => Math.random() - 0.5).join('')
      if (shuffled !== normalized) {
        results.push({
          type: 'anagram',
          result: shuffled.charAt(0).toUpperCase() + shuffled.slice(1),
          description: 'Anagram variation',
        })
      }
    }

    setPlays(results)

    if (results.length === 0) {
      toast({
        title: "No word play found",
        description: "Try a different name or add more words",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Word play generated!",
        description: `Found ${results.length} word play${results.length !== 1 ? 's' : ''}`,
      })
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'acronym':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'anagram':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'alliteration':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'rhyme':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Play className="h-5 w-5 text-orange-400" />
          Word Play Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Create fun word play from names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateWordPlay()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generateWordPlay}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {plays.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              {plays.length} word play{plays.length !== 1 ? 's' : ''} found
            </p>
            <div className="space-y-2">
              {plays.map((play, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-lg">{play.result}</h4>
                    <Badge variant="secondary" className={`${getTypeColor(play.type)} font-semibold text-xs`}>
                      {play.type}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm">{play.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {name && plays.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No word play found for this name</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

