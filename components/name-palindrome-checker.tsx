'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NamePalindromeChecker() {
  const [name, setName] = useState('')
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null)
  const [reversed, setReversed] = useState('')
  const { toast } = useToast()

  const checkPalindrome = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim().replace(/\s/g, '')
    const reversedName = normalized.split('').reverse().join('')
    const palindrome = normalized === reversedName

    setIsPalindrome(palindrome)
    setReversed(reversedName)

    if (palindrome) {
      toast({
        title: "Palindrome found!",
        description: `${name} reads the same forwards and backwards`,
      })
    } else {
      toast({
        title: "Not a palindrome",
        description: `${name} does not read the same backwards`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-purple-400" />
          Palindrome Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Check if a name reads the same forwards and backwards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Anna, Otto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkPalindrome()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={checkPalindrome}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isPalindrome !== null && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {isPalindrome ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-400" />
                )}
                <h3 className="text-2xl font-bold text-white">{name}</h3>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  isPalindrome
                    ? 'bg-green-600/40 text-green-100 border-green-400/50'
                    : 'bg-red-600/40 text-red-100 border-red-400/50'
                } font-semibold text-lg px-4 py-2`}
              >
                {isPalindrome ? 'PALINDROME' : 'NOT A PALINDROME'}
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/70 text-sm">Forwards:</p>
                <p className="text-white font-mono font-semibold">{name.toLowerCase().replace(/\s/g, '')}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-white/70 text-sm">Backwards:</p>
                <p className="text-white font-mono font-semibold">{reversed}</p>
              </div>
            </div>

            {isPalindrome && (
              <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
                <p className="text-green-300 text-sm text-center">
                  ✨ This name reads the same forwards and backwards!
                </p>
              </div>
            )}
          </div>
        )}

        {name && isPalindrome === null && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click check to see if it's a palindrome</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

