'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SearchResult {
  name: string
  meaning: string
  tribe?: string
  gender?: string
}

export function NameSearchWidget() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a name to search",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/names/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data.results || [])
        if (data.results?.length === 0) {
          toast({
            title: "No results",
            description: `No names found matching "${searchQuery}"`,
          })
        }
      }
    } catch (error) {
      console.error('Search error:', error)
      toast({
        title: "Search failed",
        description: "Unable to search names. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setResults([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-400" />
          Search Names
        </CardTitle>
        <CardDescription className="text-white/70">
          Find Ghanaian names by name or meaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search for a name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            {isSearching ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{result.name}</h4>
                    <p className="text-white/80 text-sm mt-1">"{result.meaning}"</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.tribe && (
                    <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold">
                      {result.tribe}
                    </Badge>
                  )}
                  {result.gender && (
                    <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs font-semibold">
                      {result.gender}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery && results.length === 0 && !isSearching && (
          <p className="text-white/60 text-center py-4">No results found</p>
        )}
      </CardContent>
    </Card>
  )
}

