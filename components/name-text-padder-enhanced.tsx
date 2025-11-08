'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlignCenter, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextPadderEnhanced() {
  const [input, setInput] = useState('')
  const [targetLength, setTargetLength] = useState('20')
  const [padChar, setPadChar] = useState(' ')
  const [padType, setPadType] = useState<string>('left')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const pad = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const length = parseInt(targetLength) || 20
    if (length < input.length) {
      toast({
        title: "Invalid length",
        description: "Target length must be greater than input length",
        variant: "destructive",
      })
      return
    }

    const char = padChar || ' '
    let padded = ''

    if (padType === 'left') {
      padded = input.padStart(length, char)
    } else if (padType === 'right') {
      padded = input.padEnd(length, char)
    } else if (padType === 'both') {
      const totalPadding = length - input.length
      const leftPad = Math.floor(totalPadding / 2)
      const rightPad = totalPadding - leftPad
      padded = char.repeat(leftPad) + input + char.repeat(rightPad)
    } else if (padType === 'center') {
      const totalPadding = length - input.length
      const leftPad = Math.floor(totalPadding / 2)
      const rightPad = totalPadding - leftPad
      padded = char.repeat(leftPad) + input + char.repeat(rightPad)
    }

    setResult(padded)
    toast({
      title: "Padded!",
      description: `Text padded to ${length} characters (${padType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Padded text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlignCenter className="h-5 w-5 text-sky-400" />
          Enhanced Text Padder
        </CardTitle>
        <CardDescription className="text-white/70">
          Pad text to a specified length (left, right, both, center)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to pad"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Target Length</Label>
            <Input
              type="number"
              placeholder="20"
              value={targetLength}
              onChange={(e) => setTargetLength(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Pad Character</Label>
            <Input
              placeholder=" "
              value={padChar}
              onChange={(e) => setPadChar(e.target.value || ' ')}
              maxLength={1}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Pad Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={padType === 'left' ? 'default' : 'outline'}
                onClick={() => setPadType('left')}
                className={padType === 'left' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Left
              </Button>
              <Button
                size="sm"
                variant={padType === 'right' ? 'default' : 'outline'}
                onClick={() => setPadType('right')}
                className={padType === 'right' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Right
              </Button>
              <Button
                size="sm"
                variant={padType === 'both' ? 'default' : 'outline'}
                onClick={() => setPadType('both')}
                className={padType === 'both' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Both
              </Button>
              <Button
                size="sm"
                variant={padType === 'center' ? 'default' : 'outline'}
                onClick={() => setPadType('center')}
                className={padType === 'center' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Center
              </Button>
            </div>
          </div>
          <Button
            onClick={pad}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Pad Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-sky-600/40 text-sky-100 border-sky-400/50">
                {padType} ({result.length} chars)
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original ({input.length} chars)</h4>
              </div>
              <p className="text-white/70 text-sm mb-4 font-mono">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Padded</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to pad</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

