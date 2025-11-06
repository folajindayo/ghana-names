'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input as NumberInput } from '@/components/ui/input'
import { Lock, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CipherResult {
  original: string
  shift: number
  encrypted: string
  decrypted: string
  allShifts: Array<{ shift: number; result: string }>
}

export function NameCaesarCipher() {
  const [name, setName] = useState('')
  const [shift, setShift] = useState('3')
  const [result, setResult] = useState<CipherResult | null>(null)
  const { toast } = useToast()

  const caesarCipher = (text: string, shiftAmount: number, encrypt: boolean = true): string => {
    const shift = encrypt ? shiftAmount : -shiftAmount
    return text
      .split('')
      .map((char) => {
        if (/[a-z]/.test(char)) {
          const code = char.charCodeAt(0) - 97
          const shifted = (code + shift + 26) % 26
          return String.fromCharCode(shifted + 97)
        } else if (/[A-Z]/.test(char)) {
          const code = char.charCodeAt(0) - 65
          const shifted = (code + shift + 26) % 26
          return String.fromCharCode(shifted + 65)
        }
        return char
      })
      .join('')
  }

  const encryptName = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const shiftAmount = parseInt(shift) || 3
    const encrypted = caesarCipher(name, shiftAmount, true)
    const decrypted = caesarCipher(encrypted, shiftAmount, false)

    // Generate all possible shifts (1-25)
    const allShifts: Array<{ shift: number; result: string }> = []
    for (let i = 1; i <= 25; i++) {
      allShifts.push({
        shift: i,
        result: caesarCipher(name, i, true),
      })
    }

    setResult({
      original: name,
      shift: shiftAmount,
      encrypted,
      decrypted,
      allShifts,
    })

    toast({
      title: "Encrypted!",
      description: `Shift: ${shiftAmount}, Encrypted: ${encrypted}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lock className="h-5 w-5 text-purple-400" />
          Caesar Cipher
        </CardTitle>
        <CardDescription className="text-white/70">
          Encrypt and decrypt names using Caesar cipher
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <Input
            placeholder="e.g., Kwame, Akosua"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Shift Amount (1-25)</Label>
          <NumberInput
            type="number"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <Button
          onClick={encryptName}
          disabled={!name.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Encrypt Name
        </Button>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{result.original}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Encrypted</p>
                  <p className="text-white font-mono text-lg">{result.encrypted}</p>
                </div>
                <Lock className="h-5 w-5 text-white/60" />
                <div className="text-center">
                  <p className="text-white/70 text-xs mb-1">Decrypted</p>
                  <p className="text-white font-mono text-lg">{result.decrypted}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-sm px-4 py-2">
                Shift: {result.shift}
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">All Possible Shifts (Preview)</h4>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {result.allShifts.slice(0, 10).map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-xs px-2 py-1">
                      {item.result}
                    </Badge>
                    <span className="text-white/60 text-xs mt-1">{item.shift}</span>
                  </div>
                ))}
              </div>
              {result.allShifts.length > 10 && (
                <p className="text-white/60 text-xs mt-2 text-center">
                  Showing 10 of {result.allShifts.length} possible shifts
                </p>
              )}
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to encrypt</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

