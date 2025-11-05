'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Sparkles, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CompatibilityResult {
  percentage: number
  compatibility: 'Excellent' | 'Good' | 'Moderate' | 'Low'
  description: string
  strengths: string[]
  challenges: string[]
}

export function NameCompatibilityChecker() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const { toast } = useToast()

  const calculateCompatibility = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both names",
        variant: "destructive",
      })
      return
    }

    // Simple compatibility algorithm based on name characteristics
    const n1 = name1.toLowerCase().trim()
    const n2 = name2.toLowerCase().trim()

    let score = 50 // Base score

    // Same length bonus
    if (n1.length === n2.length) score += 10

    // Shared vowels
    const vowels1 = n1.match(/[aeiou]/g) || []
    const vowels2 = n2.match(/[aeiou]/g) || []
    const sharedVowels = vowels1.filter((v) => vowels2.includes(v)).length
    score += sharedVowels * 5

    // Same starting letter
    if (n1[0] === n2[0]) score += 15

    // Similar length (within 2 characters)
    if (Math.abs(n1.length - n2.length) <= 2) score += 10

    // Cap at 100
    score = Math.min(score, 100)

    let compatibility: CompatibilityResult['compatibility']
    let description: string
    const strengths: string[] = []
    const challenges: string[] = []

    if (score >= 85) {
      compatibility = 'Excellent'
      description = 'These names have exceptional compatibility and complement each other beautifully.'
      strengths.push('Strong cultural connection', 'Harmonious sound', 'Balanced characteristics')
    } else if (score >= 70) {
      compatibility = 'Good'
      description = 'These names work well together and create a nice balance.'
      strengths.push('Good synergy', 'Complementary traits')
      challenges.push('Minor differences in style')
    } else if (score >= 55) {
      compatibility = 'Moderate'
      description = 'These names have some compatibility but may need adjustment for perfect harmony.'
      strengths.push('Potential for growth')
      challenges.push('Different cultural roots', 'Varied characteristics')
    } else {
      compatibility = 'Low'
      description = 'These names have limited compatibility but can still work with understanding.'
      challenges.push('Different styles', 'May require compromise', 'Distinct characteristics')
    }

    setResult({
      percentage: score,
      compatibility,
      description,
      strengths,
      challenges,
    })

    toast({
      title: "Compatibility calculated!",
      description: `${score}% compatibility between ${name1} and ${name2}`,
    })
  }

  const getCompatibilityColor = () => {
    if (!result) return ''
    switch (result.compatibility) {
      case 'Excellent':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'Good':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'Moderate':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'Low':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          Name Compatibility Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Check compatibility between two names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">First Name</Label>
            <Input
              placeholder="Name 1"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Second Name</Label>
            <Input
              placeholder="Name 2"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={calculateCompatibility}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Check Compatibility
        </Button>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="text-4xl font-bold text-white">{result.percentage}%</div>
                <Badge variant="secondary" className={`${getCompatibilityColor()} text-lg font-semibold px-3 py-1`}>
                  {result.compatibility}
                </Badge>
              </div>
              <p className="text-white/80 text-sm">{result.description}</p>
            </div>

            {result.strengths.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <Sparkles className="h-3 w-3 text-green-400 mt-1.5" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.challenges.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-yellow-400" />
                  Considerations
                </h4>
                <ul className="space-y-1">
                  {result.challenges.map((challenge, index) => (
                    <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-yellow-400 mt-1.5">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

