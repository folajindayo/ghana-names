'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Bookmark, Download } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface NameFavoriteActionsProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  nameCardId?: string
}

export function NameFavoriteActions({
  name,
  lastName,
  meaning,
  tribe,
  nameCardId,
}: NameFavoriteActionsProps) {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFavorite = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet required",
        description: "Please connect your wallet to favorite names",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          name,
          lastName,
          meaning,
          tribe,
          nameCardId,
        }),
      })

      if (response.ok) {
        setIsFavorited(!isFavorited)
        toast({
          title: isFavorited ? "Removed from favorites" : "Added to favorites",
          description: `${name} ${lastName}`,
        })
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast({
        title: "Error",
        description: "Failed to update favorite",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = () => {
    const text = `${name} ${lastName}\nMeaning: ${meaning}${tribe ? `\nTribe: ${tribe}` : ''}`
    if (navigator.share) {
      navigator.share({ text })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: "Name details copied to clipboard",
      })
    }
  }

  const handleBookmark = () => {
    if (typeof window === 'undefined') return
    const bookmarks = JSON.parse(localStorage.getItem('name-bookmarks') || '[]')
    const newBookmark = {
      id: Date.now().toString(),
      name,
      lastName,
      meaning,
      tribe,
      timestamp: Date.now(),
    }
    localStorage.setItem('name-bookmarks', JSON.stringify([...bookmarks, newBookmark].slice(0, 50)))
    toast({
      title: "Bookmarked!",
      description: "Name saved to bookmarks",
    })
  }

  const handleDownload = () => {
    const data = {
      name: `${name} ${lastName}`,
      meaning,
      tribe,
      date: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}-${lastName}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded!",
      description: "Name data saved",
    })
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={handleFavorite}
        disabled={isLoading}
        variant="outline"
        size="sm"
        className={`${
          isFavorited
            ? 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
            : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
        } font-semibold`}
      >
        <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
        {isFavorited ? 'Favorited' : 'Favorite'}
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        size="sm"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button
        onClick={handleBookmark}
        variant="outline"
        size="sm"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
      >
        <Bookmark className="mr-2 h-4 w-4" />
        Bookmark
      </Button>
      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold"
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  )
}

