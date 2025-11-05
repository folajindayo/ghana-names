'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ColorAssociation {
  color: string
  hex: string
  meaning: string
  personality: string[]
}

const colorAssociations: Record<string, ColorAssociation> = {
  kwame: {
    color: 'Gold',
    hex: '#FFD700',
    meaning: 'Wisdom and leadership',
    personality: ['Wise', 'Noble', 'Protective', 'Spiritual'],
  },
  akosua: {
    color: 'Sunset Orange',
    hex: '#FF6B35',
    meaning: 'Joy and creativity',
    personality: ['Joyful', 'Creative', 'Energetic', 'Optimistic'],
  },
  kofi: {
    color: 'Forest Green',
    hex: '#228B22',
    meaning: 'Growth and prosperity',
    personality: ['Adventurous', 'Independent', 'Natural', 'Prosperous'],
  },
  ama: {
    color: 'Deep Purple',
    hex: '#6A0DAD',
    meaning: 'Mystery and intuition',
    personality: ['Mysterious', 'Intuitive', 'Strong', 'Wise'],
  },
  yaw: {
    color: 'Royal Blue',
    hex: '#4169E1',
    meaning: 'Calm and stability',
    personality: ['Calm', 'Stable', 'Trustworthy', 'Reliable'],
  },
  yaa: {
    color: 'Rose Pink',
    hex: '#FF69B4',
    meaning: 'Love and compassion',
    personality: ['Loving', 'Compassionate', 'Gentle', 'Caring'],
  },
}

export function NameColorAssociation() {
  const [name, setName] = useState('')
  const [association, setAssociation] = useState<ColorAssociation | null>(null)
  const { toast } = useToast()

  const findColor = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const found = colorAssociations[normalized]

    if (found) {
      setAssociation(found)
      toast({
        title: "Color found!",
        description: `${found.color} is associated with ${name}`,
      })
    } else {
      // Generate random color for unknown names
      const colors = [
        { color: 'Crimson', hex: '#DC143C', meaning: 'Passion and energy', personality: ['Passionate', 'Energetic'] },
        { color: 'Teal', hex: '#008080', meaning: 'Balance and harmony', personality: ['Balanced', 'Harmonious'] },
        { color: 'Amber', hex: '#FFBF00', meaning: 'Warmth and positivity', personality: ['Warm', 'Positive'] },
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setAssociation({
        ...randomColor,
        personality: randomColor.personality,
      } as ColorAssociation)
      toast({
        title: "Color assigned!",
        description: `${randomColor.color} has been assigned to ${name}`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Palette className="h-5 w-5 text-pink-400" />
          Name Color Association
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover the color associated with your name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findColor()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findColor}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {association && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white/20"
                style={{ backgroundColor: association.hex }}
              />
              <h3 className="text-2xl font-bold text-white mb-2">{association.color}</h3>
              <p className="text-white/80 text-sm mb-1">#{association.hex}</p>
              <p className="text-white/90 text-base">"{association.meaning}"</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {association.personality.map((trait, index) => (
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

        {name && !association && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to find its color</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

