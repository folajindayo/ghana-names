'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Copy, Share2, Heart, Download, BookOpen, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface QuickActionData {
  name: string
  meaning: string
  tribe: string
}

export function NameQuickActions() {
  const [data, setData] = useState<QuickActionData>({
    name: '',
    meaning: '',
    tribe: '',
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const copyName = () => {
    if (!data.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }
    navigator.clipboard.writeText(data.name)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Name copied to clipboard",
    })
  }

  const copyAll = () => {
    if (!data.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }
    const text = `Name: ${data.name}\nMeaning: ${data.meaning || 'N/A'}\nTribe: ${data.tribe || 'N/A'}`
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "All information copied to clipboard",
    })
  }

  const shareName = () => {
    if (!data.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }
    const text = `Check out this Ghanaian name: ${data.name}${data.meaning ? ` - ${data.meaning}` : ''}`
    if (navigator.share) {
      navigator.share({
        title: `Ghanaian Name: ${data.name}`,
        text: text,
      }).catch(() => {
        copyAll()
      })
    } else {
      copyAll()
      toast({
        title: "Copied to clipboard",
        description: "Share dialog not available, copied instead",
      })
    }
  }

  const addToFavorites = () => {
    if (!data.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }
    const favorites = JSON.parse(localStorage.getItem('nameFavorites') || '[]')
    const newFavorite = {
      id: Date.now().toString(),
      name: data.name,
      meaning: data.meaning || '',
      tribe: data.tribe || 'Unknown',
      dateAdded: new Date().toISOString(),
      isStarred: false,
    }
    favorites.push(newFavorite)
    localStorage.setItem('nameFavorites', JSON.stringify(favorites))
    toast({
      title: "Added to favorites!",
      description: `${data.name} has been saved`,
    })
  }

  const downloadAsText = () => {
    if (!data.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }
    const text = `Name: ${data.name}\nMeaning: ${data.meaning || 'N/A'}\nTribe: ${data.tribe || 'N/A'}\n\nGenerated from Ghana Names Generator`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.name}-info.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Downloaded!",
      description: "Name information saved as text file",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Quick Actions
        </CardTitle>
        <CardDescription className="text-white/70">
          Fast actions for name management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Name</Label>
            <Input
              placeholder="Enter name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/80">Meaning</Label>
              <Input
                placeholder="Enter meaning"
                value={data.meaning}
                onChange={(e) => setData({ ...data, meaning: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Tribe</Label>
              <Input
                placeholder="Enter tribe"
                value={data.tribe}
                onChange={(e) => setData({ ...data, tribe: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </div>

        {data.name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white font-semibold mb-2 text-sm">Preview</h4>
            <div className="space-y-1 text-sm">
              <p className="text-white/90">
                <strong className="text-white">Name:</strong> {data.name}
              </p>
              {data.meaning && (
                <p className="text-white/90">
                  <strong className="text-white">Meaning:</strong> {data.meaning}
                </p>
              )}
              {data.tribe && (
                <p className="text-white/90">
                  <strong className="text-white">Tribe:</strong> {data.tribe}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={copyName}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={!data.name}
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Name'}
          </Button>
          <Button
            onClick={copyAll}
            className="bg-purple-500 hover:bg-purple-600 text-white"
            disabled={!data.name}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>
          <Button
            onClick={shareName}
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={!data.name}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={addToFavorites}
            className="bg-red-500 hover:bg-red-600 text-white"
            disabled={!data.name}
          >
            <Heart className="h-4 w-4 mr-2" />
            Favorite
          </Button>
          <Button
            onClick={downloadAsText}
            className="bg-gray-500 hover:bg-gray-600 text-white"
            disabled={!data.name}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            onClick={() => {
              setData({ name: '', meaning: '', tribe: '' })
              toast({
                title: "Cleared",
                description: "Form has been reset",
              })
            }}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        {!data.name && (
          <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
            <p className="text-white/80 text-xs">
              <strong className="text-white">Tip:</strong> Enter name details and use quick actions to copy, share, favorite, or download instantly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

