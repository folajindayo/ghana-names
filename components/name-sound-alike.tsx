'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Music2, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SoundAlike {
  name: string
  similarity: number
  reason: string
}

function levenshteinDistance(str1: string, str2: string): number {
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

export function NameSoundAlike() {
  const [name, setName] = useState('')
  const [matches, setMatches] = useState<SoundAlike[]>([])
  const { toast } = useToast()

  const allNames = [
    'Kwame', 'Akosua', 'Kofi', 'Ama', 'Yaw', 'Yaa', 'Kwabena', 'Abena',
    'Kwaku', 'Akua', 'Kwadwo', 'Adwoa', 'Kwasi', 'Akwasi', 'Kojo', 'Adjoa',
    'Nii', 'Naa', 'Afi', 'Efua', 'Kweku', 'Abenaa', 'Kofi', 'Afia',
  ]

  const findSoundAlikes = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const results: SoundAlike[] = []

    allNames.forEach((compareName) => {
      if (compareName.toLowerCase() === normalized) return

      const distance = levenshteinDistance(normalized, compareName.toLowerCase())
      const maxLength = Math.max(normalized.length, compareName.length)
      const similarity = ((maxLength - distance) / maxLength) * 100

      if (similarity >= 40) {
        let reason = ''
        if (distance === 1) {
          reason = 'Very similar spelling'
        } else if (distance === 2) {
          reason = 'Similar sound'
        } else if (normalized[0] === compareName.toLowerCase()[0]) {
          reason = 'Same starting letter'
        } else {
          reason = 'Similar pronunciation'
        }

        results.push({
          name: compareName,
          similarity: Math.round(similarity),
          reason,
        })
      }
    })

    results.sort((a, b) => b.similarity - a.similarity)
    setMatches(results.slice(0, 8))

    if (results.length === 0) {
      toast({
        title: "No matches",
        description: "No similar-sounding names found",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Sound-alikes found!",
        description: `Found ${results.length} similar name${results.length !== 1 ? 's' : ''}`,
      })
    }
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'bg-green-600/40 text-green-100 border-green-400/50'
    if (similarity >= 60) return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
    if (similarity >= 40) return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Music2 className="h-5 w-5 text-pink-400" />
          Sound-Alike Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names that sound similar to yours
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
              onKeyPress={(e) => e.key === 'Enter' && findSoundAlikes()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findSoundAlikes}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Music2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {matches.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              {matches.length} similar name{matches.length !== 1 ? 's' : ''} found
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-lg">{match.name}</h4>
                    <Badge variant="secondary" className={`${getSimilarityColor(match.similarity)} font-semibold`}>
                      {match.similarity}%
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm">{match.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {name && matches.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No similar-sounding names found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

