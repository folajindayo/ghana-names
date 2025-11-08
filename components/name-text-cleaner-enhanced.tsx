'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextCleanerEnhanced() {
  const [input, setInput] = useState('')
  const [cleanOptions, setCleanOptions] = useState<string[]>([])
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const availableOptions = [
    { id: 'trim', label: 'Trim Whitespace' },
    { id: 'removeExtraSpaces', label: 'Remove Extra Spaces' },
    { id: 'removeNewlines', label: 'Remove Newlines' },
    { id: 'removeTabs', label: 'Remove Tabs' },
    { id: 'removeNumbers', label: 'Remove Numbers' },
    { id: 'removePunctuation', label: 'Remove Punctuation' },
    { id: 'removeSpecialChars', label: 'Remove Special Chars' },
    { id: 'removeEmojis', label: 'Remove Emojis' },
  ]

  const toggleOption = (id: string) => {
    setCleanOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }

  const clean = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (cleanOptions.length === 0) {
      toast({
        title: "No options selected",
        description: "Please select at least one cleaning option",
        variant: "destructive",
      })
      return
    }

    let cleaned = input

    cleanOptions.forEach(option => {
      if (option === 'trim') {
        cleaned = cleaned.trim()
      } else if (option === 'removeExtraSpaces') {
        cleaned = cleaned.replace(/\s+/g, ' ')
      } else if (option === 'removeNewlines') {
        cleaned = cleaned.replace(/\n/g, ' ')
      } else if (option === 'removeTabs') {
        cleaned = cleaned.replace(/\t/g, ' ')
      } else if (option === 'removeNumbers') {
        cleaned = cleaned.replace(/\d/g, '')
      } else if (option === 'removePunctuation') {
        cleaned = cleaned.replace(/[^\w\s]/g, '')
      } else if (option === 'removeSpecialChars') {
        cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '')
      } else if (option === 'removeEmojis') {
        cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      }
    })

    setResult(cleaned)
    toast({
      title: "Cleaned!",
      description: `Applied ${cleanOptions.length} cleaning option${cleanOptions.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Cleaned text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles2 className="h-5 w-5 text-yellow-400" />
          Enhanced Text Cleaner
        </CardTitle>
        <CardDescription className="text-white/70">
          Clean text by removing unwanted characters, spaces, and formatting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to clean"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && clean()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Cleaning Options</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableOptions.map(option => (
                <Button
                  key={option.id}
                  size="sm"
                  variant={cleanOptions.includes(option.id) ? 'default' : 'outline'}
                  onClick={() => toggleOption(option.id)}
                  className={cleanOptions.includes(option.id) ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {cleanOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cleanOptions.map(id => {
                  const opt = availableOptions.find(o => o.id === id)
                  return (
                    <Badge key={id} variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50">
                      {opt?.label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
          <Button
            onClick={clean}
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Clean Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-100 border-yellow-400/50">
                {cleanOptions.length} Option{cleanOptions.length !== 1 ? 's' : ''} Applied
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Cleaned</h4>
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
            <p className="text-white/60 text-sm">Enter text, select options, and click to clean</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

