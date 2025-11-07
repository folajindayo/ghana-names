'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameDuplicateRemoverEnhanced() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState<'lines' | 'words' | 'characters'>('lines')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const removeDuplicates = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let processed = ''
    let removed = 0

    if (mode === 'lines') {
      const lines = input.split('\n')
      const seen = new Set<string>()
      const unique: string[] = []
      
      lines.forEach((line) => {
        const trimmed = line.trim()
        if (trimmed && !seen.has(trimmed)) {
          seen.add(trimmed)
          unique.push(line)
        } else if (trimmed) {
          removed++
        } else {
          unique.push(line)
        }
      })
      
      processed = unique.join('\n')
    } else if (mode === 'words') {
      const words = input.split(/\s+/)
      const seen = new Set<string>()
      const unique: string[] = []
      
      words.forEach((word) => {
        const lower = word.toLowerCase()
        if (!seen.has(lower)) {
          seen.add(lower)
          unique.push(word)
        } else {
          removed++
        }
      })
      
      processed = unique.join(' ')
    } else if (mode === 'characters') {
      const chars = input.split('')
      const seen = new Set<string>()
      const unique: string[] = []
      
      chars.forEach((char) => {
        if (char === ' ' || !seen.has(char.toLowerCase())) {
          if (char !== ' ') {
            seen.add(char.toLowerCase())
          }
          unique.push(char)
        } else {
          removed++
        }
      })
      
      processed = unique.join('')
    }

    setResult(processed)
    toast({
      title: "Processed!",
      description: `Removed ${removed} duplicate${removed !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-purple-400" />
          Enhanced Duplicate Remover
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
              placeholder="Enter text with duplicates"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && removeDuplicates()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Remove Duplicates By</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={mode === 'lines' ? 'default' : 'outline'}
                onClick={() => setMode('lines')}
                className={mode === 'lines' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={mode === 'words' ? 'default' : 'outline'}
                onClick={() => setMode('words')}
                className={mode === 'words' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={mode === 'characters' ? 'default' : 'outline'}
                onClick={() => setMode('characters')}
                className={mode === 'characters' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
            </div>
          </div>
          <Button
            onClick={removeDuplicates}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Remove Duplicates
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50">
                {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
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
            <p className="text-white/60 text-sm">Enter text and click to remove duplicates</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

