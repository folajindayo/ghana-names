'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftRight, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSwapperEnhanced() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [swapType, setSwapType] = useState<string>('all')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const swap = () => {
    if (!text1.trim() || !text2.trim()) {
      toast({
        title: "Both texts required",
        description: "Please enter both texts",
        variant: "destructive",
      })
      return
    }

    let swapped = ''

    if (swapType === 'all') {
      swapped = text2
    } else if (swapType === 'swap') {
      swapped = text2 + ' | ' + text1
    } else if (swapType === 'interleave') {
      const chars1 = text1.split('')
      const chars2 = text2.split('')
      const maxLength = Math.max(chars1.length, chars2.length)
      const swappedChars: string[] = []
      for (let i = 0; i < maxLength; i++) {
        if (i < chars2.length) swappedChars.push(chars2[i])
        if (i < chars1.length) swappedChars.push(chars1[i])
      }
      swapped = swappedChars.join('')
    } else if (swapType === 'alternate') {
      const words1 = text1.split(/\s+/)
      const words2 = text2.split(/\s+/)
      const maxLength = Math.max(words1.length, words2.length)
      const swappedWords: string[] = []
      for (let i = 0; i < maxLength; i++) {
        if (i < words2.length) swappedWords.push(words2[i])
        if (i < words1.length) swappedWords.push(words1[i])
      }
      swapped = swappedWords.join(' ')
    }

    setResult(swapped)
    toast({
      title: "Swapped!",
      description: `Texts swapped (${swapType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Swapped text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-purple-400" />
          Enhanced Text Swapper
        </CardTitle>
        <CardDescription className="text-white/70">
          Swap or combine two texts in different ways (all, swap, interleave, alternate)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Text 1</Label>
            <Input
              placeholder="Enter first text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Text 2</Label>
            <Input
              placeholder="Enter second text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && swap()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Swap Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={swapType === 'all' ? 'default' : 'outline'}
                onClick={() => setSwapType('all')}
                className={swapType === 'all' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All (Text 2)
              </Button>
              <Button
                size="sm"
                variant={swapType === 'swap' ? 'default' : 'outline'}
                onClick={() => setSwapType('swap')}
                className={swapType === 'swap' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Swap
              </Button>
              <Button
                size="sm"
                variant={swapType === 'interleave' ? 'default' : 'outline'}
                onClick={() => setSwapType('interleave')}
                className={swapType === 'interleave' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Interleave
              </Button>
              <Button
                size="sm"
                variant={swapType === 'alternate' ? 'default' : 'outline'}
                onClick={() => setSwapType('alternate')}
                className={swapType === 'alternate' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Alternate
              </Button>
            </div>
          </div>
          <Button
            onClick={swap}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Swap Texts
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50">
                {swapType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Result</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm whitespace-pre-wrap">{result}</p>
            </div>
          </div>
        )}

        {text1 && text2 && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter both texts and click to swap</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

