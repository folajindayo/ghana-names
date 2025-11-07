'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileCode, Sparkles, RotateCcw, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameBase64EncoderEnhanced() {
  const [name, setName] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const encode = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    try {
      const result = btoa(unescape(encodeURIComponent(name.trim())))
      setEncoded(result)
      setDecoded('')
      setError('')
      toast({
        title: "Encoded!",
        description: "Name encoded to Base64",
      })
    } catch (err) {
      setError('Encoding failed')
      toast({
        title: "Error",
        description: "Failed to encode name",
        variant: "destructive",
      })
    }
  }

  const decode = () => {
    if (!encoded.trim()) {
      toast({
        title: "Encoded text required",
        description: "Please enter Base64 encoded text",
        variant: "destructive",
      })
      return
    }

    try {
      const result = decodeURIComponent(escape(atob(encoded.trim())))
      setDecoded(result)
      setError('')
      toast({
        title: "Decoded!",
        description: "Base64 text decoded successfully",
      })
    } catch (err) {
      setError('Invalid Base64 string')
      toast({
        title: "Error",
        description: "Invalid Base64 encoded text",
        variant: "destructive",
      })
    }
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
          <FileCode className="h-5 w-5 text-orange-400" />
          Enhanced Base64 Encoder
        </CardTitle>
        <CardDescription className="text-white/70">
          Encode and decode names using Base64 encoding
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter a Name</Label>
            <Input
              placeholder="e.g., Kwame, Akosua Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && encode()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={encode}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Encode to Base64
          </Button>
        </div>

        {encoded && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                Base64 Encoded
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
              <p className="text-white/90 text-sm font-mono break-all">{encoded}</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Decode Base64 Text</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste Base64 encoded text here"
                  value={encoded}
                  onChange={(e) => setEncoded(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  onClick={decode}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {decoded && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold text-sm">Decoded</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(decoded)}
                    className="text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-white/90 text-lg">{decoded}</p>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 rounded border border-red-400/30">
                <p className="text-red-200 text-xs text-center">{error}</p>
              </div>
            )}
          </div>
        )}

        {name && !encoded && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to encode to Base64</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

