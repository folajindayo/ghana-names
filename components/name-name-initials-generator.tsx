'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface InitialsResult {
  fullName: string
  initials: string[]
  monogram: string
  variations: string[]
  styles: {
    standard: string
    spaced: string
    dotted: string
    lowercase: string
    uppercase: string
  }
}

export function NameInitialsGenerator() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [result, setResult] = useState<InitialsResult | null>(null)
  const { toast } = useToast()

  const generateInitials = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter first and last name",
        variant: "destructive",
      })
      return
    }

    const names = [firstName.trim(), middleName.trim(), lastName.trim()].filter(Boolean)
    const initials = names.map((name) => name.charAt(0).toUpperCase())
    const monogram = initials.join('')
    const fullName = names.join(' ')

    const variations: string[] = []
    if (names.length === 2) {
      variations.push(`${initials[0]}${initials[1]}`)
      variations.push(`${initials[0]}.${initials[1]}`)
      variations.push(`${initials[0]} ${initials[1]}`)
    } else if (names.length === 3) {
      variations.push(`${initials[0]}${initials[1]}${initials[2]}`)
      variations.push(`${initials[0]}.${initials[1]}.${initials[2]}`)
      variations.push(`${initials[0]} ${initials[1]} ${initials[2]}`)
      variations.push(`${initials[0]}${initials[2]}`)
    }

    setResult({
      fullName,
      initials,
      monogram,
      variations,
      styles: {
        standard: monogram,
        spaced: initials.join(' '),
        dotted: initials.join('.'),
        lowercase: monogram.toLowerCase(),
        uppercase: monogram.toUpperCase(),
      },
    })

    toast({
      title: "Initials generated!",
      description: `Monogram: ${monogram}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-green-400" />
          Initials Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate initials and monograms from names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">First Name</Label>
          <Input
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Middle Name (Optional)</Label>
          <Input
            placeholder="Enter middle name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Last Name</Label>
          <Input
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateInitials()}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <Button
          onClick={generateInitials}
          disabled={!firstName.trim() || !lastName.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Initials
        </Button>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{result.fullName}</h3>
              <div className="text-4xl font-bold text-white mb-3">{result.monogram}</div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Style Variations</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-white/70 text-xs mb-1">Standard</p>
                  <p className="text-white font-bold">{result.styles.standard}</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-white/70 text-xs mb-1">Spaced</p>
                  <p className="text-white font-bold">{result.styles.spaced}</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-white/70 text-xs mb-1">Dotted</p>
                  <p className="text-white font-bold">{result.styles.dotted}</p>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <p className="text-white/70 text-xs mb-1">Lowercase</p>
                  <p className="text-white font-bold">{result.styles.lowercase}</p>
                </div>
              </div>
            </div>

            {result.variations.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">All Variations</h4>
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
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Individual Initials</h4>
              <div className="flex gap-2">
                {result.initials.map((initial, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-600/40 text-green-100 border-green-400/50 font-bold text-lg px-4 py-2"
                  >
                    {initial}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {firstName && lastName && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to create initials</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

