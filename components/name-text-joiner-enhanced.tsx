'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link2, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextJoinerEnhanced() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState(' ')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const join = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    const lines = input.trim().split('\n').filter(line => line.trim().length > 0)
    let joined = ''

    if (separator === 'space') {
      joined = lines.join(' ')
    } else if (separator === 'comma') {
      joined = lines.join(', ')
    } else if (separator === 'newline') {
      joined = lines.join('\n')
    } else if (separator === 'semicolon') {
      joined = lines.join('; ')
    } else if (separator === 'pipe') {
      joined = lines.join(' | ')
    } else if (separator === 'custom') {
      const customSeparator = prompt('Enter custom separator:') || ' '
      joined = lines.join(customSeparator)
    } else {
      joined = lines.join(separator)
    }

    setResult(joined)
    toast({
      title: "Joined!",
      description: `Joined ${lines.length} line${lines.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Joined text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-400" />
          Enhanced Text Joiner
        </CardTitle>
        <CardDescription className="text-white/70">
          Join multiple lines of text with different separators
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
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && join()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Separator</Label>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={separator === 'space' ? 'default' : 'outline'}
                onClick={() => setSeparator('space')}
                className={separator === 'space' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Space
              </Button>
              <Button
                size="sm"
                variant={separator === 'comma' ? 'default' : 'outline'}
                onClick={() => setSeparator('comma')}
                className={separator === 'comma' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Comma
              </Button>
              <Button
                size="sm"
                variant={separator === 'semicolon' ? 'default' : 'outline'}
                onClick={() => setSeparator('semicolon')}
                className={separator === 'semicolon' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Semicolon
              </Button>
              <Button
                size="sm"
                variant={separator === 'pipe' ? 'default' : 'outline'}
                onClick={() => setSeparator('pipe')}
                className={separator === 'pipe' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Pipe
              </Button>
              <Button
                size="sm"
                variant={separator === 'custom' ? 'default' : 'outline'}
                onClick={() => setSeparator('custom')}
                className={separator === 'custom' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Custom
              </Button>
            </div>
          </div>
          <Button
            onClick={join}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Join Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                Joined Text
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
            <p className="text-white/60 text-sm">Enter text and click to join</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

