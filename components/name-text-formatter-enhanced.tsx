'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlignLeft, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextFormatterEnhanced() {
  const [input, setInput] = useState('')
  const [formatType, setFormatType] = useState<string>('trim')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const format = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let formatted = ''

    if (formatType === 'trim') {
      formatted = input.trim()
    } else if (formatType === 'trimLines') {
      formatted = input.split('\n').map(line => line.trim()).join('\n')
    } else if (formatType === 'removeExtraSpaces') {
      formatted = input.replace(/\s+/g, ' ').trim()
    } else if (formatType === 'removeNewlines') {
      formatted = input.replace(/\n/g, ' ')
    } else if (formatType === 'normalizeSpaces') {
      formatted = input.replace(/\s+/g, ' ').trim()
    } else if (formatType === 'addLineBreaks') {
      formatted = input.replace(/\. /g, '.\n').replace(/! /g, '!\n').replace(/\? /g, '?\n')
    } else if (formatType === 'removePunctuation') {
      formatted = input.replace(/[^\w\s]/g, '')
    } else if (formatType === 'removeNumbers') {
      formatted = input.replace(/\d/g, '')
    }

    setResult(formatted)
    toast({
      title: "Formatted!",
      description: `Text formatted (${formatType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Formatted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlignLeft className="h-5 w-5 text-emerald-400" />
          Enhanced Text Formatter
        </CardTitle>
        <CardDescription className="text-white/70">
          Format text in various ways (trim, remove spaces, normalize, add line breaks, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to format"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && format()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Format Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={formatType === 'trim' ? 'default' : 'outline'}
                onClick={() => setFormatType('trim')}
                className={formatType === 'trim' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Trim
              </Button>
              <Button
                size="sm"
                variant={formatType === 'trimLines' ? 'default' : 'outline'}
                onClick={() => setFormatType('trimLines')}
                className={formatType === 'trimLines' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Trim Lines
              </Button>
              <Button
                size="sm"
                variant={formatType === 'removeExtraSpaces' ? 'default' : 'outline'}
                onClick={() => setFormatType('removeExtraSpaces')}
                className={formatType === 'removeExtraSpaces' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Extra Spaces
              </Button>
              <Button
                size="sm"
                variant={formatType === 'removeNewlines' ? 'default' : 'outline'}
                onClick={() => setFormatType('removeNewlines')}
                className={formatType === 'removeNewlines' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Newlines
              </Button>
              <Button
                size="sm"
                variant={formatType === 'normalizeSpaces' ? 'default' : 'outline'}
                onClick={() => setFormatType('normalizeSpaces')}
                className={formatType === 'normalizeSpaces' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Normalize Spaces
              </Button>
              <Button
                size="sm"
                variant={formatType === 'addLineBreaks' ? 'default' : 'outline'}
                onClick={() => setFormatType('addLineBreaks')}
                className={formatType === 'addLineBreaks' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Add Line Breaks
              </Button>
              <Button
                size="sm"
                variant={formatType === 'removePunctuation' ? 'default' : 'outline'}
                onClick={() => setFormatType('removePunctuation')}
                className={formatType === 'removePunctuation' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Punctuation
              </Button>
              <Button
                size="sm"
                variant={formatType === 'removeNumbers' ? 'default' : 'outline'}
                onClick={() => setFormatType('removeNumbers')}
                className={formatType === 'removeNumbers' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Numbers
              </Button>
            </div>
          </div>
          <Button
            onClick={format}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Format Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50">
                {formatType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Formatted</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to format</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

