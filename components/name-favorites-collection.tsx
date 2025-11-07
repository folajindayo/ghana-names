'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Heart, Search, Trash2, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface FavoriteName {
  id: string
  name: string
  meaning: string
  tribe: string
  gender?: string
  dateAdded: Date
}

export function NameFavoritesCollection() {
  const [favorites, setFavorites] = useState<FavoriteName[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Load favorites from localStorage
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

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id)
    setFavorites(updated)
    localStorage.setItem('nameFavorites', JSON.stringify(updated))
    toast({
      title: "Removed from favorites",
      description: "Name removed from your collection",
    })
  }

  const filteredFavorites = favorites.filter(
    (favorite) =>
      favorite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      favorite.tribe.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          Favorites Collection
        </CardTitle>
        <CardDescription className="text-white/70">
          View and manage your favorite Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <div className="text-sm text-white/70">
              {filteredFavorites.length} of {favorites.length} favorite(s)
            </div>
          </div>
        )}

        {filteredFavorites.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{favorite.name}</h3>
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
                    <p className="text-white/80 text-sm mb-2">
                      <strong className="text-white">Meaning:</strong> "{favorite.meaning}"
                    </p>
                    <p className="text-white/60 text-xs">
                      Added on {formatDate(favorite.dateAdded)}
                    </p>
                  </div>
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
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="p-8 bg-white/5 rounded-lg border border-white/10 text-center">
            <Heart className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-sm mb-2">No favorites yet</p>
            <p className="text-white/50 text-xs">
              Start favoriting names to build your collection!
            </p>
          </div>
        ) : (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No favorites match your search</p>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-red-400" />
              <span className="text-white font-semibold text-sm">Collection Stats</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-white/60">Total: </span>
                <span className="text-white font-semibold">{favorites.length}</span>
              </div>
              <div>
                <span className="text-white/60">Tribes: </span>
                <span className="text-white font-semibold">
                  {new Set(favorites.map((f) => f.tribe)).size}
                </span>
              </div>
              <div>
                <span className="text-white/60">This month: </span>
                <span className="text-white font-semibold">
                  {favorites.filter(
                    (f) =>
                      f.dateAdded.getMonth() === new Date().getMonth() &&
                      f.dateAdded.getFullYear() === new Date().getFullYear()
                  ).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

