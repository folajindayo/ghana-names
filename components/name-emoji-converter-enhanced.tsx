'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Smile, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const emojiMap: Record<string, string[]> = {
  'a': ['😊', '🎨', '⭐', '🍎'],
  'b': ['🐝', '🎈', '📚', '🌺'],
  'c': ['🐱', '☁️', '🎵', '🌵'],
  'd': ['🐶', '💎', '🌊', '🎯'],
  'e': ['🐘', '⭐', '🌍', '💎'],
  'f': ['🔥', '🌸', '🎪', '🌊'],
  'g': ['🌟', '🎸', '🌺', '💚'],
  'h': ['❤️', '🏠', '🌟', '🎈'],
  'i': ['💡', '❄️', '⭐', '🎨'],
  'j': ['🎯', '💎', '🌟', '🎪'],
  'k': ['🔑', '👑', '🌟', '🎨'],
  'l': ['💖', '🌟', '🎈', '🌊'],
  'm': ['🌙', '⭐', '🎵', '💎'],
  'n': ['🌙', '⭐', '🎯', '💎'],
  'o': ['⭕', '🌟', '🌙', '🎯'],
  'p': ['🌟', '🎈', '🌺', '💎'],
  'q': ['👑', '💎', '🌟', '🎯'],
  'r': ['🌹', '⭐', '🎈', '💎'],
  's': ['⭐', '🌟', '💎', '🎯'],
  't': ['⭐', '🌟', '🎯', '💎'],
  'u': ['⭐', '🌟', '💎', '🎯'],
  'v': ['⭐', '🌟', '💎', '🎯'],
  'w': ['⭐', '🌟', '💎', '🎯'],
  'x': ['⭐', '🌟', '💎', '🎯'],
  'y': ['⭐', '🌟', '💎', '🎯'],
  'z': ['⭐', '🌟', '💎', '🎯'],
}

export function NameEmojiConverterEnhanced() {
  const [name, setName] = useState('')
  const [converted, setConverted] = useState('')
  const [style, setStyle] = useState<'replace' | 'append' | 'surround'>('replace')
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
      } else if (emojiMap[char]) {
        const emoji = emojiMap[char][0] // Use first emoji for each letter
        if (style === 'replace') {
          result += emoji
        } else if (style === 'append') {
          result += char + emoji
        } else if (style === 'surround') {
          result += emoji + char + emoji
        }
      } else {
        result += char
      }
    })

    setConverted(result)
    toast({
      title: "Converted!",
      description: "Name converted with emojis",
    })
  }

  const copy = () => {
    if (!converted) return
    navigator.clipboard.writeText(converted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Emoji name copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Smile className="h-5 w-5 text-yellow-400" />
          Enhanced Emoji Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to emoji representations with different styles
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
            <Label className="text-white/80">Conversion Style</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={style === 'replace' ? 'default' : 'outline'}
                onClick={() => setStyle('replace')}
                className={style === 'replace' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Replace
              </Button>
              <Button
                size="sm"
                variant={style === 'append' ? 'default' : 'outline'}
                onClick={() => setStyle('append')}
                className={style === 'append' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Append
              </Button>
              <Button
                size="sm"
                variant={style === 'surround' ? 'default' : 'outline'}
                onClick={() => setStyle('surround')}
                className={style === 'surround' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Surround
              </Button>
            </div>
          </div>
          <Button
            onClick={convert}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Convert to Emoji
          </Button>
        </div>

        {converted && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50">
                {style.charAt(0).toUpperCase() + style.slice(1)} Style
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
            <p className="text-white/60 text-sm">Enter a name and click to convert with emojis</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

