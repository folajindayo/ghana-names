'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSlugGeneratorEnhanced() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generate = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let slug = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, separator)
      .replace(/^-+|-+$/g, '')

    setResult(slug)
    toast({
      title: "Generated!",
      description: "URL-friendly slug generated",
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Slug copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Link className="h-5 w-5 text-green-400" />
          Enhanced Slug Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate URL-friendly slugs from text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to convert to slug"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Separator</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={separator === '-' ? 'default' : 'outline'}
                onClick={() => setSeparator('-')}
                className={separator === '-' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Hyphen (-)
              </Button>
              <Button
                size="sm"
                variant={separator === '_' ? 'default' : 'outline'}
                onClick={() => setSeparator('_')}
                className={separator === '_' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Underscore (_)
              </Button>
              <Button
                size="sm"
                variant={separator === '.' ? 'default' : 'outline'}
                onClick={() => setSeparator('.')}
                className={separator === '.' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Dot (.)
              </Button>
            </div>
          </div>
          <Button
            onClick={generate}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Slug
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                URL-Friendly Slug
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Slug</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm font-mono">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to generate slug</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

