'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextFrequencyCounterEnhanced() {
  const [input, setInput] = useState('')
  const [countType, setCountType] = useState<string>('words')
  const [frequencies, setFrequencies] = useState<Array<{ item: string; count: number }>>([])
  const { toast } = useToast()

  const count = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const freqMap = new Map<string, number>()
    let items: string[] = []

    if (countType === 'words') {
      items = input.split(/\s+/).filter(w => w.trim().length > 0).map(w => w.toLowerCase().replace(/[^\w]/g, ''))
    } else if (countType === 'characters') {
      items = input.split('').filter(c => c.trim().length > 0)
    } else if (countType === 'lines') {
      items = input.split('\n').filter(l => l.trim().length > 0).map(l => l.trim())
    } else if (countType === 'sentences') {
      items = input.split(/[.!?]+\s*/).filter(s => s.trim().length > 0).map(s => s.trim())
    } else if (countType === 'letters') {
      items = input.split('').filter(c => /[a-zA-Z]/.test(c)).map(c => c.toLowerCase())
    }

    items.forEach(item => {
      if (item) {
        freqMap.set(item, (freqMap.get(item) || 0) + 1)
      }
    })

    const sorted = Array.from(freqMap.entries())
      .map(([item, count]) => ({ item, count }))
      .sort((a, b) => b.count - a.count)

    setFrequencies(sorted)
    toast({
      title: "Counted!",
      description: `Found ${sorted.length} unique ${countType}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-cyan-400" />
          Enhanced Frequency Counter
        </CardTitle>
        <CardDescription className="text-white/70">
          Count frequency of words, characters, lines, sentences, or letters in text
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to analyze"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && count()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Count Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={countType === 'words' ? 'default' : 'outline'}
                onClick={() => setCountType('words')}
                className={countType === 'words' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words
              </Button>
              <Button
                size="sm"
                variant={countType === 'characters' ? 'default' : 'outline'}
                onClick={() => setCountType('characters')}
                className={countType === 'characters' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Characters
              </Button>
              <Button
                size="sm"
                variant={countType === 'lines' ? 'default' : 'outline'}
                onClick={() => setCountType('lines')}
                className={countType === 'lines' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lines
              </Button>
              <Button
                size="sm"
                variant={countType === 'sentences' ? 'default' : 'outline'}
                onClick={() => setCountType('sentences')}
                className={countType === 'sentences' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentences
              </Button>
              <Button
                size="sm"
                variant={countType === 'letters' ? 'default' : 'outline'}
                onClick={() => setCountType('letters')}
                className={countType === 'letters' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Letters
              </Button>
            </div>
          </div>
          <Button
            onClick={count}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Count Frequencies
          </Button>
        </div>

        {frequencies.length > 0 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50">
                {frequencies.length} Unique {countType}
              </Badge>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {frequencies.slice(0, 50).map((freq, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-cyan-600/20 text-cyan-200 border-cyan-400/30 text-xs">
                        #{index + 1}
                      </Badge>
                      <p className="text-white/90 text-sm font-semibold">{freq.item}</p>
                    </div>
                    <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50">
                      {freq.count}x
                    </Badge>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{ width: `${(freq.count / frequencies[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {frequencies.length > 50 && (
                <p className="text-white/60 text-xs text-center">
                  Showing top 50 of {frequencies.length} items
                </p>
              )}
            </div>
          </div>
        )}

        {input && frequencies.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to count frequencies</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

