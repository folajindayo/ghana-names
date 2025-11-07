'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Wand2, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface GeneratedName {
  name: string
  meaning: string
  tribe: string
  gender: string
  personality: string
  traits: string[]
}

const namePool: GeneratedName[] = [
  {
    name: 'Kwame',
    meaning: 'Born on Saturday',
    tribe: 'Akan',
    gender: 'Male',
    personality: 'Calm and peaceful',
    traits: ['Patient', 'Thoughtful', 'Intuitive'],
  },
  {
    name: 'Akosua',
    meaning: 'Born on Sunday',
    tribe: 'Akan',
    gender: 'Female',
    personality: 'Bright and cheerful',
    traits: ['Energetic', 'Optimistic', 'Creative'],
  },
  {
    name: 'Kofi',
    meaning: 'Born on Friday',
    tribe: 'Akan',
    gender: 'Male',
    personality: 'Artistic and loving',
    traits: ['Creative', 'Romantic', 'Expressive'],
  },
  {
    name: 'Ama',
    meaning: 'Born on Saturday',
    tribe: 'Akan',
    gender: 'Female',
    personality: 'Serene and wise',
    traits: ['Calm', 'Wise', 'Compassionate'],
  },
]

export function NameNameGeneratorAIEnhanced() {
  const [preferences, setPreferences] = useState({
    gender: '',
    tribe: '',
    personality: '',
  })
  const [generated, setGenerated] = useState<GeneratedName | null>(null)
  const { toast } = useToast()

  const generate = () => {
    if (!preferences.gender) {
      toast({
        title: "Gender required",
        description: "Please select a gender",
        variant: "destructive",
      })
      return
    }

    let filtered = namePool.filter((n) => n.gender.toLowerCase() === preferences.gender.toLowerCase())

    if (preferences.tribe) {
      filtered = filtered.filter((n) => n.tribe.toLowerCase() === preferences.tribe.toLowerCase())
    }

    if (preferences.personality) {
      filtered = filtered.filter((n) =>
        n.personality.toLowerCase().includes(preferences.personality.toLowerCase())
      )
    }

    if (filtered.length === 0) {
      toast({
        title: "No matches found",
        description: "Try different preferences",
        variant: "destructive",
      })
      return
    }

    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setGenerated(random)
    toast({
      title: "Name generated!",
      description: `Generated: ${random.name}`,
    })
  }

  const regenerate = () => {
    generate()
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-purple-400" />
          AI-Enhanced Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate names based on personality and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Gender</Label>
            <Select
              value={preferences.gender}
              onValueChange={(value) => setPreferences({ ...preferences, gender: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Tribe (Optional)</Label>
            <Select
              value={preferences.tribe}
              onValueChange={(value) => setPreferences({ ...preferences, tribe: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select tribe (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tribes</SelectItem>
                <SelectItem value="akan">Akan</SelectItem>
                <SelectItem value="ewe">Ewe</SelectItem>
                <SelectItem value="ga">Ga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Personality (Optional)</Label>
            <Input
              placeholder="e.g., calm, energetic, creative"
              value={preferences.personality}
              onChange={(e) => setPreferences({ ...preferences, personality: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={generate}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Name
          </Button>
        </div>

        {generated && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{generated.name}</h3>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                  {generated.tribe}
                </Badge>
                <Badge
                  variant="secondary"
                  className={
                    generated.gender === 'Male'
                      ? 'bg-blue-600/40 text-blue-100 border-blue-400/50'
                      : 'bg-pink-600/40 text-pink-100 border-pink-400/50'
                  }
                >
                  {generated.gender}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Meaning</h4>
              <p className="text-white/80 text-sm">"{generated.meaning}"</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Personality</h4>
              <p className="text-white/80 text-sm">{generated.personality}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Traits</h4>
              <div className="flex flex-wrap gap-2">
                {generated.traits.map((trait, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={regenerate}
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate Another
            </Button>
          </div>
        )}

        {preferences.gender && !generated && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to create a personalized name</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

