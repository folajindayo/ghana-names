'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Music, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RhymingName {
  name: string
  lastName: string
  meaning: string
  rhymeType: 'perfect' | 'near' | 'assonance'
  similarity: number
}

export function NameRhymingFinder() {
  const [name, setName] = useState('')
  const [rhymingNames, setRhymingNames] = useState<RhymingName[]>([])
  const { toast } = useToast()

  const findRhymes = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const ending = normalized.slice(-2)
    const vowels = normalized.match(/[aeiou]/gi) || []

    // Mock rhyming names based on ending sounds
    const mockRhymes: RhymingName[] = [
      {
        name: 'Kwame',
        lastName: 'Asante',
        meaning: 'Born on Saturday',
        rhymeType: 'near',
        similarity: 75,
      },
      {
        name: 'Kofi',
        lastName: 'Mensah',
        meaning: 'Born on Friday',
        rhymeType: 'assonance',
        similarity: 60,
      },
      {
        name: 'Yaw',
        lastName: 'Osei',
        meaning: 'Born on Thursday',
        rhymeType: 'near',
        similarity: 70,
      },
    ]

    // Filter and score based on actual rhyming
    const rhymes = mockRhymes.map((rhyme) => {
      const rhymeEnding = rhyme.name.toLowerCase().slice(-2)
      let rhymeType: 'perfect' | 'near' | 'assonance' = 'assonance'
      let similarity = 50

      if (rhymeEnding === ending) {
        rhymeType = 'perfect'
        similarity = 95
      } else if (rhymeEnding.slice(-1) === ending.slice(-1)) {
        rhymeType = 'near'
        similarity = 75
      } else if (vowels.some((v) => rhyme.name.toLowerCase().includes(v))) {
        rhymeType = 'assonance'
        similarity = 60
      }

      return { ...rhyme, rhymeType, similarity }
    })

    setRhymingNames(rhymes.sort((a, b) => b.similarity - a.similarity))
    toast({
      title: "Rhymes found!",
      description: `Found ${rhymes.length} rhyming name${rhymes.length !== 1 ? 's' : ''}`,
    })
  }

  const getRhymeColor = (type: string) => {
    switch (type) {
      case 'perfect':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'near':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'assonance':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music className="h-5 w-5 text-pink-400" />
          Rhyming Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names that rhyme with your input
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
              onKeyPress={(e) => e.key === 'Enter' && findRhymes()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findRhymes}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {rhymingNames.length > 0 && (
          <div className="space-y-2">
            <p className="text-white/80 text-sm">
              {rhymingNames.length} rhyming name{rhymingNames.length !== 1 ? 's' : ''} found
            </p>
            {rhymingNames.map((rhyme, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {rhyme.name} {rhyme.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{rhyme.meaning}"</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={`${getRhymeColor(rhyme.rhymeType)} font-semibold text-xs capitalize`}>
                        {rhyme.rhymeType}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                    {rhyme.similarity}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {name && rhymingNames.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to find rhymes</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

