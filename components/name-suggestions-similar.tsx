'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameSuggestionsSimilarProps {
  name: string
  lastName: string
  tribe?: string
  gender?: 'male' | 'female'
  onNameSelected?: (name: string, meaning: string, tribe?: string) => void
}

interface SimilarName {
  name: string
  meaning: string
  tribe?: string
  gender?: string
  similarity: number
}

export function NameSuggestionsSimilar({
  name,
  lastName,
  tribe,
  gender,
  onNameSelected,
}: NameSuggestionsSimilarProps) {
  const [suggestions, setSuggestions] = useState<SimilarName[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (name) {
      fetchSimilarNames()
    }
  }, [name, tribe, gender])

  const fetchSimilarNames = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        name,
        ...(tribe && { tribe }),
        ...(gender && { gender }),
        limit: '5',
      })

      const response = await fetch(`/api/names/similar?${params}`)
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data.similarNames || [])
      }
    } catch (error) {
      console.error('Error fetching similar names:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectName = (suggestion: SimilarName) => {
    onNameSelected?.(suggestion.name, suggestion.meaning, suggestion.tribe)
    toast({
      title: "Name selected!",
      description: `You selected ${suggestion.name} ${lastName}`,
    })
  }

  if (!name) return null

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          Similar Name Suggestions
        </CardTitle>
        <CardDescription className="text-white/70">
          Names similar to "{name}" with similar meanings or sounds
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-white/70 mx-auto mb-2" />
            <p className="text-white/70 text-sm">Finding similar names...</p>
          </div>
        ) : suggestions.length === 0 ? (
          <p className="text-white/70 text-center py-8">No similar names found</p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg">
                      {suggestion.name} {lastName}
                    </h4>
                    <p className="text-white/70 text-sm mt-1">"{suggestion.meaning}"</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-500/20 text-yellow-300"
                  >
                    {suggestion.similarity}% similar
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-wrap gap-2">
                    {suggestion.tribe && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                        {suggestion.tribe}
                      </Badge>
                    )}
                    {suggestion.gender && (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                        {suggestion.gender}
                      </Badge>
                    )}
                  </div>
                  {onNameSelected && (
                    <Button
                      onClick={() => handleSelectName(suggestion)}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Select
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

