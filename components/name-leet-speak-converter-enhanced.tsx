'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const leetMap: Record<string, string[]> = {
  'a': ['4', '@', '4', '/\\'],
  'e': ['3', '3', '€', '3'],
  'i': ['1', '!', '|', '1'],
  'o': ['0', '0', '()', '0'],
  's': ['5', '$', '5', '5'],
  't': ['7', '+', '7', '7'],
  'l': ['1', '|', '1', '1'],
  'z': ['2', '2', '2', '2'],
  'g': ['9', '9', '9', '9'],
  'b': ['8', '8', '8', '8'],
}

export function NameLeetSpeakConverterEnhanced() {
  const [name, setName] = useState('')
  const [converted, setConverted] = useState('')
  const [intensity, setIntensity] = useState<'light' | 'medium' | 'heavy'>('medium')
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

    const letters = name.trim().toLowerCase().split('')
    let result = ''

    letters.forEach((char) => {
      if (char === ' ') {
        result += ' '
      } else if (leetMap[char]) {
        const index = intensity === 'light' ? 0 : intensity === 'medium' ? 1 : 2
        result += leetMap[char][index] || char
      } else {
        result += char
      }
    })

    setConverted(result)
    toast({
      title: "Converted!",
      description: "Name converted to leet speak",
    })
  }

  const copy = () => {
    if (!converted) return
    navigator.clipboard.writeText(converted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Leet speak name copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code2 className="h-5 w-5 text-red-400" />
          Enhanced Leet Speak Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to leet speak (1337) with different intensity levels
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
            <Label className="text-white/80">Intensity Level</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={intensity === 'light' ? 'default' : 'outline'}
                onClick={() => setIntensity('light')}
                className={intensity === 'light' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={intensity === 'medium' ? 'default' : 'outline'}
                onClick={() => setIntensity('medium')}
                className={intensity === 'medium' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Medium
              </Button>
              <Button
                size="sm"
                variant={intensity === 'heavy' ? 'default' : 'outline'}
                onClick={() => setIntensity('heavy')}
                className={intensity === 'heavy' ? 'bg-red-500 hover:bg-red-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Heavy
              </Button>
            </div>
          </div>
          <Button
            onClick={convert}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Convert to Leet Speak
          </Button>
        </div>

        {converted && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-red-600/40 text-red-100 border-red-400/50">
                {intensity.charAt(0).toUpperCase() + intensity.slice(1)} Intensity
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
              <p className="text-white/90 text-xl font-mono">{converted}</p>
            </div>
          </div>
        )}

        {name && !converted && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to leet speak</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

