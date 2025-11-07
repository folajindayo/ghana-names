'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

interface CulturalStory {
  name: string
  title: string
  story: string
  tribe: string
  significance: string[]
  traditions: string[]
}

const culturalStories: CulturalStory[] = [
  {
    name: 'Kwame',
    title: 'The Saturday Child',
    story: 'In Akan culture, children born on Saturday are named Kwame (male) or Ama (female). Saturday is associated with the god of the sea, and children born on this day are believed to have a strong connection to water and are often seen as calm and peaceful individuals. The name Kwame has been carried by many great leaders in Ghanaian history.',
    tribe: 'Akan',
    significance: [
      'Connection to the sea and water',
      'Symbol of peace and calmness',
      'Historical significance in Ghana',
    ],
    traditions: [
      'Naming ceremony held on the 8th day',
      'Special prayers for the child',
      'Community celebration',
    ],
  },
  {
    name: 'Akosua',
    title: 'The Sunday Princess',
    story: 'Akosua is the name given to girls born on Sunday in Akan culture. Sunday is associated with the sun god, and children born on this day are believed to be bright, cheerful, and full of energy. The name has been popular throughout Ghanaian history and represents hope and new beginnings.',
    tribe: 'Akan',
    significance: [
      'Connection to the sun',
      'Symbol of brightness and energy',
      'Represents new beginnings',
    ],
    traditions: [
      'Traditional naming ceremony',
      'Blessings from elders',
      'Gift-giving from family',
    ],
  },
  {
    name: 'Kofi',
    title: 'The Friday Warrior',
    story: 'Kofi is the name for boys born on Friday in Akan culture. Friday is associated with Venus and is considered a day of love and beauty. Children named Kofi are believed to be artistic, creative, and have a strong sense of justice. The name has been popularized globally, especially through figures like Kofi Annan.',
    tribe: 'Akan',
    significance: [
      'Connection to Venus',
      'Symbol of creativity and art',
      'Global recognition',
    ],
    traditions: [
      'Naming ceremony with family',
      'Traditional prayers',
      'Community involvement',
    ],
  },
]

export function NameCulturalStories() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentStory = culturalStories[currentIndex]

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % culturalStories.length)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + culturalStories.length) % culturalStories.length)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-400" />
          Cultural Stories
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover the rich cultural heritage behind Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-white">{currentStory.name}</h3>
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                {currentStory.tribe}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={prevStory}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white/70 text-xs">
                {currentIndex + 1} / {culturalStories.length}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={nextStory}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">{currentStory.title}</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{currentStory.story}</p>
          </div>

          <div className="p-4 bg-white/5 rounded border border-white/10">
            <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Cultural Significance
            </h4>
            <ul className="space-y-2">
              {currentStory.significance.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white/5 rounded border border-white/10">
            <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-400" />
              Traditional Practices
            </h4>
            <ul className="space-y-2">
              {currentStory.traditions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          {culturalStories.map((story, index) => (
            <Button
              key={index}
              size="sm"
              variant={index === currentIndex ? 'default' : 'outline'}
              onClick={() => setCurrentIndex(index)}
              className={
                index === currentIndex
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              {story.name}
            </Button>
          ))}
        </div>

        <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> These stories represent traditional Akan naming customs. Practices may vary by region and family.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

