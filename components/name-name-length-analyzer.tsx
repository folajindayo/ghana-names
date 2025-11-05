'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Ruler, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LengthAnalysis {
  name: string
  length: number
  category: 'short' | 'medium' | 'long' | 'very long'
  characteristics: string[]
  recommendations: string[]
}

export function NameLengthAnalyzer() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<LengthAnalysis | null>(null)
  const { toast } = useToast()

  const analyzeLength = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const length = normalized.length

    let category: LengthAnalysis['category']
    let characteristics: string[]
    let recommendations: string[]

    if (length <= 3) {
      category = 'short'
      characteristics = ['Punchy', 'Memorable', 'Easy to pronounce', 'Quick to write']
      recommendations = ['Great for nicknames', 'Easy to remember', 'Works well with long surnames']
    } else if (length <= 6) {
      category = 'medium'
      characteristics = ['Balanced', 'Versatile', 'Professional', 'Classic']
      recommendations = ['Perfect length for most contexts', 'Easy to spell', 'Good for formal settings']
    } else if (length <= 9) {
      category = 'long'
      characteristics = ['Elegant', 'Distinctive', 'Traditional', 'Meaningful']
      recommendations = ['May need nickname for daily use', 'Great for formal occasions', 'Stands out']
    } else {
      category = 'very long'
      characteristics = ['Unique', 'Complex', 'Traditional', 'Distinctive']
      recommendations = ['Consider a shorter nickname', 'Very memorable', 'Traditional and meaningful']
    }

    setAnalysis({
      name: normalized,
      length,
      category,
      characteristics,
      recommendations,
    })

    toast({
      title: "Length analyzed!",
      description: `${name} is ${length} characters (${category})`,
    })
  }

  const getCategoryColor = () => {
    if (!analysis) return ''
    switch (analysis.category) {
      case 'short':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'medium':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'long':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'very long':
        return 'bg-orange-600/40 text-orange-100 border-orange-400/50'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Ruler className="h-5 w-5 text-indigo-400" />
          Name Length Analyzer
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze the length characteristics of names
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
              onKeyPress={(e) => e.key === 'Enter' && analyzeLength()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeLength}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <p className="text-3xl font-bold text-white">{analysis.length}</p>
                <span className="text-white/60">characters</span>
              </div>
              <Badge variant="secondary" className={`${getCategoryColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {analysis.category} Name
              </Badge>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Characteristics</h4>
              <div className="flex flex-wrap gap-2">
                {analysis.characteristics.map((char, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
                  >
                    {char}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <Sparkles className="h-3 w-3 text-yellow-400 mt-1.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

