'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextPalindromeCheckerEnhanced() {
  const [input, setInput] = useState('')
  const [checkType, setCheckType] = useState<string>('exact')
  const [result, setResult] = useState<{ isPalindrome: boolean; reversed: string; message: string } | null>(null)
  const { toast } = useToast()

  const check = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let processed = input
    let reversed = ''

    if (checkType === 'exact') {
      processed = input
      reversed = processed.split('').reverse().join('')
    } else if (checkType === 'ignoreCase') {
      processed = input.toLowerCase()
      reversed = processed.split('').reverse().join('')
    } else if (checkType === 'ignoreSpaces') {
      processed = input.replace(/\s/g, '')
      reversed = processed.split('').reverse().join('')
    } else if (checkType === 'ignorePunctuation') {
      processed = input.replace(/[^\w]/g, '')
      reversed = processed.split('').reverse().join('')
    } else if (checkType === 'ignoreBoth') {
      processed = input.toLowerCase().replace(/[^\w]/g, '')
      reversed = processed.split('').reverse().join('')
    }

    const isPalindrome = processed === reversed
    const message = isPalindrome
      ? 'This is a palindrome!'
      : 'This is not a palindrome.'

    setResult({ isPalindrome, reversed, message })
    toast({
      title: isPalindrome ? "Palindrome!" : "Not a palindrome",
      description: message,
      variant: isPalindrome ? "default" : "destructive",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-blue-400" />
          Enhanced Palindrome Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Check if text is a palindrome (exact, ignore case, ignore spaces, ignore punctuation)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to check"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && check()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Check Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={checkType === 'exact' ? 'default' : 'outline'}
                onClick={() => setCheckType('exact')}
                className={checkType === 'exact' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Exact
              </Button>
              <Button
                size="sm"
                variant={checkType === 'ignoreCase' ? 'default' : 'outline'}
                onClick={() => setCheckType('ignoreCase')}
                className={checkType === 'ignoreCase' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ignore Case
              </Button>
              <Button
                size="sm"
                variant={checkType === 'ignoreSpaces' ? 'default' : 'outline'}
                onClick={() => setCheckType('ignoreSpaces')}
                className={checkType === 'ignoreSpaces' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ignore Spaces
              </Button>
              <Button
                size="sm"
                variant={checkType === 'ignorePunctuation' ? 'default' : 'outline'}
                onClick={() => setCheckType('ignorePunctuation')}
                className={checkType === 'ignorePunctuation' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ignore Punctuation
              </Button>
              <Button
                size="sm"
                variant={checkType === 'ignoreBoth' ? 'default' : 'outline'}
                onClick={() => setCheckType('ignoreBoth')}
                className={checkType === 'ignoreBoth' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ignore Both
              </Button>
            </div>
          </div>
          <Button
            onClick={check}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Check Palindrome
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {result.isPalindrome ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <Badge
                  variant="secondary"
                  className={result.isPalindrome ? 'bg-green-600/40 text-green-100 border-green-400/50' : 'bg-red-600/40 text-red-100 border-red-400/50'}
                >
                  {result.isPalindrome ? 'Palindrome' : 'Not a Palindrome'}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10 space-y-3">
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Original</h4>
                <p className="text-white/70 text-sm">{input}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Reversed</h4>
                <p className="text-white/70 text-sm">{result.reversed}</p>
              </div>
              <div>
                <p className={`text-sm text-center ${result.isPalindrome ? 'text-green-300' : 'text-red-300'}`}>
                  {result.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to check</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

