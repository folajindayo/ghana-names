'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Space, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextWhitespaceHandlerEnhanced() {
  const [input, setInput] = useState('')
  const [operation, setOperation] = useState<string>('normalize')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handle = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let processed = ''

    if (operation === 'normalize') {
      processed = input.replace(/\s+/g, ' ').trim()
    } else if (operation === 'removeAll') {
      processed = input.replace(/\s/g, '')
    } else if (operation === 'removeExtra') {
      processed = input.replace(/\s{2,}/g, ' ')
    } else if (operation === 'removeLeading') {
      processed = input.split('\n').map(line => line.replace(/^\s+/, '')).join('\n')
    } else if (operation === 'removeTrailing') {
      processed = input.split('\n').map(line => line.replace(/\s+$/, '')).join('\n')
    } else if (operation === 'removeBoth') {
      processed = input.split('\n').map(line => line.trim()).join('\n')
    } else if (operation === 'tabsToSpaces') {
      processed = input.replace(/\t/g, '  ')
    } else if (operation === 'spacesToTabs') {
      processed = input.replace(/ {2,}/g, '\t')
    } else if (operation === 'newlinesToSpaces') {
      processed = input.replace(/\n/g, ' ')
    } else if (operation === 'spacesToNewlines') {
      processed = input.replace(/\s+/g, '\n')
    } else if (operation === 'removeNewlines') {
      processed = input.replace(/\n/g, '')
    } else if (operation === 'removeTabs') {
      processed = input.replace(/\t/g, '')
    }

    setResult(processed)
    toast({
      title: "Processed!",
      description: `Whitespace handled (${operation})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Processed text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Space className="h-5 w-5 text-slate-400" />
          Enhanced Whitespace Handler
        </CardTitle>
        <CardDescription className="text-white/70">
          Handle whitespace in text (normalize, remove, convert tabs/spaces/newlines)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to process"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handle()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Operation</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={operation === 'normalize' ? 'default' : 'outline'}
                onClick={() => setOperation('normalize')}
                className={operation === 'normalize' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Normalize
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeAll' ? 'default' : 'outline'}
                onClick={() => setOperation('removeAll')}
                className={operation === 'removeAll' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove All
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeExtra' ? 'default' : 'outline'}
                onClick={() => setOperation('removeExtra')}
                className={operation === 'removeExtra' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Extra
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeLeading' ? 'default' : 'outline'}
                onClick={() => setOperation('removeLeading')}
                className={operation === 'removeLeading' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Leading
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeTrailing' ? 'default' : 'outline'}
                onClick={() => setOperation('removeTrailing')}
                className={operation === 'removeTrailing' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Trailing
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeBoth' ? 'default' : 'outline'}
                onClick={() => setOperation('removeBoth')}
                className={operation === 'removeBoth' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Both
              </Button>
              <Button
                size="sm"
                variant={operation === 'tabsToSpaces' ? 'default' : 'outline'}
                onClick={() => setOperation('tabsToSpaces')}
                className={operation === 'tabsToSpaces' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Tabs → Spaces
              </Button>
              <Button
                size="sm"
                variant={operation === 'spacesToTabs' ? 'default' : 'outline'}
                onClick={() => setOperation('spacesToTabs')}
                className={operation === 'spacesToTabs' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces → Tabs
              </Button>
              <Button
                size="sm"
                variant={operation === 'newlinesToSpaces' ? 'default' : 'outline'}
                onClick={() => setOperation('newlinesToSpaces')}
                className={operation === 'newlinesToSpaces' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newlines → Spaces
              </Button>
              <Button
                size="sm"
                variant={operation === 'spacesToNewlines' ? 'default' : 'outline'}
                onClick={() => setOperation('spacesToNewlines')}
                className={operation === 'spacesToNewlines' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces → Newlines
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeNewlines' ? 'default' : 'outline'}
                onClick={() => setOperation('removeNewlines')}
                className={operation === 'removeNewlines' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Newlines
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeTabs' ? 'default' : 'outline'}
                onClick={() => setOperation('removeTabs')}
                className={operation === 'removeTabs' ? 'bg-slate-500 hover:bg-slate-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Tabs
              </Button>
            </div>
          </div>
          <Button
            onClick={handle}
            className="w-full bg-gradient-to-r from-slate-500 to-gray-500 hover:from-slate-600 hover:to-gray-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Process Whitespace
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-slate-600/40 text-slate-100 border-slate-400/50">
                {operation}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4 font-mono">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Processed</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm whitespace-pre-wrap font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to process whitespace</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

