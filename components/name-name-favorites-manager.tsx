'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Plus, Trash2, Search, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FavoriteName {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  addedAt: string
  category?: string
}

export function NameFavoritesManager() {
  const [favorites, setFavorites] = useState<FavoriteName[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Load favorites from localStorage
    const stored = localStorage.getItem('name-favorites')
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
  }, [])

  const saveFavorites = (updated: FavoriteName[]) => {
    setFavorites(updated)
    localStorage.setItem('name-favorites', JSON.stringify(updated))
  }

  const addFavorite = () => {
    const newFavorite: FavoriteName = {
      id: Date.now().toString(),
      name: 'Kwame',
      lastName: 'Asante',
      meaning: 'Born on Saturday',
      tribe: 'Akan',
      gender: 'Male',
      addedAt: new Date().toISOString(),
      category: newCategory || 'General',
    }
    const updated = [...favorites, newFavorite]
    saveFavorites(updated)
    setNewCategory('')
    toast({
      title: "Added to favorites!",
      description: `${newFavorite.name} ${newFavorite.lastName} added`,
    })
  }

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id)
    saveFavorites(updated)
    toast({
      title: "Removed from favorites",
      description: "Name removed from your favorites",
    })
  }

  const filteredFavorites = favorites.filter((favorite) => {
    const query = searchQuery.toLowerCase()
    return (
      favorite.name.toLowerCase().includes(query) ||
      favorite.lastName.toLowerCase().includes(query) ||
      favorite.meaning.toLowerCase().includes(query) ||
      favorite.tribe?.toLowerCase().includes(query)
    )
  })

  const categories = Array.from(new Set(favorites.map((f) => f.category || 'General')))

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-400" />
          Favorites Manager
        </CardTitle>
        <CardDescription className="text-white/70">
          Manage your favorite names ({favorites.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Search Favorites</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search by name, meaning, or tribe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
              >
                {category} ({favorites.filter((f) => (f.category || 'General') === category).length})
              </Badge>
            ))}
          </div>
        )}

        {filteredFavorites.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {favorite.name} {favorite.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{favorite.meaning}"</p>
                    <div className="flex gap-2">
                      {favorite.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {favorite.tribe}
                        </Badge>
                      )}
                      {favorite.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {favorite.gender}
                        </Badge>
                      )}
                      {favorite.category && (
                        <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-xs">
                          {favorite.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFavorite(favorite.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-white/60">
            {searchQuery ? (
              <p>No favorites match your search</p>
            ) : (
              <div className="space-y-2">
                <Heart className="h-12 w-12 mx-auto text-white/30" />
                <p>No favorites yet</p>
                <p className="text-sm">Start adding names to your favorites!</p>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <div className="space-y-2">
            <Label className="text-white/80">Quick Add (Demo)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Category (optional)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                onClick={addFavorite}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

