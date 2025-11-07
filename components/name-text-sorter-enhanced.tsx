'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextSorterEnhanced() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [sortBy, setSortBy] = useState<'alphabetical' | 'reverse' | 'length' | 'random'>('alphabetical')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const sort = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const lines = input.trim().split('\n').filter(line => line.trim().length > 0)
    let sorted: string[] = []

    if (sortBy === 'alphabetical') {
      sorted = [...lines].sort((a, b) => a.localeCompare(b))
    } else if (sortBy === 'reverse') {
      sorted = [...lines].sort((a, b) => b.localeCompare(a))
    } else if (sortBy === 'length') {
      sorted = [...lines].sort((a, b) => a.length - b.length)
    } else if (sortBy === 'random') {
      sorted = [...lines].sort(() => Math.random() - 0.5)
    }

    setResult(sorted.join('\n'))
    toast({
      title: "Sorted!",
      description: `Sorted ${sorted.length} item${sorted.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Sorted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5 text-green-400" />
          Enhanced Text Sorter
        </CardTitle>
        <CardDescription className="text-white/70">
          Sort text lines alphabetically, by length, reverse, or randomly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text (one per line)</Label>
            <Input
              placeholder="Enter names or text, one per line"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && sort()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Sort By</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={sortBy === 'alphabetical' ? 'default' : 'outline'}
                onClick={() => setSortBy('alphabetical')}
                className={sortBy === 'alphabetical' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                A-Z
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'reverse' ? 'default' : 'outline'}
                onClick={() => setSortBy('reverse')}
                className={sortBy === 'reverse' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Z-A
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'length' ? 'default' : 'outline'}
                onClick={() => setSortBy('length')}
                className={sortBy === 'length' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Length
              </Button>
              <Button
                size="sm"
                variant={sortBy === 'random' ? 'default' : 'outline'}
                onClick={() => setSortBy('random')}
                className={sortBy === 'random' ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Random
              </Button>
            </div>
          </div>
          <Button
            onClick={sort}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Sort Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} Sort
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Sorted Result</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to sort</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

