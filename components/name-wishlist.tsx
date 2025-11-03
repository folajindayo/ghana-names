'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, Plus, Trash2, CheckCircle, Clock } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface WishlistItem {
  id: string
  name: string
  meaning: string
  tribe?: string
  gender?: string
  notes?: string
  createdAt: string
  targetDate?: string
}

export function NameWishlist() {
  const { address, isConnected } = useAccount()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [newName, setNewName] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [newTribe, setNewTribe] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [newTargetDate, setNewTargetDate] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('ghanaian-name-wishlist')
      if (stored) {
        setWishlist(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    }
  }

  const saveWishlist = (items: WishlistItem[]) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('ghanaian-name-wishlist', JSON.stringify(items))
    } catch (error) {
      console.error('Error saving wishlist:', error)
    }
  }

  const addToWishlist = () => {
    if (!newName.trim() || !newMeaning.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter at least a name and meaning.",
        variant: "destructive",
      })
      return
    }

    const newItem: WishlistItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      meaning: newMeaning.trim(),
      tribe: newTribe.trim() || undefined,
      gender: undefined,
      notes: newNotes.trim() || undefined,
      targetDate: newTargetDate || undefined,
      createdAt: new Date().toISOString(),
    }

    const updated = [...wishlist, newItem]
    setWishlist(updated)
    saveWishlist(updated)

    setNewName('')
    setNewMeaning('')
    setNewTribe('')
    setNewNotes('')
    setNewTargetDate('')

    toast({
      title: "Added to wishlist",
      description: `${newItem.name} has been added to your wishlist.`,
    })
  }

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id)
    setWishlist(updated)
    saveWishlist(updated)
    toast({
      title: "Removed from wishlist",
      description: "Name removed from your wishlist.",
    })
  }

  const markAsClaimed = (id: string) => {
    const updated = wishlist.filter((item) => item.id !== id)
    setWishlist(updated)
    saveWishlist(updated)
    toast({
      title: "Marked as claimed",
      description: "Congratulations on claiming your name!",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          Name Wishlist
        </CardTitle>
        <CardDescription className="text-white/70">
          Save names you want to claim later
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Item */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="wishlist-name" className="text-white/90 text-xs">
                Name *
              </Label>
              <Input
                id="wishlist-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="wishlist-meaning" className="text-white/90 text-xs">
                Meaning *
              </Label>
              <Input
                id="wishlist-meaning"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                placeholder="Meaning"
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="wishlist-tribe" className="text-white/90 text-xs">
                Tribe (Optional)
              </Label>
              <Input
                id="wishlist-tribe"
                value={newTribe}
                onChange={(e) => setNewTribe(e.target.value)}
                placeholder="Tribe"
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="wishlist-date" className="text-white/90 text-xs">
                Target Date (Optional)
              </Label>
              <Input
                id="wishlist-date"
                type="date"
                value={newTargetDate}
                onChange={(e) => setNewTargetDate(e.target.value)}
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="wishlist-notes" className="text-white/90 text-xs">
              Notes (Optional)
            </Label>
            <Input
              id="wishlist-notes"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Add notes..."
              className="bg-white/10 border-white/20 text-white text-sm h-8"
            />
          </div>
          <Button
            onClick={addToWishlist}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add to Wishlist
          </Button>
        </div>

        {/* Wishlist Items */}
        {wishlist.length === 0 ? (
          <p className="text-white/60 text-center py-8">Your wishlist is empty. Add names you want to claim!</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-white/70 text-sm mt-1">"{item.meaning}"</p>
                    {item.notes && (
                      <p className="text-white/60 text-xs mt-1 italic">{item.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => markAsClaimed(item.id)}
                      variant="ghost"
                      size="icon"
                      className="text-green-400 hover:text-green-300 hover:bg-green-500/20 h-7 w-7"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => removeFromWishlist(item.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-7 w-7"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {item.tribe && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                      {item.tribe}
                    </Badge>
                  )}
                  {item.targetDate && (
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(item.targetDate).toLocaleDateString()}
                    </Badge>
                  )}
                  <span className="text-white/50 text-xs">
                    Added {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

