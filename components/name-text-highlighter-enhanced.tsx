'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Highlighter, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextHighlighterEnhanced() {
  const [input, setInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [highlightType, setHighlightType] = useState<string>('markdown')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const highlight = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (!searchText.trim()) {
      toast({
        title: "Search text required",
        description: "Please enter text to highlight",
        variant: "destructive",
      })
      return
    }

    let highlighted = ''

    if (highlightType === 'markdown') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, '**$1**')
    } else if (highlightType === 'brackets') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, '[$1]')
    } else if (highlightType === 'parentheses') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, '($1)')
    } else if (highlightType === 'uppercase') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, (match) => match.toUpperCase())
    } else if (highlightType === 'surround') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, '>>>$1<<<')
    } else if (highlightType === 'html') {
      const regex = new RegExp(`(${searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
      highlighted = input.replace(regex, '<mark>$1</mark>')
    }

    setResult(highlighted)
    const matches = (input.match(new RegExp(searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length
    toast({
      title: "Highlighted!",
      description: `Found and highlighted ${matches} match${matches !== 1 ? 'es' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Highlighted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Highlighter className="h-5 w-5 text-yellow-400" />
          Enhanced Text Highlighter
        </CardTitle>
        <CardDescription className="text-white/70">
          Highlight specific text in input (markdown, brackets, parentheses, uppercase, surround, HTML)
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
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Text to Highlight</Label>
            <Input
              placeholder="Enter text to highlight"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && highlight()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Highlight Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={highlightType === 'markdown' ? 'default' : 'outline'}
                onClick={() => setHighlightType('markdown')}
                className={highlightType === 'markdown' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Markdown
              </Button>
              <Button
                size="sm"
                variant={highlightType === 'brackets' ? 'default' : 'outline'}
                onClick={() => setHighlightType('brackets')}
                className={highlightType === 'brackets' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Brackets
              </Button>
              <Button
                size="sm"
                variant={highlightType === 'parentheses' ? 'default' : 'outline'}
                onClick={() => setHighlightType('parentheses')}
                className={highlightType === 'parentheses' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Parentheses
              </Button>
              <Button
                size="sm"
                variant={highlightType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setHighlightType('uppercase')}
                className={highlightType === 'uppercase' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Uppercase
              </Button>
              <Button
                size="sm"
                variant={highlightType === 'surround' ? 'default' : 'outline'}
                onClick={() => setHighlightType('surround')}
                className={highlightType === 'surround' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Surround
              </Button>
              <Button
                size="sm"
                variant={highlightType === 'html' ? 'default' : 'outline'}
                onClick={() => setHighlightType('html')}
                className={highlightType === 'html' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                HTML
              </Button>
            </div>
          </div>
          <Button
            onClick={highlight}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Highlight Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50">
                {highlightType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Highlighted</h4>
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

        {input && searchText && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and search term, then click to highlight</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

