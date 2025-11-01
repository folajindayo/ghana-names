'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WalletConnect } from '@/components/wallet-connect'
import { Heart, BookOpen, MapPin, Users, Sparkles, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Favorite {
  _id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  explanation?: string
  isAIGenerated: boolean
  createdAt: string
}

export default function FavoritesPage() {
  const { address, isConnected } = useAccount()
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (isConnected && address) {
      fetchFavorites()
    } else {
      setIsLoading(false)
    }
  }, [isConnected, address])

  const fetchFavorites = async () => {
    if (!address) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/favorites?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        setFavorites(data.favorites || [])
      } else {
        throw new Error('Failed to fetch favorites')
      }
    } catch (error) {
      console.error('Error fetching favorites:', error)
      toast({
        title: "Error",
        description: "Failed to load favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFavorite = async (name: string, lastName: string) => {
    if (!address) return

    try {
      const response = await fetch(
        `/api/favorites?walletAddress=${address}&name=${encodeURIComponent(name)}&lastName=${encodeURIComponent(lastName)}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setFavorites(favorites.filter(fav => !(fav.name === name && fav.lastName === lastName)))
        toast({
          title: "Removed",
          description: "Name removed from favorites.",
        })
      } else {
        throw new Error('Failed to remove favorite')
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast({
        title: "Error",
        description: "Failed to remove favorite. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-center">Your Favorites</CardTitle>
            <CardDescription className="text-white/70 text-center">
              Connect your wallet to view and manage your favorite Ghanaian names
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WalletConnect />
            <Link href="/">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                Back to Generator
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 fill-red-500 text-red-500" />
            My Favorites
          </h1>
          <p className="text-white/70">Your saved Ghanaian names</p>
        </div>

        {isLoading ? (
          <div className="text-center text-white/70 py-12">
            <Sparkles className="h-8 w-8 animate-spin mx-auto mb-4" />
            Loading favorites...
          </div>
        ) : favorites.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <Heart className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-4">No favorites yet</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  Generate Names
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {favorites.map((favorite) => (
              <Card
                key={favorite._id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-2xl">
                        {favorite.name} {favorite.lastName}
                      </CardTitle>
                      <CardDescription className="text-white/70 mt-1">
                        {favorite.isAIGenerated ? 'AI-Generated' : 'Traditional'}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(favorite.name, favorite.lastName)}
                      className="text-white/70 hover:text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                      <BookOpen className="mr-1 h-3 w-3" />
                      {favorite.meaning}
                    </Badge>
                    {favorite.tribe && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <MapPin className="mr-1 h-3 w-3" />
                        {favorite.tribe} Tribe
                      </Badge>
                    )}
                    {favorite.gender && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Users className="mr-1 h-3 w-3" />
                        {favorite.gender === 'male' ? 'Male' : favorite.gender === 'female' ? 'Female' : 'Any'}
                      </Badge>
                    )}
                  </div>
                  {favorite.explanation && (
                    <p className="text-white/80 text-sm leading-relaxed">
                      {favorite.explanation}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Back to Generator
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

