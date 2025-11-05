'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Play, Mic } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PhoneticGuide {
  name: string
  phonetic: string
  syllables: string[]
  pronunciation: string
}

const phoneticGuides: Record<string, PhoneticGuide> = {
  kwame: {
    name: 'Kwame',
    phonetic: '/ˈkwɑːmeɪ/',
    syllables: ['Kwa', 'me'],
    pronunciation: 'KWAH-may',
  },
  akosua: {
    name: 'Akosua',
    phonetic: '/ɑːˈkoʊsuːɑː/',
    syllables: ['A', 'ko', 'su', 'a'],
    pronunciation: 'ah-KOH-soo-ah',
  },
  kofi: {
    name: 'Kofi',
    phonetic: '/ˈkoʊfi/',
    syllables: ['Ko', 'fi'],
    pronunciation: 'KOH-fee',
  },
  ama: {
    name: 'Ama',
    phonetic: '/ˈɑːmɑː/',
    syllables: ['A', 'ma'],
    pronunciation: 'AH-mah',
  },
  yaw: {
    name: 'Yaw',
    phonetic: '/jɑː/',
    syllables: ['Yaw'],
    pronunciation: 'YAH',
  },
  yaa: {
    name: 'Yaa',
    phonetic: '/jɑː/',
    syllables: ['Yaa'],
    pronunciation: 'YAH',
  },
  kwabena: {
    name: 'Kwabena',
    phonetic: '/kwɑːˈbeɪnɑː/',
    syllables: ['Kwa', 'be', 'na'],
    pronunciation: 'kwah-BAY-nah',
  },
  abena: {
    name: 'Abena',
    phonetic: '/ɑːˈbeɪnɑː/',
    syllables: ['A', 'be', 'na'],
    pronunciation: 'ah-BAY-nah',
  },
  kwaku: {
    name: 'Kwaku',
    phonetic: '/ˈkwɑːkuː/',
    syllables: ['Kwa', 'ku'],
    pronunciation: 'KWAH-koo',
  },
  akua: {
    name: 'Akua',
    phonetic: '/ɑːˈkuːɑː/',
    syllables: ['A', 'ku', 'a'],
    pronunciation: 'ah-KOO-ah',
  },
}

export function NamePhoneticGuide() {
  const [name, setName] = useState('')
  const [guide, setGuide] = useState<PhoneticGuide | null>(null)
  const { toast } = useToast()

  const findGuide = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const found = phoneticGuides[normalized]

    if (found) {
      setGuide(found)
      toast({
        title: "Phonetic guide found!",
        description: `Pronunciation guide for ${found.name}`,
      })
    } else {
      toast({
        title: "Not found",
        description: `No phonetic guide for "${name}"`,
        variant: "destructive",
      })
      setGuide(null)
    }
  }

  const speakName = () => {
    if (!guide) return
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(guide.name)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-400" />
          Phonetic Pronunciation Guide
        </CardTitle>
        <CardDescription className="text-white/70">
          Learn how to pronounce Ghanaian names correctly
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
              onKeyPress={(e) => e.key === 'Enter' && findGuide()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findGuide}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {guide && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{guide.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <p className="text-white/80 text-lg">{guide.phonetic}</p>
                <Button
                  onClick={speakName}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-white/90 text-xl font-semibold">{guide.pronunciation}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Syllable Breakdown</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {guide.syllables.map((syllable, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-lg px-3 py-1"
                  >
                    {syllable}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Pronunciation Tips</h4>
              <ul className="space-y-1 text-white/80 text-sm">
                <li>• Stress the capitalized syllables</li>
                <li>• Pronounce each syllable clearly</li>
                <li>• Use the play button to hear the pronunciation</li>
              </ul>
            </div>
          </div>
        )}

        {name && !guide && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm mb-2">Phonetic guide not available</p>
            <p className="text-white/50 text-xs">
              Try: Kwame, Akosua, Kofi, Ama, Yaw, Yaa, Kwabena, Abena, Kwaku, or Akua
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

