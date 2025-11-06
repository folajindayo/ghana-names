'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Grid3x3, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SimilarityResult {
  name1: string
  name2: string
  similarity: number
  commonLetters: number
  commonSounds: string[]
  difference: number
}

function calculateSimilarity(name1: string, name2: string): SimilarityResult {
  const n1 = name1.toLowerCase()
  const n2 = name2.toLowerCase()

  // Calculate common letters
  const letters1 = new Set(n1.split(''))
  const letters2 = new Set(n2.split(''))
  const commonLetters = new Set([...letters1].filter((x) => letters2.has(x)))
  const commonCount = commonLetters.size

  // Find common sounds (vowels and common consonants)
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const sounds1 = n1.split('').filter((c) => vowels.includes(c) || ['m', 'n', 'k', 'w'].includes(c))
  const sounds2 = n2.split('').filter((c) => vowels.includes(c) || ['m', 'n', 'k', 'w'].includes(c))
  const commonSounds = [...new Set(sounds1.filter((s) => sounds2.includes(s)))]

  // Calculate similarity percentage
  const maxLength = Math.max(n1.length, n2.length)
  const similarity = Math.round((commonCount / maxLength) * 100)

  // Calculate difference
  const difference = Math.abs(n1.length - n2.length)

  return {
    name1: name1.charAt(0).toUpperCase() + name1.slice(1),
    name2: name2.charAt(0).toUpperCase() + name2.slice(1),
    similarity,
    commonLetters: commonCount,
    commonSounds,
    difference,
  }
}

export function NameSimilarityMatrix() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<SimilarityResult | null>(null)
  const { toast } = useToast()

  const compareNames = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both names",
        variant: "destructive",
      })
      return
    }

    const similarity = calculateSimilarity(name1.trim(), name2.trim())
    setResult(similarity)

    toast({
      title: "Similarity calculated!",
      description: `${similarity.similarity}% similar`,
    })
  }

  const getSimilarityColor = () => {
    if (!result) return ''
    if (result.similarity >= 70) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (result.similarity >= 40) return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    return 'bg-red-600/40 text-red-100 border-red-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Grid3x3 className="h-5 w-5 text-purple-400" />
          Similarity Matrix
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare similarity between two names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">First Name</Label>
            <Input
              placeholder="e.g., Kwame"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Second Name</Label>
            <Input
              placeholder="e.g., Kofi"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compareNames()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={compareNames}
          disabled={!name1.trim() || !name2.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Compare Names
        </Button>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-white">{result.name1}</h3>
                <span className="text-white/60">vs</span>
                <h3 className="text-xl font-bold text-white">{result.name2}</h3>
              </div>
              <Badge variant="secondary" className={`${getSimilarityColor()} font-semibold text-lg px-4 py-2`}>
                {result.similarity}% Similar
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Common Letters</p>
                <p className="text-2xl font-bold text-white">{result.commonLetters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Length Difference</p>
                <p className="text-2xl font-bold text-white">{result.difference}</p>
              </div>
            </div>

            {result.commonSounds.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Common Sounds</h4>
                <div className="flex flex-wrap gap-2">
                  {result.commonSounds.map((sound, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
                    >
                      {sound.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                  style={{ width: `${result.similarity}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2 text-center">Similarity Score</p>
            </div>
          </div>
        )}

        {name1 && name2 && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click compare to analyze similarity</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

