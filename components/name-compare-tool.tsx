'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitCompare, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ComparisonResult {
  name1: string
  name2: string
  lengthDiff: number
  vowelCount1: number
  vowelCount2: number
  consonantCount1: number
  consonantCount2: number
  syllableEstimate1: number
  syllableEstimate2: number
  startsWithVowel1: boolean
  startsWithVowel2: boolean
  similarity: number
}

export function NameCompareTool() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const { toast } = useToast()

  const compare = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Both names required",
        description: "Please enter two names to compare",
        variant: "destructive",
      })
      return
    }

    const n1 = name1.trim()
    const n2 = name2.trim()

    const vowels = /[aeiouAEIOU]/g
    const consonants = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g

    const vowelCount1 = (n1.match(vowels) || []).length
    const vowelCount2 = (n2.match(vowels) || []).length
    const consonantCount1 = (n1.match(consonants) || []).length
    const consonantCount2 = (n2.match(consonants) || []).length

    // Simple syllable estimation (vowels + some consonant clusters)
    const syllableEstimate1 = Math.max(1, vowelCount1)
    const syllableEstimate2 = Math.max(1, vowelCount2)

    // Calculate similarity (simple character overlap)
    const chars1 = new Set(n1.toLowerCase().split(''))
    const chars2 = new Set(n2.toLowerCase().split(''))
    const intersection = new Set([...chars1].filter((x) => chars2.has(x)))
    const union = new Set([...chars1, ...chars2])
    const similarity = Math.round((intersection.size / union.size) * 100)

    setResult({
      name1: n1,
      name2: n2,
      lengthDiff: n1.length - n2.length,
      vowelCount1,
      vowelCount2,
      consonantCount1,
      consonantCount2,
      syllableEstimate1,
      syllableEstimate2,
      startsWithVowel1: /^[aeiouAEIOU]/.test(n1),
      startsWithVowel2: /^[aeiouAEIOU]/.test(n2),
      similarity,
    })

    toast({
      title: "Comparison complete!",
      description: `Similarity: ${similarity}%`,
    })
  }

  const getTrendIcon = (value1: number, value2: number) => {
    if (value1 > value2) return <TrendingUp className="h-4 w-4 text-green-400" />
    if (value1 < value2) return <TrendingDown className="h-4 w-4 text-red-400" />
    return <Minus className="h-4 w-4 text-yellow-400" />
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-blue-400" />
          Name Compare Tool
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare two names side by side
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">Name 1</Label>
            <Input
              placeholder="e.g., Kwame"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compare()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Name 2</Label>
            <Input
              placeholder="e.g., Akosua"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compare()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={compare}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Compare Names
        </Button>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{result.name1}</h3>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                  {result.name1.length} chars
                </Badge>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{result.name2}</h3>
                <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                  {result.name2.length} chars
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-3 text-sm">Similarity Score</h4>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{result.similarity}%</div>
                  <Badge
                    variant="secondary"
                    className={
                      result.similarity >= 70
                        ? 'bg-green-500/40 text-green-100 border-green-400/50'
                        : result.similarity >= 40
                        ? 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
                        : 'bg-red-500/40 text-red-100 border-red-400/50'
                    }
                  >
                    {result.similarity >= 70 ? 'Very Similar' : result.similarity >= 40 ? 'Somewhat Similar' : 'Different'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-xs">Name 1 Stats</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Vowels:</span>
                    <span className="text-white font-semibold">{result.vowelCount1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Consonants:</span>
                    <span className="text-white font-semibold">{result.consonantCount1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Syllables:</span>
                    <span className="text-white font-semibold">~{result.syllableEstimate1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Starts with vowel:</span>
                    <span className="text-white font-semibold">{result.startsWithVowel1 ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-xs">Name 2 Stats</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Vowels:</span>
                    <span className="text-white font-semibold">{result.vowelCount2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Consonants:</span>
                    <span className="text-white font-semibold">{result.consonantCount2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Syllables:</span>
                    <span className="text-white font-semibold">~{result.syllableEstimate2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Starts with vowel:</span>
                    <span className="text-white font-semibold">{result.startsWithVowel2 ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Differences</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Length difference:</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(result.name1.length, result.name2.length)}
                    <span className="text-white font-semibold">
                      {Math.abs(result.lengthDiff)} {result.lengthDiff > 0 ? 'longer' : result.lengthDiff < 0 ? 'shorter' : 'same'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Vowel difference:</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(result.vowelCount1, result.vowelCount2)}
                    <span className="text-white font-semibold">
                      {Math.abs(result.vowelCount1 - result.vowelCount2)} {result.vowelCount1 > result.vowelCount2 ? 'more' : result.vowelCount1 < result.vowelCount2 ? 'fewer' : 'same'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {name1 && name2 && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click compare to analyze the two names</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

