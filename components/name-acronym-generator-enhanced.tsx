'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameAcronymGeneratorEnhanced() {
  const [fullName, setFullName] = useState('')
  const [acronyms, setAcronyms] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generate = () => {
    if (!fullName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a full name",
        variant: "destructive",
      })
      return
    }

    const words = fullName.trim().split(/\s+/)
    const generated: string[] = []

    // Standard acronym (first letter of each word)
    const standard = words.map((word) => word.charAt(0).toUpperCase()).join('')
    generated.push(standard)

    // First two letters of each word
    if (words.length > 1) {
      const firstTwo = words.map((word) => word.substring(0, 2).toUpperCase()).join('')
      generated.push(firstTwo)
    }

    // First and last letter of each word
    if (words.length > 1) {
      const firstLast = words.map((word) => {
        if (word.length > 1) {
          return (word.charAt(0) + word.charAt(word.length - 1)).toUpperCase()
        }
        return word.charAt(0).toUpperCase()
      }).join('')
      generated.push(firstLast)
    }

    // First letter of first word + first two of others
    if (words.length > 1) {
      const mixed = words.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase()
        }
        return word.substring(0, Math.min(2, word.length)).toUpperCase()
      }).join('')
      generated.push(mixed)
    }

    // All caps version
    generated.push(standard)

    setAcronyms([...new Set(generated)])
    toast({
      title: "Acronyms generated!",
      description: `Generated ${generated.length} acronym(s)`,
    })
  }

  const copyAll = () => {
    if (acronyms.length === 0) return
    const text = acronyms.join(', ')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "All acronyms copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-blue-400" />
          Enhanced Acronym Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate multiple acronym variations from full names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Full Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Mensah, Akosua Asante"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generate}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {acronyms.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm">
                Generated Acronyms ({acronyms.length})
              </h4>
              <Button
                size="sm"
                variant="outline"
                onClick={copyAll}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {acronyms.map((acronym, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-sm px-3 py-1 cursor-pointer hover:bg-blue-600/60"
                  onClick={() => {
                    navigator.clipboard.writeText(acronym)
                    toast({
                      title: "Copied!",
                      description: `${acronym} copied to clipboard`,
                    })
                  }}
                >
                  {acronym}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {fullName && acronyms.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a full name and click generate to create acronyms</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

