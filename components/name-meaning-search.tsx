'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameResult {
  name: string
  meaning: string
  tribe: string
  gender: string
  dayOfWeek?: string
}

const nameDatabase: NameResult[] = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Saturday' },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Sunday' },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Friday' },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Saturday' },
  { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Monday' },
  { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Tuesday' },
  { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Wednesday' },
  { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Friday' },
  { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Thursday' },
  { name: 'Adwoa', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Monday' },
  { name: 'Fiifi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Friday' },
  { name: 'Aba', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Tuesday' },
]

export function NameMeaningSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<NameResult[]>([])
  const { toast } = useToast()

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search term required",
        description: "Please enter a meaning or keyword to search",
        variant: "destructive",
      })
      return
    }

    const term = searchTerm.toLowerCase().trim()
    const matched = nameDatabase.filter(
      (name) =>
        name.meaning.toLowerCase().includes(term) ||
        name.name.toLowerCase().includes(term) ||
        name.tribe.toLowerCase().includes(term) ||
        (name.dayOfWeek && name.dayOfWeek.toLowerCase().includes(term))
    )

    setResults(matched)

    if (matched.length === 0) {
      toast({
        title: "No results found",
        description: "Try searching with different keywords",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Search complete",
        description: `Found ${matched.length} matching name(s)`,
      })
    }
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
          <Search className="h-5 w-5 text-purple-400" />
          Name Meaning Search
        </CardTitle>
        <CardDescription className="text-white/70">
          Search Ghanaian names by meaning, day of week, or keyword
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Search by Meaning or Keyword</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Saturday, Friday, Born on..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <BookOpen className="h-4 w-4" />
              <span>Found {results.length} result(s)</span>
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{result.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {result.tribe}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={
                          result.gender === 'Male'
                            ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                            : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                        }
                      >
                        {result.gender}
                      </Badge>
                      {result.dayOfWeek && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs">
                          {result.dayOfWeek}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">
                      <strong className="text-white">Meaning:</strong> "{result.meaning}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTerm && results.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No names found matching your search</p>
            <p className="text-white/50 text-xs mt-2">Try searching for: "Saturday", "Friday", "Born on", or a tribe name</p>
          </div>
        )}

        {!searchTerm && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <h4 className="text-white font-semibold text-sm">Search Tips</h4>
            </div>
            <ul className="text-white/70 text-xs space-y-1 list-disc list-inside">
              <li>Search by day of week (e.g., "Saturday", "Friday")</li>
              <li>Search by meaning keywords (e.g., "Born on")</li>
              <li>Search by tribe name (e.g., "Akan")</li>
              <li>Search by name directly</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

