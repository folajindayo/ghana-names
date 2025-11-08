'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CaseSensitive, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextCaseConverterEnhanced() {
  const [input, setInput] = useState('')
  const [caseType, setCaseType] = useState<string>('uppercase')
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

    if (caseType === 'uppercase') {
      converted = input.toUpperCase()
    } else if (caseType === 'lowercase') {
      converted = input.toLowerCase()
    } else if (caseType === 'title') {
      converted = input.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    } else if (caseType === 'sentence') {
      converted = input.split('. ').map(sentence =>
        sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
      ).join('. ')
    } else if (caseType === 'camel') {
      converted = input.split(/\s+/).map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
    } else if (caseType === 'pascal') {
      converted = input.split(/\s+/).map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join('')
    } else if (caseType === 'snake') {
      converted = input.split(/\s+/).map(word => word.toLowerCase()).join('_')
    } else if (caseType === 'kebab') {
      converted = input.split(/\s+/).map(word => word.toLowerCase()).join('-')
    } else if (caseType === 'constant') {
      converted = input.split(/\s+/).map(word => word.toUpperCase()).join('_')
    } else if (caseType === 'alternating') {
      converted = input.split('').map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join('')
    }

    setResult(converted)
    toast({
      title: "Converted!",
      description: `Text converted to ${caseType} case`,
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
          <CaseSensitive className="h-5 w-5 text-lime-400" />
          Enhanced Case Converter
        </CardTitle>
        <CardDescription className="text-white/70">
          Convert text to different case formats (uppercase, lowercase, camelCase, snake_case, kebab-case, etc.)
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
            <Label className="text-white/80">Case Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={caseType === 'uppercase' ? 'default' : 'outline'}
                onClick={() => setCaseType('uppercase')}
                className={caseType === 'uppercase' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                UPPERCASE
              </Button>
              <Button
                size="sm"
                variant={caseType === 'lowercase' ? 'default' : 'outline'}
                onClick={() => setCaseType('lowercase')}
                className={caseType === 'lowercase' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                lowercase
              </Button>
              <Button
                size="sm"
                variant={caseType === 'title' ? 'default' : 'outline'}
                onClick={() => setCaseType('title')}
                className={caseType === 'title' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Title Case
              </Button>
              <Button
                size="sm"
                variant={caseType === 'sentence' ? 'default' : 'outline'}
                onClick={() => setCaseType('sentence')}
                className={caseType === 'sentence' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sentence Case
              </Button>
              <Button
                size="sm"
                variant={caseType === 'camel' ? 'default' : 'outline'}
                onClick={() => setCaseType('camel')}
                className={caseType === 'camel' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                camelCase
              </Button>
              <Button
                size="sm"
                variant={caseType === 'pascal' ? 'default' : 'outline'}
                onClick={() => setCaseType('pascal')}
                className={caseType === 'pascal' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                PascalCase
              </Button>
              <Button
                size="sm"
                variant={caseType === 'snake' ? 'default' : 'outline'}
                onClick={() => setCaseType('snake')}
                className={caseType === 'snake' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                snake_case
              </Button>
              <Button
                size="sm"
                variant={caseType === 'kebab' ? 'default' : 'outline'}
                onClick={() => setCaseType('kebab')}
                className={caseType === 'kebab' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                kebab-case
              </Button>
              <Button
                size="sm"
                variant={caseType === 'constant' ? 'default' : 'outline'}
                onClick={() => setCaseType('constant')}
                className={caseType === 'constant' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                CONSTANT_CASE
              </Button>
              <Button
                size="sm"
                variant={caseType === 'alternating' ? 'default' : 'outline'}
                onClick={() => setCaseType('alternating')}
                className={caseType === 'alternating' ? 'bg-lime-500 hover:bg-lime-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                AlTeRnAtInG
              </Button>
            </div>
          </div>
          <Button
            onClick={convert}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Convert Case
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-lime-600/40 text-lime-100 border-lime-400/50">
                {caseType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Original</h4>
              </div>
              <p className="text-white/70 text-sm whitespace-pre-wrap mb-4">{input}</p>
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
              <p className="text-white/90 text-sm whitespace-pre-wrap">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to convert case</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

