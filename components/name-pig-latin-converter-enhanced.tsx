'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Languages, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NamePigLatinConverterEnhanced() {
  const [name, setName] = useState('')
  const [converted, setConverted] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const toPigLatin = (text: string): string => {
    return text
      .split(/\s+/)
      .map((word) => {
        if (!word) return word
        const trimmed = word.trim()
        const lower = trimmed.toLowerCase()
        
        // Check if it starts with a vowel
        if (/^[aeiou]/i.test(lower)) {
          return trimmed + 'way'
        }
        
        // Find first vowel
        const vowelMatch = lower.match(/[aeiou]/)
        if (vowelMatch && vowelMatch.index !== undefined) {
          const firstVowelIndex = vowelMatch.index
          const beforeVowel = trimmed.substring(0, firstVowelIndex)
          const fromVowel = trimmed.substring(firstVowelIndex)
          
          // Preserve capitalization
          if (trimmed[0] === trimmed[0].toUpperCase()) {
            return fromVowel.charAt(0).toUpperCase() + fromVowel.substring(1) + beforeVowel.toLowerCase() + 'ay'
          }
          return fromVowel + beforeVowel + 'ay'
        }
        
        // No vowel found, just add 'ay'
        return trimmed + 'ay'
      })
      .join(' ')
  }

  const convert = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const result = toPigLatin(name.trim())
    setConverted(result)
    toast({
      title: "Converted!",
      description: "Name converted to Pig Latin",
    })
  }

  const copy = () => {
    if (!converted) return
    navigator.clipboard.writeText(converted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Pig Latin name copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-pink-400" />
          Enhanced Pig Latin Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to Pig Latin with proper vowel handling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convert()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={convert}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {converted && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                Pig Latin
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Converted</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-xl font-mono">{converted}</p>
            </div>

            <div className="p-3 bg-pink-500/10 rounded border border-pink-400/30">
              <p className="text-pink-200 text-xs text-center">
                💡 Words starting with vowels get "way" suffix, consonants move to end with "ay"
              </p>
            </div>
          </div>
        )}

        {name && !converted && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to Pig Latin</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

