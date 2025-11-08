'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, Sparkles, Copy, Check, ShieldOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextEscapeUnescapeEnhanced() {
  const [input, setInput] = useState('')
  const [escapeType, setEscapeType] = useState<string>('html')
  const [isEscaping, setIsEscaping] = useState(true)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const process = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let processed = ''

    if (escapeType === 'html') {
      if (isEscaping) {
        processed = input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
      } else {
        processed = input
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
      }
    } else if (escapeType === 'json') {
      if (isEscaping) {
        processed = JSON.stringify(input)
      } else {
        try {
          processed = JSON.parse(input)
        } catch {
          toast({
            title: "Invalid JSON",
            description: "Could not unescape JSON",
            variant: "destructive",
          })
          return
        }
      }
    } else if (escapeType === 'regex') {
      if (isEscaping) {
        processed = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      } else {
        processed = input.replace(/\\(.)/g, '$1')
      }
    } else if (escapeType === 'url') {
      if (isEscaping) {
        processed = encodeURIComponent(input)
      } else {
        try {
          processed = decodeURIComponent(input)
        } catch {
          toast({
            title: "Invalid URL encoding",
            description: "Could not unescape URL",
            variant: "destructive",
          })
          return
        }
      }
    }

    setResult(processed)
    toast({
      title: isEscaping ? "Escaped!" : "Unescaped!",
      description: `Text ${isEscaping ? 'escaped' : 'unescaped'} (${escapeType})`,
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
          <Shield className="h-5 w-5 text-red-400" />
          Enhanced Escape/Unescape
        </CardTitle>
        <CardDescription className="text-white/70">
          Escape or unescape text (HTML, JSON, Regex, URL)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder={isEscaping ? "Enter text to escape" : "Enter text to unescape"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && process()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Escape/Unescape</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isEscaping ? 'default' : 'outline'}
                onClick={() => setIsEscaping(true)}
                className={isEscaping ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                <Shield className="h-4 w-4 mr-2" />
                Escape
              </Button>
              <Button
                size="sm"
                variant={!isEscaping ? 'default' : 'outline'}
                onClick={() => setIsEscaping(false)}
                className={!isEscaping ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                <ShieldOff className="h-4 w-4 mr-2" />
                Unescape
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={escapeType === 'html' ? 'default' : 'outline'}
                onClick={() => setEscapeType('html')}
                className={escapeType === 'html' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                HTML
              </Button>
              <Button
                size="sm"
                variant={escapeType === 'json' ? 'default' : 'outline'}
                onClick={() => setEscapeType('json')}
                className={escapeType === 'json' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                JSON
              </Button>
              <Button
                size="sm"
                variant={escapeType === 'regex' ? 'default' : 'outline'}
                onClick={() => setEscapeType('regex')}
                className={escapeType === 'regex' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Regex
              </Button>
              <Button
                size="sm"
                variant={escapeType === 'url' ? 'default' : 'outline'}
                onClick={() => setEscapeType('url')}
                className={escapeType === 'url' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                URL
              </Button>
            </div>
          </div>
          <Button
            onClick={process}
            className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isEscaping ? 'Escape' : 'Unescape'} Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-red-600/40 text-red-100 border-red-400/50">
                {isEscaping ? 'Escaped' : 'Unescaped'} ({escapeType})
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
              <p className="text-white/90 text-sm break-all">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to {isEscaping ? 'escape' : 'unescape'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

