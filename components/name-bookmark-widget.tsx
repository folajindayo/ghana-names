'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bookmark, BookmarkCheck, X, Eye } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface BookmarkedName {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  timestamp: number
}

export function NameBookmarkWidget() {
  const { address } = useAccount()
  const { toast } = useToast()
  const [bookmarks, setBookmarks] = useState<BookmarkedName[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    loadBookmarks()
  }, [address])

  const loadBookmarks = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem(`name-bookmarks-${address || 'anonymous'}`)
    if (stored) {
      setBookmarks(JSON.parse(stored))
    }
  }

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter((b) => b.id !== id)
    setBookmarks(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `name-bookmarks-${address || 'anonymous'}`,
        JSON.stringify(updated)
      )
    }
    toast({
      title: "Removed",
      description: "Bookmark removed successfully",
    })
  }

  const displayedBookmarks = showAll ? bookmarks : bookmarks.slice(0, 3)

  if (bookmarks.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-yellow-400" />
            My Bookmarks
          </CardTitle>
          <CardDescription className="text-white/70">
            Save names for later reference
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <p className="text-white/60 mb-4">No bookmarks yet</p>
          <p className="text-white/50 text-sm">Bookmark names while browsing to see them here</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <BookmarkCheck className="h-5 w-5 text-yellow-400" />
              My Bookmarks
            </CardTitle>
            <CardDescription className="text-white/70">
              {bookmarks.length} saved name{bookmarks.length > 1 ? 's' : ''}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
            {bookmarks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayedBookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-1">
                  {bookmark.name} {bookmark.lastName}
                </h4>
                <p className="text-white/70 text-sm mb-2">"{bookmark.meaning}"</p>
                <div className="flex flex-wrap gap-2">
                  {bookmark.tribe && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      {bookmark.tribe}
                    </Badge>
                  )}
                  <span className="text-white/50 text-xs">
                    {new Date(bookmark.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => removeBookmark(bookmark.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {bookmarks.length > 3 && (
          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => setShowAll(!showAll)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {showAll ? 'Show Less' : `View All ${bookmarks.length} Bookmarks`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Export function to add bookmark
export function addNameBookmark(name: string, lastName: string, meaning: string, tribe?: string, address?: string) {
  if (typeof window === 'undefined') return

  const bookmark: BookmarkedName = {
    id: `${Date.now()}-${Math.random()}`,
    name,
    lastName,
    meaning,
    tribe,
    timestamp: Date.now(),
  }

  const key = `name-bookmarks-${address || 'anonymous'}`
  const existing = JSON.parse(localStorage.getItem(key) || '[]')
  const updated = [bookmark, ...existing].slice(0, 50) // Keep only last 50
  localStorage.setItem(key, JSON.stringify(updated))
}

