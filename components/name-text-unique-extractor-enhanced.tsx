'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextUniqueExtractorEnhanced() {
  const [input, setInput] = useState('')
  const [extractType, setExtractType] = useState<string>('words')
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

    let items: string[] = []
    let unique: string[] = []

    if (extractType === 'words') {
      items = input.split(/\s+/).filter(w => w.trim().length > 0)
      unique = Array.from(new Set(items.map(w => w.toLowerCase())))
    } else if (extractType === 'lines') {
      items = input.split('\n').filter(l => l.trim().length > 0)
      unique = Array.from(new Set(items.map(l => l.trim())))
    } else if (extractType === 'characters') {
      items = input.split('').filter(c => c.trim().length > 0)
      unique = Array.from(new Set(items))
    } else if (extractType === 'sentences') {
      items = input.split(/[.!?]+\s*/).filter(s => s.trim().length > 0)
      unique = Array.from(new Set(items.map(s => s.trim())))
    } else if (extractType === 'numbers') {
      items = input.match(/\d+/g) || []
      unique = Array.from(new Set(items))
    } else if (extractType === 'emails') {
      items = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || []
      unique = Array.from(new Set(items))
    }

    setResult(unique)
    toast({
      title: "Extracted!",
      description: `Found ${unique.length} unique ${extractType} out of ${items.length} total`,
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
      description: "All unique items copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-indigo-400" />
          Enhanced Unique Extractor
        </CardTitle>
        <CardDescription className="text-white/70">
          Extract unique items from text (words, lines, characters, sentences, numbers, emails)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to extract unique items from"
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
                variant={extractType === 'words' ? 'default' : 'outline'}
                onClick={() => setExtractType('words')}
                className={extractType === 'words' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={extractType === 'lines' ? 'default' : 'outline'}
                onClick={() => setExtractType('lines')}
                className={extractType === 'lines' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={extractType === 'characters' ? 'default' : 'outline'}
                onClick={() => setExtractType('characters')}
                className={extractType === 'characters' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={extractType === 'sentences' ? 'default' : 'outline'}
                onClick={() => setExtractType('sentences')}
                className={extractType === 'sentences' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentences
              </Button>
              <Button
                size="sm"
                variant={extractType === 'numbers' ? 'default' : 'outline'}
                onClick={() => setExtractType('numbers')}
                className={extractType === 'numbers' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Numbers
              </Button>
              <Button
                size="sm"
                variant={extractType === 'emails' ? 'default' : 'outline'}
                onClick={() => setExtractType('emails')}
                className={extractType === 'emails' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Emails
              </Button>
            </div>
          </div>
          <Button
            onClick={extract}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Extract Unique Items
          </Button>
        </div>

        {result.length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50">
                {result.length} Unique {extractType}
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
                    <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-200 border-indigo-400/30 text-xs">
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
            <p className="text-white/60 text-sm">Enter text and click to extract unique items</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

