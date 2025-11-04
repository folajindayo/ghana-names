'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Share2, TrendingUp } from 'lucide-react'

interface NameShareCountProps {
  nameCardId?: string
  name: string
  lastName: string
}

export function NameShareCount({ nameCardId, name, lastName }: NameShareCountProps) {
  const [shareCount, setShareCount] = useState(0)
  const [trending, setTrending] = useState(false)

  useEffect(() => {
    fetchShareCount()
  }, [nameCardId, name, lastName])

  const fetchShareCount = async () => {
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll use localStorage to track shares
      if (typeof window === 'undefined') return

      const key = `name-share-count-${nameCardId || `${name}-${lastName}`}`
      const stored = localStorage.getItem(key)
      const count = stored ? parseInt(stored) : 0
      setShareCount(count)

      // Check if trending (shared 3+ times in last 24 hours)
      const recentShares = localStorage.getItem(`${key}-recent`)
      if (recentShares) {
        const shares = JSON.parse(recentShares)
        const last24Hours = shares.filter(
          (s: number) => Date.now() - s < 24 * 60 * 60 * 1000
        )
        setTrending(last24Hours.length >= 3)
      }
    } catch (error) {
      console.error('Error fetching share count:', error)
    }
  }

  const incrementShareCount = () => {
    if (typeof window === 'undefined') return

    const key = `name-share-count-${nameCardId || `${name}-${lastName}`}`
    const current = shareCount + 1
    setShareCount(current)
    localStorage.setItem(key, current.toString())

    // Track recent shares
    const recentKey = `${key}-recent`
    const recentShares = JSON.parse(localStorage.getItem(recentKey) || '[]')
    recentShares.push(Date.now())
    // Keep only last 100 shares
    const trimmed = recentShares.slice(-100)
    localStorage.setItem(recentKey, JSON.stringify(trimmed))

    // Check trending
    const last24Hours = trimmed.filter((s: number) => Date.now() - s < 24 * 60 * 60 * 1000)
    setTrending(last24Hours.length >= 3)
  }

  if (shareCount === 0 && !trending) return null

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant="secondary"
        className={`flex items-center gap-1 ${
          trending ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-blue-500/20 text-blue-300'
        }`}
      >
        {trending ? (
          <>
            <TrendingUp className="h-3 w-3" />
            Trending
          </>
        ) : (
          <>
            <Share2 className="h-3 w-3" />
            {shareCount} {shareCount === 1 ? 'share' : 'shares'}
          </>
        )}
      </Badge>
    </div>
  )
}

// Export function to increment share count
export function incrementNameShareCount(nameCardId?: string, name?: string, lastName?: string) {
  if (typeof window === 'undefined') return

  const key = `name-share-count-${nameCardId || `${name}-${lastName}`}`
  const current = parseInt(localStorage.getItem(key) || '0')
  localStorage.setItem(key, (current + 1).toString())

  // Track recent shares
  const recentKey = `${key}-recent`
  const recentShares = JSON.parse(localStorage.getItem(recentKey) || '[]')
  recentShares.push(Date.now())
  const trimmed = recentShares.slice(-100)
  localStorage.setItem(recentKey, JSON.stringify(trimmed))
}

