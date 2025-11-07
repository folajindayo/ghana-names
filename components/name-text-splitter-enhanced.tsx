'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scissors, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSplitterEnhanced() {
  const [input, setInput] = useState('')
  const [delimiter, setDelimiter] = useState(' ')
  const [result, setResult] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const split = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let parts: string[] = []

    if (delimiter === 'space') {
      parts = input.trim().split(/\s+/)
    } else if (delimiter === 'comma') {
      parts = input.split(',').map(p => p.trim()).filter(p => p.length > 0)
    } else if (delimiter === 'newline') {
      parts = input.split('\n').map(p => p.trim()).filter(p => p.length > 0)
    } else if (delimiter === 'custom') {
      const customDelimiter = prompt('Enter custom delimiter:') || ' '
      parts = input.split(customDelimiter).map(p => p.trim()).filter(p => p.length > 0)
    } else {
      parts = input.split(delimiter).map(p => p.trim()).filter(p => p.length > 0)
    }

    setResult(parts)
    toast({
      title: "Split!",
      description: `Split into ${parts.length} part${parts.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  const copyAll = () => {
    const text = result.join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "All parts copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Scissors className="h-5 w-5 text-pink-400" />
          Enhanced Text Splitter
        </CardTitle>
        <CardDescription className="text-white/70">
          Split text by different delimiters (space, comma, newline, custom)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to split"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && split()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Delimiter</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={delimiter === 'space' ? 'default' : 'outline'}
                onClick={() => setDelimiter('space')}
                className={delimiter === 'space' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Space
              </Button>
              <Button
                size="sm"
                variant={delimiter === 'comma' ? 'default' : 'outline'}
                onClick={() => setDelimiter('comma')}
                className={delimiter === 'comma' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Comma
              </Button>
              <Button
                size="sm"
                variant={delimiter === 'newline' ? 'default' : 'outline'}
                onClick={() => setDelimiter('newline')}
                className={delimiter === 'newline' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newline
              </Button>
              <Button
                size="sm"
                variant={delimiter === 'custom' ? 'default' : 'outline'}
                onClick={() => setDelimiter('custom')}
                className={delimiter === 'custom' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Custom
              </Button>
            </div>
          </div>
          <Button
            onClick={split}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Split Text
          </Button>
        </div>

        {result.length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                {result.length} Part{result.length !== 1 ? 's' : ''}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={copyAll}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                Copy All
              </Button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {result.map((part, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Badge variant="secondary" className="bg-pink-600/20 text-pink-200 border-pink-400/30 text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-white/90 text-sm flex-1">{part}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(part)}
                    className="text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {input && result.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to split</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

