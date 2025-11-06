'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PatternMatch {
  name: string
  lastName: string
  meaning: string
  pattern: string
  matchScore: number
}

export function NamePatternMatcher() {
  const [pattern, setPattern] = useState('')
  const [patternType, setPatternType] = useState<'starts' | 'ends' | 'contains' | 'regex'>('starts')
  const [matches, setMatches] = useState<PatternMatch[]>([])
  const { toast } = useToast()

  const findMatches = () => {
    if (!pattern.trim()) {
      toast({
        title: "Pattern required",
        description: "Please enter a search pattern",
        variant: "destructive",
      })
      return
    }

    // Mock pattern matches
    const mockMatches: PatternMatch[] = [
      {
        name: 'Kwame',
        lastName: 'Asante',
        meaning: 'Born on Saturday',
        pattern: pattern,
        matchScore: 95,
      },
      {
        name: 'Kofi',
        lastName: 'Mensah',
        meaning: 'Born on Friday',
        pattern: pattern,
        matchScore: 85,
      },
      {
        name: 'Akosua',
        lastName: 'Agyeman',
        meaning: 'Born on Sunday',
        pattern: pattern,
        matchScore: 80,
      },
    ]

    // Filter based on pattern type
    const filtered = mockMatches.filter((match) => {
      const nameLower = match.name.toLowerCase()
      const patternLower = pattern.toLowerCase()

      switch (patternType) {
        case 'starts':
          return nameLower.startsWith(patternLower)
        case 'ends':
          return nameLower.endsWith(patternLower)
        case 'contains':
          return nameLower.includes(patternLower)
        case 'regex':
          try {
            const regex = new RegExp(patternLower, 'i')
            return regex.test(nameLower)
          } catch {
            return false
          }
        default:
          return false
      }
    })

    setMatches(filtered)
    toast({
      title: "Matches found!",
      description: `Found ${filtered.length} matching name${filtered.length !== 1 ? 's' : ''}`,
    })
  }

  const getPatternTypeLabel = () => {
    switch (patternType) {
      case 'starts':
        return 'Starts With'
      case 'ends':
        return 'Ends With'
      case 'contains':
        return 'Contains'
      case 'regex':
        return 'Regex Pattern'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-teal-400" />
          Pattern Matcher
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names matching specific patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Pattern</Label>
          <Input
            placeholder="e.g., Kw, ua, ma"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && findMatches()}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Pattern Type</Label>
          <Select value={patternType} onValueChange={(value: 'starts' | 'ends' | 'contains' | 'regex') => setPatternType(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starts">Starts With</SelectItem>
              <SelectItem value="ends">Ends With</SelectItem>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="regex">Regex Pattern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={findMatches}
          disabled={!pattern.trim()}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Find Matches
        </Button>

        {matches.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm">
                {matches.length} match{matches.length !== 1 ? 'es' : ''} found
              </p>
              <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50 font-semibold text-xs">
                {getPatternTypeLabel()}
              </Badge>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">
                        {match.name} {match.lastName}
                      </h4>
                      <p className="text-white/80 text-xs mb-2">"{match.meaning}"</p>
                      <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50 font-semibold text-xs">
                        Matches: {match.pattern}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                      {match.matchScore}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pattern && matches.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No matches found for this pattern</p>
          </div>
        )}

        {!pattern && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a pattern and click find to search</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

