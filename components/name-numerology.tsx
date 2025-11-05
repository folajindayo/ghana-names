'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Sparkles, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NumerologyResult {
  lifePath: number
  expression: number
  personality: number
  meaning: string
  traits: string[]
}

const numerologyMeanings: Record<number, { meaning: string; traits: string[] }> = {
  1: {
    meaning: 'Leader - Independent, ambitious, pioneering',
    traits: ['Leadership', 'Independence', 'Originality', 'Determination'],
  },
  2: {
    meaning: 'Cooperator - Diplomatic, sensitive, cooperative',
    traits: ['Diplomacy', 'Sensitivity', 'Cooperation', 'Intuition'],
  },
  3: {
    meaning: 'Communicator - Creative, expressive, optimistic',
    traits: ['Creativity', 'Expression', 'Optimism', 'Social'],
  },
  4: {
    meaning: 'Builder - Practical, disciplined, reliable',
    traits: ['Stability', 'Discipline', 'Reliability', 'Organization'],
  },
  5: {
    meaning: 'Adventurer - Freedom-loving, curious, versatile',
    traits: ['Freedom', 'Adventure', 'Curiosity', 'Versatility'],
  },
  6: {
    meaning: 'Nurturer - Caring, responsible, harmonious',
    traits: ['Care', 'Responsibility', 'Harmony', 'Service'],
  },
  7: {
    meaning: 'Seeker - Spiritual, analytical, introspective',
    traits: ['Spirituality', 'Analysis', 'Introspection', 'Wisdom'],
  },
  8: {
    meaning: 'Achiever - Ambitious, material success, power',
    traits: ['Ambition', 'Success', 'Power', 'Authority'],
  },
  9: {
    meaning: 'Humanitarian - Compassionate, idealistic, universal',
    traits: ['Compassion', 'Idealism', 'Universal love', 'Service'],
  },
}

function calculateNumerology(name: string): number {
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  }

  let sum = 0
  for (const char of name.toLowerCase()) {
    if (letterValues[char]) {
      sum += letterValues[char]
    }
  }

  // Reduce to single digit
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }

  return sum
}

export function NameNumerology() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<NumerologyResult | null>(null)
  const { toast } = useToast()

  const calculate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const lifePath = calculateNumerology(name)
    const expression = calculateNumerology(name.replace(/\s/g, ''))
    const personality = calculateNumerology(name.split(' ')[0] || name)

    const meaning = numerologyMeanings[lifePath] || numerologyMeanings[1]
    const traits = meaning.traits

    setResult({
      lifePath,
      expression,
      personality,
      meaning: meaning.meaning,
      traits,
    })

    toast({
      title: "Numerology calculated!",
      description: `Life Path Number: ${lifePath}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-400" />
          Name Numerology
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover the numerological significance of your name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Your Full Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              <Calculator className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Life Path {result.lifePath}</h3>
              </div>
              <p className="text-white/90 text-base mb-3">{result.meaning}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Life Path</p>
                <p className="text-2xl font-bold text-white">{result.lifePath}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Expression</p>
                <p className="text-2xl font-bold text-white">{result.expression}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Personality</p>
                <p className="text-2xl font-bold text-white">{result.personality}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Key Traits</h4>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

