'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Sparkles, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface RandomName {
  name: string
  meaning: string
  tribe: string
  gender: string
  dayOfWeek?: string
}

const namePool: RandomName[] = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Saturday' },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Sunday' },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Friday' },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Saturday' },
  { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Monday' },
  { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Tuesday' },
  { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Wednesday' },
  { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Friday' },
  { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Thursday' },
  { name: 'Adwoa', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Monday' },
  { name: 'Fiifi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', dayOfWeek: 'Friday' },
  { name: 'Aba', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', dayOfWeek: 'Tuesday' },
]

export function NameRandomPicker() {
  const [currentName, setCurrentName] = useState<RandomName | null>(null)
  const [history, setHistory] = useState<RandomName[]>([])
  const { toast } = useToast()

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * namePool.length)
    const picked = namePool[randomIndex]
    setCurrentName(picked)
    setHistory((prev) => [picked, ...prev].slice(0, 5)) // Keep last 5
    toast({
      title: "Random name picked!",
      description: `You got: ${picked.name}`,
    })
  }

  const clearHistory = () => {
    setHistory([])
    toast({
      title: "History cleared",
      description: "Previous picks have been cleared",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-purple-400" />
          Random Name Picker
        </CardTitle>
        <CardDescription className="text-white/70">
          Get a random Ghanaian name instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={pickRandom}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Pick Random Name
        </Button>

        {currentName && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{currentName.name}</h3>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                  {currentName.tribe}
                </Badge>
                <Badge
                  variant="secondary"
                  className={
                    currentName.gender === 'Male'
                      ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                      : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                  }
                >
                  {currentName.gender}
                </Badge>
                {currentName.dayOfWeek && (
                  <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs">
                    {currentName.dayOfWeek}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
              <p className="text-white/80 text-base leading-relaxed">
                <strong className="text-white">Meaning:</strong> "{currentName.meaning}"
              </p>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm">Recent Picks</h4>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearHistory}
                className="text-white/60 hover:text-white text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>
            <div className="space-y-2">
              {history.map((name, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-xs">#{index + 1}</span>
                    <span className="text-white font-semibold">{name.name}</span>
                    <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                      {name.tribe}
                    </Badge>
                  </div>
                  <span className="text-white/60 text-xs">{name.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!currentName && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click the button above to pick a random Ghanaian name!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

