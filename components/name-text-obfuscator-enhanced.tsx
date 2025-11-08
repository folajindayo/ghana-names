'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EyeOff, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextObfuscatorEnhanced() {
  const [input, setInput] = useState('')
  const [obfuscateType, setObfuscateType] = useState<string>('stars')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const obfuscate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let obfuscated = ''

    if (obfuscateType === 'stars') {
      obfuscated = input.replace(/./g, '*')
    } else if (obfuscateType === 'dots') {
      obfuscated = input.replace(/./g, '•')
    } else if (obfuscateType === 'hashes') {
      obfuscated = input.replace(/./g, '#')
    } else if (obfuscateType === 'keepFirst') {
      obfuscated = input.split('').map((char, index) => index === 0 ? char : '*').join('')
    } else if (obfuscateType === 'keepLast') {
      obfuscated = input.split('').map((char, index, arr) => index === arr.length - 1 ? char : '*').join('')
    } else if (obfuscateType === 'keepBoth') {
      obfuscated = input.split('').map((char, index, arr) => index === 0 || index === arr.length - 1 ? char : '*').join('')
    } else if (obfuscateType === 'keepFirstLast') {
      const keep = Math.ceil(input.length * 0.2)
      obfuscated = input.split('').map((char, index, arr) => 
        index < keep || index >= arr.length - keep ? char : '*'
      ).join('')
    } else if (obfuscateType === 'random') {
      obfuscated = input.split('').map(char => 
        Math.random() > 0.5 ? char : '*'
      ).join('')
    }

    setResult(obfuscated)
    toast({
      title: "Obfuscated!",
      description: `Text obfuscated (${obfuscateType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Obfuscated text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <EyeOff className="h-5 w-5 text-gray-400" />
          Enhanced Text Obfuscator
        </CardTitle>
        <CardDescription className="text-white/70">
          Obfuscate text for privacy (stars, dots, hashes, keep first/last/both, random)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to obfuscate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && obfuscate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Obfuscate Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={obfuscateType === 'stars' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('stars')}
                className={obfuscateType === 'stars' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Stars
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'dots' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('dots')}
                className={obfuscateType === 'dots' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Dots
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'hashes' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('hashes')}
                className={obfuscateType === 'hashes' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Hashes
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'keepFirst' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('keepFirst')}
                className={obfuscateType === 'keepFirst' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep First
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'keepLast' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('keepLast')}
                className={obfuscateType === 'keepLast' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep Last
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'keepBoth' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('keepBoth')}
                className={obfuscateType === 'keepBoth' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep Both
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'keepFirstLast' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('keepFirstLast')}
                className={obfuscateType === 'keepFirstLast' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep First/Last
              </Button>
              <Button
                size="sm"
                variant={obfuscateType === 'random' ? 'default' : 'outline'}
                onClick={() => setObfuscateType('random')}
                className={obfuscateType === 'random' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Random
              </Button>
            </div>
          </div>
          <Button
            onClick={obfuscate}
            className="w-full bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Obfuscate Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-gray-600/40 text-gray-100 border-gray-400/50">
                {obfuscateType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Obfuscated</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to obfuscate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

