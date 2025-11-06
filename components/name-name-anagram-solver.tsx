'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AnagramResult {
  original: string
  anagrams: string[]
  wordCount: number
  possibleCombinations: number
}

export function NameAnagramSolver() {
  const [name, setName] = useState('')
  const [results, setResults] = useState<AnagramResult | null>(null)
  const { toast } = useToast()

  const generateAnagrams = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim().replace(/\s/g, '')
    
    // Simple anagram generation (limited to avoid performance issues)
    const generateAnagramsRecursive = (str: string): string[] => {
      if (str.length <= 1) return [str]
      if (str.length > 6) {
        // For longer names, return a sample
        return [
          str.split('').reverse().join(''),
          str.charAt(0) + str.slice(1).split('').reverse().join(''),
        ]
      }

      const anagrams: string[] = []
      for (let i = 0; i < str.length; i++) {
        const char = str[i]
        const remaining = str.slice(0, i) + str.slice(i + 1)
        const remainingAnagrams = generateAnagramsRecursive(remaining)
        for (const anagram of remainingAnagrams) {
          anagrams.push(char + anagram)
        }
      }
      return [...new Set(anagrams)]
    }

    const allAnagrams = generateAnagramsRecursive(normalized)
    const uniqueAnagrams = [...new Set(allAnagrams)].filter((a) => a !== normalized)
    const limitedAnagrams = uniqueAnagrams.slice(0, 20) // Limit to 20 for display

    // Calculate possible combinations (factorial)
    const factorial = (n: number): number => {
      if (n <= 1) return 1
      return n * factorial(n - 1)
    }
    const possibleCombinations = factorial(normalized.length)

    setResults({
      original: name.charAt(0).toUpperCase() + name.slice(1),
      anagrams: limitedAnagrams.map((a) => a.charAt(0).toUpperCase() + a.slice(1)),
      wordCount: normalized.length,
      possibleCombinations: possibleCombinations > 1000 ? 1000 : possibleCombinations,
    })

    toast({
      title: "Anagrams generated!",
      description: `Found ${limitedAnagrams.length} anagram${limitedAnagrams.length !== 1 ? 's' : ''}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-indigo-400" />
          Anagram Solver
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate anagrams from names
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
              onKeyPress={(e) => e.key === 'Enter' && generateAnagrams()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generateAnagrams}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {results && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{results.original}</h3>
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Anagrams</p>
                  <p className="text-3xl font-bold text-white">{results.anagrams.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Possible</p>
                  <p className="text-3xl font-bold text-white">{results.possibleCombinations}+</p>
                </div>
              </div>
            </div>

            {results.anagrams.length > 0 ? (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Generated Anagrams</h4>
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
                  {results.anagrams.map((anagram, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 font-semibold text-sm px-3 py-1"
                    >
                      {anagram}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/60 text-sm">No unique anagrams found</p>
              </div>
            )}

            <div className="p-3 bg-indigo-500/10 rounded border border-indigo-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm">Info</h4>
              <p className="text-white/80 text-xs">
                Anagrams are rearrangements of letters. Names with {results.wordCount} letters can have up to {results.possibleCombinations}+ possible combinations.
              </p>
            </div>
          </div>
        )}

        {name && !results && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to generate anagrams</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

