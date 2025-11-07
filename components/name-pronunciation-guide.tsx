'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Play, Pause, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PronunciationGuide {
  name: string
  phonetic: string
  ipa: string
  syllables: string[]
  audioUrl?: string
  tips: string[]
}

const pronunciationDatabase: Record<string, PronunciationGuide> = {
  Kwame: {
    name: 'Kwame',
    phonetic: 'KWAH-may',
    ipa: '/ˈkwɑːmeɪ/',
    syllables: ['KWAH', 'may'],
    tips: [
      'Stress on the first syllable',
      'Kw sounds like "qu" in "queen"',
      'Final "e" is pronounced like "ay"',
    ],
  },
  Akosua: {
    name: 'Akosua',
    phonetic: 'ah-KOH-soo-ah',
    ipa: '/ɑːˈkoʊsuːɑː/',
    syllables: ['ah', 'KOH', 'soo', 'ah'],
    tips: [
      'Stress on the second syllable',
      'A sounds like "ah"',
      'Kos sounds like "coast" without the "t"',
    ],
  },
  Kofi: {
    name: 'Kofi',
    phonetic: 'KOH-fee',
    ipa: '/ˈkoʊfiː/',
    syllables: ['KOH', 'fee'],
    tips: [
      'Stress on the first syllable',
      'Ko sounds like "co" in "coat"',
      'Fi sounds like "fee"',
    ],
  },
  Ama: {
    name: 'Ama',
    phonetic: 'AH-mah',
    ipa: '/ˈɑːmɑː/',
    syllables: ['AH', 'mah'],
    tips: [
      'Stress on the first syllable',
      'Both A sounds are like "ah"',
      'Short and simple pronunciation',
    ],
  },
  Kojo: {
    name: 'Kojo',
    phonetic: 'KOH-joh',
    ipa: '/ˈkoʊdʒoʊ/',
    syllables: ['KOH', 'joh'],
    tips: [
      'Stress on the first syllable',
      'Ko sounds like "co" in "coat"',
      'Jo sounds like "Joe"',
    ],
  },
  Abena: {
    name: 'Abena',
    phonetic: 'ah-BAY-nah',
    ipa: '/ɑːˈbeɪnɑː/',
    syllables: ['ah', 'BAY', 'nah'],
    tips: [
      'Stress on the second syllable',
      'A sounds like "ah"',
      'Be sounds like "bay"',
    ],
  },
}

export function NamePronunciationGuide() {
  const [name, setName] = useState('')
  const [guide, setGuide] = useState<PronunciationGuide | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  const handleSearch = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const found = pronunciationDatabase[normalized]

    if (found) {
      setGuide(found)
      toast({
        title: "Pronunciation guide found!",
        description: `Found guide for ${normalized}`,
      })
    } else {
      setGuide(null)
      toast({
        title: "Guide not found",
        description: "Pronunciation guide not available for this name yet",
        variant: "destructive",
      })
    }
  }

  const handlePlay = () => {
    // In a real app, this would play audio
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
    toast({
      title: "Playing pronunciation",
      description: "Audio playback (simulated)",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-400" />
          Pronunciation Guide
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {guide && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{guide.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <Button
                  onClick={handlePlay}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play Audio
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Phonetic Spelling</h4>
              <p className="text-2xl font-bold text-white/90 mb-2">{guide.phonetic}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs">
                  IPA: {guide.ipa}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Syllables</h4>
              <div className="flex flex-wrap gap-2">
                {guide.syllables.map((syllable, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-600/40 text-green-100 border-green-400/50 text-sm font-mono px-3 py-1"
                  >
                    {syllable}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Pronunciation Tips</h4>
              <ul className="space-y-2">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {name && !guide && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm mb-2">Pronunciation guide not found</p>
            <p className="text-white/50 text-xs">
              Available names: {Object.keys(pronunciationDatabase).join(', ')}
            </p>
          </div>
        )}

        {!name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="h-4 w-4 text-blue-400" />
              <h4 className="text-white font-semibold text-sm">Available Names</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(pronunciationDatabase).map((name) => (
                <Badge
                  key={name}
                  variant="secondary"
                  className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs cursor-pointer hover:bg-blue-600/60"
                  onClick={() => {
                    setName(name)
                    handleSearch()
                  }}
                >
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

