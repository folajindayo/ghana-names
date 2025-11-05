'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Filter, X, Search } from 'lucide-react'

interface FilterOptions {
  tribe?: string
  gender?: 'male' | 'female' | 'any'
  searchQuery?: string
  minLength?: number
  maxLength?: number
}

interface NameFilterAdvancedProps {
  onFilterChange: (filters: FilterOptions) => void
  availableTribes?: string[]
}

export function NameFilterAdvanced({ onFilterChange, availableTribes = [] }: NameFilterAdvancedProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    gender: 'any',
    minLength: undefined,
    maxLength: undefined,
  })

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      gender: 'any',
      minLength: undefined,
      maxLength: undefined,
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = 
    filters.tribe || 
    filters.gender !== 'any' || 
    filters.searchQuery || 
    filters.minLength || 
    filters.maxLength

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-400" />
          Advanced Filters
        </CardTitle>
        <CardDescription className="text-white/70">
          Refine your name search
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Query */}
        <div className="space-y-2">
          <Label className="text-white/80">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search by name or meaning..."
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Tribe Filter */}
        {availableTribes.length > 0 && (
          <div className="space-y-2">
            <Label className="text-white/80">Tribe</Label>
            <Select
              value={filters.tribe || 'all'}
              onValueChange={(value) => handleFilterChange('tribe', value === 'all' ? undefined : value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="All Tribes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tribes</SelectItem>
                {availableTribes.map((tribe) => (
                  <SelectItem key={tribe} value={tribe}>
                    {tribe}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Gender Filter */}
        <div className="space-y-2">
          <Label className="text-white/80">Gender</Label>
          <Select
            value={filters.gender || 'any'}
            onValueChange={(value) => handleFilterChange('gender', value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Name Length Filters */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">Min Length</Label>
            <Input
              type="number"
              placeholder="Min"
              value={filters.minLength || ''}
              onChange={(e) => handleFilterChange('minLength', e.target.value ? parseInt(e.target.value) : undefined)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1"
              max="20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Max Length</Label>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxLength || ''}
              onChange={(e) => handleFilterChange('maxLength', e.target.value ? parseInt(e.target.value) : undefined)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1"
              max="20"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <Label className="text-white/80">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold">
                  {filters.tribe}
                  <button
                    onClick={() => handleFilterChange('tribe', undefined)}
                    className="ml-2 hover:text-blue-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.gender && filters.gender !== 'any' && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs font-semibold">
                  {filters.gender}
                  <button
                    onClick={() => handleFilterChange('gender', 'any')}
                    className="ml-2 hover:text-green-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.minLength && (
                <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs font-semibold">
                  Min: {filters.minLength}
                  <button
                    onClick={() => handleFilterChange('minLength', undefined)}
                    className="ml-2 hover:text-purple-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.maxLength && (
                <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs font-semibold">
                  Max: {filters.maxLength}
                  <button
                    onClick={() => handleFilterChange('maxLength', undefined)}
                    className="ml-2 hover:text-purple-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

