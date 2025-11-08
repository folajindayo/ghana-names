'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Diff, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameTextDiffEnhanced() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [diffResult, setDiffResult] = useState<{ added: string[]; removed: string[]; unchanged: string[] } | null>(null)
  const { toast } = useToast()

  const calculateDiff = () => {
    if (!text1.trim() || !text2.trim()) {
      toast({
        title: "Both texts required",
        description: "Please enter both texts",
        variant: "destructive",
      })
      return
    }

    const words1 = text1.split(/\s+/)
    const words2 = text2.split(/\s+/)
    
    const added: string[] = []
    const removed: string[] = []
    const unchanged: string[] = []

    const maxLength = Math.max(words1.length, words2.length)
    
    for (let i = 0; i < maxLength; i++) {
      if (i >= words1.length) {
        added.push(words2[i])
      } else if (i >= words2.length) {
        removed.push(words1[i])
      } else if (words1[i] === words2[i]) {
        unchanged.push(words1[i])
      } else {
        removed.push(words1[i])
        added.push(words2[i])
      }
    }

    setDiffResult({ added, removed, unchanged })
    toast({
      title: "Diff calculated!",
      description: `Found ${added.length} additions, ${removed.length} removals`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Diff className="h-5 w-5 text-amber-400" />
          Enhanced Text Diff
        </CardTitle>
        <CardDescription className="text-white/70">
          Find differences between two texts (added, removed, unchanged words)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Original Text</Label>
            <Input
              placeholder="Enter original text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Modified Text</Label>
            <Input
              placeholder="Enter modified text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateDiff()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={calculateDiff}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Calculate Diff
          </Button>
        </div>

        {diffResult && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-red-600/40 text-red-100 border-red-400/50">
                {diffResult.removed.length} Removed
              </Badge>
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                {diffResult.added.length} Added
              </Badge>
              <Badge variant="secondary" className="bg-gray-600/40 text-gray-100 border-gray-400/50">
                {diffResult.unchanged.length} Unchanged
              </Badge>
            </div>

            <div className="space-y-3">
              {diffResult.removed.length > 0 && (
                <div className="p-4 bg-red-500/10 rounded border border-red-400/30">
                  <h4 className="text-red-300 font-semibold text-sm mb-2">Removed Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {diffResult.removed.map((word, index) => (
                      <Badge key={index} variant="destructive" className="bg-red-600/60 text-red-100">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {diffResult.added.length > 0 && (
                <div className="p-4 bg-green-500/10 rounded border border-green-400/30">
                  <h4 className="text-green-300 font-semibold text-sm mb-2">Added Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {diffResult.added.map((word, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-600/60 text-green-100">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {diffResult.unchanged.length > 0 && (
                <div className="p-4 bg-gray-500/10 rounded border border-gray-400/30">
                  <h4 className="text-gray-300 font-semibold text-sm mb-2">Unchanged Words</h4>
                  <div className="flex flex-wrap gap-2">
                    {diffResult.unchanged.map((word, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-600/60 text-gray-100">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {text1 && text2 && !diffResult && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter both texts and click to calculate diff</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

