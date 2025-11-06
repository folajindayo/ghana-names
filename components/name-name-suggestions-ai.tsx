'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Brain, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AISuggestion {
  name: string
  meaning: string
  reason: string
  confidence: number
}

export function NameSuggestionsAI() {
  const [lastName, setLastName] = useState('')
  const [preferences, setPreferences] = useState('')
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateAISuggestions = async () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockSuggestions: AISuggestion[] = [
        {
          name: 'Kwame',
          meaning: 'Born on Saturday',
          reason: 'Strong traditional name that complements your last name',
          confidence: 92,
        },
        {
          name: 'Kofi',
          meaning: 'Born on Friday',
          reason: 'Modern and popular choice with great meaning',
          confidence: 88,
        },
        {
          name: 'Yaw',
          meaning: 'Born on Thursday',
          reason: 'Short and powerful, easy to remember',
          confidence: 85,
        },
      ]

      setSuggestions(mockSuggestions)
      toast({
        title: "AI suggestions generated!",
        description: `Generated ${mockSuggestions.length} personalized suggestions`,
      })
    } catch (error) {
      console.error('Error generating suggestions:', error)
      toast({
        title: "Generation failed",
        description: "Unable to generate AI suggestions",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (confidence >= 80) return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
    return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          AI Name Suggestions
        </CardTitle>
        <CardDescription className="text-white/70">
          Get personalized name recommendations powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Last Name</Label>
          <Input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Preferences (Optional)</Label>
          <Input
            placeholder="e.g., traditional, modern, strong"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <Button
          onClick={generateAISuggestions}
          disabled={isGenerating || !lastName.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              AI Thinking...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Generate AI Suggestions
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              {suggestions.length} AI-powered suggestion{suggestions.length !== 1 ? 's' : ''}
            </p>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-1">
                      {suggestion.name} {lastName}
                    </h4>
                    <p className="text-white/80 text-sm mb-2">"{suggestion.meaning}"</p>
                    <p className="text-white/70 text-xs italic">{suggestion.reason}</p>
                  </div>
                  <Badge variant="secondary" className={`${getConfidenceColor(suggestion.confidence)} font-semibold`}>
                    {suggestion.confidence}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {lastName && suggestions.length === 0 && !isGenerating && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to get AI-powered suggestions</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

