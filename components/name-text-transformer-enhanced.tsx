'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wand2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextTransformerEnhanced() {
  const [input, setInput] = useState('')
  const [transformations, setTransformations] = useState<string[]>([])
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const availableTransformations = [
    { id: 'uppercase', label: 'Uppercase' },
    { id: 'lowercase', label: 'Lowercase' },
    { id: 'title', label: 'Title Case' },
    { id: 'reverse', label: 'Reverse' },
    { id: 'removeSpaces', label: 'Remove Spaces' },
    { id: 'addSpaces', label: 'Add Spaces' },
    { id: 'removeNumbers', label: 'Remove Numbers' },
    { id: 'removePunctuation', label: 'Remove Punctuation' },
  ]

  const toggleTransformation = (id: string) => {
    setTransformations(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const transform = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (transformations.length === 0) {
      toast({
        title: "No transformations",
        description: "Please select at least one transformation",
        variant: "destructive",
      })
      return
    }

    let transformed = input

    transformations.forEach(transformation => {
      if (transformation === 'uppercase') {
        transformed = transformed.toUpperCase()
      } else if (transformation === 'lowercase') {
        transformed = transformed.toLowerCase()
      } else if (transformation === 'title') {
        transformed = transformed.split(' ').map(word =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
      } else if (transformation === 'reverse') {
        transformed = transformed.split('').reverse().join('')
      } else if (transformation === 'removeSpaces') {
        transformed = transformed.replace(/\s/g, '')
      } else if (transformation === 'addSpaces') {
        transformed = transformed.split('').join(' ')
      } else if (transformation === 'removeNumbers') {
        transformed = transformed.replace(/\d/g, '')
      } else if (transformation === 'removePunctuation') {
        transformed = transformed.replace(/[^\w\s]/g, '')
      }
    })

    setResult(transformed)
    toast({
      title: "Transformed!",
      description: `Applied ${transformations.length} transformation${transformations.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Transformed text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Wand2 className="h-5 w-5 text-fuchsia-400" />
          Enhanced Text Transformer
        </CardTitle>
        <CardDescription className="text-white/70">
          Apply multiple transformations to text at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to transform"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && transform()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Select Transformations</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableTransformations.map(transformation => (
                <Button
                  key={transformation.id}
                  size="sm"
                  variant={transformations.includes(transformation.id) ? 'default' : 'outline'}
                  onClick={() => toggleTransformation(transformation.id)}
                  className={transformations.includes(transformation.id) ? 'bg-fuchsia-500 hover:bg-fuchsia-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  {transformation.label}
                </Button>
              ))}
            </div>
            {transformations.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {transformations.map(id => {
                  const trans = availableTransformations.find(t => t.id === id)
                  return (
                    <Badge key={id} variant="secondary" className="bg-fuchsia-600/40 text-fuchsia-100 border-fuchsia-400/50">
                      {trans?.label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
          <Button
            onClick={transform}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-600 hover:to-pink-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Apply Transformations
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-fuchsia-600/40 text-fuchsia-100 border-fuchsia-400/50">
                {transformations.length} Transformation{transformations.length !== 1 ? 's' : ''} Applied
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Transformed</h4>
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
            <p className="text-white/60 text-sm">Enter text, select transformations, and click to transform</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

