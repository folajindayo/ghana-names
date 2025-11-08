'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Languages, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextTranslatorEnhanced() {
  const [input, setInput] = useState('')
  const [translationType, setTranslationType] = useState<string>('leet')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const leetMap: Record<string, string> = {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7',
    'A': '4', 'E': '3', 'I': '1', 'O': '0', 'S': '5', 'T': '7'
  }

  const translate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let translated = ''

    if (translationType === 'leet') {
      translated = input.split('').map(char => leetMap[char] || char).join('')
    } else if (translationType === 'reverse') {
      translated = input.split('').reverse().join('')
    } else if (translationType === 'uppercase') {
      translated = input.toUpperCase()
    } else if (translationType === 'lowercase') {
      translated = input.toLowerCase()
    } else if (translationType === 'alternating') {
      translated = input.split('').map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('')
    } else if (translationType === 'rot13') {
      translated = input.split('').map(char => {
        const code = char.charCodeAt(0)
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + 13) % 26) + 65)
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + 13) % 26) + 97)
        }
        return char
      }).join('')
    } else if (translationType === 'binary') {
      translated = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
    } else if (translationType === 'hex') {
      translated = input.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ')
    }

    setResult(translated)
    toast({
      title: "Translated!",
      description: `Text translated (${translationType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Translated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-blue-400" />
          Enhanced Text Translator
        </CardTitle>
        <CardDescription className="text-white/70">
          Translate text to different formats (leet speak, reverse, case, ROT13, binary, hex)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to translate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && translate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Translation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={translationType === 'leet' ? 'default' : 'outline'}
                onClick={() => setTranslationType('leet')}
                className={translationType === 'leet' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Leet Speak
              </Button>
              <Button
                size="sm"
                variant={translationType === 'reverse' ? 'default' : 'outline'}
                onClick={() => setTranslationType('reverse')}
                className={translationType === 'reverse' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Reverse
              </Button>
              <Button
                size="sm"
                variant={translationType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setTranslationType('uppercase')}
                className={translationType === 'uppercase' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Uppercase
              </Button>
              <Button
                size="sm"
                variant={translationType === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setTranslationType('lowercase')}
                className={translationType === 'lowercase' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lowercase
              </Button>
              <Button
                size="sm"
                variant={translationType === 'alternating' ? 'default' : 'outline'}
                onClick={() => setTranslationType('alternating')}
                className={translationType === 'alternating' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Alternating
              </Button>
              <Button
                size="sm"
                variant={translationType === 'rot13' ? 'default' : 'outline'}
                onClick={() => setTranslationType('rot13')}
                className={translationType === 'rot13' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                ROT13
              </Button>
              <Button
                size="sm"
                variant={translationType === 'binary' ? 'default' : 'outline'}
                onClick={() => setTranslationType('binary')}
                className={translationType === 'binary' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Binary
              </Button>
              <Button
                size="sm"
                variant={translationType === 'hex' ? 'default' : 'outline'}
                onClick={() => setTranslationType('hex')}
                className={translationType === 'hex' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Hex
              </Button>
            </div>
          </div>
          <Button
            onClick={translate}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Translate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                {translationType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Translated</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm font-mono break-all">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to translate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

