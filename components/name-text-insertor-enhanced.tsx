'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextInsertorEnhanced() {
  const [input, setInput] = useState('')
  const [insertText, setInsertText] = useState('')
  const [position, setPosition] = useState('0')
  const [insertType, setInsertType] = useState<string>('position')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const insert = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (!insertText.trim()) {
      toast({
        title: "Text to insert required",
        description: "Please enter text to insert",
        variant: "destructive",
      })
      return
    }

    let inserted = ''

    if (insertType === 'position') {
      const pos = parseInt(position) || 0
      if (pos < 0 || pos > input.length) {
        toast({
          title: "Invalid position",
          description: `Position must be between 0 and ${input.length}`,
          variant: "destructive",
        })
        return
      }
      inserted = input.slice(0, pos) + insertText + input.slice(pos)
    } else if (insertType === 'start') {
      inserted = insertText + input
    } else if (insertType === 'end') {
      inserted = input + insertText
    } else if (insertType === 'eachLine') {
      inserted = input.split('\n').map(line => insertText + line).join('\n')
    } else if (insertType === 'eachWord') {
      inserted = input.split(/\s+/).map(word => insertText + word).join(' ')
    } else if (insertType === 'afterEachChar') {
      inserted = input.split('').join(insertText)
    }

    setResult(inserted)
    toast({
      title: "Inserted!",
      description: `Text inserted (${insertType})`,
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
          <Plus className="h-5 w-5 text-blue-400" />
          Enhanced Text Insertor
        </CardTitle>
        <CardDescription className="text-white/70">
          Insert text at specific positions (position, start, end, each line, each word, after each char)
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
          <div className="space-y-2">
            <Label className="text-white/80">Text to Insert</Label>
            <Input
              placeholder="Enter text to insert"
              value={insertText}
              onChange={(e) => setInsertText(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          {insertType === 'position' && (
            <div className="space-y-2">
              <Label className="text-white/80">Position</Label>
              <Input
                type="number"
                placeholder="0"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                min="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-white/80">Insert Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={insertType === 'position' ? 'default' : 'outline'}
                onClick={() => setInsertType('position')}
                className={insertType === 'position' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Position
              </Button>
              <Button
                size="sm"
                variant={insertType === 'start' ? 'default' : 'outline'}
                onClick={() => setInsertType('start')}
                className={insertType === 'start' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Start
              </Button>
              <Button
                size="sm"
                variant={insertType === 'end' ? 'default' : 'outline'}
                onClick={() => setInsertType('end')}
                className={insertType === 'end' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                End
              </Button>
              <Button
                size="sm"
                variant={insertType === 'eachLine' ? 'default' : 'outline'}
                onClick={() => setInsertType('eachLine')}
                className={insertType === 'eachLine' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Each Line
              </Button>
              <Button
                size="sm"
                variant={insertType === 'eachWord' ? 'default' : 'outline'}
                onClick={() => setInsertType('eachWord')}
                className={insertType === 'eachWord' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Each Word
              </Button>
              <Button
                size="sm"
                variant={insertType === 'afterEachChar' ? 'default' : 'outline'}
                onClick={() => setInsertType('afterEachChar')}
                className={insertType === 'afterEachChar' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                After Each Char
              </Button>
            </div>
          </div>
          <Button
            onClick={insert}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Insert Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                {insertType}
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

        {input && insertText && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to insert</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

