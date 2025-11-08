'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RotateCcw, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextReverserEnhanced() {
  const [input, setInput] = useState('')
  const [reverseType, setReverseType] = useState<string>('full')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const reverse = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let reversed = ''

    if (reverseType === 'full') {
      reversed = input.split('').reverse().join('')
    } else if (reverseType === 'words') {
      reversed = input.split(' ').reverse().join(' ')
    } else if (reverseType === 'lines') {
      reversed = input.split('\n').reverse().join('\n')
    } else if (reverseType === 'wordsAndChars') {
      reversed = input.split(' ').map(word => word.split('').reverse().join('')).join(' ')
    }

    setResult(reversed)
    toast({
      title: "Reversed!",
      description: `Text reversed (${reverseType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Reversed text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-orange-400" />
          Enhanced Text Reverser
        </CardTitle>
        <CardDescription className="text-white/70">
          Reverse text in different ways (full, words, lines, words and characters)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to reverse"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && reverse()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Reverse Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={reverseType === 'full' ? 'default' : 'outline'}
                onClick={() => setReverseType('full')}
                className={reverseType === 'full' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Full Text
              </Button>
              <Button
                size="sm"
                variant={reverseType === 'words' ? 'default' : 'outline'}
                onClick={() => setReverseType('words')}
                className={reverseType === 'words' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words Only
              </Button>
              <Button
                size="sm"
                variant={reverseType === 'lines' ? 'default' : 'outline'}
                onClick={() => setReverseType('lines')}
                className={reverseType === 'lines' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines Only
              </Button>
              <Button
                size="sm"
                variant={reverseType === 'wordsAndChars' ? 'default' : 'outline'}
                onClick={() => setReverseType('wordsAndChars')}
                className={reverseType === 'wordsAndChars' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words & Chars
              </Button>
            </div>
          </div>
          <Button
            onClick={reverse}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Reverse Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                Reversed ({reverseType})
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Reversed</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to reverse</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

