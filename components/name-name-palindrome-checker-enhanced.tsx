'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PalindromeAnalysis {
  name: string
  isPalindrome: boolean
  reversed: string
  type: 'full' | 'word' | 'none'
  characteristics: string[]
  similarPalindromes: string[]
}

export function NamePalindromeCheckerEnhanced() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<PalindromeAnalysis | null>(null)
  const { toast } = useToast()

  const checkPalindrome = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().replace(/\s/g, '')
    const reversed = normalized.split('').reverse().join('')
    const isFullPalindrome = normalized === reversed

    // Check if individual words are palindromes
    const words = name.toLowerCase().split(/\s+/)
    const wordPalindromes = words.filter((word) => {
      const reversedWord = word.split('').reverse().join('')
      return word === reversedWord && word.length > 1
    })

    let type: 'full' | 'word' | 'none' = 'none'
    if (isFullPalindrome) {
      type = 'full'
    } else if (wordPalindromes.length > 0) {
      type = 'word'
    }

    const characteristics: string[] = []
    if (isFullPalindrome) {
      characteristics.push('Full palindrome - reads same forwards and backwards')
      characteristics.push('Symmetrical name structure')
    } else if (wordPalindromes.length > 0) {
      characteristics.push(`${wordPalindromes.length} word${wordPalindromes.length !== 1 ? 's' : ''} is/are palindrome${wordPalindromes.length !== 1 ? 's' : ''}`)
    } else {
      characteristics.push('Not a palindrome')
      characteristics.push('Asymmetric name structure')
    }

    // Find similar palindromes (same length, similar structure)
    const similarPalindromes: string[] = []
    if (normalized.length <= 5) {
      similarPalindromes.push('Aba', 'Eve', 'Otto')
    }

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      isPalindrome: isFullPalindrome,
      reversed: reversed.toUpperCase(),
      type,
      characteristics,
      similarPalindromes,
    })

    toast({
      title: isFullPalindrome ? "Palindrome found!" : "Not a palindrome",
      description: isFullPalindrome ? "Name reads the same forwards and backwards" : "Name is not a palindrome",
    })
  }

  const getTypeColor = () => {
    if (!analysis) return ''
    switch (analysis.type) {
      case 'full':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'word':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'none':
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-orange-400" />
          Enhanced Palindrome Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Check if names are palindromes with detailed analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Anna, Otto, Level"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPalindrome()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={checkPalindrome}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Forward</p>
                  <p className="text-white font-mono text-lg">{analysis.name.toUpperCase()}</p>
                </div>
                <RotateCcw className="h-5 w-5 text-white/60" />
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Reversed</p>
                  <p className="text-white font-mono text-lg">{analysis.reversed}</p>
                </div>
              </div>
              <Badge variant="secondary" className={`${getTypeColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {analysis.isPalindrome ? 'Palindrome' : analysis.type === 'word' ? 'Word Palindrome' : 'Not a Palindrome'}
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Analysis</h4>
              <ul className="space-y-1">
                {analysis.characteristics.map((char, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <span className={analysis.isPalindrome ? 'text-green-400' : 'text-gray-400'}>•</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.similarPalindromes.length > 0 && (
              <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm">Similar Palindromes</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.similarPalindromes.map((pal, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-orange-600/40 text-orange-100 border-orange-400/50 font-semibold text-xs"
                    >
                      {pal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysis.isPalindrome && (
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-green-400" />
                  Palindrome Properties
                </h4>
                <p className="text-white/80 text-xs">
                  This name has the unique property of reading the same forwards and backwards, making it symmetrical and memorable.
                </p>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to check palindrome</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

