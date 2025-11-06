'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Globe, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CultureMatch {
  name: string
  culture: string
  matchScore: number
  traditions: string[]
  significance: string
  recommendations: string[]
}

const cultureData: Record<string, { traditions: string[]; significance: string }> = {
  Akan: {
    traditions: ['Day names', 'Spiritual meaning', 'Ancestral connection'],
    significance: 'Names often reflect the day of birth and spiritual beliefs',
  },
  Ga: {
    traditions: ['Clan names', 'Geographic origin', 'Family heritage'],
    significance: 'Names connect to specific clans and geographic locations',
  },
  Ewe: {
    traditions: ['Circumstance names', 'Birth order', 'Family history'],
    significance: 'Names reflect circumstances of birth and family lineage',
  },
  Dagomba: {
    traditions: ['Royal names', 'Status names', 'Historical significance'],
    significance: 'Names often indicate social status and royal connections',
  },
}

export function NameCultureMatch() {
  const [name, setName] = useState('')
  const [culture, setCulture] = useState('')
  const [match, setMatch] = useState<CultureMatch | null>(null)
  const { toast } = useToast()

  const checkMatch = () => {
    if (!name.trim() || !culture) {
      toast({
        title: "Information required",
        description: "Please enter name and select culture",
        variant: "destructive",
      })
      return
    }

    const cultureInfo = cultureData[culture]
    if (!cultureInfo) {
      toast({
        title: "Invalid culture",
        description: "Please select a valid culture",
        variant: "destructive",
      })
      return
    }

    // Simple matching logic
    const normalized = name.toLowerCase()
    let matchScore = 50

    // Adjust score based on name characteristics
    if (normalized.startsWith('kw') || normalized.startsWith('ak')) {
      matchScore += 20
    }
    if (normalized.length >= 4 && normalized.length <= 7) {
      matchScore += 15
    }
    if (/[aeiou]/.test(normalized)) {
      matchScore += 15
    }

    matchScore = Math.min(100, matchScore)

    const recommendations: string[] = []
    if (matchScore < 70) {
      recommendations.push('Consider names with traditional prefixes')
      recommendations.push('Explore names from the selected culture')
    }
    if (matchScore >= 70) {
      recommendations.push('This name aligns well with the culture')
      recommendations.push('Consider learning more about its traditions')
    }

    setMatch({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      culture,
      matchScore,
      traditions: cultureInfo.traditions,
      significance: cultureInfo.significance,
      recommendations,
    })

    toast({
      title: "Match analyzed!",
      description: `${matchScore}% match with ${culture} culture`,
    })
  }

  const getMatchColor = () => {
    if (!match) return ''
    if (match.matchScore >= 80) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (match.matchScore >= 60) return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    return 'bg-red-600/40 text-red-100 border-red-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Globe className="h-5 w-5 text-cyan-400" />
          Culture Match
        </CardTitle>
        <CardDescription className="text-white/70">
          Check how well a name matches a specific culture
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
          <Label className="text-white/80">Culture</Label>
          <Select value={culture} onValueChange={setCulture}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select culture" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(cultureData).map((cult) => (
                <SelectItem key={cult} value={cult}>
                  {cult}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={checkMatch}
          disabled={!name.trim() || !culture}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Check Match
        </Button>

        {match && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{match.name}</h3>
              <Badge variant="secondary" className={`${getMatchColor()} font-semibold text-lg px-4 py-2`}>
                {match.matchScore}% Match
              </Badge>
              <p className="text-white/80 text-sm mt-2">{match.culture} Culture</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Cultural Significance</h4>
              <p className="text-white/80 text-xs">{match.significance}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Traditions</h4>
              <div className="flex flex-wrap gap-2">
                {match.traditions.map((tradition, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
                  >
                    {tradition}
                  </Badge>
                ))}
              </div>
            </div>

            {match.recommendations.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Recommendations</h4>
                <ul className="space-y-1">
                  {match.recommendations.map((rec, index) => (
                    <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                      <Sparkles className="h-3 w-3 text-cyan-400 mt-1" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${match.matchScore}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2 text-center">Match Score</p>
            </div>
          </div>
        )}

        {name && culture && !match && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click check to analyze culture match</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

