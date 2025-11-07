'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Sparkles, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SimilarName {
  name: string
  meaning: string
  tribe: string
  similarity: number
  reason: string
}

const nameDatabase = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan' },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan' },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan' },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan' },
  { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan' },
  { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan' },
  { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan' },
  { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan' },
  { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan' },
  { name: 'Adwoa', meaning: 'Born on Monday', tribe: 'Akan' },
]

export function NameSimilarityFinder() {
  const [name, setName] = useState('')
  const [results, setResults] = useState<SimilarName[]>([])
  const { toast } = useToast()

  const calculateSimilarity = (name1: string, name2: string): { similarity: number; reason: string } => {
    const n1 = name1.toLowerCase()
    const n2 = name2.toLowerCase()

    if (n1 === n2) {
      return { similarity: 100, reason: 'Exact match' }
    }

    // Check starting letters
    if (n1[0] === n2[0]) {
      const commonChars = n1.split('').filter((char) => n2.includes(char)).length
      const similarity = Math.min(90, 60 + commonChars * 5)
      return { similarity, reason: 'Same starting letter and shared characters' }
    }

    // Check length similarity
    const lengthDiff = Math.abs(n1.length - n2.length)
    if (lengthDiff <= 1) {
      const commonChars = n1.split('').filter((char) => n2.includes(char)).length
      const similarity = Math.min(85, 40 + commonChars * 6)
      return { similarity, reason: 'Similar length and shared characters' }
    }

    // General similarity
    const commonChars = n1.split('').filter((char) => n2.includes(char)).length
    const similarity = Math.min(70, commonChars * 8)
    return { similarity, reason: 'Some shared characters' }
  }

  const findSimilar = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim()
    const similar: SimilarName[] = []

    for (const nameData of nameDatabase) {
      if (nameData.name.toLowerCase() === normalized.toLowerCase()) {
        continue
      }

      const { similarity, reason } = calculateSimilarity(normalized, nameData.name)

      if (similarity > 30) {
        similar.push({
          name: nameData.name,
          meaning: nameData.meaning,
          tribe: nameData.tribe,
          similarity,
          reason,
        })
      }
    }

    similar.sort((a, b) => b.similarity - a.similarity)
    setResults(similar.slice(0, 8))

    if (similar.length === 0) {
      toast({
        title: "No similar names found",
        description: "Try a different name",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Similar names found!",
        description: `Found ${similar.length} similar name(s)`,
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
          <Search className="h-5 w-5 text-cyan-400" />
          Similarity Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find names similar to your input
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
              onKeyPress={(e) => e.key === 'Enter' && findSimilar()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findSimilar}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Users className="h-4 w-4" />
              <span>Found {results.length} similar name(s)</span>
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{result.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {result.tribe}
                      </Badge>
                      <Badge variant="secondary" className={getSimilarityColor(result.similarity)}>
                        {result.similarity}% similar
                      </Badge>
                    </div>
                    <p className="text-white/80 text-sm mb-2">
                      <strong className="text-white">Meaning:</strong> "{result.meaning}"
                    </p>
                    <p className="text-white/60 text-xs">
                      <strong>Reason:</strong> {result.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {name && results.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">No similar names found</p>
            <p className="text-white/50 text-xs mt-2">Try a different name or check spelling</p>
          </div>
        )}

        {!name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Search className="h-4 w-4 text-cyan-400" />
              <h4 className="text-white font-semibold text-sm">How It Works</h4>
            </div>
            <p className="text-white/70 text-xs">
              Enter a name to find other Ghanaian names that are similar based on spelling, pronunciation, and character patterns.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
