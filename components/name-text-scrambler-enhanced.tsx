'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextScramblerEnhanced() {
  const [input, setInput] = useState('')
  const [scrambleType, setScrambleType] = useState<string>('characters')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const scramble = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let scrambled = ''

    if (scrambleType === 'characters') {
      const chars = input.split('')
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[chars[i], chars[j]] = [chars[j], chars[i]]
      }
      scrambled = chars.join('')
    } else if (scrambleType === 'words') {
      const words = input.split(/\s+/)
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[words[i], words[j]] = [words[j], words[i]]
      }
      scrambled = words.join(' ')
    } else if (scrambleType === 'lines') {
      const lines = input.split('\n')
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[lines[i], lines[j]] = [lines[j], lines[i]]
      }
      scrambled = lines.join('\n')
    } else if (scrambleType === 'wordChars') {
      scrambled = input.split(/\s+/).map(word => {
        const chars = word.split('')
        for (let i = chars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[chars[i], chars[j]] = [chars[j], chars[i]]
        }
        return chars.join('')
      }).join(' ')
    } else if (scrambleType === 'middle') {
      scrambled = input.split(/\s+/).map(word => {
        if (word.length <= 3) return word
        const first = word[0]
        const last = word[word.length - 1]
        const middle = word.slice(1, -1).split('')
        for (let i = middle.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[middle[i], middle[j]] = [middle[j], middle[i]]
        }
        return first + middle.join('') + last
      }).join(' ')
    }

    setResult(scrambled)
    toast({
      title: "Scrambled!",
      description: `Text scrambled (${scrambleType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Scrambled text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-pink-400" />
          Enhanced Text Scrambler
        </CardTitle>
        <CardDescription className="text-white/70">
          Scramble text in different ways (characters, words, lines, word characters, middle letters)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to scramble"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && scramble()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Scramble Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={scrambleType === 'characters' ? 'default' : 'outline'}
                onClick={() => setScrambleType('characters')}
                className={scrambleType === 'characters' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={scrambleType === 'words' ? 'default' : 'outline'}
                onClick={() => setScrambleType('words')}
                className={scrambleType === 'words' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={scrambleType === 'lines' ? 'default' : 'outline'}
                onClick={() => setScrambleType('lines')}
                className={scrambleType === 'lines' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={scrambleType === 'wordChars' ? 'default' : 'outline'}
                onClick={() => setScrambleType('wordChars')}
                className={scrambleType === 'wordChars' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Word Chars
              </Button>
              <Button
                size="sm"
                variant={scrambleType === 'middle' ? 'default' : 'outline'}
                onClick={() => setScrambleType('middle')}
                className={scrambleType === 'middle' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Middle Letters
              </Button>
            </div>
          </div>
          <Button
            onClick={scramble}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Scramble Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                {scrambleType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Scrambled</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to scramble</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

