'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Plus, Trash2, Star, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Favorite {
  id: string
  name: string
  meaning: string
  tribe: string
  gender?: string
  notes?: string
  dateAdded: Date
  isStarred: boolean
}

export function NameFavoriteManager() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [newFavorite, setNewFavorite] = useState({
    name: '',
    meaning: '',
    tribe: '',
    gender: '',
    notes: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem('nameFavorites')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFavorites(parsed.map((f: any) => ({ ...f, dateAdded: new Date(f.dateAdded) })))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const addFavorite = () => {
    if (!newFavorite.name.trim() || !newFavorite.meaning.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter at least name and meaning",
        variant: "destructive",
      })
      return
    }

    const favorite: Favorite = {
      id: Date.now().toString(),
      name: newFavorite.name,
      meaning: newFavorite.meaning,
      tribe: newFavorite.tribe || 'Unknown',
      gender: newFavorite.gender || undefined,
      notes: newFavorite.notes || undefined,
      dateAdded: new Date(),
      isStarred: false,
    }

    const updated = [favorite, ...favorites]
    setFavorites(updated)
    localStorage.setItem('nameFavorites', JSON.stringify(updated))
    setNewFavorite({ name: '', meaning: '', tribe: '', gender: '', notes: '' })
    toast({
      title: "Added to favorites!",
      description: `${favorite.name} has been saved`,
    })
  }

  const toggleStar = (id: string) => {
    const updated = favorites.map((f) => (f.id === id ? { ...f, isStarred: !f.isStarred } : f))
    setFavorites(updated)
    localStorage.setItem('nameFavorites', JSON.stringify(updated))
  }

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id)
    setFavorites(updated)
    localStorage.setItem('nameFavorites', JSON.stringify(updated))
    toast({
      title: "Removed",
      description: "Favorite has been removed",
    })
  }

  const filteredFavorites = favorites.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.tribe.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const starredFavorites = filteredFavorites.filter((f) => f.isStarred)
  const regularFavorites = filteredFavorites.filter((f) => !f.isStarred)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          Favorite Manager
        </CardTitle>
        <CardDescription className="text-white/70">
          Add, organize, and manage your favorite names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
          <h4 className="text-white font-semibold text-sm">Add New Favorite</h4>
          <div className="space-y-2">
            <Input
              placeholder="Name"
              value={newFavorite.name}
              onChange={(e) => setNewFavorite({ ...newFavorite, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Input
              placeholder="Meaning"
              value={newFavorite.meaning}
              onChange={(e) => setNewFavorite({ ...newFavorite, meaning: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Tribe"
                value={newFavorite.tribe}
                onChange={(e) => setNewFavorite({ ...newFavorite, tribe: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                placeholder="Gender (optional)"
                value={newFavorite.gender}
                onChange={(e) => setNewFavorite({ ...newFavorite, gender: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Input
              placeholder="Notes (optional)"
              value={newFavorite.notes}
              onChange={(e) => setNewFavorite({ ...newFavorite, notes: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={addFavorite}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Favorite
            </Button>
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
              />
            </div>
          </div>
        )}

        {starredFavorites.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              Starred ({starredFavorites.length})
            </h4>
            {starredFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{favorite.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {favorite.tribe}
                      </Badge>
                      {favorite.gender && (
                        <Badge
                          variant="secondary"
                          className={
                            favorite.gender === 'Male'
                              ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                              : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                          }
                        >
                          {favorite.gender}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">"{favorite.meaning}"</p>
                    {favorite.notes && (
                      <p className="text-white/60 text-xs mt-1">Note: {favorite.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStar(favorite.id)}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      <Star className={`h-4 w-4 ${favorite.isStarred ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-white/60 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {regularFavorites.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-sm">All Favorites ({regularFavorites.length})</h4>
            {regularFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{favorite.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {favorite.tribe}
                      </Badge>
                      {favorite.gender && (
                        <Badge
                          variant="secondary"
                          className={
                            favorite.gender === 'Male'
                              ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                              : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                          }
                        >
                          {favorite.gender}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/70 text-sm">"{favorite.meaning}"</p>
                    {favorite.notes && (
                      <p className="text-white/60 text-xs mt-1">Note: {favorite.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStar(favorite.id)}
                      className="text-white/60 hover:text-yellow-400"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-white/60 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {favorites.length === 0 && (
          <div className="p-8 bg-white/5 rounded-lg border border-white/10 text-center">
            <Heart className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-sm mb-2">No favorites yet</p>
            <p className="text-white/50 text-xs">Add your first favorite name above!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

