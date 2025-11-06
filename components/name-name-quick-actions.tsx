'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Download, Bookmark, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface QuickActionsProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

export function NameQuickActions({ name, lastName, meaning, tribe, gender }: QuickActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const fullName = `${name} ${lastName}`

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${fullName}`,
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed bookmark" : "Bookmarked",
      description: `${fullName}`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: fullName,
        text: `${fullName} - "${meaning}"`,
      }).catch(() => {
        copyToClipboard()
      })
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    const text = `${fullName}\n"${meaning}"${tribe ? `\nTribe: ${tribe}` : ''}${gender ? `\nGender: ${gender}` : ''}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "Name details copied to clipboard",
      })
    })
  }

  const handleDownload = () => {
    const data = {
      name,
      lastName,
      meaning,
      tribe,
      gender,
      exportedAt: new Date().toISOString(),
    }
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}-${lastName}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded!",
      description: "Name data saved as JSON",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
        <CardDescription className="text-white/70 text-sm">
          {fullName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-white/5 rounded border border-white/10">
          <p className="text-white/90 text-sm mb-2">"{meaning}"</p>
          <div className="flex gap-2">
            {tribe && (
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                {tribe}
              </Badge>
            )}
            {gender && (
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                {gender}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleFavorite}
            variant={isFavorited ? 'default' : 'outline'}
            className={
              isFavorited
                ? 'bg-pink-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
            Favorite
          </Button>
          <Button
            onClick={handleBookmark}
            variant={isBookmarked ? 'default' : 'outline'}
            className={
              isBookmarked
                ? 'bg-yellow-600 text-white'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }
          >
            <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            Bookmark
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>

        <Button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
        >
          <Download className="mr-2 h-4 w-4" />
          Download as JSON
        </Button>
      </CardContent>
    </Card>
  )
}

