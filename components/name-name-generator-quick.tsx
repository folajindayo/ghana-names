'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, RefreshCw } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

interface NameGeneratorQuickProps {
  lastName: string
  onNameSelected?: (name: GhanaianName) => void
}

export function NameGeneratorQuick({ lastName, onNameSelected }: NameGeneratorQuickProps) {
  const [currentName, setCurrentName] = useState<GhanaianName | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateQuick = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name first",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      const name = getRandomName('any', lastName)
      setCurrentName(name)
      setIsGenerating(false)
      if (onNameSelected) {
        onNameSelected(name)
      }
      toast({
        title: "Name generated!",
        description: `${name.name} ${lastName}`,
      })
    }, 200)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Quick Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate a name instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentName && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {currentName.name} {lastName}
            </h3>
            <p className="text-white/80 text-sm mb-3">"{currentName.meaning}"</p>
            <div className="flex justify-center gap-2">
              {currentName.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                  {currentName.tribe}
                </Badge>
              )}
              {currentName.gender && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                  {currentName.gender}
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={generateQuick}
          disabled={isGenerating || !lastName.trim()}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate Now
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

