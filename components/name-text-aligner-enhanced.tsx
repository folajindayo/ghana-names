'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlignLeft, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextAlignerEnhanced() {
  const [input, setInput] = useState('')
  const [width, setWidth] = useState('80')
  const [alignType, setAlignType] = useState<string>('left')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const align = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const w = parseInt(width) || 80
    if (w < 1) {
      toast({
        title: "Invalid width",
        description: "Width must be at least 1",
        variant: "destructive",
      })
      return
    }

    const lines = input.split('\n')
    let aligned = ''

    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) {
        aligned += '\n'
        return
      }

      if (alignType === 'left') {
        aligned += trimmed.padEnd(w) + '\n'
      } else if (alignType === 'right') {
        aligned += trimmed.padStart(w) + '\n'
      } else if (alignType === 'center') {
        const padding = w - trimmed.length
        const leftPad = Math.floor(padding / 2)
        const rightPad = padding - leftPad
        aligned += ' '.repeat(leftPad) + trimmed + ' '.repeat(rightPad) + '\n'
      } else if (alignType === 'justify') {
        const words = trimmed.split(/\s+/)
        if (words.length === 1) {
          aligned += trimmed.padEnd(w) + '\n'
        } else {
          const totalSpaces = w - trimmed.replace(/\s/g, '').length
          const spaceCount = words.length - 1
          const baseSpace = Math.floor(totalSpaces / spaceCount)
          const extraSpaces = totalSpaces % spaceCount
          let justified = words[0]
          for (let i = 1; i < words.length; i++) {
            const spaces = baseSpace + (i <= extraSpaces ? 1 : 0)
            justified += ' '.repeat(spaces) + words[i]
          }
          aligned += justified + '\n'
        }
      }
    })

    setResult(aligned.trimEnd())
    toast({
      title: "Aligned!",
      description: `Text aligned (${alignType}) to width ${w}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Aligned text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlignLeft className="h-5 w-5 text-violet-400" />
          Enhanced Text Aligner
        </CardTitle>
        <CardDescription className="text-white/70">
          Align text to a specified width (left, right, center, justify)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to align"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Width</Label>
            <Input
              type="number"
              placeholder="80"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Align Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={alignType === 'left' ? 'default' : 'outline'}
                onClick={() => setAlignType('left')}
                className={alignType === 'left' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Left
              </Button>
              <Button
                size="sm"
                variant={alignType === 'right' ? 'default' : 'outline'}
                onClick={() => setAlignType('right')}
                className={alignType === 'right' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Right
              </Button>
              <Button
                size="sm"
                variant={alignType === 'center' ? 'default' : 'outline'}
                onClick={() => setAlignType('center')}
                className={alignType === 'center' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Center
              </Button>
              <Button
                size="sm"
                variant={alignType === 'justify' ? 'default' : 'outline'}
                onClick={() => setAlignType('justify')}
                className={alignType === 'justify' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Justify
              </Button>
            </div>
          </div>
          <Button
            onClick={align}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Align Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-violet-600/40 text-violet-100 border-violet-400/50">
                {alignType} aligned (width: {width})
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Aligned Text</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm whitespace-pre-wrap font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to align</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

