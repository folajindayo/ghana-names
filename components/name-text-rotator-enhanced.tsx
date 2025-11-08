'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCw, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextRotatorEnhanced() {
  const [input, setInput] = useState('')
  const [rotation, setRotation] = useState('13')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const rotate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const rot = parseInt(rotation) || 13
    let rotated = ''

    rotated = input.split('').map(char => {
      const code = char.charCodeAt(0)
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + rot) % 26) + 65)
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + rot) % 26) + 97)
      }
      return char
    }).join('')

    setResult(rotated)
    toast({
      title: "Rotated!",
      description: `Text rotated by ${rot} positions (ROT${rot})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Rotated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCw className="h-5 w-5 text-amber-400" />
          Enhanced Text Rotator (ROT)
        </CardTitle>
        <CardDescription className="text-white/70">
          Rotate text characters by a specified number of positions (Caesar cipher)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to rotate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Rotation (0-25)</Label>
            <Input
              type="number"
              placeholder="13"
              value={rotation}
              onChange={(e) => setRotation(e.target.value)}
              min="0"
              max="25"
              onKeyPress={(e) => e.key === 'Enter' && rotate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRotation('13')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                ROT13
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRotation('3')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                ROT3
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRotation('5')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs"
              >
                ROT5
              </Button>
            </div>
          </div>
          <Button
            onClick={rotate}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Rotate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-amber-600/40 text-amber-100 border-amber-400/50">
                ROT{rotation}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Rotated</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to rotate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

