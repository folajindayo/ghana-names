'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextValidatorEnhanced() {
  const [input, setInput] = useState('')
  const [validationType, setValidationType] = useState<string>('email')
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null)
  const { toast } = useToast()

  const validate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let valid = false
    let message = ''

    if (validationType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      valid = emailRegex.test(input)
      message = valid ? 'Valid email address' : 'Invalid email address'
    } else if (validationType === 'url') {
      try {
        new URL(input)
        valid = true
        message = 'Valid URL'
      } catch {
        valid = false
        message = 'Invalid URL'
      }
    } else if (validationType === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      valid = phoneRegex.test(input) && input.replace(/\D/g, '').length >= 10
      message = valid ? 'Valid phone number' : 'Invalid phone number'
    } else if (validationType === 'password') {
      const hasMinLength = input.length >= 8
      const hasUpperCase = /[A-Z]/.test(input)
      const hasLowerCase = /[a-z]/.test(input)
      const hasNumber = /\d/.test(input)
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(input)
      valid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecial
      message = valid
        ? 'Strong password'
        : `Password must have: ${!hasMinLength ? '8+ chars, ' : ''}${!hasUpperCase ? 'uppercase, ' : ''}${!hasLowerCase ? 'lowercase, ' : ''}${!hasNumber ? 'number, ' : ''}${!hasSpecial ? 'special char' : ''}`
    } else if (validationType === 'alphanumeric') {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/
      valid = alphanumericRegex.test(input)
      message = valid ? 'Valid alphanumeric text' : 'Contains non-alphanumeric characters'
    } else if (validationType === 'numeric') {
      const numericRegex = /^\d+$/
      valid = numericRegex.test(input)
      message = valid ? 'Valid number' : 'Contains non-numeric characters'
    } else if (validationType === 'lettersOnly') {
      const lettersRegex = /^[a-zA-Z\s]+$/
      valid = lettersRegex.test(input)
      message = valid ? 'Contains only letters' : 'Contains non-letter characters'
    }

    setResult({ valid, message })
    toast({
      title: valid ? "Valid!" : "Invalid",
      description: message,
      variant: valid ? "default" : "destructive",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-lime-400" />
          Enhanced Text Validator
        </CardTitle>
        <CardDescription className="text-white/70">
          Validate text formats (email, URL, phone, password, alphanumeric, numeric, letters only)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to validate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && validate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Validation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={validationType === 'email' ? 'default' : 'outline'}
                onClick={() => setValidationType('email')}
                className={validationType === 'email' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Email
              </Button>
              <Button
                size="sm"
                variant={validationType === 'url' ? 'default' : 'outline'}
                onClick={() => setValidationType('url')}
                className={validationType === 'url' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                URL
              </Button>
              <Button
                size="sm"
                variant={validationType === 'phone' ? 'default' : 'outline'}
                onClick={() => setValidationType('phone')}
                className={validationType === 'phone' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Phone
              </Button>
              <Button
                size="sm"
                variant={validationType === 'password' ? 'default' : 'outline'}
                onClick={() => setValidationType('password')}
                className={validationType === 'password' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Password
              </Button>
              <Button
                size="sm"
                variant={validationType === 'alphanumeric' ? 'default' : 'outline'}
                onClick={() => setValidationType('alphanumeric')}
                className={validationType === 'alphanumeric' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Alphanumeric
              </Button>
              <Button
                size="sm"
                variant={validationType === 'numeric' ? 'default' : 'outline'}
                onClick={() => setValidationType('numeric')}
                className={validationType === 'numeric' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Numeric
              </Button>
              <Button
                size="sm"
                variant={validationType === 'lettersOnly' ? 'default' : 'outline'}
                onClick={() => setValidationType('lettersOnly')}
                className={validationType === 'lettersOnly' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Letters Only
              </Button>
            </div>
          </div>
          <Button
            onClick={validate}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Validate
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {result.valid ? (
                  <CheckCircle2 className="h-6 w-6 text-lime-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <Badge
                  variant="secondary"
                  className={result.valid ? 'bg-lime-600/40 text-lime-100 border-lime-400/50' : 'bg-red-600/40 text-red-100 border-red-400/50'}
                >
                  {result.valid ? 'Valid' : 'Invalid'}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <p className={`text-sm text-center ${result.valid ? 'text-lime-300' : 'text-red-300'}`}>
                {result.message}
              </p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to validate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

