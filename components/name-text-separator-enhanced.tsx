'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSeparatorEnhanced() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState(' ')
  const [separateBy, setSeparateBy] = useState<string>('characters')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const separate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let separated = ''

    if (separateBy === 'characters') {
      separated = input.split('').join(separator)
    } else if (separateBy === 'words') {
      separated = input.split(/\s+/).join(separator)
    } else if (separateBy === 'lines') {
      separated = input.split('\n').join(separator)
    } else if (separateBy === 'sentences') {
      separated = input.split(/[.!?]+\s*/).filter(s => s.trim()).join(separator)
    } else if (separateBy === 'everyN') {
      const n = parseInt(separator) || 1
      if (n < 1) {
        toast({
          title: "Invalid number",
          description: "Number must be at least 1",
          variant: "destructive",
        })
        return
      }
      for (let i = 0; i < input.length; i += n) {
        separated += (separated ? ' ' : '') + input.substring(i, i + n)
      }
    }

    setResult(separated)
    toast({
      title: "Separated!",
      description: `Text separated (${separateBy})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Separated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Separator className="h-5 w-5 text-green-400" />
          Enhanced Text Separator
        </CardTitle>
        <CardDescription className="text-white/70">
          Separate text with custom separators (characters, words, lines, sentences, every N chars)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to separate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Separator</Label>
            <Input
              placeholder="Enter separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {separateBy !== 'everyN' && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSeparator(' ')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  Space
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSeparator(',')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  Comma
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSeparator('|')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  Pipe
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSeparator('-')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
                >
                  Dash
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Separate By</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={separateBy === 'characters' ? 'default' : 'outline'}
                onClick={() => setSeparateBy('characters')}
                className={separateBy === 'characters' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={separateBy === 'words' ? 'default' : 'outline'}
                onClick={() => setSeparateBy('words')}
                className={separateBy === 'words' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={separateBy === 'lines' ? 'default' : 'outline'}
                onClick={() => setSeparateBy('lines')}
                className={separateBy === 'lines' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={separateBy === 'sentences' ? 'default' : 'outline'}
                onClick={() => setSeparateBy('sentences')}
                className={separateBy === 'sentences' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentences
              </Button>
              <Button
                size="sm"
                variant={separateBy === 'everyN' ? 'default' : 'outline'}
                onClick={() => setSeparateBy('everyN')}
                className={separateBy === 'everyN' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Every N Chars
              </Button>
            </div>
          </div>
          <Button
            onClick={separate}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Separate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                {separateBy}
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
              <p className="text-white/90 text-sm whitespace-pre-wrap font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to separate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

