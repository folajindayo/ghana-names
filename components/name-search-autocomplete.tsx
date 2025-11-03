'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Loader2 } from 'lucide-react'
// Note: useDebounce hook defined at bottom of file

interface SearchSuggestion {
  name: string
  meaning: string
  tribe?: string
  gender?: string
  type: 'database' | 'static'
  count?: number
}

interface NameSearchAutocompleteProps {
  onSelect?: (suggestion: SearchSuggestion) => void
  placeholder?: string
  className?: string
}

export function NameSearchAutocomplete({
  onSelect,
  placeholder = 'Search names...',
  className = '',
}: NameSearchAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      fetchSuggestions(debouncedQuery)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (searchQuery: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/names/search?q=${encodeURIComponent(searchQuery)}&limit=8`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.suggestions || [])
        setShowSuggestions(true)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name)
    setShowSuggestions(false)
    onSelect?.(suggestion)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true)
          }}
          className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm ${className}`}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white/70" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-sm border-white/20 shadow-lg max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.name}-${index}`}
                  onClick={() => handleSelect(suggestion)}
                  className="w-full text-left p-2 rounded hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{suggestion.name}</span>
                        {suggestion.type === 'database' && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-700 text-xs">
                            Claimed
                          </Badge>
                        )}
                        {suggestion.count && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-700 text-xs">
                            {suggestion.count}x
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">"{suggestion.meaning}"</p>
                      <div className="flex gap-2 mt-1">
                        {suggestion.tribe && (
                          <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 text-xs">
                            {suggestion.tribe}
                          </Badge>
                        )}
                        {suggestion.gender && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-700 text-xs">
                            {suggestion.gender}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

