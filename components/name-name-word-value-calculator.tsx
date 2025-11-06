'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WordValue {
  name: string
  alphabeticalValue: number
  numericalValue: number
  letterValues: Array<{ letter: string; position: number; value: number }>
  totalValue: number
  interpretation: string
}

export function NameWordValueCalculator() {
  const [name, setName] = useState('')
  const [value, setValue] = useState<WordValue | null>(null)
  const { toast } = useToast()

  const calculateValue = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim().replace(/\s/g, '')
    let alphabeticalValue = 0
    let numericalValue = 0
    const letterValues: Array<{ letter: string; position: number; value: number }> = []

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i]
      if (/[a-z]/.test(char)) {
        const position = i + 1
        const letterValue = char.charCodeAt(0) - 96 // a=1, b=2, etc.
        alphabeticalValue += letterValue
        letterValues.push({
          letter: char.toUpperCase(),
          position,
          value: letterValue,
        })
      } else if (/[0-9]/.test(char)) {
        numericalValue += parseInt(char)
      }
    }

    const totalValue = alphabeticalValue + numericalValue

    let interpretation = ''
    if (totalValue >= 100) {
      interpretation = 'Very high value name - strong and powerful'
    } else if (totalValue >= 50) {
      interpretation = 'High value name - significant meaning'
    } else if (totalValue >= 25) {
      interpretation = 'Moderate value name - balanced'
    } else {
      interpretation = 'Lower value name - simple and elegant'
    }

    setValue({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      alphabeticalValue,
      numericalValue,
      letterValues,
      totalValue,
      interpretation,
    })

    toast({
      title: "Value calculated!",
      description: `Total value: ${totalValue}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calculator className="h-5 w-5 text-teal-400" />
          Word Value Calculator
        </CardTitle>
        <CardDescription className="text-white/70">
          Calculate alphabetical and numerical values of names
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
              onKeyPress={(e) => e.key === 'Enter' && calculateValue()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculateValue}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {value && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{value.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="text-4xl font-bold text-white">{value.totalValue}</div>
                <span className="text-white/60">total value</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Alphabetical</p>
                <p className="text-2xl font-bold text-white">{value.alphabeticalValue}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Numerical</p>
                <p className="text-2xl font-bold text-white">{value.numericalValue}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Letter Values</h4>
              <div className="flex flex-wrap gap-2">
                {value.letterValues.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Badge variant="secondary" className="bg-teal-600/40 text-teal-100 border-teal-400/50 font-bold text-sm px-2 py-1">
                      {item.letter}
                    </Badge>
                    <span className="text-white/80 text-xs mt-1">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-teal-500/10 rounded border border-teal-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm">Interpretation</h4>
              <p className="text-white/80 text-xs">{value.interpretation}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (value.totalValue / 100) * 100)}%` }}
                />
              </div>
              <p className="text-white/70 text-xs mt-2 text-center">Value Score</p>
            </div>
          </div>
        )}

        {name && !value && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to calculate value</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

