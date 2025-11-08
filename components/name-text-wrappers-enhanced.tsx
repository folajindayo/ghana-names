'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brackets, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextWrappersEnhanced() {
  const [input, setInput] = useState('')
  const [wrapperType, setWrapperType] = useState<string>('parentheses')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const wrap = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let wrapped = ''

    if (wrapperType === 'parentheses') {
      wrapped = `(${input})`
    } else if (wrapperType === 'brackets') {
      wrapped = `[${input}]`
    } else if (wrapperType === 'braces') {
      wrapped = `{${input}}`
    } else if (wrapperType === 'quotes') {
      wrapped = `"${input}"`
    } else if (wrapperType === 'singleQuotes') {
      wrapped = `'${input}'`
    } else if (wrapperType === 'backticks') {
      wrapped = `\`${input}\``
    } else if (wrapperType === 'angleBrackets') {
      wrapped = `<${input}>`
    } else if (wrapperType === 'html') {
      wrapped = `<div>${input}</div>`
    } else if (wrapperType === 'markdown') {
      wrapped = `**${input}**`
    } else if (wrapperType === 'code') {
      wrapped = `\`${input}\``
    }

    setResult(wrapped)
    toast({
      title: "Wrapped!",
      description: `Text wrapped with ${wrapperType}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Wrapped text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brackets className="h-5 w-5 text-blue-400" />
          Enhanced Text Wrappers
        </CardTitle>
        <CardDescription className="text-white/70">
          Wrap text with different brackets, quotes, or HTML tags
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to wrap"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && wrap()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Wrapper Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={wrapperType === 'parentheses' ? 'default' : 'outline'}
                onClick={() => setWrapperType('parentheses')}
                className={wrapperType === 'parentheses' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ( )
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'brackets' ? 'default' : 'outline'}
                onClick={() => setWrapperType('brackets')}
                className={wrapperType === 'brackets' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                [ ]
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'braces' ? 'default' : 'outline'}
                onClick={() => setWrapperType('braces')}
                className={wrapperType === 'braces' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                { }
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'quotes' ? 'default' : 'outline'}
                onClick={() => setWrapperType('quotes')}
                className={wrapperType === 'quotes' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                " "
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'singleQuotes' ? 'default' : 'outline'}
                onClick={() => setWrapperType('singleQuotes')}
                className={wrapperType === 'singleQuotes' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ' '
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'backticks' ? 'default' : 'outline'}
                onClick={() => setWrapperType('backticks')}
                className={wrapperType === 'backticks' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ` `
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'angleBrackets' ? 'default' : 'outline'}
                onClick={() => setWrapperType('angleBrackets')}
                className={wrapperType === 'angleBrackets' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                < >
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'html' ? 'default' : 'outline'}
                onClick={() => setWrapperType('html')}
                className={wrapperType === 'html' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                HTML
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'markdown' ? 'default' : 'outline'}
                onClick={() => setWrapperType('markdown')}
                className={wrapperType === 'markdown' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ** **
              </Button>
              <Button
                size="sm"
                variant={wrapperType === 'code' ? 'default' : 'outline'}
                onClick={() => setWrapperType('code')}
                className={wrapperType === 'code' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Code
              </Button>
            </div>
          </div>
          <Button
            onClick={wrap}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Wrap Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                {wrapperType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Wrapped</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to wrap</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

