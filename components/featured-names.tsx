'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles, BookOpen, MapPin, Users } from 'lucide-react'

interface FeaturedName {
  name: string
  meaning?: string
  tribe?: string
  gender?: string
  count?: number
  weekNumber?: number
}

export function FeaturedNames() {
  const [featuredNames, setFeaturedNames] = useState<FeaturedName[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedNames()
  }, [])

  const fetchFeaturedNames = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/names/featured')
      if (response.ok) {
        const data = await response.json()
        setFeaturedNames(data.featuredNames || [])
      }
    } catch (error) {
      console.error('Error fetching featured names:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <Sparkles className="h-8 w-8 animate-spin text-yellow-400/50 mx-auto" />
        </CardContent>
      </Card>
    )
  }

  if (featuredNames.length === 0) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border-yellow-500/30 border-2">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          Weekly Featured Names
        </CardTitle>
        <CardDescription className="text-white/80">
          Special names selected for this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredNames.map((name, index) => (
            <Card key={index} className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <h4 className="text-xl font-bold text-yellow-400">{name.name}</h4>
                  </div>
                  {name.meaning && (
                    <p className="text-white/80 text-sm">"{name.meaning}"</p>
                  )}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {name.tribe && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                        <MapPin className="mr-1 h-3 w-3" />
                        {name.tribe}
                      </Badge>
                    )}
                    {name.gender && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                        <Users className="mr-1 h-3 w-3" />
                        {name.gender === 'male' ? 'Male' : 'Female'}
                      </Badge>
                    )}
                    {name.count && (
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs">
                        {name.count} claims
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

