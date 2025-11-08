'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scissors, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextTruncatorEnhanced() {
  const [input, setInput] = useState('')
  const [maxLength, setMaxLength] = useState('50')
  const [truncateType, setTruncateType] = useState<string>('end')
  const [suffix, setSuffix] = useState('...')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const truncate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const length = parseInt(maxLength) || 50
    if (length < 1) {
      toast({
        title: "Invalid length",
        description: "Length must be at least 1",
        variant: "destructive",
      })
      return
    }

    let truncated = ''

    if (truncateType === 'end') {
      if (input.length <= length) {
        truncated = input
      } else {
        truncated = input.substring(0, length - suffix.length) + suffix
      }
    } else if (truncateType === 'start') {
      if (input.length <= length) {
        truncated = input
      } else {
        truncated = suffix + input.substring(input.length - length + suffix.length)
      }
    } else if (truncateType === 'middle') {
      if (input.length <= length) {
        truncated = input
      } else {
        const half = Math.floor((length - suffix.length) / 2)
        truncated = input.substring(0, half) + suffix + input.substring(input.length - half)
      }
    } else if (truncateType === 'word') {
      if (input.length <= length) {
        truncated = input
      } else {
        const words = input.substring(0, length).split(/\s+/)
        words.pop()
        truncated = words.join(' ') + suffix
      }
    }

    setResult(truncated)
    toast({
      title: "Truncated!",
      description: `Text truncated to ${length} characters (${truncateType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Truncated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Scissors className="h-5 w-5 text-rose-400" />
          Enhanced Text Truncator
        </CardTitle>
        <CardDescription className="text-white/70">
          Truncate text to a specified length (end, start, middle, word)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to truncate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Max Length</Label>
            <Input
              type="number"
              placeholder="50"
              value={maxLength}
              onChange={(e) => setMaxLength(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Suffix</Label>
            <Input
              placeholder="..."
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Truncate Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={truncateType === 'end' ? 'default' : 'outline'}
                onClick={() => setTruncateType('end')}
                className={truncateType === 'end' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                End
              </Button>
              <Button
                size="sm"
                variant={truncateType === 'start' ? 'default' : 'outline'}
                onClick={() => setTruncateType('start')}
                className={truncateType === 'start' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Start
              </Button>
              <Button
                size="sm"
                variant={truncateType === 'middle' ? 'default' : 'outline'}
                onClick={() => setTruncateType('middle')}
                className={truncateType === 'middle' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Middle
              </Button>
              <Button
                size="sm"
                variant={truncateType === 'word' ? 'default' : 'outline'}
                onClick={() => setTruncateType('word')}
                className={truncateType === 'word' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Word
              </Button>
            </div>
          </div>
          <Button
            onClick={truncate}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Truncate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-rose-600/40 text-rose-100 border-rose-400/50">
                {truncateType} ({result.length} chars)
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original ({input.length} chars)</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Truncated</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to truncate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

