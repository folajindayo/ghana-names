'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Hash, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LuckyNumbers {
  name: string
  lifePath: number
  expression: number
  soul: number
  personality: number
  luckyNumbers: number[]
  unluckyNumbers: number[]
}

function calculateLifePath(name: string): number {
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  }

  let sum = 0
  for (const char of name.toLowerCase()) {
    if (letterValues[char]) {
      sum += letterValues[char]
    }
  }

  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = Math.floor(sum / 10) + (sum % 10)
  }

  return sum
}

function generateLuckyNumbers(lifePath: number): number[] {
  const baseNumbers = [lifePath]
  if (lifePath > 0 && lifePath <= 9) {
    baseNumbers.push(lifePath * 2, lifePath * 3)
  }
  baseNumbers.push(7, 13, 21)
  return [...new Set(baseNumbers)].filter((n) => n > 0 && n <= 100).slice(0, 5)
}

function generateUnluckyNumbers(lifePath: number): number[] {
  const unlucky = []
  if (lifePath !== 4) unlucky.push(4)
  if (lifePath !== 13) unlucky.push(13)
  unlucky.push(lifePath + 5, lifePath - 2)
  return unlucky.filter((n) => n > 0 && n <= 100).slice(0, 3)
}

export function NameLuckyNumbers() {
  const [name, setName] = useState('')
  const [numbers, setNumbers] = useState<LuckyNumbers | null>(null)
  const { toast } = useToast()

  const calculateNumbers = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const lifePath = calculateLifePath(name)
    const expression = calculateLifePath(name.replace(/\s/g, ''))
    const soul = calculateLifePath(name.split(' ')[0] || name)
    const personality = calculateLifePath(name.split(' ').slice(1).join('') || name)

    const lucky = generateLuckyNumbers(lifePath)
    const unlucky = generateUnluckyNumbers(lifePath)

    setNumbers({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      lifePath,
      expression,
      soul,
      personality,
      luckyNumbers: lucky,
      unluckyNumbers: unlucky,
    })

    toast({
      title: "Lucky numbers calculated!",
      description: `Life Path Number: ${lifePath}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="h-5 w-5 text-green-400" />
          Lucky Numbers Calculator
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover your lucky numbers based on your name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Your Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame Asante"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateNumbers()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={calculateNumbers}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {numbers && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3">{numbers.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Life Path</p>
                <p className="text-2xl font-bold text-white">{numbers.lifePath}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Expression</p>
                <p className="text-2xl font-bold text-white">{numbers.expression}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Soul</p>
                <p className="text-2xl font-bold text-white">{numbers.soul}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Personality</p>
                <p className="text-2xl font-bold text-white">{numbers.personality}</p>
              </div>
            </div>

            <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-400" />
                Lucky Numbers
              </h4>
              <div className="flex flex-wrap gap-2">
                {numbers.luckyNumbers.map((num, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-600/40 text-green-100 border-green-400/50 font-bold text-lg px-3 py-1"
                  >
                    {num}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-red-500/10 rounded border border-red-500/30">
              <h4 className="text-white font-semibold mb-2">Numbers to Avoid</h4>
              <div className="flex flex-wrap gap-2">
                {numbers.unluckyNumbers.map((num, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-red-600/40 text-red-100 border-red-400/50 font-semibold"
                  >
                    {num}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !numbers && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to calculate</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

