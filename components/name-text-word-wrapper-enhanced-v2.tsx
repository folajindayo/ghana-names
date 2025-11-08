'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WrapText, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextWordWrapperEnhancedV2() {
  const [input, setInput] = useState('')
  const [lineLength, setLineLength] = useState('80')
  const [wrapMode, setWrapMode] = useState<string>('soft')
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

    const length = parseInt(lineLength) || 80
    if (length < 1) {
      toast({
        title: "Invalid length",
        description: "Length must be at least 1",
        variant: "destructive",
      })
      return
    }

    let wrapped = ''

    if (wrapMode === 'soft') {
      const words = input.split(/\s+/)
      let currentLine = ''
      words.forEach(word => {
        if ((currentLine + word).length <= length) {
          currentLine = currentLine ? currentLine + ' ' + word : word
        } else {
          if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine
          currentLine = word
        }
      })
      if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine
    } else if (wrapMode === 'hard') {
      for (let i = 0; i < input.length; i += length) {
        wrapped += (wrapped ? '\n' : '') + input.substring(i, i + length)
      }
    } else if (wrapMode === 'wordBreak') {
      const words = input.split(/\s+/)
      let currentLine = ''
      words.forEach(word => {
        if (word.length > length) {
          if (currentLine) {
            wrapped += (wrapped ? '\n' : '') + currentLine
            currentLine = ''
          }
          for (let i = 0; i < word.length; i += length) {
            wrapped += (wrapped ? '\n' : '') + word.substring(i, i + length)
          }
        } else if ((currentLine + word).length <= length) {
          currentLine = currentLine ? currentLine + ' ' + word : word
        } else {
          if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine
          currentLine = word
        }
      })
      if (currentLine) wrapped += (wrapped ? '\n' : '') + currentLine
    }

    setResult(wrapped)
    toast({
      title: "Wrapped!",
      description: `Text wrapped at ${length} characters (${wrapMode})`,
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
          <WrapText className="h-5 w-5 text-cyan-400" />
          Enhanced Word Wrapper V2
        </CardTitle>
        <CardDescription className="text-white/70">
          Wrap text with advanced options (soft wrap, hard wrap, word break)
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
            <Label className="text-white/80">Line Length</Label>
            <Input
              type="number"
              placeholder="80"
              value={lineLength}
              onChange={(e) => setLineLength(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Wrap Mode</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant={wrapMode === 'soft' ? 'default' : 'outline'}
                onClick={() => setWrapMode('soft')}
                className={wrapMode === 'soft' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Soft
              </Button>
              <Button
                size="sm"
                variant={wrapMode === 'hard' ? 'default' : 'outline'}
                onClick={() => setWrapMode('hard')}
                className={wrapMode === 'hard' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Hard
              </Button>
              <Button
                size="sm"
                variant={wrapMode === 'wordBreak' ? 'default' : 'outline'}
                onClick={() => setWrapMode('wordBreak')}
                className={wrapMode === 'wordBreak' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Word Break
              </Button>
            </div>
          </div>
          <Button
            onClick={wrap}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Wrap Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50">
                {wrapMode} wrap at {lineLength} chars
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

