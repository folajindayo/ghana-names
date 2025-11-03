'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X } from 'lucide-react'

interface NameSearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
  onClear?: () => void
}

export interface SearchFilters {
  query: string
  tribe?: string
  gender?: 'male' | 'female' | 'any'
  minLength?: number
  maxLength?: number
}

const tribes = ['Akan', 'Ewe', 'Ga-Adangbe', 'Mole-Dagbani', 'Guan']

export function NameSearchFilters({ onSearch, onClear }: NameSearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    gender: 'any',
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleClear = () => {
    const cleared = {
      query: '',
      gender: 'any' as const,
    }
    setFilters(cleared)
    onClear?.()
    onSearch(cleared)
  }

  const activeFiltersCount = [
    filters.tribe,
    filters.gender && filters.gender !== 'any',
    filters.minLength,
    filters.maxLength,
  ].filter(Boolean).length

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-400" />
          Search & Filter Names
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names by various criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Search */}
        <div className="space-y-2">
          <Label htmlFor="search-query" className="text-white/90">
            Search Query
          </Label>
          <div className="flex gap-2">
            <Input
              id="search-query"
              placeholder="Search by name, meaning, or tribe..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
            {(filters.query || activeFiltersCount > 0) && (
              <Button
                onClick={handleClear}
                variant="outline"
                className="bg-white/10 border-white/20 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="filter-tribe" className="text-white/90 text-sm">
              Tribe
            </Label>
            <Select
              value={filters.tribe || 'any'}
              onValueChange={(value) =>
                setFilters({ ...filters, tribe: value === 'any' ? undefined : value })
              }
            >
              <SelectTrigger
                id="filter-tribe"
                className="bg-white/10 border-white/20 text-white text-sm h-9"
              >
                <SelectValue placeholder="Any Tribe" />
              </SelectTrigger>
              <SelectContent className="bg-white/90">
                <SelectItem value="any">Any Tribe</SelectItem>
                {tribes.map((tribe) => (
                  <SelectItem key={tribe} value={tribe}>
                    {tribe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filter-gender" className="text-white/90 text-sm">
              Gender
            </Label>
            <Select
              value={filters.gender || 'any'}
              onValueChange={(value: 'male' | 'female' | 'any') =>
                setFilters({ ...filters, gender: value })
              }
            >
              <SelectTrigger
                id="filter-gender"
                className="bg-white/10 border-white/20 text-white text-sm h-9"
              >
                <SelectValue placeholder="Any Gender" />
              </SelectTrigger>
              <SelectContent className="bg-white/90">
                <SelectItem value="any">Any Gender</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white"
          size="sm"
        >
          <Filter className="mr-2 h-4 w-4" />
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-yellow-500/20 text-yellow-300">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="min-length" className="text-white/90 text-xs">
                  Min Length
                </Label>
                <Input
                  id="min-length"
                  type="number"
                  min="1"
                  max="20"
                  value={filters.minLength || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white text-sm h-8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-length" className="text-white/90 text-xs">
                  Max Length
                </Label>
                <Input
                  id="max-length"
                  type="number"
                  min="1"
                  max="20"
                  value={filters.maxLength || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="bg-white/10 border-white/20 text-white text-sm h-8"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {filters.tribe && (
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                Tribe: {filters.tribe}
                <button
                  onClick={() => setFilters({ ...filters, tribe: undefined })}
                  className="ml-1 hover:bg-blue-500/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.gender && filters.gender !== 'any' && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                Gender: {filters.gender}
                <button
                  onClick={() => setFilters({ ...filters, gender: 'any' })}
                  className="ml-1 hover:bg-green-500/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.minLength && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                Min: {filters.minLength}
                <button
                  onClick={() => setFilters({ ...filters, minLength: undefined })}
                  className="ml-1 hover:bg-purple-500/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.maxLength && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                Max: {filters.maxLength}
                <button
                  onClick={() => setFilters({ ...filters, maxLength: undefined })}
                  className="ml-1 hover:bg-purple-500/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

