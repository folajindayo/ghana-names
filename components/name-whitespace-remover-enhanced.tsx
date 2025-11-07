'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Scissors, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WhitespaceResult {
  original: string
  noSpaces: string
  singleSpaces: string
  trimmed: string
  noNewlines: string
  noTabs: string
  normalized: string
}

export function NameWhitespaceRemoverEnhanced() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<WhitespaceResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const process = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const original = name
    setResult({
      original,
      noSpaces: original.replace(/\s+/g, ''),
      singleSpaces: original.replace(/\s+/g, ' ').trim(),
      trimmed: original.trim(),
      noNewlines: original.replace(/\n/g, ' ').replace(/\r/g, ''),
      noTabs: original.replace(/\t/g, ' '),
      normalized: original.replace(/\s+/g, ' ').trim(),
    })

    toast({
      title: "Processed!",
      description: "Whitespace variations generated",
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
          <Scissors className="h-5 w-5 text-cyan-400" />
          Enhanced Whitespace Remover
        </CardTitle>
        <CardDescription className="text-white/70">
          Remove and normalize whitespace in names with multiple options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame  Mensah,  Akosua   Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && process()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={process}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">Original</h3>
              <p className="text-white/70 text-sm font-mono">{result.original}</p>
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 mt-2">
                {result.original.length} characters
              </Badge>
            </div>

            {[
              { label: 'No Spaces', value: result.noSpaces, desc: 'All whitespace removed' },
              { label: 'Single Spaces', value: result.singleSpaces, desc: 'Multiple spaces to single' },
              { label: 'Trimmed', value: result.trimmed, desc: 'Leading/trailing removed' },
              { label: 'No Newlines', value: result.noNewlines, desc: 'Line breaks removed' },
              { label: 'No Tabs', value: result.noTabs, desc: 'Tab characters removed' },
              { label: 'Normalized', value: result.normalized, desc: 'All whitespace normalized' },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{item.label}</h4>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(item.value)}
                    className="text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-white/90 text-base font-mono mt-2">{item.value}</p>
                <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-200 border-cyan-400/30 text-xs mt-1">
                  {item.value.length} chars
                </Badge>
              </div>
            ))}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to process whitespace variations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

