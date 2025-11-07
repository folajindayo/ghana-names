'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameAnagramGeneratorEnhanced() {
  const [name, setName] = useState('')
  const [anagrams, setAnagrams] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateAnagrams = (word: string, prefix: string = '', results: string[] = []): string[] => {
    if (word.length <= 1) {
      const anagram = prefix + word
      if (anagram.toLowerCase() !== name.toLowerCase()) {
        results.push(anagram)
      }
      return results
    }

    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      const remaining = word.slice(0, i) + word.slice(i + 1)
      generateAnagrams(remaining, prefix + char, results)
    }

    return results
  }

  const handleGenerate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().toLowerCase().replace(/\s/g, '')
    
    if (normalized.length > 8) {
      toast({
        title: "Name too long",
        description: "Please enter a name with 8 or fewer characters for anagram generation",
        variant: "destructive",
      })
      return
    }

    const allAnagrams = generateAnagrams(normalized)
    // Remove duplicates and limit to 20
    const unique = [...new Set(allAnagrams)].slice(0, 20)
    setAnagrams(unique)

    toast({
      title: "Anagrams generated!",
      description: `Found ${unique.length} anagram(s)`,
    })
  }

  const copyAll = () => {
    if (anagrams.length === 0) return
    const text = anagrams.join(', ')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "All anagrams copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-cyan-400" />
          Enhanced Anagram Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate all possible anagrams from a name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name (max 8 chars)</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Ama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {anagrams.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm">
                Generated Anagrams ({anagrams.length})
              </h4>
              <Button
                size="sm"
                variant="outline"
                onClick={copyAll}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {anagrams.map((anagram, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 text-sm px-3 py-1 cursor-pointer hover:bg-cyan-600/60"
                  onClick={() => {
                    navigator.clipboard.writeText(anagram)
                    toast({
                      title: "Copied!",
                      description: `${anagram} copied to clipboard`,
                    })
                  }}
                >
                  {anagram}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {name && anagrams.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click generate to create anagrams</p>
            {name.length > 8 && (
              <p className="text-white/50 text-xs mt-2">Name must be 8 characters or less</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

