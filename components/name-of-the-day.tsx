'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Calendar, Share2, Heart } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

export function NameOfTheDay() {
  const [nameOfTheDay, setNameOfTheDay] = useState<GhanaianName | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Generate a name based on the day of the week
    const dayOfWeek = new Date().getDay()
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = days[dayOfWeek]

    // Use day of week as a seed for consistent daily name
    const seed = dayOfWeek + new Date().getDate()
    const name = getRandomName('any', '')
    setNameOfTheDay({ ...name, name: `${name.name} (${dayName})` })
  }, [])

  const handleShare = () => {
    if (nameOfTheDay) {
      const text = `Today's Ghanaian Name of the Day: ${nameOfTheDay.name}\nMeaning: ${nameOfTheDay.meaning}\nTribe: ${nameOfTheDay.tribe || 'Various'}`
      if (navigator.share) {
        navigator.share({ text })
      } else {
        navigator.clipboard.writeText(text)
        toast({
          title: "Copied!",
          description: "Name of the day copied to clipboard",
        })
      }
    }
  }

  if (!nameOfTheDay) {
    return (
      <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-500/30">
        <CardContent className="py-8 text-center">
          <Sparkles className="h-8 w-8 animate-pulse text-yellow-400 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-white">Name of the Day</CardTitle>
          </div>
          <Badge className="bg-yellow-500/30 text-yellow-200 border-yellow-400/50">
            Special
          </Badge>
        </div>
        <CardDescription className="text-white/80">
          Discover today's featured Ghanaian name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-yellow-400 mb-2">{nameOfTheDay.name}</h3>
          <p className="text-white/90 text-lg mb-3">"{nameOfTheDay.meaning}"</p>
          {nameOfTheDay.tribe && (
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 mb-4">
              {nameOfTheDay.tribe} Tribe
            </Badge>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Button
            onClick={handleShare}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
          >
            <Heart className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

