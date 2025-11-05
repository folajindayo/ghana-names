'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Lightbulb, RefreshCw } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

interface NameSuggestionsSmartProps {
  lastName: string
  preferredGender?: 'male' | 'female' | 'any'
  preferredTribe?: string
  onNameSelected?: (name: GhanaianName) => void
}

export function NameSuggestionsSmart({
  lastName,
  preferredGender = 'any',
  preferredTribe,
  onNameSelected,
}: NameSuggestionsSmartProps) {
  const [suggestions, setSuggestions] = useState<GhanaianName[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (lastName.trim()) {
      generateSuggestions()
    }
  }, [lastName, preferredGender, preferredTribe])

  const generateSuggestions = () => {
    if (!lastName.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      const newSuggestions: GhanaianName[] = []
      for (let i = 0; i < 3; i++) {
        let name = getRandomName(preferredGender, lastName)
        // If preferred tribe is specified, try to match it
        if (preferredTribe && name.tribe !== preferredTribe) {
          // Try a few more times to get matching tribe
          for (let j = 0; j < 5; j++) {
            const testName = getRandomName(preferredGender, lastName)
            if (testName.tribe === preferredTribe) {
              name = testName
              break
            }
          }
        }
        newSuggestions.push(name)
      }
      setSuggestions(newSuggestions)
      setIsLoading(false)
    }, 500)
  }

  const handleSelectName = (name: GhanaianName) => {
    if (onNameSelected) {
      onNameSelected(name)
      toast({
        title: "Name selected!",
        description: `${name.name} ${lastName}`,
      })
    }
  }

  if (!lastName.trim()) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-white/70">
          Enter your last name to get personalized suggestions
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
              Smart Suggestions
            </CardTitle>
            <CardDescription className="text-white/70">
              Personalized name recommendations for {lastName}
            </CardDescription>
          </div>
          <Button
            onClick={generateSuggestions}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 text-center">
            <Sparkles className="h-8 w-8 animate-pulse text-yellow-400 mx-auto" />
          </div>
        ) : suggestions.length === 0 ? (
          <p className="text-white/60 text-center py-8">No suggestions available</p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleSelectName(suggestion)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {suggestion.name} {lastName}
                    </h4>
                    <p className="text-white/80 text-sm mb-2">"{suggestion.meaning}"</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50 font-semibold">
                    #{index + 1}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestion.tribe && (
                    <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs font-semibold">
                      {suggestion.tribe}
                    </Badge>
                  )}
                  {suggestion.gender && (
                    <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs font-semibold">
                      {suggestion.gender}
                    </Badge>
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

