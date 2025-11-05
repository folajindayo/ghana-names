'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Crystal, Sparkles, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Fortune {
  name: string
  personality: string[]
  strengths: string[]
  future: string
  luckyColor: string
  luckyNumber: number
}

const fortunes: Record<string, Fortune> = {
  kwame: {
    name: 'Kwame',
    personality: ['Wise', 'Leadership-oriented', 'Spiritual', 'Protective'],
    strengths: ['Natural wisdom', 'Ability to guide others', 'Resilience', 'Inner strength'],
    future: 'You are destined for leadership roles and will be a source of wisdom for those around you.',
    luckyColor: 'Yellow',
    luckyNumber: 7,
  },
  akosua: {
    name: 'Akosua',
    personality: ['Joyful', 'Creative', 'Optimistic', 'Nurturing'],
    strengths: ['Artistic abilities', 'Positive outlook', 'Caring nature', 'Social skills'],
    future: 'Your creative energy will bring joy and inspiration to many people in your life.',
    luckyColor: 'Gold',
    luckyNumber: 1,
  },
  kofi: {
    name: 'Kofi',
    personality: ['Adventurous', 'Independent', 'Determined', 'Charismatic'],
    strengths: ['Leadership', 'Courage', 'Innovation', 'Communication'],
    future: 'You will embark on exciting journeys and achieve great success through determination.',
    luckyColor: 'Green',
    luckyNumber: 6,
  },
  ama: {
    name: 'Ama',
    personality: ['Strong-willed', 'Intuitive', 'Compassionate', 'Resilient'],
    strengths: ['Inner strength', 'Empathy', 'Determination', 'Wisdom'],
    future: 'Your strength and compassion will help you overcome challenges and help others.',
    luckyColor: 'Purple',
    luckyNumber: 3,
  },
}

export function NameFortuneTeller() {
  const [name, setName] = useState('')
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const { toast } = useToast()

  const tellFortune = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalizedName = name.toLowerCase().trim()
    const foundFortune = fortunes[normalizedName]

    if (foundFortune) {
      setFortune(foundFortune)
      toast({
        title: "Fortune revealed!",
        description: `Discovering the fortune for ${name}`,
      })
    } else {
      toast({
        title: "Name not found",
        description: "Try: Kwame, Akosua, Kofi, or Ama",
        variant: "destructive",
      })
      setFortune(null)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Crystal className="h-5 w-5 text-purple-400" />
          Name Fortune Teller
        </CardTitle>
        <CardDescription className="text-white/80">
          Discover your personality and future based on your name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Your Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi, Ama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && tellFortune()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={tellFortune}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {fortune && (
          <div className="p-5 bg-white/10 rounded-lg border border-white/20 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <h3 className="text-2xl font-bold text-white">{fortune.name}</h3>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {fortune.personality.map((trait, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Strengths</h4>
              <ul className="space-y-1">
                {fortune.strengths.map((strength, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-400 mt-0.5" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Your Future</h4>
              <p className="text-white/90 text-sm leading-relaxed">"{fortune.future}"</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/70 text-xs mb-1">Lucky Color</p>
                <p className="text-white font-semibold">{fortune.luckyColor}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/70 text-xs mb-1">Lucky Number</p>
                <p className="text-white font-semibold text-xl">{fortune.luckyNumber}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

