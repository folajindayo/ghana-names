'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Sparkles, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PalindromeResult {
  name: string
  isPalindrome: boolean
  reversed: string
  analysis: {
    length: number
    middle: string
    firstHalf: string
    secondHalf: string
  }
  variations: string[]
}

export function NamePalindromeCheckerEnhanced() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<PalindromeResult | null>(null)
  const { toast } = useToast()

  const check = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().toLowerCase().replace(/\s/g, '')
    const reversed = normalized.split('').reverse().join('')
    const isPalindrome = normalized === reversed

    const length = normalized.length
    const middle = length % 2 === 1 ? normalized[Math.floor(length / 2)] : ''
    const firstHalf = normalized.substring(0, Math.floor(length / 2))
    const secondHalf = normalized.substring(Math.ceil(length / 2))

    // Generate variations
    const variations: string[] = []
    if (!isPalindrome) {
      // Try removing spaces
      const noSpaces = name.replace(/\s/g, '').toLowerCase()
      if (noSpaces === noSpaces.split('').reverse().join('')) {
        variations.push('Palindrome when spaces removed')
      }
      // Try case-insensitive
      const caseInsensitive = name.toLowerCase().replace(/\s/g, '')
      if (caseInsensitive === caseInsensitive.split('').reverse().join('')) {
        variations.push('Palindrome when case ignored')
      }
    }

    setResult({
      name: name.trim(),
      isPalindrome,
      reversed: reversed.split('').map((c, i) => normalized[normalized.length - 1 - i]).join(''),
      analysis: {
        length,
        middle,
        firstHalf,
        secondHalf,
      },
      variations,
    })

    toast({
      title: isPalindrome ? "Palindrome found!" : "Not a palindrome",
      description: isPalindrome ? "This name reads the same forwards and backwards" : "Try a different name",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-amber-400" />
          Enhanced Palindrome Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Check if a name is a palindrome with detailed analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Anna, Bob"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && check()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={check}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {result.isPalindrome ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-400" />
                )}
                <h3 className="text-2xl font-bold text-white">{result.name}</h3>
              </div>
              <Badge
                variant="secondary"
                className={
                  result.isPalindrome
                    ? 'bg-green-500/40 text-green-100 border-green-400/50'
                    : 'bg-red-500/40 text-red-100 border-red-400/50'
                }
              >
                {result.isPalindrome ? 'PALINDROME' : 'NOT A PALINDROME'}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Reversed</h4>
              <p className="text-white/90 text-lg font-mono">{result.reversed}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Length:</span>
                  <span className="text-white font-semibold">{result.analysis.length} characters</span>
                </div>
                {result.analysis.middle && (
                  <div className="flex justify-between">
                    <span className="text-white/70">Middle character:</span>
                    <span className="text-white font-semibold">{result.analysis.middle.toUpperCase()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/70">First half:</span>
                  <span className="text-white font-semibold font-mono">{result.analysis.firstHalf}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Second half:</span>
                  <span className="text-white font-semibold font-mono">{result.analysis.secondHalf}</span>
                </div>
              </div>
            </div>

            {result.variations.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Variations</h4>
                <ul className="space-y-1">
                  {result.variations.map((variation, index) => (
                    <li key={index} className="text-white/80 text-sm">
                      • {variation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click check to see if it's a palindrome</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

