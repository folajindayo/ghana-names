'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ValidationResult {
  isValid: boolean
  score: number
  issues: string[]
  strengths: string[]
  suggestions: string[]
}

export function NameValidator() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)
  const { toast } = useToast()

  const validateName = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to validate",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const issues: string[] = []
    const strengths: string[] = []
    const suggestions: string[] = []
    let score = 100

    // Length validation
    if (normalized.length < 2) {
      issues.push('Name is too short (minimum 2 characters)')
      score -= 30
    } else if (normalized.length > 20) {
      issues.push('Name is too long (maximum 20 characters)')
      score -= 20
    } else {
      strengths.push('Good length')
    }

    // Character validation
    if (!/^[a-zA-Z\s'-]+$/.test(normalized)) {
      issues.push('Contains invalid characters')
      score -= 25
    } else {
      strengths.push('Valid characters only')
    }

    // Capitalization
    if (normalized[0] !== normalized[0].toUpperCase()) {
      issues.push('Should start with capital letter')
      suggestions.push('Capitalize the first letter')
      score -= 10
    } else {
      strengths.push('Proper capitalization')
    }

    // Multiple words
    if (normalized.split(/\s+/).length > 3) {
      issues.push('Too many words (consider shortening)')
      score -= 15
    }

    // Common patterns
    if (normalized.toLowerCase().includes('test') || normalized.toLowerCase().includes('demo')) {
      issues.push('Contains test/demo words')
      score -= 20
    }

    // Positive patterns
    if (/^[AEIOUaeiou]/.test(normalized)) {
      strengths.push('Starts with a vowel')
    }

    if (normalized.length >= 3 && normalized.length <= 8) {
      strengths.push('Optimal length for pronunciation')
    }

    // Suggestions
    if (normalized.length < 3) {
      suggestions.push('Consider a longer name for better uniqueness')
    }

    if (!strengths.includes('Proper capitalization')) {
      suggestions.push('Start with a capital letter')
    }

    const isValid = issues.length === 0 && score >= 70

    setResult({
      isValid,
      score: Math.max(0, Math.min(100, score)),
      issues,
      strengths,
      suggestions,
    })

    toast({
      title: isValid ? "Name is valid!" : "Validation complete",
      description: `Score: ${Math.max(0, Math.min(100, score))}/100`,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/40 text-green-100 border-green-400/50'
    if (score >= 60) return 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
    return 'bg-red-500/40 text-red-100 border-red-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Name Validator
        </CardTitle>
        <CardDescription className="text-white/70">
          Validate and score name quality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && validateName()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={validateName}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {result.isValid ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-400" />
                )}
                <h3 className="text-2xl font-bold text-white">{name}</h3>
              </div>
              <Badge variant="secondary" className={getScoreBadgeColor(result.score)}>
                Score: {result.score}/100
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Strengths
              </h4>
              {result.strengths.length > 0 ? (
                <ul className="space-y-1">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/60 text-sm">No strengths identified</p>
              )}
            </div>

            {result.issues.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-400" />
                  Issues
                </h4>
                <ul className="space-y-1">
                  {result.issues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
                      <XCircle className="h-3 w-3 text-red-400" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.suggestions.length > 0 && (
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  Suggestions
                </h4>
                <ul className="space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
                      <AlertCircle className="h-3 w-3 text-yellow-400" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click validate to check quality</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

