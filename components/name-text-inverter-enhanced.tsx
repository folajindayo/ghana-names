'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FlipHorizontal, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextInverterEnhanced() {
  const [input, setInput] = useState('')
  const [invertType, setInvertType] = useState<string>('characters')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const invert = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let inverted = ''

    if (invertType === 'characters') {
      inverted = input.split('').reverse().join('')
    } else if (invertType === 'words') {
      inverted = input.split(/\s+/).reverse().join(' ')
    } else if (invertType === 'lines') {
      inverted = input.split('\n').reverse().join('\n')
    } else if (invertType === 'case') {
      inverted = input.split('').map(char => {
        if (char === char.toUpperCase()) return char.toLowerCase()
        if (char === char.toLowerCase()) return char.toUpperCase()
        return char
      }).join('')
    } else if (invertType === 'wordsAndChars') {
      inverted = input.split(/\s+/).map(word =>
        word.split('').reverse().join('')
      ).reverse().join(' ')
    }

    setResult(inverted)
    toast({
      title: "Inverted!",
      description: `Text inverted (${invertType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Inverted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FlipHorizontal className="h-5 w-5 text-purple-400" />
          Enhanced Text Inverter
        </CardTitle>
        <CardDescription className="text-white/70">
          Invert text in different ways (characters, words, lines, case, words and characters)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to invert"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && invert()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Invert Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={invertType === 'characters' ? 'default' : 'outline'}
                onClick={() => setInvertType('characters')}
                className={invertType === 'characters' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={invertType === 'words' ? 'default' : 'outline'}
                onClick={() => setInvertType('words')}
                className={invertType === 'words' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={invertType === 'lines' ? 'default' : 'outline'}
                onClick={() => setInvertType('lines')}
                className={invertType === 'lines' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={invertType === 'case' ? 'default' : 'outline'}
                onClick={() => setInvertType('case')}
                className={invertType === 'case' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Case
              </Button>
              <Button
                size="sm"
                variant={invertType === 'wordsAndChars' ? 'default' : 'outline'}
                onClick={() => setInvertType('wordsAndChars')}
                className={invertType === 'wordsAndChars' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words & Chars
              </Button>
            </div>
          </div>
          <Button
            onClick={invert}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Invert Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50">
                {invertType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Inverted</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to invert</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

