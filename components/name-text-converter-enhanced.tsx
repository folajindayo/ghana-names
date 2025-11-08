'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextConverterEnhanced() {
  const [input, setInput] = useState('')
  const [convertType, setConvertType] = useState<string>('uppercase')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const convert = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let converted = ''

    if (convertType === 'uppercase') {
      converted = input.toUpperCase()
    } else if (convertType === 'lowercase') {
      converted = input.toLowerCase()
    } else if (convertType === 'title') {
      converted = input.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    } else if (convertType === 'sentence') {
      converted = input.split('. ').map(sentence =>
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      ).join('. ')
    } else if (convertType === 'camelCase') {
      converted = input.split(/\s+/).map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
    } else if (convertType === 'PascalCase') {
      converted = input.split(/\s+/).map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
    } else if (convertType === 'snake_case') {
      converted = input.split(/\s+/).map(w => w.toLowerCase()).join('_')
    } else if (convertType === 'kebab-case') {
      converted = input.split(/\s+/).map(w => w.toLowerCase()).join('-')
    } else if (convertType === 'CONSTANT_CASE') {
      converted = input.split(/\s+/).map(w => w.toUpperCase()).join('_')
    } else if (convertType === 'alternating') {
      converted = input.split('').map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join('')
    }

    setResult(converted)
    toast({
      title: "Converted!",
      description: `Text converted to ${convertType}`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Converted text copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-cyan-400" />
          Enhanced Text Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert text to different case formats and styles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to convert"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && convert()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Convert Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={convertType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setConvertType('uppercase')}
                className={convertType === 'uppercase' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                UPPERCASE
              </Button>
              <Button
                size="sm"
                variant={convertType === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setConvertType('lowercase')}
                className={convertType === 'lowercase' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                lowercase
              </Button>
              <Button
                size="sm"
                variant={convertType === 'title' ? 'default' : 'outline'}
                onClick={() => setConvertType('title')}
                className={convertType === 'title' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Title Case
              </Button>
              <Button
                size="sm"
                variant={convertType === 'sentence' ? 'default' : 'outline'}
                onClick={() => setConvertType('sentence')}
                className={convertType === 'sentence' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentence Case
              </Button>
              <Button
                size="sm"
                variant={convertType === 'camelCase' ? 'default' : 'outline'}
                onClick={() => setConvertType('camelCase')}
                className={convertType === 'camelCase' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                camelCase
              </Button>
              <Button
                size="sm"
                variant={convertType === 'PascalCase' ? 'default' : 'outline'}
                onClick={() => setConvertType('PascalCase')}
                className={convertType === 'PascalCase' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                PascalCase
              </Button>
              <Button
                size="sm"
                variant={convertType === 'snake_case' ? 'default' : 'outline'}
                onClick={() => setConvertType('snake_case')}
                className={convertType === 'snake_case' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                snake_case
              </Button>
              <Button
                size="sm"
                variant={convertType === 'kebab-case' ? 'default' : 'outline'}
                onClick={() => setConvertType('kebab-case')}
                className={convertType === 'kebab-case' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                kebab-case
              </Button>
              <Button
                size="sm"
                variant={convertType === 'CONSTANT_CASE' ? 'default' : 'outline'}
                onClick={() => setConvertType('CONSTANT_CASE')}
                className={convertType === 'CONSTANT_CASE' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                CONSTANT_CASE
              </Button>
              <Button
                size="sm"
                variant={convertType === 'alternating' ? 'default' : 'outline'}
                onClick={() => setConvertType('alternating')}
                className={convertType === 'alternating' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                AlTeRnAtInG
              </Button>
            </div>
          </div>
          <Button
            onClick={convert}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Convert Text
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50">
                {convertType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm mb-4">{input}</p>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Converted</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to convert</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

