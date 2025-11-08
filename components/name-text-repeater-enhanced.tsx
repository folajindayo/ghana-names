'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Repeat, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextRepeaterEnhanced() {
  const [input, setInput] = useState('')
  const [count, setCount] = useState('3')
  const [separator, setSeparator] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const repeat = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const num = parseInt(count) || 3
    if (num < 1 || num > 100) {
      toast({
        title: "Invalid count",
        description: "Count must be between 1 and 100",
        variant: "destructive",
      })
      return
    }

    const sep = separator || ''
    const repeated = Array(num).fill(input).join(sep)

    setResult(repeated)
    toast({
      title: "Repeated!",
      description: `Text repeated ${num} time${num !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Repeated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Repeat className="h-5 w-5 text-emerald-400" />
          Enhanced Text Repeater
        </CardTitle>
        <CardDescription className="text-white/70">
          Repeat text a specified number of times with optional separator
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to repeat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Repeat Count (1-100)</Label>
            <Input
              type="number"
              placeholder="3"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="100"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Separator (optional)</Label>
            <Input
              placeholder="Leave empty for no separator"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && repeat()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
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
                onClick={() => setSeparator('\n')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                Newline
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSeparator(', ')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                Comma
              </Button>
            </div>
          </div>
          <Button
            onClick={repeat}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Repeat Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50">
                Repeated {count} time{parseInt(count) !== 1 ? 's' : ''}
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

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to repeat</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

