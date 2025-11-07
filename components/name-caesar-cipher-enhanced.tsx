'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Sparkles, RotateCcw, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CipherResult {
  original: string
  encrypted: string
  decrypted: string
  shift: number
  allShifts: Array<{ shift: number; text: string }>
}

export function NameCaesarCipherEnhanced() {
  const [name, setName] = useState('')
  const [shift, setShift] = useState('3')
  const [result, setResult] = useState<CipherResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const caesarCipher = (text: string, shiftAmount: number, encrypt: boolean = true): string => {
    const actualShift = encrypt ? shiftAmount : -shiftAmount
    return text
      .split('')
      .map((char) => {
        if (/[a-z]/.test(char)) {
          const code = char.charCodeAt(0) - 97
          const shifted = (code + actualShift + 26) % 26
          return String.fromCharCode(shifted + 97)
        }
        if (/[A-Z]/.test(char)) {
          const code = char.charCodeAt(0) - 65
          const shifted = (code + actualShift + 26) % 26
          return String.fromCharCode(shifted + 65)
        }
        return char
      })
      .join('')
  }

  const process = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const shiftAmount = parseInt(shift) || 3
    if (shiftAmount < 1 || shiftAmount > 25) {
      toast({
        title: "Invalid shift",
        description: "Shift must be between 1 and 25",
        variant: "destructive",
      })
      return
    }

    const encrypted = caesarCipher(name.trim(), shiftAmount, true)
    const decrypted = caesarCipher(encrypted, shiftAmount, false)

    // Generate all possible shifts
    const allShifts: Array<{ shift: number; text: string }> = []
    for (let i = 1; i <= 25; i++) {
      allShifts.push({
        shift: i,
        text: caesarCipher(name.trim(), i, true),
      })
    }

    setResult({
      original: name.trim(),
      encrypted,
      decrypted,
      shift: shiftAmount,
      allShifts,
    })

    toast({
      title: "Cipher applied!",
      description: `Encrypted with shift ${shiftAmount}`,
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
          <Lock className="h-5 w-5 text-indigo-400" />
          Enhanced Caesar Cipher
        </CardTitle>
        <CardDescription className="text-white/70">
          Encrypt and decrypt names using Caesar cipher with all shift variations
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
              onKeyPress={(e) => e.key === 'Enter' && process()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Shift Amount (1-25)</Label>
            <Input
              type="number"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={process}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Encrypt/Decrypt
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{result.original}</h3>
              <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50">
                Shift: {result.shift}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Encrypted</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(result.encrypted)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{result.encrypted}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Decrypted</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(result.decrypted)}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-lg font-mono">{result.decrypted}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-3 text-sm">All Shift Variations</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.allShifts.map((item) => (
                  <div
                    key={item.shift}
                    className={`flex items-center justify-between p-2 rounded ${
                      item.shift === result.shift
                        ? 'bg-indigo-500/20 border border-indigo-400/50'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 text-xs">
                      +{item.shift}
                    </Badge>
                    <span className="text-white/90 text-sm font-mono flex-1 text-right mr-2">{item.text}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copy(item.text)}
                      className="text-white/60 hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and shift amount, then click encrypt/decrypt</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

