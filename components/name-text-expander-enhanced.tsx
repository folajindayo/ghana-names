'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Maximize2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextExpanderEnhanced() {
  const [input, setInput] = useState('')
  const [expandType, setExpandType] = useState<string>('spaces')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const expand = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let expanded = ''

    if (expandType === 'spaces') {
      expanded = input.split('').join(' ')
    } else if (expandType === 'doubleSpaces') {
      expanded = input.split(' ').join('  ')
    } else if (expandType === 'newlines') {
      expanded = input.split('').join('\n')
    } else if (expandType === 'tabs') {
      expanded = input.split('').join('\t')
    } else if (expandType === 'words') {
      expanded = input.split(/\s+/).join('\n')
    } else if (expandType === 'characters') {
      expanded = input.split('').join(' ')
    } else if (expandType === 'double') {
      expanded = input.split('').map(char => char + char).join('')
    } else if (expandType === 'triple') {
      expanded = input.split('').map(char => char + char + char).join('')
    }

    setResult(expanded)
    toast({
      title: "Expanded!",
      description: `Text expanded (${expandType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Expanded text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Maximize2 className="h-5 w-5 text-green-400" />
          Enhanced Text Expander
        </CardTitle>
        <CardDescription className="text-white/70">
          Expand text by adding spaces, newlines, or duplicating characters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to expand"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && expand()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Expand Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={expandType === 'spaces' ? 'default' : 'outline'}
                onClick={() => setExpandType('spaces')}
                className={expandType === 'spaces' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Spaces
              </Button>
              <Button
                size="sm"
                variant={expandType === 'doubleSpaces' ? 'default' : 'outline'}
                onClick={() => setExpandType('doubleSpaces')}
                className={expandType === 'doubleSpaces' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Double Spaces
              </Button>
              <Button
                size="sm"
                variant={expandType === 'newlines' ? 'default' : 'outline'}
                onClick={() => setExpandType('newlines')}
                className={expandType === 'newlines' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Newlines
              </Button>
              <Button
                size="sm"
                variant={expandType === 'tabs' ? 'default' : 'outline'}
                onClick={() => setExpandType('tabs')}
                className={expandType === 'tabs' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Tabs
              </Button>
              <Button
                size="sm"
                variant={expandType === 'words' ? 'default' : 'outline'}
                onClick={() => setExpandType('words')}
                className={expandType === 'words' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words to Lines
              </Button>
              <Button
                size="sm"
                variant={expandType === 'characters' ? 'default' : 'outline'}
                onClick={() => setExpandType('characters')}
                className={expandType === 'characters' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={expandType === 'double' ? 'default' : 'outline'}
                onClick={() => setExpandType('double')}
                className={expandType === 'double' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Double Chars
              </Button>
              <Button
                size="sm"
                variant={expandType === 'triple' ? 'default' : 'outline'}
                onClick={() => setExpandType('triple')}
                className={expandType === 'triple' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Triple Chars
              </Button>
            </div>
          </div>
          <Button
            onClick={expand}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Expand Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                {expandType} - {result.length} chars
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original ({input.length} chars)</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Expanded</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to expand</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

