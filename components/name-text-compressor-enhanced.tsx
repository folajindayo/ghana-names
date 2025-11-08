'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Minimize2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextCompressorEnhanced() {
  const [input, setInput] = useState('')
  const [compressType, setCompressType] = useState<string>('spaces')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const compress = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let compressed = ''

    if (compressType === 'spaces') {
      compressed = input.replace(/\s+/g, ' ').trim()
    } else if (compressType === 'allWhitespace') {
      compressed = input.replace(/\s+/g, '')
    } else if (compressType === 'newlines') {
      compressed = input.replace(/\n+/g, '\n')
    } else if (compressType === 'tabs') {
      compressed = input.replace(/\t+/g, '\t')
    } else if (compressType === 'duplicates') {
      compressed = input.split('').filter((char, index, arr) => char !== arr[index + 1]).join('')
    } else if (compressType === 'duplicateWords') {
      const words = input.split(/\s+/)
      const seen = new Set<string>()
      compressed = words.filter(word => {
        const lower = word.toLowerCase()
        if (seen.has(lower)) return false
        seen.add(lower)
        return true
      }).join(' ')
    } else if (compressType === 'duplicateLines') {
      const lines = input.split('\n')
      const seen = new Set<string>()
      compressed = lines.filter(line => {
        const trimmed = line.trim()
        if (seen.has(trimmed)) return false
        seen.add(trimmed)
        return true
      }).join('\n')
    }

    setResult(compressed)
    const reduction = ((1 - compressed.length / input.length) * 100).toFixed(1)
    toast({
      title: "Compressed!",
      description: `Text compressed (${compressType}) - ${reduction}% reduction`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Compressed text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Minimize2 className="h-5 w-5 text-orange-400" />
          Enhanced Text Compressor
        </CardTitle>
        <CardDescription className="text-white/70">
          Compress text by removing redundant spaces, duplicates, or duplicate lines/words
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to compress"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compress()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {input && (
              <p className="text-white/60 text-xs">Original length: {input.length} characters</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Compress Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={compressType === 'spaces' ? 'default' : 'outline'}
                onClick={() => setCompressType('spaces')}
                className={compressType === 'spaces' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces
              </Button>
              <Button
                size="sm"
                variant={compressType === 'allWhitespace' ? 'default' : 'outline'}
                onClick={() => setCompressType('allWhitespace')}
                className={compressType === 'allWhitespace' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All Whitespace
              </Button>
              <Button
                size="sm"
                variant={compressType === 'newlines' ? 'default' : 'outline'}
                onClick={() => setCompressType('newlines')}
                className={compressType === 'newlines' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newlines
              </Button>
              <Button
                size="sm"
                variant={compressType === 'tabs' ? 'default' : 'outline'}
                onClick={() => setCompressType('tabs')}
                className={compressType === 'tabs' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Tabs
              </Button>
              <Button
                size="sm"
                variant={compressType === 'duplicates' ? 'default' : 'outline'}
                onClick={() => setCompressType('duplicates')}
                className={compressType === 'duplicates' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Duplicate Chars
              </Button>
              <Button
                size="sm"
                variant={compressType === 'duplicateWords' ? 'default' : 'outline'}
                onClick={() => setCompressType('duplicateWords')}
                className={compressType === 'duplicateWords' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Duplicate Words
              </Button>
              <Button
                size="sm"
                variant={compressType === 'duplicateLines' ? 'default' : 'outline'}
                onClick={() => setCompressType('duplicateLines')}
                className={compressType === 'duplicateLines' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Duplicate Lines
              </Button>
            </div>
          </div>
          <Button
            onClick={compress}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Compress Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                {compressType} - {((1 - result.length / input.length) * 100).toFixed(1)}% reduction
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original ({input.length} chars)</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Compressed ({result.length} chars)</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to compress</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

