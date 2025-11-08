'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextHashEnhanced() {
  const [input, setInput] = useState('')
  const [hashType, setHashType] = useState<string>('simple')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const simpleHash = (str: string): string => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16)
  }

  const djb2Hash = (str: string): string => {
    let hash = 5381
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i)
    }
    return Math.abs(hash).toString(16)
  }

  const sdbmHash = (str: string): string => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash
    }
    return Math.abs(hash).toString(16)
  }

  const generateHash = () => {
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text",
        variant: "destructive",
      })
      return
    }

    let hash = ''

    if (hashType === 'simple') {
      hash = simpleHash(input)
    } else if (hashType === 'djb2') {
      hash = djb2Hash(input)
    } else if (hashType === 'sdbm') {
      hash = sdbmHash(input)
    } else if (hashType === 'length') {
      hash = input.length.toString(16)
    } else if (hashType === 'sum') {
      const sum = input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
      hash = sum.toString(16)
    }

    setResult(hash)
    toast({
      title: "Hashed!",
      description: `Hash generated (${hashType})`,
    })
  }

  const copy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-cyan-400" />
          Enhanced Text Hash Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate hash values from text using different algorithms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Enter Text</Label>
            <Input
              placeholder="Enter text to hash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateHash()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Hash Algorithm</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={hashType === 'simple' ? 'default' : 'outline'}
                onClick={() => setHashType('simple')}
                className={hashType === 'simple' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Simple
              </Button>
              <Button
                size="sm"
                variant={hashType === 'djb2' ? 'default' : 'outline'}
                onClick={() => setHashType('djb2')}
                className={hashType === 'djb2' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                DJB2
              </Button>
              <Button
                size="sm"
                variant={hashType === 'sdbm' ? 'default' : 'outline'}
                onClick={() => setHashType('sdbm')}
                className={hashType === 'sdbm' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                SDBM
              </Button>
              <Button
                size="sm"
                variant={hashType === 'length' ? 'default' : 'outline'}
                onClick={() => setHashType('length')}
                className={hashType === 'length' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Length
              </Button>
              <Button
                size="sm"
                variant={hashType === 'sum' ? 'default' : 'outline'}
                onClick={() => setHashType('sum')}
                className={hashType === 'sum' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Sum
              </Button>
            </div>
          </div>
          <Button
            onClick={generateHash}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Hash
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50">
                {hashType}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Hash Value</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copy}
                  className="text-white/60 hover:text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-white/90 text-sm font-mono break-all">{result}</p>
            </div>
          </div>
        )}

        {input && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text and click to generate hash</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

