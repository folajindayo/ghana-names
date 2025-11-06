'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Ruler, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface LengthComparison {
  name1: string
  name2: string
  length1: number
  length2: number
  difference: number
  longer: string
  shorter: string
  ratio: number
  comparison: string
}

export function NameLengthComparator() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [comparison, setComparison] = useState<LengthComparison | null>(null)
  const { toast } = useToast()

  const compareLengths = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both names",
        variant: "destructive",
      })
      return
    }

    const length1 = name1.trim().length
    const length2 = name2.trim().length
    const difference = Math.abs(length1 - length2)
    const longer = length1 > length2 ? name1 : name2
    const shorter = length1 < length2 ? name1 : name2
    const ratio = length1 > length2 ? length1 / length2 : length2 / length1

    let comparisonText = ''
    if (difference === 0) {
      comparisonText = 'Both names have the same length'
    } else if (difference <= 2) {
      comparisonText = 'Names are similar in length'
    } else if (difference <= 5) {
      comparisonText = 'Names have a moderate length difference'
    } else {
      comparisonText = 'Names have a significant length difference'
    }

    setComparison({
      name1: name1.trim(),
      name2: name2.trim(),
      length1,
      length2,
      difference,
      longer,
      shorter,
      ratio: Math.round(ratio * 10) / 10,
      comparison: comparisonText,
    })

    toast({
      title: "Lengths compared!",
      description: `${difference} character${difference !== 1 ? 's' : ''} difference`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Ruler className="h-5 w-5 text-green-400" />
          Length Comparator
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare the length of two names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">First Name</Label>
            <Input
              placeholder="Name 1"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Second Name</Label>
            <Input
              placeholder="Name 2"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compareLengths()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
        </div>

        <Button
          onClick={compareLengths}
          disabled={!name1.trim() || !name2.trim()}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Compare Lengths
        </Button>

        {comparison && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-white">{comparison.name1}</h3>
                <span className="text-white/60">vs</span>
                <h3 className="text-xl font-bold text-white">{comparison.name2}</h3>
              </div>
              <p className="text-white/80 text-sm mb-3">{comparison.comparison}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">{comparison.name1}</p>
                <p className="text-3xl font-bold text-white">{comparison.length1}</p>
                <p className="text-white/60 text-xs mt-1">characters</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">{comparison.name2}</p>
                <p className="text-3xl font-bold text-white">{comparison.length2}</p>
                <p className="text-white/60 text-xs mt-1">characters</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">Difference</span>
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                  {comparison.difference} chars
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Ratio</span>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {comparison.ratio}:1
                </Badge>
              </div>
            </div>

            <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
              <h4 className="text-white font-semibold mb-2 text-sm">Length Analysis</h4>
              <ul className="space-y-1">
                <li className="text-white/80 text-xs flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Longer: <strong>{comparison.longer}</strong> ({comparison.length1 > comparison.length2 ? comparison.length1 : comparison.length2} chars)
                </li>
                <li className="text-white/80 text-xs flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  Shorter: <strong>{comparison.shorter}</strong> ({comparison.length1 < comparison.length2 ? comparison.length1 : comparison.length2} chars)
                </li>
                {comparison.ratio > 1.5 && (
                  <li className="text-white/80 text-xs flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    Significant length difference ({comparison.ratio.toFixed(1)}x)
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {name1 && name2 && !comparison && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click compare to analyze lengths</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

