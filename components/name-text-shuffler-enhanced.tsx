'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextShufflerEnhanced() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [shuffleType, setShuffleType] = useState<'words' | 'characters' | 'lines'>('words')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const shuffle = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let shuffled = ''

    if (shuffleType === 'words') {
      const words = input.trim().split(/\s+/)
      const shuffledWords = [...words].sort(() => Math.random() - 0.5)
      shuffled = shuffledWords.join(' ')
    } else if (shuffleType === 'characters') {
      const chars = input.split('')
      const shuffledChars = [...chars].sort(() => Math.random() - 0.5)
      shuffled = shuffledChars.join('')
    } else if (shuffleType === 'lines') {
      const lines = input.trim().split('\n').filter(line => line.trim().length > 0)
      const shuffledLines = [...lines].sort(() => Math.random() - 0.5)
      shuffled = shuffledLines.join('\n')
    }

    setResult(shuffled)
    toast({
      title: "Shuffled!",
      description: `Text shuffled by ${shuffleType}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Shuffled text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-orange-400" />
          Enhanced Text Shuffler
        </CardTitle>
        <CardDescription className="text-white/70">
          Randomly shuffle words, characters, or lines in text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to shuffle"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && shuffle()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Shuffle By</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={shuffleType === 'words' ? 'default' : 'outline'}
                onClick={() => setShuffleType('words')}
                className={shuffleType === 'words' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={shuffleType === 'characters' ? 'default' : 'outline'}
                onClick={() => setShuffleType('characters')}
                className={shuffleType === 'characters' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={shuffleType === 'lines' ? 'default' : 'outline'}
                onClick={() => setShuffleType('lines')}
                className={shuffleType === 'lines' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
            </div>
          </div>
          <Button
            onClick={shuffle}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Shuffle Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Original</h3>
              <p className="text-white/70 text-sm">{input}</p>
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50 mt-2">
                {shuffleType.charAt(0).toUpperCase() + shuffleType.slice(1)} Shuffled
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Shuffled Result</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-base whitespace-pre-wrap">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to shuffle</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

