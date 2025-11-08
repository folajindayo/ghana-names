'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scissors, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSubstringExtractorEnhanced() {
  const [input, setInput] = useState('')
  const [start, setStart] = useState('0')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState('')
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

    const startIdx = parseInt(start) || 0
    const endIdx = end ? parseInt(end) : input.length

    if (startIdx < 0 || startIdx > input.length) {
      toast({
        title: "Invalid start index",
        description: `Start must be between 0 and ${input.length}`,
        variant: "destructive",
      })
      return
    }

    if (endIdx < startIdx || endIdx > input.length) {
      toast({
        title: "Invalid end index",
        description: `End must be between ${startIdx} and ${input.length}`,
        variant: "destructive",
      })
      return
    }

    const extracted = input.substring(startIdx, endIdx)
    setResult(extracted)
    toast({
      title: "Extracted!",
      description: `Substring extracted from position ${startIdx} to ${endIdx}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Substring copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Scissors className="h-5 w-5 text-amber-400" />
          Enhanced Substring Extractor
        </CardTitle>
        <CardDescription className="text-white/70">
          Extract a substring from text using start and end positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {input && (
              <p className="text-white/60 text-xs">Length: {input.length} characters</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label className="text-white/80">Start Position</Label>
              <Input
                type="number"
                placeholder="0"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                min="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">End Position</Label>
              <Input
                type="number"
                placeholder="Leave empty for end"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && extract()}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
          <Button
            onClick={extract}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Extract Substring
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-amber-600/40 text-amber-100 border-amber-400/50">
                {result.length} characters
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-2">{input}</p>
              <p className="text-white/50 text-xs mb-4">
                Positions: {start} to {end || input.length}
              </p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Extracted</h4>
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
            <p className="text-white/60 text-sm">Enter text and positions, then click to extract</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

