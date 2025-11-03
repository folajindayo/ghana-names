'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Loader2, Search } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SimilarName {
  name: string
  meaning: string
  tribe?: string
  gender?: string
  similarity: number
  type: 'database' | 'static'
}

export function NameSimilarityFinder() {
  const [searchName, setSearchName] = useState('')
  const [similarNames, setSimilarNames] = useState<SimilarName[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name to find similar ones.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSimilarNames([])

    try {
      const response = await fetch(`/api/names/similar?name=${encodeURIComponent(searchName)}&limit=8`)
      if (response.ok) {
        const data = await response.json()
        setSimilarNames(data.similarNames || [])
        
        if (data.similarNames.length === 0) {
          toast({
            title: "No similar names found",
            description: "Try a different name.",
          })
        }
      } else {
        throw new Error('Failed to find similar names')
      }
    } catch (error) {
      console.error('Error finding similar names:', error)
      toast({
        title: "Error",
        description: "Could not find similar names. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Search className="h-5 w-5" />
          Find Similar Names
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover names similar in sound or meaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="similarName" className="text-white/90">
            Enter a Name
          </Label>
          <div className="flex gap-2">
            <Input
              id="similarName"
              type="text"
              placeholder="e.g., Kwame, Akosua"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
            />
            <Button
              onClick={handleSearch}
              disabled={loading || !searchName.trim()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {similarNames.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-white/70 text-sm">Similar names found:</p>
            <div className="space-y-2">
              {similarNames.map((name, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold">{name.name}</span>
                          <Badge
                            variant="secondary"
                            className={
                              name.similarity >= 70
                                ? 'bg-green-500/20 text-green-300'
                                : name.similarity >= 50
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-blue-500/20 text-blue-300'
                            }
                          >
                            {name.similarity}% similar
                          </Badge>
                          {name.type === 'database' && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                              Claimed
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">"{name.meaning}"</p>
                        <div className="flex gap-2 mt-1">
                          {name.tribe && (
                            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                              {name.tribe}
                            </Badge>
                          )}
                          {name.gender && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                              {name.gender}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

