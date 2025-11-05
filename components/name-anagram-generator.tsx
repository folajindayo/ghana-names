'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

function generateAnagrams(name: string): string[] {
  const normalized = name.toLowerCase().replace(/\s/g, '')
  const anagrams: string[] = []
  const seen = new Set<string>()

  function permute(str: string, prefix: string = '') {
    if (str.length === 0) {
      const result = prefix.charAt(0).toUpperCase() + prefix.slice(1)
      if (!seen.has(result) && result !== name) {
        seen.add(result)
        anagrams.push(result)
      }
      return
    }

    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      const remaining = str.slice(0, i) + str.slice(i + 1)
      permute(remaining, prefix + char)
    }
  }

  // Limit to reasonable number of permutations
  if (normalized.length <= 6) {
    permute(normalized)
    return anagrams.slice(0, 20) // Limit results
  } else {
    // For longer names, use a simpler approach
    const chars = normalized.split('')
    for (let i = 0; i < 20; i++) {
      const shuffled = [...chars].sort(() => Math.random() - 0.5).join('')
      const result = shuffled.charAt(0).toUpperCase() + shuffled.slice(1)
      if (!seen.has(result) && result.toLowerCase() !== normalized) {
        seen.add(result)
        anagrams.push(result)
      }
    }
  }

  return anagrams
}

export function NameAnagramGenerator() {
  const [name, setName] = useState('')
  const [anagrams, setAnagrams] = useState<string[]>([])
  const { toast } = useToast()

  const generate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const generated = generateAnagrams(name)
    setAnagrams(generated)

    if (generated.length === 0) {
      toast({
        title: "No anagrams",
        description: "Could not generate anagrams for this name",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Anagrams generated!",
        description: `Found ${generated.length} anagram${generated.length !== 1 ? 's' : ''}`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-purple-400" />
          Anagram Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate anagrams from your name
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
              onKeyPress={(e) => e.key === 'Enter' && generate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generate}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {anagrams.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm">
                {anagrams.length} anagram{anagrams.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto p-2 bg-white/5 rounded border border-white/10">
              {anagrams.map((anagram, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold cursor-pointer hover:bg-purple-600/50"
                >
                  {anagram}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {name && anagrams.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No anagrams available for this name</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

