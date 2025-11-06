'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { List, Plus, Trash2, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShortlistItem {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  notes?: string
  addedAt: string
  priority: 'high' | 'medium' | 'low'
}

export function NameShortlistManager() {
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([])
  const [newName, setNewName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const stored = localStorage.getItem('name-shortlist')
    if (stored) {
      try {
        setShortlist(JSON.parse(stored))
      } catch (error) {
        console.error('Error loading shortlist:', error)
      }
    }
  }, [])

  const saveShortlist = (updated: ShortlistItem[]) => {
    setShortlist(updated)
    localStorage.setItem('name-shortlist', JSON.stringify(updated))
  }

  const addToShortlist = () => {
    if (!newName.trim() || !newLastName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter name and last name",
        variant: "destructive",
      })
      return
    }

    const item: ShortlistItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      lastName: newLastName.trim(),
      meaning: newMeaning.trim() || 'No meaning provided',
      notes: newNotes.trim() || undefined,
      addedAt: new Date().toISOString(),
      priority: 'medium',
    }

    const updated = [...shortlist, item]
    saveShortlist(updated)
    setNewName('')
    setNewLastName('')
    setNewMeaning('')
    setNewNotes('')
    toast({
      title: "Added to shortlist!",
      description: `${item.name} ${item.lastName} added`,
    })
  }

  const removeFromShortlist = (id: string) => {
    const updated = shortlist.filter((item) => item.id !== id)
    saveShortlist(updated)
    toast({
      title: "Removed from shortlist",
      description: "Item removed successfully",
    })
  }

  const updatePriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    const updated = shortlist.map((item) => (item.id === id ? { ...item, priority } : item))
    saveShortlist(updated)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      case 'medium':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'low':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  const sortedShortlist = [...shortlist].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <List className="h-5 w-5 text-indigo-400" />
          Shortlist Manager
        </CardTitle>
        <CardDescription className="text-white/70">
          Manage your name shortlist ({shortlist.length} items)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-white/5 rounded border border-white/10 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-white/80 text-xs">Name</Label>
              <Input
                placeholder="First name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-8"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-white/80 text-xs">Last Name</Label>
              <Input
                placeholder="Last name"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-8"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-white/80 text-xs">Meaning</Label>
            <Input
              placeholder="Name meaning (optional)"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-white/80 text-xs">Notes</Label>
            <Input
              placeholder="Personal notes (optional)"
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-8"
            />
          </div>
          <Button
            onClick={addToShortlist}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold text-xs h-8"
          >
            <Plus className="mr-2 h-3 w-3" />
            Add to Shortlist
          </Button>
        </div>

        {sortedShortlist.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedShortlist.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold text-sm">
                        {item.name} {item.lastName}
                      </h4>
                      <Badge variant="secondary" className={`${getPriorityColor(item.priority)} font-semibold text-xs`}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-white/80 text-xs mb-1">"{item.meaning}"</p>
                    {item.notes && (
                      <p className="text-white/70 text-xs italic mb-2">Note: {item.notes}</p>
                    )}
                    <div className="flex gap-1">
                      {['high', 'medium', 'low'].map((priority) => (
                        <Button
                          key={priority}
                          onClick={() => updatePriority(item.id, priority as 'high' | 'medium' | 'low')}
                          variant="ghost"
                          size="sm"
                          className={`h-5 px-2 text-xs ${
                            item.priority === priority
                              ? 'bg-white/20 text-white'
                              : 'text-white/50 hover:text-white'
                          }`}
                        >
                          <Star className={`h-3 w-3 ${item.priority === priority ? 'fill-current' : ''}`} />
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromShortlist(item.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-white/60">
            <List className="h-12 w-12 mx-auto text-white/30 mb-2" />
            <p>No items in shortlist</p>
            <p className="text-sm mt-1">Add names to create your shortlist</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

