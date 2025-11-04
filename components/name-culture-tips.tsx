'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, ChevronRight, BookOpen } from 'lucide-react'

interface CultureTip {
  id: string
  title: string
  content: string
  category: 'naming' | 'tradition' | 'culture' | 'history'
  tribe?: string
}

const cultureTips: CultureTip[] = [
  {
    id: '1',
    title: 'Day Names in Ghana',
    content:
      'In Ghana, particularly among the Akan people, children are often named after the day of the week they were born. This tradition connects individuals to their day of birth and carries spiritual significance.',
    category: 'naming',
    tribe: 'Akan',
  },
  {
    id: '2',
    title: 'Naming Ceremonies',
    content:
      'Traditional Ghanaian naming ceremonies are important cultural events that typically occur 8 days after birth. Family and community members gather to celebrate and give the child their name.',
    category: 'tradition',
  },
  {
    id: '3',
    title: 'Name Meanings',
    content:
      'Ghanaian names often carry deep meanings related to circumstances of birth, family aspirations, or spiritual beliefs. Understanding these meanings helps preserve cultural heritage.',
    category: 'culture',
  },
  {
    id: '4',
    title: 'Tribe-Specific Names',
    content:
      'Different ethnic groups in Ghana have unique naming traditions. Names can reflect tribal heritage, language, and cultural practices specific to groups like Akan, Ga, Ewe, and others.',
    category: 'history',
  },
  {
    id: '5',
    title: 'Spiritual Significance',
    content:
      'Many Ghanaian names have spiritual or religious significance. Names may invoke protection, blessings, or honor deities and ancestors, reflecting the deep spiritual connection in Ghanaian culture.',
    category: 'culture',
  },
]

const categoryColors = {
  naming: 'bg-blue-600/40 text-blue-100 border-blue-400/50',
  tradition: 'bg-purple-600/40 text-purple-100 border-purple-400/50',
  culture: 'bg-green-600/40 text-green-100 border-green-400/50',
  history: 'bg-orange-600/40 text-orange-100 border-orange-400/50',
}

export function NameCultureTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % cultureTips.length)
  }

  const currentTip = cultureTips[currentTipIndex]

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          Culture Tips
        </CardTitle>
        <CardDescription className="text-white/70">
          Learn about Ghanaian naming traditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-5 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-start gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-yellow-400 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-lg">{currentTip.title}</h4>
                <Badge
                  variant="secondary"
                  className={`${categoryColors[currentTip.category]} text-xs font-semibold`}
                >
                  {currentTip.category}
                </Badge>
              </div>
              {currentTip.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold mb-2">
                  {currentTip.tribe} Tribe
                </Badge>
              )}
              <p className="text-white/90 leading-relaxed">{currentTip.content}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {cultureTips.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentTipIndex
                    ? 'bg-yellow-400 w-6'
                    : 'bg-white/30 w-1.5'
                }`}
              />
            ))}
          </div>
          <Button
            onClick={nextTip}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
          >
            Next Tip
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

