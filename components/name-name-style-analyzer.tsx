'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface StyleAnalysis {
  name: string
  style: 'traditional' | 'modern' | 'classic' | 'unique' | 'elegant'
  formality: 'very formal' | 'formal' | 'casual' | 'very casual'
  uniqueness: number
  characteristics: string[]
  bestFor: string[]
  similarStyles: string[]
}

export function NameStyleAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<StyleAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeStyle = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    let style: StyleAnalysis['style'] = 'classic'
    let formality: StyleAnalysis['formality'] = 'formal'
    const characteristics: string[] = []
    const bestFor: string[] = []
    const similarStyles: string[] = []

    // Determine style
    if (normalized.startsWith('kw') || normalized.startsWith('ak')) {
      style = 'traditional'
      characteristics.push('Traditional Akan naming')
      characteristics.push('Day name origin')
      bestFor.push('Traditional ceremonies')
      bestFor.push('Cultural events')
      similarStyles.push('Kwame', 'Akosua', 'Kofi')
    } else if (normalized.length <= 3) {
      style = 'modern'
      characteristics.push('Short and punchy')
      characteristics.push('Contemporary feel')
      bestFor.push('Modern contexts')
      bestFor.push('Casual settings')
      similarStyles.push('Yaw', 'Ama', 'Kofi')
    } else if (normalized.length >= 8) {
      style = 'unique'
      characteristics.push('Distinctive length')
      characteristics.push('Memorable')
      bestFor.push('Standing out')
      bestFor.push('Artistic fields')
      similarStyles.push('Long traditional names')
    } else if (/[aeiou]{2,}/.test(normalized)) {
      style = 'elegant'
      characteristics.push('Flowing vowels')
      characteristics.push('Sophisticated')
      bestFor.push('Formal occasions')
      bestFor.push('Professional use')
      similarStyles.push('Elegant names')
    }

    // Determine formality
    if (normalized.length <= 4) {
      formality = 'casual'
    } else if (normalized.length >= 7) {
      formality = 'very formal'
    } else {
      formality = 'formal'
    }

    // Calculate uniqueness (0-100)
    const uniqueness = Math.min(100, Math.max(20, normalized.length * 10 + (style === 'unique' ? 30 : 0)))

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      style,
      formality,
      uniqueness,
      characteristics,
      bestFor,
      similarStyles,
    })

    toast({
      title: "Style analyzed!",
      description: `${style} style, ${formality} formality`,
    })
  }

  const getStyleColor = () => {
    if (!analysis) return ''
    switch (analysis.style) {
      case 'traditional':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
      case 'modern':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'classic':
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
      case 'unique':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'elegant':
        return 'bg-pink-600/40 text-pink-100 border-pink-400/50'
    }
  }

  const getFormalityColor = () => {
    if (!analysis) return ''
    switch (analysis.formality) {
      case 'very formal':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      case 'formal':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'casual':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'very casual':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Palette className="h-5 w-5 text-pink-400" />
          Style Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze name style and formality level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeStyle()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeStyle}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Badge variant="secondary" className={`${getStyleColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                  {analysis.style}
                </Badge>
                <Badge variant="secondary" className={`${getFormalityColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                  {analysis.formality}
                </Badge>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Uniqueness</span>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {analysis.uniqueness}%
                </Badge>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all"
                  style={{ width: `${analysis.uniqueness}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Characteristics</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.characteristics.map((char, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs"
                  >
                    {char}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Best For</h4>
              <ul className="space-y-1">
                {analysis.bestFor.map((use, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                    <Sparkles className="h-3 w-3 text-pink-400 mt-1" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.similarStyles.length > 0 && (
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <h4 className="text-white font-semibold mb-2 text-sm">Similar Styles</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.similarStyles.map((style, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-xs"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze style</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

