'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Heart, GitCompare, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FavoriteName {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

export function NameFavoriteComparison() {
  const [favorites, setFavorites] = useState<FavoriteName[]>([])
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [comparison, setComparison] = useState<{
    name1: FavoriteName
    name2: FavoriteName
    similarities: string[]
    differences: string[]
  } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const stored = localStorage.getItem('name-favorites')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setFavorites(parsed)
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
  }, [])

  const compareNames = () => {
    if (!name1 || !name2) {
      toast({
        title: "Names required",
        description: "Please select both names to compare",
        variant: "destructive",
      })
      return
    }

    const fav1 = favorites.find((f) => f.id === name1)
    const fav2 = favorites.find((f) => f.id === name2)

    if (!fav1 || !fav2) {
      toast({
        title: "Names not found",
        description: "Please select valid favorite names",
        variant: "destructive",
      })
      return
    }

    const similarities: string[] = []
    const differences: string[] = []

    if (fav1.tribe === fav2.tribe) {
      similarities.push(`Both from ${fav1.tribe} tribe`)
    } else {
      differences.push(`Different tribes: ${fav1.tribe || 'Unknown'} vs ${fav2.tribe || 'Unknown'}`)
    }

    if (fav1.gender === fav2.gender) {
      similarities.push(`Both ${fav1.gender} names`)
    } else {
      differences.push(`Different genders: ${fav1.gender || 'Unknown'} vs ${fav2.gender || 'Unknown'}`)
    }

    if (fav1.name.length === fav2.name.length) {
      similarities.push(`Same length (${fav1.name.length} characters)`)
    } else {
      differences.push(`Different lengths: ${fav1.name.length} vs ${fav2.name.length} characters`)
    }

    if (fav1.meaning.toLowerCase().includes('born') && fav2.meaning.toLowerCase().includes('born')) {
      similarities.push('Both are day names')
    }

    setComparison({
      name1: fav1,
      name2: fav2,
      similarities,
      differences,
    })

    toast({
      title: "Comparison complete!",
      description: "Names compared successfully",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-cyan-400" />
          Favorite Comparison
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare two names from your favorites
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {favorites.length < 2 ? (
          <div className="p-8 text-center text-white/60">
            <Heart className="h-12 w-12 mx-auto text-white/30 mb-2" />
            <p>You need at least 2 favorites to compare</p>
            <p className="text-sm mt-1">Add names to your favorites first</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">First Name</Label>
                <Select value={name1} onValueChange={setName1}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                    <SelectValue placeholder="Select name" />
                  </SelectTrigger>
                  <SelectContent>
                    {favorites.map((fav) => (
                      <SelectItem key={fav.id} value={fav.id}>
                        {fav.name} {fav.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80 text-xs">Second Name</Label>
                <Select value={name2} onValueChange={setName2}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                    <SelectValue placeholder="Select name" />
                  </SelectTrigger>
                  <SelectContent>
                    {favorites.map((fav) => (
                      <SelectItem key={fav.id} value={fav.id}>
                        {fav.name} {fav.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={compareNames}
              disabled={!name1 || !name2 || name1 === name2}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
            >
              <GitCompare className="mr-2 h-4 w-4" />
              Compare Names
            </Button>

            {comparison && (
              <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      {comparison.name1.name} {comparison.name1.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{comparison.name1.meaning}"</p>
                    <div className="flex gap-2">
                      {comparison.name1.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {comparison.name1.tribe}
                        </Badge>
                      )}
                      {comparison.name1.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {comparison.name1.gender}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      {comparison.name2.name} {comparison.name2.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{comparison.name2.meaning}"</p>
                    <div className="flex gap-2">
                      {comparison.name2.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {comparison.name2.tribe}
                        </Badge>
                      )}
                      {comparison.name2.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {comparison.name2.gender}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {comparison.similarities.length > 0 && (
                  <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                    <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-green-400" />
                      Similarities
                    </h4>
                    <ul className="space-y-1">
                      {comparison.similarities.map((sim, index) => (
                        <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                          <span className="text-green-400">•</span>
                          {sim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {comparison.differences.length > 0 && (
                  <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                    <h4 className="text-white font-semibold mb-2 text-sm">Differences</h4>
                    <ul className="space-y-1">
                      {comparison.differences.map((diff, index) => (
                        <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                          <span className="text-yellow-400">•</span>
                          {diff}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {name1 && name2 && !comparison && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                <p className="text-white/60 text-sm">Click compare to see the analysis</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

