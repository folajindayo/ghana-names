'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Sparkles, Music } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SimilarName {
  name: string
  similarity: number
  reason: string
  tribe: string
  meaning: string
}

const allNames = [
  { name: 'Kwame', tribe: 'Akan', meaning: 'Born on Saturday' },
  { name: 'Akosua', tribe: 'Akan', meaning: 'Born on Sunday' },
  { name: 'Kofi', tribe: 'Akan', meaning: 'Born on Friday' },
  { name: 'Ama', tribe: 'Akan', meaning: 'Born on Saturday' },
  { name: 'Kojo', tribe: 'Akan', meaning: 'Born on Monday' },
  { name: 'Abena', tribe: 'Akan', meaning: 'Born on Tuesday' },
  { name: 'Kwaku', tribe: 'Akan', meaning: 'Born on Wednesday' },
  { name: 'Efua', tribe: 'Akan', meaning: 'Born on Friday' },
  { name: 'Yaw', tribe: 'Akan', meaning: 'Born on Thursday' },
  { name: 'Adwoa', tribe: 'Akan', meaning: 'Born on Monday' },
  { name: 'Fiifi', tribe: 'Akan', meaning: 'Born on Friday' },
  { name: 'Aba', tribe: 'Akan', meaning: 'Born on Tuesday' },
]

// Simple phonetic similarity calculation
const calculateSimilarity = (name1: string, name2: string): { similarity: number; reason: string } => {
  const n1 = name1.toLowerCase()
  const n2 = name2.toLowerCase()

  if (n1 === n2) {
    return { similarity: 100, reason: 'Exact match' }
  }

  // Check for same starting letter
  if (n1[0] === n2[0]) {
    const commonLetters = n1.split('').filter((char) => n2.includes(char)).length
    const similarity = Math.min(90, 50 + commonLetters * 10)
    return { similarity, reason: 'Same starting letter and shared sounds' }
  }

  // Check for similar length
  const lengthDiff = Math.abs(n1.length - n2.length)
  if (lengthDiff <= 1) {
    const commonLetters = n1.split('').filter((char) => n2.includes(char)).length
    const similarity = Math.min(85, 40 + commonLetters * 8)
    return { similarity, reason: 'Similar length and shared sounds' }
  }

  // Check for vowel patterns
  const vowels1 = n1.match(/[aeiou]/g) || []
  const vowels2 = n2.match(/[aeiou]/g) || []
  if (vowels1.length === vowels2.length && vowels1.length > 0) {
    const commonVowels = vowels1.filter((v) => vowels2.includes(v)).length
    const similarity = Math.min(75, 30 + commonVowels * 10)
    return { similarity, reason: 'Similar vowel patterns' }
  }

  // General similarity
  const commonLetters = n1.split('').filter((char) => n2.includes(char)).length
  const similarity = Math.min(60, commonLetters * 8)
  return { similarity, reason: 'Some shared sounds' }
}

export function NameSoundSimilarity() {
  const [inputName, setInputName] = useState('')
  const [similarNames, setSimilarNames] = useState<SimilarName[]>([])
  const { toast } = useToast()

  const findSimilar = () => {
    if (!inputName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to find similar ones",
        variant: "destructive",
      })
      return
    }

    const normalized = inputName.trim()
    const results: SimilarName[] = []

    for (const nameData of allNames) {
      if (nameData.name.toLowerCase() === normalized.toLowerCase()) {
        continue // Skip the same name
      }

      const { similarity, reason } = calculateSimilarity(normalized, nameData.name)

      if (similarity > 30) {
        results.push({
          name: nameData.name,
          similarity,
          reason,
          tribe: nameData.tribe,
          meaning: nameData.meaning,
        })
      }
    }

    // Sort by similarity (highest first)
    results.sort((a, b) => b.similarity - a.similarity)

    setSimilarNames(results.slice(0, 8)) // Top 8 matches

    if (results.length === 0) {
      toast({
        title: "No similar names found",
        description: "Try a different name",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Similar names found!",
        description: `Found ${results.length} similar name(s)`,
      })
    }
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'bg-green-500/40 text-green-100 border-green-400/50'
    if (similarity >= 60) return 'bg-blue-500/40 text-blue-100 border-blue-400/50'
    if (similarity >= 40) return 'bg-yellow-500/40 text-yellow-100 border-yellow-400/50'
    return 'bg-orange-500/40 text-orange-100 border-orange-400/50'
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-teal-400" />
          Sound Similarity Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names that sound similar to your input
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findSimilar()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findSimilar}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {similarNames.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Music className="h-4 w-4" />
              <span>Found {similarNames.length} similar name(s)</span>
            </div>
            {similarNames.map((similar, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{similar.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {similar.tribe}
                      </Badge>
                      <Badge variant="secondary" className={getSimilarityColor(similar.similarity)}>
                        {similar.similarity}% similar
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      <strong className="text-white">Meaning:</strong> "{similar.meaning}"
                    </p>
                    <p className="text-white/60 text-xs">
                      <strong>Reason:</strong> {similar.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {inputName && similarNames.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No similar names found</p>
            <p className="text-white/50 text-xs mt-2">Try a different name or check spelling</p>
          </div>
        )}

        {!inputName && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className="h-4 w-4 text-teal-400" />
              <h4 className="text-white font-semibold text-sm">How It Works</h4>
            </div>
            <p className="text-white/70 text-xs">
              Enter a name to find other Ghanaian names that sound similar based on phonetic patterns, shared letters, and vowel structures.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

