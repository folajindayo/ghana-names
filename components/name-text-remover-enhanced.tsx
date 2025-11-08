'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextRemoverEnhanced() {
  const [input, setInput] = useState('')
  const [removeText, setRemoveText] = useState('')
  const [removeType, setRemoveType] = useState<string>('all')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const remove = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (!removeText.trim()) {
      toast({
        title: "Text to remove required",
        description: "Please enter text to remove",
        variant: "destructive",
      })
      return
    }

    let removed = ''

    if (removeType === 'all') {
      removed = input.split(removeText).join('')
    } else if (removeType === 'first') {
      removed = input.replace(removeText, '')
    } else if (removeType === 'last') {
      removed = input.replace(new RegExp(removeText + '(?!.*' + removeText + ')'), '')
    } else if (removeType === 'lines') {
      removed = input.split('\n').filter(line => !line.includes(removeText)).join('\n')
    } else if (removeType === 'words') {
      const regex = new RegExp('\\b' + removeText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')
      removed = input.replace(regex, '')
    } else if (removeType === 'regex') {
      try {
        const regex = new RegExp(removeText, 'g')
        removed = input.replace(regex, '')
      } catch {
        toast({
          title: "Invalid regex",
          description: "Please enter a valid regular expression",
          variant: "destructive",
        })
        return
      }
    }

    setResult(removed)
    toast({
      title: "Removed!",
      description: `Text removed (${removeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <X className="h-5 w-5 text-red-400" />
          Enhanced Text Remover
        </CardTitle>
        <CardDescription className="text-white/70">
          Remove text from input (all occurrences, first, last, lines, words, regex)
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
            <Label className="text-white/80">Text to Remove</Label>
            <Input
              placeholder="Enter text to remove"
              value={removeText}
              onChange={(e) => setRemoveText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && remove()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Remove Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={removeType === 'all' ? 'default' : 'outline'}
                onClick={() => setRemoveType('all')}
                className={removeType === 'all' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={removeType === 'first' ? 'default' : 'outline'}
                onClick={() => setRemoveType('first')}
                className={removeType === 'first' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                First
              </Button>
              <Button
                size="sm"
                variant={removeType === 'last' ? 'default' : 'outline'}
                onClick={() => setRemoveType('last')}
                className={removeType === 'last' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Last
              </Button>
              <Button
                size="sm"
                variant={removeType === 'lines' ? 'default' : 'outline'}
                onClick={() => setRemoveType('lines')}
                className={removeType === 'lines' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={removeType === 'words' ? 'default' : 'outline'}
                onClick={() => setRemoveType('words')}
                className={removeType === 'words' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={removeType === 'regex' ? 'default' : 'outline'}
                onClick={() => setRemoveType('regex')}
                className={removeType === 'regex' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Regex
              </Button>
            </div>
          </div>
          <Button
            onClick={remove}
            className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Remove Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-red-600/40 text-red-100 border-red-400/50">
                {removeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
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

        {input && removeText && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to remove</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

