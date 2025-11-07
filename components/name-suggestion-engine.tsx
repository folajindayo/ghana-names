'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Lightbulb, Sparkles, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameSuggestion {
  name: string
  meaning: string
  tribe: string
  gender: string
  reason: string
}

const nameDatabase: NameSuggestion[] = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Male', reason: 'Strong traditional name' },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', gender: 'Female', reason: 'Beautiful and popular' },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', reason: 'Classic and timeless' },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Female', reason: 'Short and elegant' },
  { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Male', reason: 'Modern and strong' },
  { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', reason: 'Unique and meaningful' },
  { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan', gender: 'Male', reason: 'Distinctive sound' },
  { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Female', reason: 'Melodic and graceful' },
  { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan', gender: 'Male', reason: 'Short and powerful' },
  { name: 'Adwoa', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Female', reason: 'Traditional and beautiful' },
]

export function NameSuggestionEngine() {
  const [gender, setGender] = useState<string>('')
  const [tribe, setTribe] = useState<string>('')
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([])
  const { toast } = useToast()

  const generateSuggestions = () => {
    if (!gender) {
      toast({
        title: "Gender required",
        description: "Please select a gender",
        variant: "destructive",
      })
      return
    }

    let filtered = nameDatabase.filter((name) => name.gender.toLowerCase() === gender.toLowerCase())

    if (tribe) {
      filtered = filtered.filter((name) => name.tribe.toLowerCase() === tribe.toLowerCase())
    }

    // Shuffle and take 5 random suggestions
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 5)

    if (selected.length === 0) {
      toast({
        title: "No suggestions found",
        description: "Try different criteria",
        variant: "destructive",
      })
      return
    }

    setSuggestions(selected)
    toast({
      title: "Suggestions generated!",
      description: `Found ${selected.length} name suggestion(s)`,
    })
  }

  const regenerate = () => {
    generateSuggestions()
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />
          Name Suggestion Engine
        </CardTitle>
        <CardDescription className="text-white/70">
          Get personalized name suggestions based on your preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Tribe (Optional)</Label>
            <Select value={tribe} onValueChange={setTribe}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select tribe (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Tribes</SelectItem>
                <SelectItem value="akan">Akan</SelectItem>
                <SelectItem value="ewe">Ewe</SelectItem>
                <SelectItem value="ga">Ga</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={generateSuggestions}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get Suggestions
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm">Suggested Names</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={regenerate}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{suggestion.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {suggestion.tribe}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={
                          suggestion.gender === 'Male'
                            ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                            : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                        }
                      >
                        {suggestion.gender}
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      <strong className="text-white">Meaning:</strong> "{suggestion.meaning}"
                    </p>
                    <p className="text-white/60 text-xs">
                      <strong>Why this name:</strong> {suggestion.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {gender && suggestions.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click "Get Suggestions" to see personalized name recommendations</p>
          </div>
        )}

        {!gender && (
          <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
            <p className="text-white/80 text-xs">
              <strong className="text-white">Tip:</strong> Select your preferences and click "Get Suggestions" to receive personalized name recommendations based on gender and tribe.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

