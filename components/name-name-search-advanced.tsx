'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SearchFilters {
  query: string
  tribe: string
  gender: string
  minLength: string
  maxLength: string
  startsWith: string
  endsWith: string
}

interface SearchResult {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  matchScore: number
}

export function NameSearchAdvanced() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    tribe: 'all',
    gender: 'all',
    minLength: '',
    maxLength: '',
    startsWith: '',
    endsWith: '',
  })
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  const performSearch = () => {
    if (!filters.query.trim() && !filters.startsWith && !filters.endsWith) {
      toast({
        title: "Search criteria required",
        description: "Please enter search terms",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          name: 'Kwame',
          lastName: 'Asante',
          meaning: 'Born on Saturday',
          tribe: 'Akan',
          gender: 'Male',
          matchScore: 95,
        },
        {
          name: 'Akosua',
          lastName: 'Mensah',
          meaning: 'Born on Sunday',
          tribe: 'Akan',
          gender: 'Female',
          matchScore: 88,
        },
        {
          name: 'Kofi',
          lastName: 'Osei',
          meaning: 'Born on Friday',
          tribe: 'Akan',
          gender: 'Male',
          matchScore: 82,
        },
      ]

      // Filter results based on criteria
      let filtered = mockResults

      if (filters.tribe !== 'all') {
        filtered = filtered.filter((r) => r.tribe === filters.tribe)
      }
      if (filters.gender !== 'all') {
        filtered = filtered.filter((r) => r.gender === filters.gender)
      }
      if (filters.minLength) {
        filtered = filtered.filter((r) => r.name.length >= parseInt(filters.minLength))
      }
      if (filters.maxLength) {
        filtered = filtered.filter((r) => r.name.length <= parseInt(filters.maxLength))
      }
      if (filters.startsWith) {
        filtered = filtered.filter((r) => r.name.toLowerCase().startsWith(filters.startsWith.toLowerCase()))
      }
      if (filters.endsWith) {
        filtered = filtered.filter((r) => r.name.toLowerCase().endsWith(filters.endsWith.toLowerCase()))
      }

      setResults(filtered)
      setIsSearching(false)
      toast({
        title: "Search complete!",
        description: `Found ${filtered.length} result${filtered.length !== 1 ? 's' : ''}`,
      })
    }, 500)
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      tribe: 'all',
      gender: 'all',
      minLength: '',
      maxLength: '',
      startsWith: '',
      endsWith: '',
    })
    setResults([])
  }

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-400" />
          Advanced Search
        </CardTitle>
        <CardDescription className="text-white/70">
          Search names with advanced filters and criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Search Query</Label>
          <Input
            placeholder="Search by name or meaning..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Tribe</Label>
            <Select value={filters.tribe} onValueChange={(value) => updateFilter('tribe', value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tribes</SelectItem>
                <SelectItem value="Akan">Akan</SelectItem>
                <SelectItem value="Ga">Ga</SelectItem>
                <SelectItem value="Ewe">Ewe</SelectItem>
                <SelectItem value="Dagomba">Dagomba</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Gender</Label>
            <Select value={filters.gender} onValueChange={(value) => updateFilter('gender', value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Min Length</Label>
            <Input
              placeholder="3"
              type="number"
              value={filters.minLength}
              onChange={(e) => updateFilter('minLength', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Max Length</Label>
            <Input
              placeholder="10"
              type="number"
              value={filters.maxLength}
              onChange={(e) => updateFilter('maxLength', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Starts With</Label>
            <Input
              placeholder="Kw"
              value={filters.startsWith}
              onChange={(e) => updateFilter('startsWith', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Ends With</Label>
            <Input
              placeholder="ua"
              value={filters.endsWith}
              onChange={(e) => updateFilter('endsWith', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={performSearch}
            disabled={isSearching}
            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold"
          >
            <Search className="mr-2 h-4 w-4" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
          <Button
            onClick={clearFilters}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <p className="text-white/80 text-sm">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">
                      {result.name} {result.lastName}
                    </h4>
                    <p className="text-white/80 text-xs mb-2">"{result.meaning}"</p>
                    <div className="flex gap-2">
                      {result.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {result.tribe}
                        </Badge>
                      )}
                      {result.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {result.gender}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 font-semibold text-xs">
                    {result.matchScore}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && !isSearching && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter search criteria and click search</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

