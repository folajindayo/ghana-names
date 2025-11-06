'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AcronymResult {
  fullName: string
  acronym: string
  variations: string[]
  meanings: string[]
}

export function NameAcronymGenerator() {
  const [fullName, setFullName] = useState('')
  const [result, setResult] = useState<AcronymResult | null>(null)
  const { toast } = useToast()

  const generateAcronym = () => {
    if (!fullName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a full name",
        variant: "destructive",
      })
      return
    }

    const words = fullName.trim().split(/\s+/)
    if (words.length < 2) {
      toast({
        title: "Full name required",
        description: "Please enter at least first and last name",
        variant: "destructive",
      })
      return
    }

    // Generate acronym from first letters
    const acronym = words.map((word) => word.charAt(0).toUpperCase()).join('')
    
    // Generate variations
    const variations: string[] = []
    variations.push(acronym) // Standard
    variations.push(acronym.toLowerCase()) // Lowercase
    variations.push(acronym.split('').join('.')) // Dotted
    variations.push(acronym.split('').join('-')) // Hyphenated
    if (words.length >= 3) {
      // Include middle initial
      variations.push(`${words[0].charAt(0).toUpperCase()}${words[1].charAt(0).toUpperCase()}${words[words.length - 1].charAt(0).toUpperCase()}`)
    }

    // Generate possible meanings (mock)
    const meanings: string[] = []
    meanings.push(`${words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')}`)
    meanings.push(`Initials: ${acronym}`)
    if (acronym.length >= 3) {
      meanings.push(`Can be pronounced as a word`)
    }

    setResult({
      fullName: words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
      acronym,
      variations,
      meanings,
    })

    toast({
      title: "Acronym generated!",
      description: `Acronym: ${acronym}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-blue-400" />
          Acronym Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate acronyms from full names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Full Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Asante Mensah"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateAcronym()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generateAcronym}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{result.fullName}</h3>
              <div className="text-4xl font-bold text-white mb-3">{result.acronym}</div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Variations</h4>
              <div className="flex flex-wrap gap-2">
                {result.variations.map((variation, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-sm px-3 py-1"
                  >
                    {variation}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm">Info</h4>
              <ul className="space-y-1">
                {result.meanings.map((meaning, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    {meaning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {fullName && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a full name and click to generate acronym</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

