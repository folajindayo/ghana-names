'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BackwardsResult {
  original: string
  reversed: string
  reversedWords: string
  reversedLetters: string
  isPalindrome: boolean
}

export function NameBackwardsReaderEnhanced() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<BackwardsResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const read = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const reversed = normalized.split('').reverse().join('')
    const words = normalized.split(/\s+/)
    const reversedWords = words.map((word) => word.split('').reverse().join('')).join(' ')
    const reversedLetters = words.reverse().join(' ')
    const isPalindrome = normalized.toLowerCase().replace(/\s/g, '') === reversed.toLowerCase().replace(/\s/g, '')

    setResult({
      original: normalized,
      reversed,
      reversedWords,
      reversedLetters,
      isPalindrome,
    })

    toast({
      title: "Reversed!",
      description: isPalindrome ? "This is also a palindrome!" : "Name reversed successfully",
    })
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Reversed name copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-purple-400" />
          Enhanced Backwards Reader
        </CardTitle>
        <CardDescription className="text-white/70">
          Read names backwards in multiple ways
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
              onKeyPress={(e) => e.key === 'Enter' && read()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={read}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{result.original}</h3>
              {result.isPalindrome && (
                <Badge variant="secondary" className="bg-green-500/40 text-green-100 border-green-400/50">
                  Also a Palindrome!
                </Badge>
              )}
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Fully Reversed</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(result.reversed)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{result.reversed}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Words Reversed (Letters)</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(result.reversedWords)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{result.reversedWords}</p>
            </div>

            {result.reversedLetters !== result.reversedWords && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold text-sm">Word Order Reversed</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(result.reversedLetters)}
                    className="text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-white/90 text-lg font-mono">{result.reversedLetters}</p>
              </div>
            )}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to read it backwards</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

