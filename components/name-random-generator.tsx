'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dice6, RefreshCw, Sparkles } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

interface NameRandomGeneratorProps {
  lastName?: string
  onNameGenerated?: (name: GhanaianName) => void
}

export function NameRandomGenerator({ lastName = '', onNameGenerated }: NameRandomGeneratorProps) {
  const [currentName, setCurrentName] = useState<GhanaianName | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateRandom = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const name = getRandomName('any', lastName)
      setCurrentName(name)
      setIsGenerating(false)
      if (onNameGenerated) {
        onNameGenerated(name)
      }
      toast({
        title: "Random name generated!",
        description: `${name.name} ${lastName || ''}`.trim(),
      })
    }, 300)
  }

  // Generate on mount
  useState(() => {
    if (!currentName) {
      generateRandom()
    }
  })

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Dice6 className="h-5 w-5 text-purple-400" />
          Random Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Get a completely random Ghanaian name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentName && (
          <div className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">{currentName.name}</h3>
            </div>
            <p className="text-white/90 text-lg mb-3">"{currentName.meaning}"</p>
            <div className="flex justify-center gap-2">
              {currentName.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {currentName.tribe}
                </Badge>
              )}
              {currentName.gender && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                  {currentName.gender}
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={generateRandom}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Dice6 className="mr-2 h-4 w-4" />
              Roll Again
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

