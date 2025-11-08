'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Replace, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextReplacerV2Enhanced() {
  const [input, setInput] = useState('')
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [replaceType, setReplaceType] = useState<string>('all')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const replace = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (!findText.trim()) {
      toast({
        title: "Find text required",
        description: "Please enter text to find",
        variant: "destructive",
      })
      return
    }

    let replaced = ''

    if (replaceType === 'all') {
      replaced = input.split(findText).join(replaceText)
    } else if (replaceType === 'first') {
      replaced = input.replace(findText, replaceText)
    } else if (replaceType === 'last') {
      const lastIndex = input.lastIndexOf(findText)
      if (lastIndex !== -1) {
        replaced = input.substring(0, lastIndex) + replaceText + input.substring(lastIndex + findText.length)
      } else {
        replaced = input
      }
    } else if (replaceType === 'caseInsensitive') {
      const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      replaced = input.replace(regex, replaceText)
    } else if (replaceType === 'regex') {
      try {
        const regex = new RegExp(findText, 'g')
        replaced = input.replace(regex, replaceText)
      } catch {
        toast({
          title: "Invalid regex",
          description: "Please enter a valid regular expression",
          variant: "destructive",
        })
        return
      }
    } else if (replaceType === 'words') {
      const regex = new RegExp('\\b' + findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g')
      replaced = input.replace(regex, replaceText)
    }

    setResult(replaced)
    const count = (input.match(new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), replaceType === 'caseInsensitive' ? 'gi' : 'g')) || []).length
    toast({
      title: "Replaced!",
      description: `Replaced ${count} occurrence${count !== 1 ? 's' : ''} (${replaceType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Replaced text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Replace className="h-5 w-5 text-orange-400" />
          Enhanced Text Replacer V2
        </CardTitle>
        <CardDescription className="text-white/70">
          Find and replace text with advanced options (all, first, last, case-insensitive, regex, words)
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
            <Label className="text-white/80">Find</Label>
            <Input
              placeholder="Enter text to find"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Replace With</Label>
            <Input
              placeholder="Enter replacement text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && replace()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Replace Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={replaceType === 'all' ? 'default' : 'outline'}
                onClick={() => setReplaceType('all')}
                className={replaceType === 'all' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={replaceType === 'first' ? 'default' : 'outline'}
                onClick={() => setReplaceType('first')}
                className={replaceType === 'first' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                First
              </Button>
              <Button
                size="sm"
                variant={replaceType === 'last' ? 'default' : 'outline'}
                onClick={() => setReplaceType('last')}
                className={replaceType === 'last' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Last
              </Button>
              <Button
                size="sm"
                variant={replaceType === 'caseInsensitive' ? 'default' : 'outline'}
                onClick={() => setReplaceType('caseInsensitive')}
                className={replaceType === 'caseInsensitive' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Case Insensitive
              </Button>
              <Button
                size="sm"
                variant={replaceType === 'regex' ? 'default' : 'outline'}
                onClick={() => setReplaceType('regex')}
                className={replaceType === 'regex' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Regex
              </Button>
              <Button
                size="sm"
                variant={replaceType === 'words' ? 'default' : 'outline'}
                onClick={() => setReplaceType('words')}
                className={replaceType === 'words' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Words Only
              </Button>
            </div>
          </div>
          <Button
            onClick={replace}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Replace Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                {replaceType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Replaced</h4>
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

        {input && findText && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text, find, and replace, then click to replace</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

