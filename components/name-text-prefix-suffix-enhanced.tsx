'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextPrefixSuffixEnhanced() {
  const [input, setInput] = useState('')
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const [applyTo, setApplyTo] = useState<string>('all')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const apply = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (!prefix.trim() && !suffix.trim()) {
      toast({
        title: "Prefix or suffix required",
        description: "Please enter a prefix or suffix",
        variant: "destructive",
      })
      return
    }

    let processed = ''

    if (applyTo === 'all') {
      processed = (prefix || '') + input + (suffix || '')
    } else if (applyTo === 'lines') {
      processed = input.split('\n').map(line =>
        (prefix || '') + line + (suffix || '')
      ).join('\n')
    } else if (applyTo === 'words') {
      processed = input.split(/\s+/).map(word =>
        (prefix || '') + word + (suffix || '')
      ).join(' ')
    } else if (applyTo === 'eachLine') {
      processed = input.split('\n').map(line =>
        line.trim() ? (prefix || '') + line + (suffix || '') : line
      ).join('\n')
    }

    setResult(processed)
    toast({
      title: "Applied!",
      description: `Prefix/suffix applied to ${applyTo}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-pink-400" />
          Enhanced Prefix/Suffix Adder
        </CardTitle>
        <CardDescription className="text-white/70">
          Add prefix and/or suffix to text (all, lines, words, each line)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Prefix</Label>
            <Input
              placeholder="Enter prefix (optional)"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Suffix</Label>
            <Input
              placeholder="Enter suffix (optional)"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && apply()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Apply To</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={applyTo === 'all' ? 'default' : 'outline'}
                onClick={() => setApplyTo('all')}
                className={applyTo === 'all' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All Text
              </Button>
              <Button
                size="sm"
                variant={applyTo === 'lines' ? 'default' : 'outline'}
                onClick={() => setApplyTo('lines')}
                className={applyTo === 'lines' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Each Line
              </Button>
              <Button
                size="sm"
                variant={applyTo === 'words' ? 'default' : 'outline'}
                onClick={() => setApplyTo('words')}
                className={applyTo === 'words' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Each Word
              </Button>
              <Button
                size="sm"
                variant={applyTo === 'eachLine' ? 'default' : 'outline'}
                onClick={() => setApplyTo('eachLine')}
                className={applyTo === 'eachLine' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Non-empty Lines
              </Button>
            </div>
          </div>
          <Button
            onClick={apply}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Apply Prefix/Suffix
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50">
                Applied to {applyTo}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
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
            <p className="text-white/60 text-sm">Enter text and prefix/suffix, then click to apply</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

