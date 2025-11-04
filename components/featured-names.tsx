'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Sparkles, BookOpen, MapPin, Users } from 'lucide-react'

interface FeaturedName {
  name: string
  meaning?: string
  description?: string
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
            <Card key={index} className="bg-white/20 backdrop-blur-sm border-white/30 shadow-lg">
              <CardContent className="p-5">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                    <h4 className="text-2xl font-bold text-yellow-400">{name.name}</h4>
                  </div>
                  {name.meaning && (
                    <div className="space-y-2">
                      <p className="text-white text-base font-medium leading-relaxed">"{name.meaning}"</p>
                      {name.description && (
                        <p className="text-white/95 text-sm leading-relaxed text-left bg-white/10 p-3 rounded-lg border border-white/20">
                          {name.description}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 justify-center pt-2">
                    {name.tribe && (
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold px-2 py-1">
                        <MapPin className="mr-1 h-3 w-3" />
                        {name.tribe}
                      </Badge>
                    )}
                    {name.gender && (
                      <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs font-semibold px-2 py-1">
                        <Users className="mr-1 h-3 w-3" />
                        {name.gender === 'male' ? 'Male' : 'Female'}
                      </Badge>
                    )}
                    {name.count !== undefined && (
                      <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 text-xs font-semibold px-2 py-1">
                        {name.count} {name.count === 1 ? 'claim' : 'claims'}
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

