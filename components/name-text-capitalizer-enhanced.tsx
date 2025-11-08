'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextCapitalizerEnhanced() {
  const [input, setInput] = useState('')
  const [capitalizeType, setCapitalizeType] = useState<string>('sentence')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const capitalize = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let capitalized = ''

    if (capitalizeType === 'uppercase') {
      capitalized = input.toUpperCase()
    } else if (capitalizeType === 'lowercase') {
      capitalized = input.toLowerCase()
    } else if (capitalizeType === 'title') {
      capitalized = input.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    } else if (capitalizeType === 'sentence') {
      capitalized = input.split('. ').map(sentence => 
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      ).join('. ')
    } else if (capitalizeType === 'alternating') {
      capitalized = input.split('').map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join('')
    } else if (capitalizeType === 'firstLetter') {
      capitalized = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    }

    setResult(capitalized)
    toast({
      title: "Capitalized!",
      description: `Text capitalized (${capitalizeType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Capitalized text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-indigo-400" />
          Enhanced Text Capitalizer
        </CardTitle>
        <CardDescription className="text-white/70">
          Capitalize text in different ways (uppercase, lowercase, title, sentence, alternating, first letter)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to capitalize"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && capitalize()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Capitalization Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={capitalizeType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('uppercase')}
                className={capitalizeType === 'uppercase' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                UPPERCASE
              </Button>
              <Button
                size="sm"
                variant={capitalizeType === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('lowercase')}
                className={capitalizeType === 'lowercase' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                lowercase
              </Button>
              <Button
                size="sm"
                variant={capitalizeType === 'title' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('title')}
                className={capitalizeType === 'title' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Title Case
              </Button>
              <Button
                size="sm"
                variant={capitalizeType === 'sentence' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('sentence')}
                className={capitalizeType === 'sentence' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentence Case
              </Button>
              <Button
                size="sm"
                variant={capitalizeType === 'alternating' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('alternating')}
                className={capitalizeType === 'alternating' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                AlTeRnAtInG
              </Button>
              <Button
                size="sm"
                variant={capitalizeType === 'firstLetter' ? 'default' : 'outline'}
                onClick={() => setCapitalizeType('firstLetter')}
                className={capitalizeType === 'firstLetter' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                First Letter
              </Button>
            </div>
          </div>
          <Button
            onClick={capitalize}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Capitalize Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50">
                {capitalizeType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Capitalized</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm whitespace-pre-wrap">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to capitalize</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

