'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NameSearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTribe: string
  onTribeChange: (tribe: string) => void
  selectedGender: string
  onGenderChange: (gender: string) => void
  availableTribes: string[]
}

export function NameSearchFilter({
  searchQuery,
  onSearchChange,
  selectedTribe,
  onTribeChange,
  selectedGender,
  onGenderChange,
  availableTribes,
}: NameSearchFilterProps) {
  const clearFilters = () => {
    onSearchChange('')
    onTribeChange('all')
    onGenderChange('all')
  }

  const hasActiveFilters = searchQuery || selectedTribe !== 'all' || selectedGender !== 'all'

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          type="text"
          placeholder="Search by name, meaning, or wallet address..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-white/70 hover:text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white/90">Filter by Tribe</Label>
          <Select value={selectedTribe} onValueChange={onTribeChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
              <SelectValue placeholder="All Tribes" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-white/20">
              <SelectItem value="all">All Tribes</SelectItem>
              {availableTribes.map((tribe) => (
                <SelectItem key={tribe} value={tribe}>
                  {tribe}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white/90">Filter by Gender</Label>
          <Select value={selectedGender} onValueChange={onGenderChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-white/20">
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

