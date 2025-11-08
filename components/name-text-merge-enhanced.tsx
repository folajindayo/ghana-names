'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Merge, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextMergeEnhanced() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [mergeType, setMergeType] = useState<string>('concatenate')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const merge = () => {
    if (!text1.trim() || !text2.trim()) {
      toast({
        title: "Both texts required",
        description: "Please enter both texts",
        variant: "destructive",
      })
      return
    }

    let merged = ''

    if (mergeType === 'concatenate') {
      merged = text1 + text2
    } else if (mergeType === 'space') {
      merged = text1 + ' ' + text2
    } else if (mergeType === 'newline') {
      merged = text1 + '\n' + text2
    } else if (mergeType === 'comma') {
      merged = text1 + ', ' + text2
    } else if (mergeType === 'alternating') {
      const chars1 = text1.split('')
      const chars2 = text2.split('')
      const maxLength = Math.max(chars1.length, chars2.length)
      const mergedChars: string[] = []
      for (let i = 0; i < maxLength; i++) {
        if (i < chars1.length) mergedChars.push(chars1[i])
        if (i < chars2.length) mergedChars.push(chars2[i])
      }
      merged = mergedChars.join('')
    } else if (mergeType === 'interleave') {
      const words1 = text1.split(/\s+/)
      const words2 = text2.split(/\s+/)
      const maxLength = Math.max(words1.length, words2.length)
      const mergedWords: string[] = []
      for (let i = 0; i < maxLength; i++) {
        if (i < words1.length) mergedWords.push(words1[i])
        if (i < words2.length) mergedWords.push(words2[i])
      }
      merged = mergedWords.join(' ')
    } else if (mergeType === 'unique') {
      const combined = (text1 + ' ' + text2).split(/\s+/)
      const unique = Array.from(new Set(combined.filter(w => w.trim())))
      merged = unique.join(' ')
    }

    setResult(merged)
    toast({
      title: "Merged!",
      description: `Texts merged (${mergeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Merged text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Merge className="h-5 w-5 text-rose-400" />
          Enhanced Text Merger
        </CardTitle>
        <CardDescription className="text-white/70">
          Merge two texts in different ways (concatenate, space, newline, alternating, interleave, unique)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Text 1</Label>
            <Input
              placeholder="Enter first text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Text 2</Label>
            <Input
              placeholder="Enter second text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && merge()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Merge Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={mergeType === 'concatenate' ? 'default' : 'outline'}
                onClick={() => setMergeType('concatenate')}
                className={mergeType === 'concatenate' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Concatenate
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'space' ? 'default' : 'outline'}
                onClick={() => setMergeType('space')}
                className={mergeType === 'space' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Space
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'newline' ? 'default' : 'outline'}
                onClick={() => setMergeType('newline')}
                className={mergeType === 'newline' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newline
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'comma' ? 'default' : 'outline'}
                onClick={() => setMergeType('comma')}
                className={mergeType === 'comma' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Comma
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'alternating' ? 'default' : 'outline'}
                onClick={() => setMergeType('alternating')}
                className={mergeType === 'alternating' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Alternating
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'interleave' ? 'default' : 'outline'}
                onClick={() => setMergeType('interleave')}
                className={mergeType === 'interleave' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Interleave
              </Button>
              <Button
                size="sm"
                variant={mergeType === 'unique' ? 'default' : 'outline'}
                onClick={() => setMergeType('unique')}
                className={mergeType === 'unique' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unique Words
              </Button>
            </div>
          </div>
          <Button
            onClick={merge}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Merge Texts
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-rose-600/40 text-rose-100 border-rose-400/50">
                {mergeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Merged Result</h4>
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

        {text1 && text2 && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter both texts and click to merge</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

