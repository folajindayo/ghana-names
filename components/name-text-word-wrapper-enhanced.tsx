'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WrapText, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextWordWrapperEnhanced() {
  const [input, setInput] = useState('')
  const [maxLength, setMaxLength] = useState('80')
  const [wrapType, setWrapType] = useState<string>('word')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const wrap = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const length = parseInt(maxLength) || 80
    if (length < 1) {
      toast({
        title: "Invalid length",
        description: "Length must be at least 1",
        variant: "destructive",
      })
      return
    }

    let wrapped = ''

    if (wrapType === 'word') {
      const words = input.split(/\s+/)
      let currentLine = ''
      wrapped = words.map(word => {
        if ((currentLine + word).length <= length) {
          currentLine = currentLine ? currentLine + ' ' + word : word
          return null
        } else {
          const line = currentLine
          currentLine = word
          return line
        }
      }).filter(line => line !== null).join('\n')
      if (currentLine) {
        wrapped += (wrapped ? '\n' : '') + currentLine
      }
    } else if (wrapType === 'character') {
      for (let i = 0; i < input.length; i += length) {
        wrapped += (wrapped ? '\n' : '') + input.substring(i, i + length)
      }
    } else if (wrapType === 'sentence') {
      const sentences = input.split(/([.!?]+\s*)/)
      let currentLine = ''
      sentences.forEach(sentence => {
        if ((currentLine + sentence).length <= length) {
          currentLine += sentence
        } else {
          if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine.trim()
          currentLine = sentence
        }
      })
      if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine.trim()
    } else if (wrapType === 'paragraph') {
      wrapped = input.split(/\n\s*\n/).map(para => {
        const words = para.split(/\s+/)
        let currentLine = ''
        return words.map(word => {
          if ((currentLine + word).length <= length) {
            currentLine = currentLine ? currentLine + ' ' + word : word
            return null
          } else {
            const line = currentLine
            currentLine = word
            return line
          }
        }).filter(line => line !== null).concat(currentLine).join('\n')
      }).join('\n\n')
    }

    setResult(wrapped)
    toast({
      title: "Wrapped!",
      description: `Text wrapped at ${length} characters (${wrapType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Wrapped text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <WrapText className="h-5 w-5 text-teal-400" />
          Enhanced Word Wrapper
        </CardTitle>
        <CardDescription className="text-white/70">
          Wrap text at specified length (word wrap, character wrap, sentence wrap, paragraph wrap)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to wrap"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Max Length</Label>
            <Input
              type="number"
              placeholder="80"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Wrap Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={wrapType === 'word' ? 'default' : 'outline'}
                onClick={() => setWrapType('word')}
                className={wrapType === 'word' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Word Wrap
              </Button>
              <Button
                size="sm"
                variant={wrapType === 'character' ? 'default' : 'outline'}
                onClick={() => setWrapType('character')}
                className={wrapType === 'character' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Character Wrap
              </Button>
              <Button
                size="sm"
                variant={wrapType === 'sentence' ? 'default' : 'outline'}
                onClick={() => setWrapType('sentence')}
                className={wrapType === 'sentence' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentence Wrap
              </Button>
              <Button
                size="sm"
                variant={wrapType === 'paragraph' ? 'default' : 'outline'}
                onClick={() => setWrapType('paragraph')}
                className={wrapType === 'paragraph' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Paragraph Wrap
              </Button>
            </div>
          </div>
          <Button
            onClick={wrap}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Wrap Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50">
                {wrapType} at {maxLength} chars
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Wrapped Text</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm whitespace-pre-wrap font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to wrap</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

