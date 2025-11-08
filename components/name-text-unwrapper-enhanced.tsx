'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Unwrap, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextUnwrapperEnhanced() {
  const [input, setInput] = useState('')
  const [unwrapType, setUnwrapType] = useState<string>('lines')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const unwrap = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let unwrapped = ''

    if (unwrapType === 'lines') {
      unwrapped = input.split('\n').map(line => line.trim()).join(' ')
    } else if (unwrapType === 'paragraphs') {
      unwrapped = input.split(/\n\s*\n/).map(para => para.replace(/\n/g, ' ').trim()).join('\n\n')
    } else if (unwrapType === 'sentences') {
      unwrapped = input.split(/[.!?]+\s*/).map(s => s.trim()).join('. ')
    } else if (unwrapType === 'words') {
      unwrapped = input.split(/\s+/).join('')
    } else if (unwrapType === 'spaces') {
      unwrapped = input.replace(/\s+/g, '')
    } else if (unwrapType === 'newlines') {
      unwrapped = input.replace(/\n/g, ' ')
    } else if (unwrapType === 'tabs') {
      unwrapped = input.replace(/\t/g, ' ')
    } else if (unwrapType === 'allWhitespace') {
      unwrapped = input.replace(/\s+/g, '')
    }

    setResult(unwrapped)
    toast({
      title: "Unwrapped!",
      description: `Text unwrapped (${unwrapType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Unwrapped text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Unwrap className="h-5 w-5 text-amber-400" />
          Enhanced Text Unwrapper
        </CardTitle>
        <CardDescription className="text-white/70">
          Unwrap text by removing line breaks, spaces, or formatting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to unwrap"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && unwrap()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Unwrap Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={unwrapType === 'lines' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('lines')}
                className={unwrapType === 'lines' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'paragraphs' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('paragraphs')}
                className={unwrapType === 'paragraphs' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Paragraphs
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'sentences' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('sentences')}
                className={unwrapType === 'sentences' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentences
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'words' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('words')}
                className={unwrapType === 'words' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'spaces' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('spaces')}
                className={unwrapType === 'spaces' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'newlines' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('newlines')}
                className={unwrapType === 'newlines' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newlines
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'tabs' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('tabs')}
                className={unwrapType === 'tabs' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Tabs
              </Button>
              <Button
                size="sm"
                variant={unwrapType === 'allWhitespace' ? 'default' : 'outline'}
                onClick={() => setUnwrapType('allWhitespace')}
                className={unwrapType === 'allWhitespace' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All Whitespace
              </Button>
            </div>
          </div>
          <Button
            onClick={unwrap}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Unwrap Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-amber-600/40 text-amber-100 border-amber-400/50">
                {unwrapType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Unwrapped</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to unwrap</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

