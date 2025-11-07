'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Sparkles, RotateCcw, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameRot13EncoderEnhanced() {
  const [name, setName] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const rot13 = (text: string): string => {
    return text
      .split('')
      .map((char) => {
        if (/[a-z]/.test(char)) {
          const code = char.charCodeAt(0) - 97
          const shifted = (code + 13) % 26
          return String.fromCharCode(shifted + 97)
        }
        if (/[A-Z]/.test(char)) {
          const code = char.charCodeAt(0) - 65
          const shifted = (code + 13) % 26
          return String.fromCharCode(shifted + 65)
        }
        return char
      })
      .join('')
  }

  const encode = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const result = rot13(name.trim())
    setEncoded(result)
    setDecoded(rot13(result)) // Decode to verify (ROT13 is self-reversible)
    toast({
      title: "Encoded!",
      description: "Name encoded with ROT13 cipher",
    })
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
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
          <Code className="h-5 w-5 text-teal-400" />
          Enhanced ROT13 Encoder
        </CardTitle>
        <CardDescription className="text-white/70">
          Encode and decode names using ROT13 cipher (self-reversible)
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
              onKeyPress={(e) => e.key === 'Enter' && encode()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={encode}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {encoded && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50">
                ROT13 Encoded
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Encoded</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(encoded)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{encoded}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Decoded (Verification)</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(decoded)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{decoded}</p>
            </div>

            <div className="p-3 bg-teal-500/10 rounded border border-teal-400/30">
              <p className="text-teal-200 text-xs text-center">
                💡 ROT13 is self-reversible: encoding twice returns the original text
              </p>
            </div>
          </div>
        )}

        {name && !encoded && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to encode with ROT13</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

