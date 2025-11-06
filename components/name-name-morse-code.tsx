'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Radio, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface MorseCodeResult {
  name: string
  morseCode: string
  decoded: string
  characterCount: number
  dotCount: number
  dashCount: number
}

const morseCodeMap: Record<string, string> = {
  a: '.-', b: '-...', c: '-.-.', d: '-..', e: '.', f: '..-.', g: '--.', h: '....',
  i: '..', j: '.---', k: '-.-', l: '.-..', m: '--', n: '-.', o: '---', p: '.--.',
  q: '--.-', r: '.-.', s: '...', t: '-', u: '..-', v: '...-', w: '.--', x: '-..-',
  y: '-.--', z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/',
}

const reverseMorseCodeMap: Record<string, string> = Object.fromEntries(
  Object.entries(morseCodeMap).map(([key, value]) => [value, key])
)

export function NameMorseCode() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<MorseCodeResult | null>(null)
  const { toast } = useToast()

  const convertToMorse = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const morseParts: string[] = []
    let dotCount = 0
    let dashCount = 0

    for (const char of normalized) {
      const morse = morseCodeMap[char] || char
      morseParts.push(morse)
      for (const symbol of morse) {
        if (symbol === '.') dotCount++
        else if (symbol === '-') dashCount++
      }
    }

    const morseCode = morseParts.join(' ')
    const decoded = name // For display purposes

    setResult({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      morseCode,
      decoded,
      characterCount: normalized.replace(/\s/g, '').length,
      dotCount,
      dashCount,
    })

    toast({
      title: "Converted to Morse!",
      description: `Morse code: ${morseCode.substring(0, 30)}...`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Radio className="h-5 w-5 text-green-400" />
          Morse Code Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to Morse code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convertToMorse()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={convertToMorse}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{result.name}</h3>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Morse Code</h4>
              <p className="text-white/90 text-base font-mono break-all">{result.morseCode}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Characters</p>
                <p className="text-2xl font-bold text-white">{result.characterCount}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Dots</p>
                <p className="text-2xl font-bold text-white">{result.dotCount}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Dashes</p>
                <p className="text-2xl font-bold text-white">{result.dashCount}</p>
              </div>
            </div>

            <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Radio className="h-4 w-4 text-green-400" />
                Morse Code Info
              </h4>
              <p className="text-white/80 text-xs">
                Morse code uses dots (.) and dashes (-) to represent letters. Each letter is separated by a space, and words are separated by '/'.
              </p>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to Morse code</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

