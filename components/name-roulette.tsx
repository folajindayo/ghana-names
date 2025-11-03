'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCw, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

interface NameRouletteProps {
  lastName: string
  gender: 'any' | 'male' | 'female'
  onNameSelected: (name: GhanaianName) => void
}

export function NameRoulette({ lastName, gender, onNameSelected }: NameRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentName, setCurrentName] = useState<GhanaianName | null>(null)
  const [spinningInterval, setSpinningInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        const randomName = getRandomName(gender, lastName)
        setCurrentName(randomName)
      }, 100) // Change name every 100ms for spinning effect
      
      setSpinningInterval(interval)
      
      return () => {
        if (interval) clearInterval(interval)
      }
    } else {
      if (spinningInterval) {
        clearInterval(spinningInterval)
        setSpinningInterval(null)
      }
    }
  }, [isSpinning, gender, lastName])

  const handleStart = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name first.",
        variant: "destructive",
      })
      return
    }
    setIsSpinning(true)
    const randomName = getRandomName(gender, lastName)
    setCurrentName(randomName)
  }

  const handleStop = () => {
    setIsSpinning(false)
    if (currentName) {
      onNameSelected(currentName)
      toast({
        title: "Name selected!",
        description: `You got ${currentName.name} ${lastName}`,
      })
    }
  }

  if (!lastName.trim()) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-purple-500/30 border-2">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RotateCw className="h-5 w-5 text-purple-400" />
          Name Roulette
        </CardTitle>
        <CardDescription className="text-white/70">
          Spin the wheel and discover your name!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-8 bg-white/10 rounded-lg border-2 border-white/20 min-h-[200px] flex flex-col items-center justify-center">
          {currentName ? (
            <div className="space-y-3">
              <div className={`text-5xl font-bold ${isSpinning ? 'animate-pulse' : 'text-yellow-400'}`}>
                {currentName.name}
              </div>
              <div className="text-white/80 text-lg">{lastName}</div>
              {!isSpinning && (
                <>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-sm">
                    {currentName.meaning}
                  </Badge>
                  {currentName.tribe && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-sm">
                      {currentName.tribe}
                    </Badge>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="text-white/60">Click Start to spin!</div>
          )}
        </div>

        <div className="flex justify-center gap-2">
          {!isSpinning ? (
            <Button
              onClick={handleStart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Spinning
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
            >
              <Pause className="mr-2 h-4 w-4" />
              Stop & Select
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

