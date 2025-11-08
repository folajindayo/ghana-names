'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Normalize, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextNormalizerEnhanced() {
  const [input, setInput] = useState('')
  const [normalizeType, setNormalizeType] = useState<string>('unicode')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const normalize = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let normalized = ''

    if (normalizeType === 'unicode') {
      normalized = input.normalize('NFC')
    } else if (normalizeType === 'unicodeNFD') {
      normalized = input.normalize('NFD')
    } else if (normalizeType === 'unicodeNFKC') {
      normalized = input.normalize('NFKC')
    } else if (normalizeType === 'unicodeNFKD') {
      normalized = input.normalize('NFKD')
    } else if (normalizeType === 'quotes') {
      normalized = input
        .replace(/[""]/g, '"')
        .replace(/['']/g, "'")
        .replace(/—/g, '--')
        .replace(/–/g, '-')
    } else if (normalizeType === 'spaces') {
      normalized = input.replace(/\s+/g, ' ').trim()
    } else if (normalizeType === 'lineEndings') {
      normalized = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    } else if (normalizeType === 'all') {
      normalized = input
        .normalize('NFC')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\s+/g, ' ')
        .trim()
    }

    setResult(normalized)
    toast({
      title: "Normalized!",
      description: `Text normalized (${normalizeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Normalized text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Normalize className="h-5 w-5 text-indigo-400" />
          Enhanced Text Normalizer
        </CardTitle>
        <CardDescription className="text-white/70">
          Normalize text (Unicode normalization, quotes, spaces, line endings)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to normalize"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && normalize()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Normalize Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={normalizeType === 'unicode' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('unicode')}
                className={normalizeType === 'unicode' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unicode NFC
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'unicodeNFD' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('unicodeNFD')}
                className={normalizeType === 'unicodeNFD' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unicode NFD
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'unicodeNFKC' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('unicodeNFKC')}
                className={normalizeType === 'unicodeNFKC' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unicode NFKC
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'unicodeNFKD' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('unicodeNFKD')}
                className={normalizeType === 'unicodeNFKD' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unicode NFKD
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'quotes' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('quotes')}
                className={normalizeType === 'quotes' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Quotes
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'spaces' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('spaces')}
                className={normalizeType === 'spaces' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'lineEndings' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('lineEndings')}
                className={normalizeType === 'lineEndings' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Line Endings
              </Button>
              <Button
                size="sm"
                variant={normalizeType === 'all' ? 'default' : 'outline'}
                onClick={() => setNormalizeType('all')}
                className={normalizeType === 'all' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All
              </Button>
            </div>
          </div>
          <Button
            onClick={normalize}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Normalize Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50">
                {normalizeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Normalized</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to normalize</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

