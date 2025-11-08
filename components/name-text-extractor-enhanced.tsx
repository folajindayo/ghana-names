'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextExtractorEnhanced() {
  const [input, setInput] = useState('')
  const [extractType, setExtractType] = useState<string>('numbers')
  const [result, setResult] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const extract = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let extracted: string[] = []

    if (extractType === 'numbers') {
      extracted = input.match(/\d+/g) || []
    } else if (extractType === 'letters') {
      extracted = input.match(/[a-zA-Z]+/g) || []
    } else if (extractType === 'words') {
      extracted = input.match(/\b\w+\b/g) || []
    } else if (extractType === 'emails') {
      extracted = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []
    } else if (extractType === 'urls') {
      extracted = input.match(/https?:\/\/[^\s]+/g) || []
    } else if (extractType === 'uppercase') {
      extracted = input.match(/[A-Z]+/g) || []
    } else if (extractType === 'lowercase') {
      extracted = input.match(/[a-z]+/g) || []
    }

    setResult(extracted)
    toast({
      title: "Extracted!",
      description: `Found ${extracted.length} match${extracted.length !== 1 ? 'es' : ''}`,
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
      description: "All extracted items copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-teal-400" />
          Enhanced Text Extractor
        </CardTitle>
        <CardDescription className="text-white/70">
          Extract specific patterns from text (numbers, letters, words, emails, URLs, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to extract from"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && extract()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Extract Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={extractType === 'numbers' ? 'default' : 'outline'}
                onClick={() => setExtractType('numbers')}
                className={extractType === 'numbers' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Numbers
              </Button>
              <Button
                size="sm"
                variant={extractType === 'letters' ? 'default' : 'outline'}
                onClick={() => setExtractType('letters')}
                className={extractType === 'letters' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Letters
              </Button>
              <Button
                size="sm"
                variant={extractType === 'words' ? 'default' : 'outline'}
                onClick={() => setExtractType('words')}
                className={extractType === 'words' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={extractType === 'emails' ? 'default' : 'outline'}
                onClick={() => setExtractType('emails')}
                className={extractType === 'emails' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Emails
              </Button>
              <Button
                size="sm"
                variant={extractType === 'urls' ? 'default' : 'outline'}
                onClick={() => setExtractType('urls')}
                className={extractType === 'urls' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                URLs
              </Button>
              <Button
                size="sm"
                variant={extractType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setExtractType('uppercase')}
                className={extractType === 'uppercase' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Uppercase
              </Button>
              <Button
                size="sm"
                variant={extractType === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setExtractType('lowercase')}
                className={extractType === 'lowercase' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lowercase
              </Button>
            </div>
          </div>
          <Button
            onClick={extract}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Extract
          </Button>
        </div>

        {result.length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50">
                {result.length} Item{result.length !== 1 ? 's' : ''}
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
              {result.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <Badge variant="secondary" className="bg-teal-600/20 text-teal-200 border-teal-400/30 text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-white/90 text-sm flex-1">{item}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(item)}
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
            <p className="text-white/60 text-sm">Enter text and click to extract</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

