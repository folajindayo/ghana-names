'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitCompare, Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextCompareEnhanced() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [compareType, setCompareType] = useState<string>('exact')
  const [result, setResult] = useState<{ equal: boolean; similarity: number; differences: string[] } | null>(null)
  const { toast } = useToast()

  const compare = () => {
    if (!text1.trim() || !text2.trim()) {
      toast({
        title: "Both texts required",
        description: "Please enter both texts to compare",
        variant: "destructive",
      })
      return
    }

    let equal = false
    let similarity = 0
    const differences: string[] = []

    if (compareType === 'exact') {
      equal = text1 === text2
      similarity = equal ? 100 : 0
      if (!equal) {
        differences.push('Texts are not identical')
      }
    } else if (compareType === 'caseInsensitive') {
      equal = text1.toLowerCase() === text2.toLowerCase()
      similarity = equal ? 100 : 0
      if (!equal) {
        differences.push('Texts differ in case')
      }
    } else if (compareType === 'ignoreSpaces') {
      const t1 = text1.replace(/\s/g, '')
      const t2 = text2.replace(/\s/g, '')
      equal = t1 === t2
      similarity = equal ? 100 : 0
      if (!equal) {
        differences.push('Texts differ when spaces are ignored')
      }
    } else if (compareType === 'similarity') {
      const longer = text1.length > text2.length ? text1 : text2
      const shorter = text1.length > text2.length ? text2 : text1
      if (longer.length === 0) {
        similarity = 100
        equal = true
      } else {
        const distance = levenshteinDistance(text1, text2)
        similarity = Math.round(((longer.length - distance) / longer.length) * 100)
        equal = similarity === 100
        differences.push(`Levenshtein distance: ${distance}`)
      }
    } else if (compareType === 'length') {
      equal = text1.length === text2.length
      similarity = equal ? 100 : Math.round((Math.min(text1.length, text2.length) / Math.max(text1.length, text2.length)) * 100)
      if (!equal) {
        differences.push(`Length difference: ${Math.abs(text1.length - text2.length)} characters`)
      }
    }

    setResult({ equal, similarity, differences })
    toast({
      title: equal ? "Texts match!" : "Texts differ",
      description: `Similarity: ${similarity}%`,
    })
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = []
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    return matrix[str2.length][str1.length]
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-sky-400" />
          Enhanced Text Compare
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare two texts in different ways (exact, case-insensitive, similarity, length)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Text 1</Label>
            <Input
              placeholder="Enter first text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Text 2</Label>
            <Input
              placeholder="Enter second text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compare()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Compare Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={compareType === 'exact' ? 'default' : 'outline'}
                onClick={() => setCompareType('exact')}
                className={compareType === 'exact' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Exact
              </Button>
              <Button
                size="sm"
                variant={compareType === 'caseInsensitive' ? 'default' : 'outline'}
                onClick={() => setCompareType('caseInsensitive')}
                className={compareType === 'caseInsensitive' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Case Insensitive
              </Button>
              <Button
                size="sm"
                variant={compareType === 'ignoreSpaces' ? 'default' : 'outline'}
                onClick={() => setCompareType('ignoreSpaces')}
                className={compareType === 'ignoreSpaces' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Ignore Spaces
              </Button>
              <Button
                size="sm"
                variant={compareType === 'similarity' ? 'default' : 'outline'}
                onClick={() => setCompareType('similarity')}
                className={compareType === 'similarity' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Similarity
              </Button>
              <Button
                size="sm"
                variant={compareType === 'length' ? 'default' : 'outline'}
                onClick={() => setCompareType('length')}
                className={compareType === 'length' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}
              >
                Length
              </Button>
            </div>
          </div>
          <Button
            onClick={compare}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Compare Texts
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                {result.equal ? (
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <Badge
                  variant="secondary"
                  className={result.equal ? 'bg-green-600/40 text-green-100 border-green-400/50' : 'bg-red-600/40 text-red-100 border-red-400/50'}
                >
                  {result.equal ? 'Match' : 'Different'}
                </Badge>
                <Badge variant="secondary" className="bg-sky-600/40 text-sky-100 border-sky-400/50">
                  {result.similarity}% Similar
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10 space-y-3">
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Text 1</h4>
                <p className="text-white/70 text-sm">{text1 || '(empty)'}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Text 2</h4>
                <p className="text-white/70 text-sm">{text2 || '(empty)'}</p>
              </div>
              {result.differences.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Differences</h4>
                  <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                    {result.differences.map((diff, index) => (
                      <li key={index}>{diff}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {text1 && text2 && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter both texts and click to compare</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

