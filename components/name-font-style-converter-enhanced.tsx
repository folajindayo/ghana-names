'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const fontStyles: Record<string, { name: string; transform: (text: string) => string }> = {
  bold: {
    name: 'Bold',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D400 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D41A + (code - 97))
      return char
    }).join('')
  },
  italic: {
    name: 'Italic',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D434 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D44E + (code - 97))
      return char
    }).join('')
  },
  boldItalic: {
    name: 'Bold Italic',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D468 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D482 + (code - 97))
      return char
    }).join('')
  },
  script: {
    name: 'Script',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D49C + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D4B6 + (code - 97))
      return char
    }).join('')
  },
  fraktur: {
    name: 'Fraktur',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D504 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D51E + (code - 97))
      return char
    }).join('')
  },
  doubleStruck: {
    name: 'Double Struck',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D538 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D552 + (code - 97))
      return char
    }).join('')
  },
  monospace: {
    name: 'Monospace',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D670 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D68A + (code - 97))
      return char
    }).join('')
  },
  sansSerif: {
    name: 'Sans Serif',
    transform: (text) => text.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) return String.fromCharCode(0x1D5A0 + (code - 65))
      if (code >= 97 && code <= 122) return String.fromCharCode(0x1D5BA + (code - 97))
      return char
    }).join('')
  },
}

export function NameFontStyleConverterEnhanced() {
  const [name, setName] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<string>('bold')
  const [converted, setConverted] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const convert = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const style = fontStyles[selectedStyle]
    if (!style) return

    const result = style.transform(name.trim())
    setConverted(result)
    toast({
      title: "Converted!",
      description: `Name converted to ${style.name} style`,
    })
  }

  const copy = () => {
    if (!converted) return
    navigator.clipboard.writeText(converted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Styled name copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-violet-400" />
          Enhanced Font Style Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to different Unicode font styles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter a Name</Label>
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convert()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Font Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(fontStyles).map(([key, style]) => (
                <Button
                  key={key}
                  size="sm"
                  variant={selectedStyle === key ? 'default' : 'outline'}
                  onClick={() => setSelectedStyle(key)}
                  className={selectedStyle === key ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  {style.name}
                </Button>
              ))}
            </div>
          </div>
          <Button
            onClick={convert}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Convert Font Style
          </Button>
        </div>

        {converted && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-violet-600/40 text-violet-100 border-violet-400/50">
                {fontStyles[selectedStyle].name}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Converted</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-2xl text-center py-4">{converted}</p>
            </div>
          </div>
        )}

        {name && !converted && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert font style</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

