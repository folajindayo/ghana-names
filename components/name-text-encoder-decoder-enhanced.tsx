'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Unlock, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextEncoderDecoderEnhanced() {
  const [input, setInput] = useState('')
  const [encodeType, setEncodeType] = useState<string>('base64')
  const [isEncoding, setIsEncoding] = useState(true)
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

    try {
      if (encodeType === 'base64') {
        if (isEncoding) {
          processed = btoa(unescape(encodeURIComponent(input)))
        } else {
          processed = decodeURIComponent(escape(atob(input)))
        }
      } else if (encodeType === 'url') {
        if (isEncoding) {
          processed = encodeURIComponent(input)
        } else {
          processed = decodeURIComponent(input)
        }
      } else if (encodeType === 'html') {
        if (isEncoding) {
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
      } else if (encodeType === 'unicode') {
        if (isEncoding) {
          processed = input.split('').map(char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`).join('')
        } else {
          processed = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        }
      } else if (encodeType === 'ascii') {
        if (isEncoding) {
          processed = input.split('').map(char => char.charCodeAt(0)).join(' ')
        } else {
          processed = input.split(' ').map(num => String.fromCharCode(parseInt(num))).join('')
        }
      }

      setResult(processed)
      toast({
        title: isEncoding ? "Encoded!" : "Decoded!",
        description: `Text ${isEncoding ? 'encoded' : 'decoded'} (${encodeType})`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEncoding ? 'encode' : 'decode'} text`,
        variant: "destructive",
      })
    }
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
          <Lock className="h-5 w-5 text-violet-400" />
          Enhanced Encoder/Decoder
        </CardTitle>
        <CardDescription className="text-white/70">
          Encode or decode text (Base64, URL, HTML, Unicode, ASCII)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder={isEncoding ? "Enter text to encode" : "Enter text to decode"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && process()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Encode/Decode</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isEncoding ? 'default' : 'outline'}
                onClick={() => setIsEncoding(true)}
                className={isEncoding ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                <Lock className="h-4 w-4 mr-2" />
                Encode
              </Button>
              <Button
                size="sm"
                variant={!isEncoding ? 'default' : 'outline'}
                onClick={() => setIsEncoding(false)}
                className={!isEncoding ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                <Unlock className="h-4 w-4 mr-2" />
                Decode
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Encoding Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={encodeType === 'base64' ? 'default' : 'outline'}
                onClick={() => setEncodeType('base64')}
                className={encodeType === 'base64' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Base64
              </Button>
              <Button
                size="sm"
                variant={encodeType === 'url' ? 'default' : 'outline'}
                onClick={() => setEncodeType('url')}
                className={encodeType === 'url' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                URL
              </Button>
              <Button
                size="sm"
                variant={encodeType === 'html' ? 'default' : 'outline'}
                onClick={() => setEncodeType('html')}
                className={encodeType === 'html' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                HTML
              </Button>
              <Button
                size="sm"
                variant={encodeType === 'unicode' ? 'default' : 'outline'}
                onClick={() => setEncodeType('unicode')}
                className={encodeType === 'unicode' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Unicode
              </Button>
              <Button
                size="sm"
                variant={encodeType === 'ascii' ? 'default' : 'outline'}
                onClick={() => setEncodeType('ascii')}
                className={encodeType === 'ascii' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ASCII
              </Button>
            </div>
          </div>
          <Button
            onClick={process}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isEncoding ? 'Encode' : 'Decode'} Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-violet-600/40 text-violet-100 border-violet-400/50">
                {isEncoding ? 'Encoded' : 'Decoded'} ({encodeType})
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
              <p className="text-white/90 text-sm break-all font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to {isEncoding ? 'encode' : 'decode'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

