'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Sparkles, TrendingUp } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WordValue {
  name: string
  alphabeticalValue: number
  numericalValue: number
  letterValues: Array<{ letter: string; position: number; value: number }>
  totalValue: number
}

export function NameWordValueCalculatorEnhanced() {
  const [name, setName] = useState('')
  const [value, setValue] = useState<WordValue | null>(null)
  const { toast } = useToast()

  const calculate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().toUpperCase().replace(/\s/g, '')
    let alphabeticalValue = 0
    let numericalValue = 0
    const letterValues: Array<{ letter: string; position: number; value: number }> = []

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i]
      if (/[A-Z]/.test(char)) {
        const letterValue = char.charCodeAt(0) - 64 // A=1, B=2, etc.
        const position = i + 1
        alphabeticalValue += letterValue
        numericalValue += letterValue * position
        letterValues.push({
          letter: char,
          position,
          value: letterValue,
        })
      }
    }

    const totalValue = alphabeticalValue + numericalValue

    setValue({
      name: name.trim(),
      alphabeticalValue,
      numericalValue,
      letterValues,
      totalValue,
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
          <Calculator className="h-5 w-5 text-emerald-400" />
          Enhanced Word Value Calculator
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
              onKeyPress={(e) => e.key === 'Enter' && calculate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculate}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {value && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{value.name}</h3>
              <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50 text-lg px-4 py-2">
                Total Value: {value.totalValue}
              </Badge>
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

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Letter Breakdown
              </h4>
              <div className="space-y-2">
                {value.letterValues.map((lv, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-emerald-600/40 text-emerald-100 border-emerald-400/50 text-xs">
                        {lv.letter}
                      </Badge>
                      <span className="text-white/70 text-xs">Position {lv.position}</span>
                    </div>
                    <span className="text-white font-semibold text-sm">{lv.value} points</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Calculation Method</h4>
              <div className="text-white/80 text-xs space-y-1">
                <p>• Alphabetical: Sum of letter positions (A=1, B=2, ..., Z=26)</p>
                <p>• Numerical: Sum of (letter value × position)</p>
                <p>• Total: Alphabetical + Numerical</p>
              </div>
            </div>
          </div>
        )}

        {name && !value && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click calculate to see word value</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

