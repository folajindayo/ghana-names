'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { History, Trash2, Download, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { GhanaianName } from '@/lib/ghanaian-names'

interface LocalNameHistory {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  timestamp: string
}

export function NameHistoryLocal() {
  const [history, setHistory] = useState<LocalNameHistory[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('ghanaian-name-history')
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading history:', error)
    }
  }

  const saveToHistory = (name: GhanaianName, lastName: string) => {
    if (typeof window === 'undefined') return

    const newEntry: LocalNameHistory = {
      name: name.name,
      lastName,
      meaning: name.meaning,
      tribe: name.tribe,
      gender: name.gender,
      timestamp: new Date().toISOString(),
    }

    try {
      const stored = localStorage.getItem('ghanaian-name-history')
      const existing = stored ? JSON.parse(stored) : []
      const updated = [newEntry, ...existing].slice(0, 50) // Keep last 50
      localStorage.setItem('ghanaian-name-history', JSON.stringify(updated))
      setHistory(updated)
    } catch (error) {
      console.error('Error saving history:', error)
    }
  }

  const clearHistory = () => {
    if (typeof window === 'undefined') return
    if (!confirm('Are you sure you want to clear all history?')) return

    try {
      localStorage.removeItem('ghanaian-name-history')
      setHistory([])
      toast({
        title: "History cleared",
        description: "All local history has been removed.",
      })
    } catch (error) {
      console.error('Error clearing history:', error)
    }
  }

  const exportHistory = () => {
    if (history.length === 0) {
      toast({
        title: "No history",
        description: "No history to export.",
        variant: "destructive",
      })
      return
    }

    const jsonStr = JSON.stringify(history, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghanaian-name-history-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "History exported!",
      description: "Your name history has been downloaded.",
    })
  }

  if (history.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="h-5 w-5 text-blue-400" />
            Local Name History
          </CardTitle>
          <CardDescription className="text-white/70">
            Your locally stored name generation history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/60 text-center py-4">No local history yet. Generate some names to see them here!</p>
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
              <History className="h-5 w-5 text-blue-400" />
              Local Name History ({history.length})
            </CardTitle>
            <CardDescription className="text-white/70">
              Your locally stored name generation history
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportHistory}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={clearHistory}
              variant="outline"
              size="sm"
              className="bg-red-500/20 border-red-500/30 text-red-300"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((entry, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold">
                    {entry.name} {entry.lastName}
                  </h4>
                  <p className="text-white/70 text-sm mt-1">"{entry.meaning}"</p>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-xs">
                  <Clock className="h-3 w-3" />
                  {new Date(entry.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {entry.tribe && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                    {entry.tribe}
                  </Badge>
                )}
                {entry.gender && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                    {entry.gender}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Export function to be used by other components
export function addToLocalHistory(name: GhanaianName, lastName: string) {
  if (typeof window === 'undefined') return

  const newEntry: LocalNameHistory = {
    name: name.name,
    lastName,
    meaning: name.meaning,
    tribe: name.tribe,
    gender: name.gender,
    timestamp: new Date().toISOString(),
  }

  try {
    const stored = localStorage.getItem('ghanaian-name-history')
    const existing = stored ? JSON.parse(stored) : []
    const updated = [newEntry, ...existing].slice(0, 50)
    localStorage.setItem('ghanaian-name-history', JSON.stringify(updated))
  } catch (error) {
    console.error('Error saving to local history:', error)
  }
}

