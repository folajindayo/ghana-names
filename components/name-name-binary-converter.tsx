'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Binary, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BinaryResult {
  name: string
  binary: string
  asciiValues: Array<{ char: string; ascii: number; binary: string }>
  totalBits: number
  byteCount: number
}

export function NameBinaryConverter() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<BinaryResult | null>(null)
  const { toast } = useToast()

  const convertToBinary = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const asciiValues: Array<{ char: string; ascii: number; binary: string }> = []
    let totalBits = 0

    for (const char of normalized) {
      const ascii = char.charCodeAt(0)
      const binary = ascii.toString(2).padStart(8, '0')
      asciiValues.push({
        char,
        ascii,
        binary,
      })
      totalBits += binary.length
    }

    const binary = asciiValues.map((item) => item.binary).join(' ')

    setResult({
      name: normalized,
      binary,
      asciiValues,
      totalBits,
      byteCount: normalized.length,
    })

    toast({
      title: "Converted to binary!",
      description: `${normalized.length} characters, ${totalBits} bits`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Binary className="h-5 w-5 text-cyan-400" />
          Binary Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to binary representation
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
              onKeyPress={(e) => e.key === 'Enter' && convertToBinary()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={convertToBinary}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{result.name}</h3>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Binary Representation</h4>
              <p className="text-white/90 text-sm font-mono break-all">{result.binary}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Total Bits</p>
                <p className="text-2xl font-bold text-white">{result.totalBits}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Bytes</p>
                <p className="text-2xl font-bold text-white">{result.byteCount}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Character Breakdown</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.asciiValues.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                    <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {item.char}
                    </Badge>
                    <span className="text-white/70 text-xs">ASCII: {item.ascii}</span>
                    <span className="text-white/90 text-xs font-mono flex-1 text-right">{item.binary}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 rounded border border-cyan-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Binary className="h-4 w-4 text-cyan-400" />
                Binary Info
              </h4>
              <p className="text-white/80 text-xs">
                Each character is represented by its ASCII value in 8-bit binary format. Spaces are included in the conversion.
              </p>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to binary</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

