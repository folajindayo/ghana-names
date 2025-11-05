'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Languages, Search, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Translation {
  word: string
  meaning: string
  language: string
}

const translations: Record<string, Translation[]> = {
  kwame: [{ word: 'Kwame', meaning: 'Born on Saturday', language: 'Akan' }],
  akosua: [{ word: 'Akosua', meaning: 'Born on Sunday', language: 'Akan' }],
  kofi: [{ word: 'Kofi', meaning: 'Born on Friday', language: 'Akan' }],
  ama: [{ word: 'Ama', meaning: 'Born on Saturday', language: 'Akan' }],
  yaw: [{ word: 'Yaw', meaning: 'Born on Thursday', language: 'Akan' }],
  yaa: [{ word: 'Yaa', meaning: 'Born on Thursday', language: 'Akan' }],
  kwabena: [{ word: 'Kwabena', meaning: 'Born on Tuesday', language: 'Akan' }],
  abena: [{ word: 'Abena', meaning: 'Born on Tuesday', language: 'Akan' }],
  kwaku: [{ word: 'Kwaku', meaning: 'Born on Wednesday', language: 'Akan' }],
  akua: [{ word: 'Akua', meaning: 'Born on Wednesday', language: 'Akan' }],
  kwadwo: [{ word: 'Kwadwo', meaning: 'Born on Monday', language: 'Akan' }],
  adwoa: [{ word: 'Adwoa', meaning: 'Born on Monday', language: 'Akan' }],
  kwasi: [{ word: 'Kwasi', meaning: 'Born on Sunday', language: 'Akan' }],
}

export function NameMeaningTranslator() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Translation[]>([])
  const { toast } = useToast()

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a name to translate",
        variant: "destructive",
      })
      return
    }

    const normalizedQuery = query.toLowerCase().trim()
    const found = translations[normalizedQuery]

    if (found) {
      setResults(found)
      toast({
        title: "Translation found!",
        description: `Found meaning for ${query}`,
      })
    } else {
      setResults([])
      toast({
        title: "Not found",
        description: `No translation found for "${query}"`,
        variant: "destructive",
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-blue-400" />
          Name Meaning Translator
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover the meaning behind Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Enter a Ghanaian name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-1">{result.word}</h4>
                    <p className="text-white/80 text-sm mb-2">"{result.meaning}"</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {result.language}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 mb-2">No translation found</p>
            <p className="text-white/50 text-xs">
              Try searching for: Kwame, Akosua, Kofi, Ama, Yaw, Yaa, Kwabena, Abena, Kwaku, Akua, Kwadwo, Adwoa, or Kwasi
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

