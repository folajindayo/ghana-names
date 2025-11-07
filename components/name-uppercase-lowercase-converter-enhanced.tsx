'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CaseResult {
  original: string
  uppercase: string
  lowercase: string
  titleCase: string
  sentenceCase: string
  alternating: string
  inverse: string
}

export function NameUppercaseLowercaseConverterEnhanced() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<CaseResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const toTitleCase = (text: string): string => {
    return text
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const toSentenceCase = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const toAlternating = (text: string): string => {
    return text
      .split('')
      .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join('')
  }

  const toInverse = (text: string): string => {
    return text
      .split('')
      .map((char) => {
        if (char === char.toUpperCase()) return char.toLowerCase()
        if (char === char.toLowerCase()) return char.toUpperCase()
        return char
      })
      .join('')
  }

  const convert = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    setResult({
      original: normalized,
      uppercase: normalized.toUpperCase(),
      lowercase: normalized.toLowerCase(),
      titleCase: toTitleCase(normalized),
      sentenceCase: toSentenceCase(normalized),
      alternating: toAlternating(normalized),
      inverse: toInverse(normalized),
    })

    toast({
      title: "Converted!",
      description: "Name converted to all case variations",
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
          <Type className="h-5 w-5 text-yellow-400" />
          Enhanced Case Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert names to uppercase, lowercase, title case, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Mensah, Akosua Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convert()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={convert}
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">{result.original}</h3>
              <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50">
                All Cases
              </Badge>
            </div>

            {[
              { label: 'Uppercase', value: result.uppercase, color: 'blue' },
              { label: 'Lowercase', value: result.lowercase, color: 'green' },
              { label: 'Title Case', value: result.titleCase, color: 'purple' },
              { label: 'Sentence Case', value: result.sentenceCase, color: 'pink' },
              { label: 'Alternating Case', value: result.alternating, color: 'orange' },
              { label: 'Inverse Case', value: result.inverse, color: 'red' },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-semibold text-sm">{item.label}</h4>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copy(item.value)}
                    className="text-white/60 hover:text-white"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                <p className="text-white/90 text-base font-mono">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to convert to all case variations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

