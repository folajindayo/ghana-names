'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextRandomizerEnhanced() {
  const [input, setInput] = useState('')
  const [randomizeType, setRandomizeType] = useState<string>('shuffle')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const randomize = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let randomized = ''

    if (randomizeType === 'shuffle') {
      const chars = input.split('')
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[chars[i], chars[j]]] = [chars[j], chars[i]]
      }
      randomized = chars.join('')
    } else if (randomizeType === 'shuffleWords') {
      const words = input.split(/\s+/)
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[words[i], words[j]] = [words[j], words[i]]
      }
      randomized = words.join(' ')
    } else if (randomizeType === 'randomCase') {
      randomized = input.split('').map(char => 
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      ).join('')
    } else if (randomizeType === 'randomSpaces') {
      randomized = input.split('').map(char => 
        char === ' ' ? (Math.random() > 0.5 ? ' ' : '') : char
      ).join('')
    } else if (randomizeType === 'reverseWords') {
      randomized = input.split(/\s+/).reverse().join(' ')
    } else if (randomizeType === 'randomOrder') {
      const lines = input.split('\n').filter(l => l.trim())
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[lines[i], lines[j]] = [lines[j], lines[i]]
      }
      randomized = lines.join('\n')
    }

    setResult(randomized)
    toast({
      title: "Randomized!",
      description: `Text randomized (${randomizeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Randomized text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-purple-400" />
          Enhanced Text Randomizer
        </CardTitle>
        <CardDescription className="text-white/70">
          Randomize text in different ways (shuffle, random case, reverse words, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to randomize"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && randomize()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Randomize Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={randomizeType === 'shuffle' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('shuffle')}
                className={randomizeType === 'shuffle' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Shuffle Chars
              </Button>
              <Button
                size="sm"
                variant={randomizeType === 'shuffleWords' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('shuffleWords')}
                className={randomizeType === 'shuffleWords' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Shuffle Words
              </Button>
              <Button
                size="sm"
                variant={randomizeType === 'randomCase' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('randomCase')}
                className={randomizeType === 'randomCase' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Random Case
              </Button>
              <Button
                size="sm"
                variant={randomizeType === 'randomSpaces' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('randomSpaces')}
                className={randomizeType === 'randomSpaces' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Random Spaces
              </Button>
              <Button
                size="sm"
                variant={randomizeType === 'reverseWords' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('reverseWords')}
                className={randomizeType === 'reverseWords' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Reverse Words
              </Button>
              <Button
                size="sm"
                variant={randomizeType === 'randomOrder' ? 'default' : 'outline'}
                onClick={() => setRandomizeType('randomOrder')}
                className={randomizeType === 'randomOrder' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Random Lines
              </Button>
            </div>
          </div>
          <Button
            onClick={randomize}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Randomize Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50">
                {randomizeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Randomized</h4>
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

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to randomize</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

