'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FilterX, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextDeduplicatorEnhanced() {
  const [input, setInput] = useState('')
  const [dedupeType, setDedupeType] = useState<string>('lines')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const deduplicate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let deduplicated = ''
    const originalCount = input.split('\n').length

    if (dedupeType === 'lines') {
      const lines = input.split('\n')
      const seen = new Set<string>()
      deduplicated = lines.filter(line => {
        const trimmed = line.trim()
        if (trimmed && seen.has(trimmed)) return false
        if (trimmed) seen.add(trimmed)
        return true
      }).join('\n')
    } else if (dedupeType === 'linesKeepEmpty') {
      const lines = input.split('\n')
      const seen = new Set<string>()
      deduplicated = lines.filter(line => {
        if (line.trim() && seen.has(line.trim())) return false
        if (line.trim()) seen.add(line.trim())
        return true
      }).join('\n')
    } else if (dedupeType === 'words') {
      const words = input.split(/\s+/)
      const seen = new Set<string>()
      deduplicated = words.filter(word => {
        const lower = word.toLowerCase()
        if (seen.has(lower)) return false
        seen.add(lower)
        return true
      }).join(' ')
    } else if (dedupeType === 'wordsCaseSensitive') {
      const words = input.split(/\s+/)
      const seen = new Set<string>()
      deduplicated = words.filter(word => {
        if (seen.has(word)) return false
        seen.add(word)
        return true
      }).join(' ')
    } else if (dedupeType === 'characters') {
      const seen = new Set<string>()
      deduplicated = input.split('').filter(char => {
        if (seen.has(char)) return false
        seen.add(char)
        return true
      }).join('')
    } else if (dedupeType === 'consecutive') {
      deduplicated = input.split('').filter((char, index, arr) => char !== arr[index + 1]).join('')
    }

    setResult(deduplicated)
    const newCount = deduplicated.split('\n').length
    const removed = dedupeType.includes('line') ? originalCount - newCount : input.length - deduplicated.length
    toast({
      title: "Deduplicated!",
      description: `Removed ${removed} duplicate${removed !== 1 ? 's' : ''} (${dedupeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Deduplicated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FilterX className="h-5 w-5 text-teal-400" />
          Enhanced Text Deduplicator
        </CardTitle>
        <CardDescription className="text-white/70">
          Remove duplicate lines, words, or characters from text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to deduplicate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && deduplicate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Deduplicate Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={dedupeType === 'lines' ? 'default' : 'outline'}
                onClick={() => setDedupeType('lines')}
                className={dedupeType === 'lines' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={dedupeType === 'linesKeepEmpty' ? 'default' : 'outline'}
                onClick={() => setDedupeType('linesKeepEmpty')}
                className={dedupeType === 'linesKeepEmpty' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines (Keep Empty)
              </Button>
              <Button
                size="sm"
                variant={dedupeType === 'words' ? 'default' : 'outline'}
                onClick={() => setDedupeType('words')}
                className={dedupeType === 'words' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={dedupeType === 'wordsCaseSensitive' ? 'default' : 'outline'}
                onClick={() => setDedupeType('wordsCaseSensitive')}
                className={dedupeType === 'wordsCaseSensitive' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words (Case Sensitive)
              </Button>
              <Button
                size="sm"
                variant={dedupeType === 'characters' ? 'default' : 'outline'}
                onClick={() => setDedupeType('characters')}
                className={dedupeType === 'characters' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={dedupeType === 'consecutive' ? 'default' : 'outline'}
                onClick={() => setDedupeType('consecutive')}
                className={dedupeType === 'consecutive' ? 'bg-teal-500 hover:bg-teal-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Consecutive
              </Button>
            </div>
          </div>
          <Button
            onClick={deduplicate}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Deduplicate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50">
                {dedupeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original ({input.length} chars)</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Deduplicated ({result.length} chars)</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to deduplicate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

