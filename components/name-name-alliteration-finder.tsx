'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Repeat, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AlliterativeName {
  name: string
  lastName: string
  meaning: string
  alliterationType: 'first-letter' | 'first-sound' | 'consonant'
  matchScore: number
}

export function NameAlliterationFinder() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [alliterativeNames, setAlliterativeNames] = useState<AlliterativeName[]>([])
  const { toast } = useToast()

  const findAlliterations = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both first and last name",
        variant: "destructive",
      })
      return
    }

    const firstChar = firstName.toLowerCase().trim()[0]
    const firstSound = firstName.toLowerCase().trim().match(/^[bcdfghjklmnpqrstvwxyz]*/)?.[0] || firstChar

    // Mock alliterative names
    const mockNames: AlliterativeName[] = [
      {
        name: 'Kwame',
        lastName: 'Kwarteng',
        meaning: 'Born on Saturday',
        alliterationType: 'first-letter',
        matchScore: 100,
      },
      {
        name: 'Kofi',
        lastName: 'Kumi',
        meaning: 'Born on Friday',
        alliterationType: 'first-letter',
        matchScore: 95,
      },
      {
        name: 'Akosua',
        lastName: 'Agyeman',
        meaning: 'Born on Sunday',
        alliterationType: 'first-letter',
        matchScore: 90,
      },
    ]

    // Filter and score based on alliteration
    const alliterations = mockNames
      .map((name) => {
        const nameFirstChar = name.name.toLowerCase()[0]
        const nameFirstSound = name.name.toLowerCase().match(/^[bcdfghjklmnpqrstvwxyz]*/)?.[0] || nameFirstChar
        let alliterationType: 'first-letter' | 'first-sound' | 'consonant' = 'consonant'
        let matchScore = 50

        if (nameFirstChar === firstChar) {
          alliterationType = 'first-letter'
          matchScore = 100
        } else if (nameFirstSound === firstSound) {
          alliterationType = 'first-sound'
          matchScore = 80
        } else if (/[bcdfghjklmnpqrstvwxyz]/.test(nameFirstChar) && /[bcdfghjklmnpqrstvwxyz]/.test(firstChar)) {
          alliterationType = 'consonant'
          matchScore = 60
        }

        return { ...name, alliterationType, matchScore }
      })
      .filter((name) => name.matchScore >= 60)
      .sort((a, b) => b.matchScore - a.matchScore)

    setAlliterativeNames(alliterations)
    toast({
      title: "Alliterations found!",
      description: `Found ${alliterations.length} alliterative name${alliterations.length !== 1 ? 's' : ''}`,
    })
  }

  const getAlliterationColor = (type: string) => {
    switch (type) {
      case 'first-letter':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'first-sound':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'consonant':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Repeat className="h-5 w-5 text-cyan-400" />
          Alliteration Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names with alliterative patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">First Name</Label>
            <Input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Last Name</Label>
            <Input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findAlliterations()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
        </div>

        <Button
          onClick={findAlliterations}
          disabled={!firstName.trim() || !lastName.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Find Alliterations
        </Button>

        {alliterativeNames.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <p className="text-white/80 text-sm">
              {alliterativeNames.length} alliterative name{alliterativeNames.length !== 1 ? 's' : ''} found
            </p>
            {alliterativeNames.map((name, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {name.name} {name.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{name.meaning}"</p>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className={`${getAlliterationColor(name.alliterationType)} font-semibold text-xs capitalize`}
                      >
                        {name.alliterationType.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                    {name.matchScore}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {firstName && lastName && alliterativeNames.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click find to search for alliterative names</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

