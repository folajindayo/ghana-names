'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, HeartOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAccount } from 'wagmi'

interface FavoritesButtonProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  explanation?: string
  isAIGenerated?: boolean
}

export function FavoritesButton({
  name,
  lastName,
  meaning,
  tribe,
  gender,
  explanation,
  isAIGenerated = false,
}: FavoritesButtonProps) {
  const { address, isConnected } = useAccount()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (isConnected && address) {
      checkFavorite()
    }
  }, [isConnected, address, name, lastName])

  const checkFavorite = async () => {
    if (!address) return

    try {
      const response = await fetch(
        `/api/favorites?walletAddress=${address}`
      )
      if (response.ok) {
        const data = await response.json()
        const exists = data.favorites?.some(
          (fav: any) => fav.name === name && fav.lastName === lastName
        )
        setIsFavorite(exists)
      }
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleToggleFavorite = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to save favorites.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(
          `/api/favorites?walletAddress=${address}&name=${encodeURIComponent(name)}&lastName=${encodeURIComponent(lastName)}`,
          { method: 'DELETE' }
        )

        if (response.ok) {
          setIsFavorite(false)
          toast({
            title: "Removed from favorites",
            description: "Name removed from your favorites list.",
          })
        } else {
          throw new Error('Failed to remove favorite')
        }
      } else {
        // Add to favorites
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletAddress: address,
            name,
            lastName,
            meaning,
            tribe,
            gender,
            explanation,
            isAIGenerated,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success !== false) {
            setIsFavorite(true)
            toast({
              title: "Added to favorites",
              description: "Name saved to your favorites list.",
            })
          } else {
            toast({
              title: "Database unavailable",
              description: data.note || "Could not save to database.",
              variant: "destructive",
            })
          }
        } else if (response.status === 409) {
          setIsFavorite(true)
          toast({
            title: "Already in favorites",
            description: "This name is already in your favorites.",
          })
        } else {
          throw new Error('Failed to add favorite')
        }
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error)
      toast({
        title: "Operation failed",
        description: error.message || "Could not update favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return null
  }

  return (
    <Button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className={`${
        isFavorite
          ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
          : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
      } backdrop-blur-sm`}
    >
      {isFavorite ? (
        <>
          <Heart className="mr-2 h-4 w-4 fill-current" />
          Favorited
        </>
      ) : (
        <>
          <HeartOff className="mr-2 h-4 w-4" />
          Add to Favorites
        </>
      )}
    </Button>
  )
}

