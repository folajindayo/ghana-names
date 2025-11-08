'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lines, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextLineProcessorEnhanced() {
  const [input, setInput] = useState('')
  const [operation, setOperation] = useState<string>('number')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const process = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const lines = input.split('\n').filter(line => line.trim().length > 0)
    let processed = ''

    if (operation === 'number') {
      processed = lines.map((line, index) => `${index + 1}. ${line}`).join('\n')
    } else if (operation === 'removeEmpty') {
      processed = input.split('\n').filter(line => line.trim().length > 0).join('\n')
    } else if (operation === 'removeDuplicates') {
      const seen = new Set<string>()
      processed = input.split('\n').filter(line => {
        const trimmed = line.trim()
        if (trimmed && !seen.has(trimmed)) {
          seen.add(trimmed)
          return true
        }
        return trimmed.length === 0
      }).join('\n')
    } else if (operation === 'sort') {
      processed = lines.sort().join('\n')
    } else if (operation === 'reverse') {
      processed = input.split('\n').reverse().join('\n')
    } else if (operation === 'trim') {
      processed = input.split('\n').map(line => line.trim()).join('\n')
    } else if (operation === 'uppercase') {
      processed = input.split('\n').map(line => line.toUpperCase()).join('\n')
    } else if (operation === 'lowercase') {
      processed = input.split('\n').map(line => line.toLowerCase()).join('\n')
    } else if (operation === 'capitalize') {
      processed = input.split('\n').map(line =>
        line.charAt(0).toUpperCase() + line.slice(1).toLowerCase()
      ).join('\n')
    } else if (operation === 'count') {
      processed = `Total lines: ${lines.length}\n\n${input}`
    }

    setResult(processed)
    toast({
      title: "Processed!",
      description: `Lines processed (${operation})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Processed text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lines className="h-5 w-5 text-orange-400" />
          Enhanced Line Processor
        </CardTitle>
        <CardDescription className="text-white/70">
          Process text line by line (number, remove empty, remove duplicates, sort, reverse, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text (one per line)</Label>
            <Input
              placeholder="Enter text, one item per line"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && process()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Operation</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={operation === 'number' ? 'default' : 'outline'}
                onClick={() => setOperation('number')}
                className={operation === 'number' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Number Lines
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeEmpty' ? 'default' : 'outline'}
                onClick={() => setOperation('removeEmpty')}
                className={operation === 'removeEmpty' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Empty
              </Button>
              <Button
                size="sm"
                variant={operation === 'removeDuplicates' ? 'default' : 'outline'}
                onClick={() => setOperation('removeDuplicates')}
                className={operation === 'removeDuplicates' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Remove Duplicates
              </Button>
              <Button
                size="sm"
                variant={operation === 'sort' ? 'default' : 'outline'}
                onClick={() => setOperation('sort')}
                className={operation === 'sort' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sort Lines
              </Button>
              <Button
                size="sm"
                variant={operation === 'reverse' ? 'default' : 'outline'}
                onClick={() => setOperation('reverse')}
                className={operation === 'reverse' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Reverse Lines
              </Button>
              <Button
                size="sm"
                variant={operation === 'trim' ? 'default' : 'outline'}
                onClick={() => setOperation('trim')}
                className={operation === 'trim' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Trim Lines
              </Button>
              <Button
                size="sm"
                variant={operation === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setOperation('uppercase')}
                className={operation === 'uppercase' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Uppercase
              </Button>
              <Button
                size="sm"
                variant={operation === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setOperation('lowercase')}
                className={operation === 'lowercase' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Lowercase
              </Button>
              <Button
                size="sm"
                variant={operation === 'capitalize' ? 'default' : 'outline'}
                onClick={() => setOperation('capitalize')}
                className={operation === 'capitalize' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Capitalize
              </Button>
              <Button
                size="sm"
                variant={operation === 'count' ? 'default' : 'outline'}
                onClick={() => setOperation('count')}
                className={operation === 'count' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Count Lines
              </Button>
            </div>
          </div>
          <Button
            onClick={process}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Process Lines
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                {operation}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Result</h4>
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
            <p className="text-white/60 text-sm">Enter text and click to process lines</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

