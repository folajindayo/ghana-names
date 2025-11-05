'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Star, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Compatibility {
  name: string
  zodiac: string
  compatibility: number
  description: string
  strengths: string[]
}

const zodiacCompatibilities: Record<string, Record<string, number>> = {
  Aries: { Kwame: 85, Kofi: 80, Kwabena: 75 },
  Taurus: { Ama: 90, Akosua: 85, Abena: 80 },
  Gemini: { Kwaku: 88, Akua: 85, Yaw: 82 },
  Cancer: { Ama: 92, Akosua: 88, Adwoa: 85 },
  Leo: { Kwame: 90, Kofi: 85, Yaw: 80 },
  Virgo: { Abena: 88, Akua: 85, Ama: 82 },
  Libra: { Akosua: 90, Adwoa: 88, Abena: 85 },
  Scorpio: { Kwame: 85, Kofi: 80, Kwabena: 78 },
  Sagittarius: { Yaw: 88, Kwaku: 85, Kofi: 82 },
  Capricorn: { Kwame: 90, Kwabena: 85, Kwaku: 80 },
  Aquarius: { Akua: 88, Akosua: 85, Adwoa: 82 },
  Pisces: { Ama: 92, Abena: 88, Akosua: 85 },
}

export function NameAstrologyCompatibility() {
  const [name, setName] = useState('')
  const [zodiac, setZodiac] = useState('')
  const [compatibility, setCompatibility] = useState<Compatibility | null>(null)
  const { toast } = useToast()

  const checkCompatibility = () => {
    if (!name.trim() || !zodiac) {
      toast({
        title: "Information required",
        description: "Please enter name and select zodiac sign",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const zodiacData = zodiacCompatibilities[zodiac as keyof typeof zodiacCompatibilities]

    if (!zodiacData) {
      toast({
        title: "Invalid zodiac",
        description: "Please select a valid zodiac sign",
        variant: "destructive",
      })
      return
    }

    // Find best match
    let bestMatch: { name: string; score: number } | null = null
    Object.entries(zodiacData).forEach(([matchName, score]) => {
      if (matchName.toLowerCase() === normalized || normalized.includes(matchName.toLowerCase())) {
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { name: matchName, score }
        }
      }
    })

    // Default compatibility if no exact match
    const score = bestMatch?.score || 75
    const compatibilityLevel = score >= 85 ? 'Excellent' : score >= 75 ? 'Good' : 'Moderate'

    setCompatibility({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      zodiac,
      compatibility: score,
      description: `${name} and ${zodiac} have ${compatibilityLevel.toLowerCase()} compatibility.`,
      strengths: [
        'Shared values',
        'Complementary traits',
        'Mutual understanding',
      ],
    })

    toast({
      title: "Compatibility checked!",
      description: `${score}% compatibility with ${zodiac}`,
    })
  }

  const getCompatibilityColor = () => {
    if (!compatibility) return ''
    if (compatibility.compatibility >= 85) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (compatibility.compatibility >= 75) return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
    return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          Astrology Compatibility
        </CardTitle>
        <CardDescription className="text-white/70">
          Check name compatibility with zodiac signs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Name</Label>
          <Input
            placeholder="Enter a name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Zodiac Sign</Label>
          <Select value={zodiac} onValueChange={setZodiac}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select zodiac sign" />
            </SelectTrigger>
            <SelectContent>
              {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((sign) => (
                <SelectItem key={sign} value={sign}>
                  {sign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={checkCompatibility}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Check Compatibility
        </Button>

        {compatibility && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="text-2xl font-bold text-white">{compatibility.name}</h3>
                <span className="text-white/60">×</span>
                <h3 className="text-2xl font-bold text-white">{compatibility.zodiac}</h3>
              </div>
              <Badge variant="secondary" className={`${getCompatibilityColor()} font-semibold text-lg px-4 py-2`}>
                {compatibility.compatibility}% Compatible
              </Badge>
              <p className="text-white/90 text-sm mt-3">{compatibility.description}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Strengths</h4>
              <ul className="space-y-1">
                {compatibility.strengths.map((strength, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <Star className="h-3 w-3 text-yellow-400 mt-1.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {name && zodiac && !compatibility && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click check to see compatibility</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

