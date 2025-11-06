'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HexResult {
  name: string
  hex: string
  hexValues: Array<{ char: string; ascii: number; hex: string }>
  colorCode: string
  totalBytes: number
}

export function NameHexConverter() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<HexResult | null>(null)
  const { toast } = useToast()

  const convertToHex = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const hexValues: Array<{ char: string; ascii: number; hex: string }> = []
    let colorCode = '#'

    for (const char of normalized) {
      const ascii = char.charCodeAt(0)
      const hex = ascii.toString(16).toUpperCase().padStart(2, '0')
      hexValues.push({
        char,
        ascii,
        hex,
      })
      // Use first 6 hex digits for color code
      if (colorCode.length < 7) {
        colorCode += hex.substring(0, 2)
      }
    }

    // Ensure color code is 6 digits
    colorCode = colorCode.padEnd(7, '0').substring(0, 7)
    const hex = hexValues.map((item) => item.hex).join(' ')

    setResult({
      name: normalized,
      hex,
      hexValues,
      colorCode,
      totalBytes: normalized.length,
    })

    toast({
      title: "Converted to hex!",
      description: `Hex: ${hex.substring(0, 20)}...`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-orange-400" />
          Hexadecimal Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to hexadecimal representation
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
              onKeyPress={(e) => e.key === 'Enter' && convertToHex()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={convertToHex}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
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
              <h4 className="text-white font-semibold mb-2 text-sm">Hexadecimal Representation</h4>
              <p className="text-white/90 text-sm font-mono break-all">{result.hex}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Generated Color Code</h4>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded border-2 border-white/20"
                  style={{ backgroundColor: result.colorCode }}
                />
                <div>
                  <p className="text-white font-mono text-sm">{result.colorCode}</p>
                  <p className="text-white/70 text-xs">Color derived from name</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
              <p className="text-white/70 text-xs mb-1">Total Bytes</p>
              <p className="text-2xl font-bold text-white">{result.totalBytes}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Character Breakdown</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {result.hexValues.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded">
                    <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50 font-bold text-sm px-2 py-1 min-w-[2rem] text-center">
                      {item.char}
                    </Badge>
                    <span className="text-white/70 text-xs">ASCII: {item.ascii}</span>
                    <span className="text-white/90 text-xs font-mono flex-1 text-right">{item.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Hash className="h-4 w-4 text-orange-400" />
                Hexadecimal Info
              </h4>
              <p className="text-white/80 text-xs">
                Each character is represented by its ASCII value in hexadecimal (base-16) format. The color code is generated from the hex values.
              </p>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to hexadecimal</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

