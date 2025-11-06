'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { History, Trash2, Search, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HistoryEntry {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  timestamp: string
  method: 'random' | 'ai' | 'preset' | 'custom'
}

export function NameGenerationHistoryViewer() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMethod, setFilterMethod] = useState<string>('all')
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const stored = localStorage.getItem('name-generation-history')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setHistory(parsed)
      } catch (error) {
        console.error('Error loading history:', error)
      }
    }
  }

  const clearHistory = () => {
    localStorage.removeItem('name-generation-history')
    setHistory([])
    toast({
      title: "History cleared",
      description: "All generation history has been removed",
    })
  }

  const removeEntry = (id: string) => {
    const updated = history.filter((entry) => entry.id !== id)
    setHistory(updated)
    localStorage.setItem('name-generation-history', JSON.stringify(updated))
    toast({
      title: "Entry removed",
      description: "History entry has been deleted",
    })
  }

  const filteredHistory = history.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterMethod === 'all' || entry.method === filterMethod
    return matchesSearch && matchesFilter
  })

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'ai':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'preset':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'custom':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <History className="h-5 w-5 text-orange-400" />
          Generation History
        </CardTitle>
        <CardDescription className="text-white/70">
          View your name generation history ({history.length} entries)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pl-10"
            />
          </div>
          <Button
            onClick={clearHistory}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'random', 'ai', 'preset', 'custom'].map((method) => (
            <Button
              key={method}
              onClick={() => setFilterMethod(method)}
              variant={filterMethod === method ? 'default' : 'outline'}
              size="sm"
              className={
                filterMethod === method
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </Button>
          ))}
        </div>

        {filteredHistory.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold">
                        {entry.name} {entry.lastName}
                      </h4>
                      <Badge variant="secondary" className={`${getMethodColor(entry.method)} font-semibold text-xs`}>
                        {entry.method}
                      </Badge>
                    </div>
                    <p className="text-white/80 text-xs mb-2">"{entry.meaning}"</p>
                    <div className="flex gap-2 mb-2">
                      {entry.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {entry.tribe}
                        </Badge>
                      )}
                      {entry.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {entry.gender}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/60 text-xs">{formatDate(entry.timestamp)}</p>
                  </div>
                  <Button
                    onClick={() => removeEntry(entry.id)}
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
            {searchQuery || filterMethod !== 'all' ? (
              <div className="space-y-2">
                <p>No entries match your filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setFilterMethod('all')
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <History className="h-12 w-12 mx-auto text-white/30" />
                <p>No generation history yet</p>
                <p className="text-sm">Start generating names to see them here!</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

