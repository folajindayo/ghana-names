'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextFormatterV2Enhanced() {
  const [input, setInput] = useState('')
  const [formatOptions, setFormatOptions] = useState<string[]>([])
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const availableOptions = [
    { id: 'trim', label: 'Trim' },
    { id: 'removeExtraSpaces', label: 'Remove Extra Spaces' },
    { id: 'removeNewlines', label: 'Remove Newlines' },
    { id: 'removeTabs', label: 'Remove Tabs' },
    { id: 'removeNumbers', label: 'Remove Numbers' },
    { id: 'removePunctuation', label: 'Remove Punctuation' },
    { id: 'removeSpecialChars', label: 'Remove Special Chars' },
    { id: 'normalizeUnicode', label: 'Normalize Unicode' },
  ]

  const toggleOption = (id: string) => {
    setFormatOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }

  const format = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    if (formatOptions.length === 0) {
      toast({
        title: "No options selected",
        description: "Please select at least one formatting option",
        variant: "destructive",
      })
      return
    }

    let formatted = input

    formatOptions.forEach(option => {
      if (option === 'trim') {
        formatted = formatted.trim()
      } else if (option === 'removeExtraSpaces') {
        formatted = formatted.replace(/\s+/g, ' ')
      } else if (option === 'removeNewlines') {
        formatted = formatted.replace(/\n/g, ' ')
      } else if (option === 'removeTabs') {
        formatted = formatted.replace(/\t/g, ' ')
      } else if (option === 'removeNumbers') {
        formatted = formatted.replace(/\d/g, '')
      } else if (option === 'removePunctuation') {
        formatted = formatted.replace(/[^\w\s]/g, '')
      } else if (option === 'removeSpecialChars') {
        formatted = formatted.replace(/[^a-zA-Z0-9\s]/g, '')
      } else if (option === 'normalizeUnicode') {
        formatted = formatted.normalize('NFC')
      }
    })

    setResult(formatted)
    toast({
      title: "Formatted!",
      description: `Applied ${formatOptions.length} formatting option${formatOptions.length !== 1 ? 's' : ''}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Formatted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-400" />
          Enhanced Text Formatter V2
        </CardTitle>
        <CardDescription className="text-white/70">
          Format text with multiple options (trim, remove spaces, normalize Unicode, etc.)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to format"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && format()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Format Options</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableOptions.map(option => (
                <Button
                  key={option.id}
                  size="sm"
                  variant={formatOptions.includes(option.id) ? 'default' : 'outline'}
                  onClick={() => toggleOption(option.id)}
                  className={formatOptions.includes(option.id) ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {formatOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formatOptions.map(id => {
                  const opt = availableOptions.find(o => o.id === id)
                  return (
                    <Badge key={id} variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50">
                      {opt?.label}
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>
          <Button
            onClick={format}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Format Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50">
                {formatOptions.length} Option{formatOptions.length !== 1 ? 's' : ''} Applied
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Formatted</h4>
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
            <p className="text-white/60 text-sm">Enter text, select options, and click to format</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

