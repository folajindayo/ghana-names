'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ValidationResult {
  isValid: boolean
  checks: {
    length: { valid: boolean; message: string }
    characters: { valid: boolean; message: string }
    format: { valid: boolean; message: string }
    pronunciation: { valid: boolean; message: string }
  }
  score: number
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
    const checks = {
      length: {
        valid: normalized.length >= 2 && normalized.length <= 20,
        message: normalized.length < 2
          ? 'Name is too short (minimum 2 characters)'
          : normalized.length > 20
          ? 'Name is too long (maximum 20 characters)'
          : 'Length is appropriate',
      },
      characters: {
        valid: /^[a-zA-Z\s'-]+$/.test(normalized),
        message: /^[a-zA-Z\s'-]+$/.test(normalized)
          ? 'Contains valid characters'
          : 'Contains invalid characters (use only letters, spaces, hyphens, and apostrophes)',
      },
      format: {
        valid: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(normalized) || /^[a-z]+(\s[a-z]+)*$/.test(normalized),
        message: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/.test(normalized) || /^[a-z]+(\s[a-z]+)*$/.test(normalized)
          ? 'Format is valid'
          : 'Consider proper capitalization',
      },
      pronunciation: {
        valid: normalized.length >= 3 && /[aeiouAEIOU]/.test(normalized),
        message: normalized.length >= 3 && /[aeiouAEIOU]/.test(normalized)
          ? 'Pronounceable'
          : 'May be difficult to pronounce',
      },
    }

    const validCount = Object.values(checks).filter((c) => c.valid).length
    const score = Math.round((validCount / Object.keys(checks).length) * 100)

    const suggestions: string[] = []
    if (!checks.length.valid) {
      suggestions.push('Adjust name length to 2-20 characters')
    }
    if (!checks.characters.valid) {
      suggestions.push('Remove special characters (except spaces, hyphens, apostrophes)')
    }
    if (!checks.format.valid) {
      suggestions.push('Use proper capitalization (e.g., "Kwame" or "kwame")')
    }
    if (!checks.pronunciation.valid) {
      suggestions.push('Ensure name contains vowels for better pronunciation')
    }

    const isValid = validCount === Object.keys(checks).length

    setResult({
      isValid,
      checks,
      score,
      suggestions,
    })

    toast({
      title: isValid ? "Name is valid!" : "Validation complete",
      description: `Score: ${score}%`,
    })
  }

  const getScoreColor = () => {
    if (!result) return ''
    if (result.score >= 90) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (result.score >= 70) return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    return 'bg-red-600/40 text-red-100 border-red-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          Name Validator
        </CardTitle>
        <CardDescription className="text-white/70">
          Validate and check name quality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Asante"
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
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                {result.isValid ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <Badge variant="secondary" className={`${getScoreColor()} font-semibold text-lg px-4 py-2`}>
                  {result.score}% Valid
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(result.checks).map(([key, check]) => (
                <div
                  key={key}
                  className="p-3 bg-white/5 rounded border border-white/10 flex items-start gap-3"
                >
                  {check.valid ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm capitalize mb-1">{key}</p>
                    <p className="text-white/70 text-xs">{check.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {result.suggestions.length > 0 && (
              <div className="p-3 bg-yellow-500/10 rounded border border-yellow-500/30">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  Suggestions
                </h4>
                <ul className="space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to validate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

