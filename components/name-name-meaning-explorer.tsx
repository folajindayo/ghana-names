'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface MeaningDetails {
  name: string
  primaryMeaning: string
  alternativeMeanings: string[]
  culturalContext: string
  historicalSignificance: string
  relatedNames: string[]
  usage: string[]
}

const meaningDatabase: Record<string, MeaningDetails> = {
  kwame: {
    name: 'Kwame',
    primaryMeaning: 'Born on Saturday',
    alternativeMeanings: ['God', 'Divine', 'Sacred'],
    culturalContext: 'Kwame is a traditional Akan day name given to boys born on Saturday. It represents divine connection and spiritual significance.',
    historicalSignificance: 'Saturday-born children in Akan culture are considered blessed and are often given leadership roles in traditional ceremonies.',
    relatedNames: ['Kwasi', 'Kofi', 'Kwabena', 'Kwaku', 'Yaw'],
    usage: ['Formal occasions', 'Traditional ceremonies', 'Religious contexts'],
  },
  akosua: {
    name: 'Akosua',
    primaryMeaning: 'Born on Sunday',
    alternativeMeanings: ['Light', 'Joy', 'Sun'],
    culturalContext: 'Akosua is a traditional Akan day name for girls born on Sunday. It represents light, joy, and positivity.',
    historicalSignificance: 'Sunday-born children are believed to bring light and happiness to their families and communities.',
    relatedNames: ['Ama', 'Abena', 'Akua', 'Adwoa', 'Efua'],
    usage: ['Celebrations', 'Joyful occasions', 'Family gatherings'],
  },
  kofi: {
    name: 'Kofi',
    primaryMeaning: 'Born on Friday',
    alternativeMeanings: ['Wanderer', 'Traveler', 'Adventurer'],
    culturalContext: 'Kofi is a traditional Akan day name for boys born on Friday. It represents freedom and adventure.',
    historicalSignificance: 'Friday-born children are associated with travel and exploration, often becoming traders or explorers.',
    relatedNames: ['Kwame', 'Kwasi', 'Kwabena', 'Kwaku', 'Yaw'],
    usage: ['Adventure contexts', 'Travel-related', 'Free-spirited occasions'],
  },
}

export function NameMeaningExplorer() {
  const [name, setName] = useState('')
  const [meaning, setMeaning] = useState<MeaningDetails | null>(null)
  const { toast } = useToast()

  const exploreMeaning = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const found = meaningDatabase[normalized]

    if (found) {
      setMeaning(found)
      toast({
        title: "Meaning found!",
        description: `${found.name} - ${found.primaryMeaning}`,
      })
    } else {
      // Generate basic meaning for unknown names
      setMeaning({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        primaryMeaning: 'Traditional Ghanaian name',
        alternativeMeanings: ['Cultural significance', 'Heritage'],
        culturalContext: 'This name has cultural significance in Ghanaian traditions.',
        historicalSignificance: 'Names in Ghanaian culture often reflect day of birth, circumstances, or family heritage.',
        relatedNames: [],
        usage: ['General use', 'Traditional contexts'],
      })
      toast({
        title: "Basic meaning provided",
        description: "Detailed meaning not found, showing general information",
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-400" />
          Meaning Explorer
        </CardTitle>
        <CardDescription className="text-white/70">
          Explore deep meanings and cultural context of names
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
              onKeyPress={(e) => e.key === 'Enter' && exploreMeaning()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={exploreMeaning}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {meaning && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{meaning.name}</h3>
              <p className="text-white/90 text-lg mb-3">"{meaning.primaryMeaning}"</p>
            </div>

            {meaning.alternativeMeanings.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Alternative Meanings</h4>
                <div className="flex flex-wrap gap-2">
                  {meaning.alternativeMeanings.map((alt, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs"
                    >
                      {alt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Cultural Context</h4>
              <p className="text-white/80 text-xs">{meaning.culturalContext}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Historical Significance</h4>
              <p className="text-white/80 text-xs">{meaning.historicalSignificance}</p>
            </div>

            {meaning.relatedNames.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Related Names</h4>
                <div className="flex flex-wrap gap-2">
                  {meaning.relatedNames.map((related, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-xs"
                    >
                      {related}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Common Usage</h4>
              <div className="flex flex-wrap gap-2">
                {meaning.usage.map((use, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs"
                  >
                    {use}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !meaning && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to explore its meaning</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

