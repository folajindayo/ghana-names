'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { History, Search, Trash2, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HistoryEntry {
  id: string
  name: string
  meaning: string
  tribe: string
  timestamp: Date
  action: string
}

export function NameHistoryViewer() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('nameHistory')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setHistory(parsed.map((h: any) => ({ ...h, timestamp: new Date(h.timestamp) })))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('nameHistory')
    toast({
      title: "History cleared",
      description: "All history entries have been removed",
    })
  }

  const deleteEntry = (id: string) => {
    const updated = history.filter((entry) => entry.id !== id)
    setHistory(updated)
    localStorage.setItem('nameHistory', JSON.stringify(updated))
    toast({
      title: "Entry deleted",
      description: "History entry removed",
    })
  }

  const filteredHistory = history.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tribe.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <History className="h-5 w-5 text-purple-400" />
          History Viewer
        </CardTitle>
        <CardDescription className="text-white/70">
          View and manage your name generation history
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.length > 0 && (
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">
                {filteredHistory.length} of {history.length} entry(s)
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={clearHistory}
                className="bg-white/10 border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        )}

        {filteredHistory.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{entry.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {entry.tribe}
                      </Badge>
                      <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs">
                        {entry.action}
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      <strong className="text-white">Meaning:</strong> "{entry.meaning}"
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(entry.timestamp)}
                      </span>
                      <span>{formatTimeAgo(entry.timestamp)}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteEntry(entry.id)}
                    className="text-white/60 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 bg-white/5 rounded-lg border border-white/10 text-center">
            <History className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-sm mb-2">No history yet</p>
            <p className="text-white/50 text-xs">
              Your name generation history will appear here
            </p>
          </div>
        ) : (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No entries match your search</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <History className="h-4 w-4 text-purple-400" />
              <span className="text-white font-semibold text-sm">History Stats</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-white/60">Total: </span>
                <span className="text-white font-semibold">{history.length}</span>
              </div>
              <div>
                <span className="text-white/60">Today: </span>
                <span className="text-white font-semibold">
                  {history.filter(
                    (h) =>
                      h.timestamp.toDateString() === new Date().toDateString()
                  ).length}
                </span>
              </div>
              <div>
                <span className="text-white/60">This week: </span>
                <span className="text-white font-semibold">
                  {history.filter(
                    (h) =>
                      Date.now() - h.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
                  ).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

