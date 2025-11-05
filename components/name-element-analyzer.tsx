'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Flame, Droplet, Wind, Mountain, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ElementAnalysis {
  primary: 'fire' | 'water' | 'air' | 'earth'
  secondary?: 'fire' | 'water' | 'air' | 'earth'
  traits: string[]
  description: string
}

export function NameElementAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<ElementAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeElement = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    let analysis: ElementAnalysis

    // Simple element assignment based on name characteristics
    const firstChar = normalized[0]
    const vowelCount = (normalized.match(/[aeiou]/gi) || []).length
    const length = normalized.length

    if (['a', 'e', 'i', 'o', 'u'].includes(firstChar) || vowelCount > length / 2) {
      analysis = {
        primary: 'air',
        traits: ['Free-spirited', 'Communicative', 'Intellectual', 'Adaptable'],
        description: 'Air element names are associated with freedom, communication, and intellectual pursuits.',
      }
    } else if (length <= 4) {
      analysis = {
        primary: 'fire',
        traits: ['Energetic', 'Passionate', 'Dynamic', 'Bold'],
        description: 'Fire element names are short and powerful, representing energy and passion.',
      }
    } else if (normalized.includes('w') || normalized.includes('m')) {
      analysis = {
        primary: 'water',
        traits: ['Emotional', 'Intuitive', 'Fluid', 'Nurturing'],
        description: 'Water element names flow smoothly and represent emotions and intuition.',
      }
    } else {
      analysis = {
        primary: 'earth',
        traits: ['Stable', 'Practical', 'Grounded', 'Reliable'],
        description: 'Earth element names represent stability, practicality, and being grounded.',
      }
    }

    setAnalysis(analysis)
    toast({
      title: "Element analyzed!",
      description: `${name} is associated with ${analysis.primary} element`,
    })
  }

  const getElementIcon = () => {
    if (!analysis) return null
    switch (analysis.primary) {
      case 'fire':
        return <Flame className="h-6 w-6 text-orange-400" />
      case 'water':
        return <Droplet className="h-6 w-6 text-blue-400" />
      case 'air':
        return <Wind className="h-6 w-6 text-cyan-400" />
      case 'earth':
        return <Mountain className="h-6 w-6 text-green-400" />
    }
  }

  const getElementColor = () => {
    if (!analysis) return ''
    switch (analysis.primary) {
      case 'fire':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
      case 'water':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'air':
        return 'bg-cyan-600/40 text-cyan-100 border-cyan-400/50'
      case 'earth':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          Element Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover your name's elemental association
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeElement()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeElement}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {getElementIcon()}
                <h3 className="text-2xl font-bold text-white capitalize">{analysis.primary} Element</h3>
              </div>
              <Badge variant="secondary" className={`${getElementColor()} font-semibold text-sm px-4 py-2`}>
                {analysis.primary.toUpperCase()}
              </Badge>
              <p className="text-white/90 text-sm mt-3">{analysis.description}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Elemental Traits</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.traits.map((trait, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

