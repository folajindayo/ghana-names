'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { History, Trash2, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface HistoryItem {
  id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  timestamp: number
}

export function NameGeneratorHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showAll, setShowAll] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('name-generator-history')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setHistory(parsed)
      } catch (error) {
        console.error('Error parsing history:', error)
      }
    }
  }

  const clearHistory = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('name-generator-history')
    setHistory([])
    toast({
      title: "History cleared",
      description: "All history items have been removed",
    })
  }

  const removeItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id)
    setHistory(updated)
    if (typeof window !== 'undefined') {
      localStorage.setItem('name-generator-history', JSON.stringify(updated))
    }
    toast({
      title: "Removed",
      description: "Item removed from history",
    })
  }

  const displayedHistory = showAll ? history : history.slice(0, 5)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="h-5 w-5 text-blue-400" />
              Generation History
            </CardTitle>
            <CardDescription className="text-white/70">
              {history.length} name{history.length !== 1 ? 's' : ''} generated
            </CardDescription>
          </div>
          {history.length > 0 && (
            <Button
              onClick={clearHistory}
              variant="outline"
              size="sm"
              className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="py-8 text-center">
            <History className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 mb-2">No generation history yet</p>
            <p className="text-white/50 text-sm">Generated names will appear here</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayedHistory.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {item.name} {item.lastName}
                    </h4>
                    <p className="text-white/70 text-sm mb-2">"{item.meaning}"</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold">
                          {item.tribe}
                        </Badge>
                      )}
                      <span className="text-white/50 text-xs">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white/50 hover:text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {history.length > 5 && (
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {showAll ? 'Show Less' : `View All ${history.length} Items`}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

