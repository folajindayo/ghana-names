'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EyeOff, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextMaskerEnhanced() {
  const [input, setInput] = useState('')
  const [maskChar, setMaskChar] = useState('*')
  const [maskType, setMaskType] = useState<string>('all')
  const [keepChars, setKeepChars] = useState('2')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const mask = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const keep = parseInt(keepChars) || 2
    let masked = ''

    if (maskType === 'all') {
      masked = maskChar.repeat(input.length)
    } else if (maskType === 'keepStart') {
      if (keep >= input.length) {
        masked = input
      } else {
        masked = input.substring(0, keep) + maskChar.repeat(input.length - keep)
      }
    } else if (maskType === 'keepEnd') {
      if (keep >= input.length) {
        masked = input
      } else {
        masked = maskChar.repeat(input.length - keep) + input.substring(input.length - keep)
      }
    } else if (maskType === 'keepBoth') {
      if (keep * 2 >= input.length) {
        masked = input
      } else {
        masked = input.substring(0, keep) + maskChar.repeat(input.length - keep * 2) + input.substring(input.length - keep)
      }
    } else if (maskType === 'email') {
      const [local, domain] = input.split('@')
      if (domain) {
        const maskedLocal = local.length > 2 
          ? local.substring(0, 2) + maskChar.repeat(local.length - 2)
          : maskChar.repeat(local.length)
        masked = maskedLocal + '@' + domain
      } else {
        masked = input
      }
    } else if (maskType === 'phone') {
      const digits = input.replace(/\D/g, '')
      if (digits.length > 4) {
        masked = maskChar.repeat(digits.length - 4) + digits.substring(digits.length - 4)
      } else {
        masked = maskChar.repeat(digits.length)
      }
    } else if (maskType === 'creditCard') {
      const digits = input.replace(/\D/g, '')
      if (digits.length > 4) {
        masked = maskChar.repeat(digits.length - 4) + digits.substring(digits.length - 4)
      } else {
        masked = maskChar.repeat(digits.length)
      }
    }

    setResult(masked)
    toast({
      title: "Masked!",
      description: `Text masked (${maskType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Masked text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <EyeOff className="h-5 w-5 text-pink-400" />
          Enhanced Text Masker
        </CardTitle>
        <CardDescription className="text-white/70">
          Mask text for privacy (all, keep start/end/both, email, phone, credit card)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to mask"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Mask Character</Label>
            <Input
              placeholder="*"
              value={maskChar}
              onChange={(e) => setMaskChar(e.target.value || '*')}
              maxLength={1}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          {(maskType === 'keepStart' || maskType === 'keepEnd' || maskType === 'keepBoth') && (
            <div className="space-y-2">
              <Label className="text-white/80">Keep Characters</Label>
              <Input
                type="number"
                placeholder="2"
                value={keepChars}
                onChange={(e) => setKeepChars(e.target.value)}
                min="0"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-white/80">Mask Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={maskType === 'all' ? 'default' : 'outline'}
                onClick={() => setMaskType('all')}
                className={maskType === 'all' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={maskType === 'keepStart' ? 'default' : 'outline'}
                onClick={() => setMaskType('keepStart')}
                className={maskType === 'keepStart' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep Start
              </Button>
              <Button
                size="sm"
                variant={maskType === 'keepEnd' ? 'default' : 'outline'}
                onClick={() => setMaskType('keepEnd')}
                className={maskType === 'keepEnd' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep End
              </Button>
              <Button
                size="sm"
                variant={maskType === 'keepBoth' ? 'default' : 'outline'}
                onClick={() => setMaskType('keepBoth')}
                className={maskType === 'keepBoth' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Keep Both
              </Button>
              <Button
                size="sm"
                variant={maskType === 'email' ? 'default' : 'outline'}
                onClick={() => setMaskType('email')}
                className={maskType === 'email' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Email
              </Button>
              <Button
                size="sm"
                variant={maskType === 'phone' ? 'default' : 'outline'}
                onClick={() => setMaskType('phone')}
                className={maskType === 'phone' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Phone
              </Button>
              <Button
                size="sm"
                variant={maskType === 'creditCard' ? 'default' : 'outline'}
                onClick={() => setMaskType('creditCard')}
                className={maskType === 'creditCard' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Credit Card
              </Button>
            </div>
          </div>
          <Button
            onClick={mask}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Mask Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                {maskType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Masked</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to mask</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

