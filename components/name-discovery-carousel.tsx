'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles, Heart, Share2 } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

export function NameDiscoveryCarousel() {
  const [names, setNames] = useState<GhanaianName[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    // Generate 5 random names for the carousel
    const generatedNames: GhanaianName[] = []
    for (let i = 0; i < 5; i++) {
      generatedNames.push(getRandomName('any', ''))
    }
    setNames(generatedNames)
  }, [])

  useEffect(() => {
    if (autoPlay && names.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % names.length)
      }, 5000) // Change every 5 seconds
      return () => clearInterval(interval)
    }
  }, [autoPlay, names.length])

  const nextName = () => {
    setCurrentIndex((prev) => (prev + 1) % names.length)
    setAutoPlay(false)
  }

  const prevName = () => {
    setCurrentIndex((prev) => (prev - 1 + names.length) % names.length)
    setAutoPlay(false)
  }

  const goToName = (index: number) => {
    setCurrentIndex(index)
    setAutoPlay(false)
  }

  if (names.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center">
          <Sparkles className="h-8 w-8 animate-pulse text-white/70 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  const currentName = names[currentIndex]

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          Name Discovery
        </CardTitle>
        <CardDescription className="text-white/70">
          Explore beautiful Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Name Display */}
        <div className="relative p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-white">{currentName.name}</h3>
            <p className="text-white/90 text-lg">"{currentName.meaning}"</p>
            <div className="flex justify-center gap-2">
              {currentName.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {currentName.tribe}
                </Badge>
              )}
              {currentName.gender && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                  {currentName.gender}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevName}
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {names.map((_, index) => (
              <button
                key={index}
                onClick={() => goToName(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-purple-400 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to name ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextName}
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Heart className="mr-2 h-4 w-4" />
            Favorite
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            {autoPlay ? '⏸ Pause' : '▶ Play'} Auto-discovery
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

