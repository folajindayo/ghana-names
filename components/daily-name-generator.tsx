'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles, RefreshCw } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

interface DailyNameGeneratorProps {
  lastName: string
  onNameGenerated?: (name: GhanaianName) => void
}

export function DailyNameGenerator({ lastName, onNameGenerated }: DailyNameGeneratorProps) {
  const [todayName, setTodayName] = useState<GhanaianName | null>(null)
  const [lastGeneratedDate, setLastGeneratedDate] = useState<string | null>(null)

  useEffect(() => {
    if (!lastName.trim()) return

    const today = new Date().toDateString()
    const storedDate = localStorage.getItem(`daily-name-date-${lastName}`)
    const storedName = localStorage.getItem(`daily-name-${lastName}`)

    if (storedDate === today && storedName) {
      try {
        setTodayName(JSON.parse(storedName))
        setLastGeneratedDate(today)
      } catch (e) {
        generateDailyName()
      }
    } else {
      generateDailyName()
    }
  }, [lastName])

  const generateDailyName = () => {
    if (!lastName.trim()) return

    const name = getRandomName('any', lastName)
    const today = new Date().toDateString()

    setTodayName(name)
    setLastGeneratedDate(today)

    localStorage.setItem(`daily-name-date-${lastName}`, today)
    localStorage.setItem(`daily-name-${lastName}`, JSON.stringify(name))

    onNameGenerated?.(name)
  }

  const handleRegenerate = () => {
    generateDailyName()
  }

  const getDayOfWeekName = () => {
    const day = new Date().getDay()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return dayNames[day]
  }

  const canRegenerate = () => {
    const today = new Date().toDateString()
    return lastGeneratedDate !== today
  }

  if (!lastName.trim()) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Daily Name ({getDayOfWeekName()})
        </CardTitle>
        <CardDescription className="text-white/70">
          Your special name for today - regenerates daily
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todayName ? (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {todayName.name} {lastName}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {todayName.meaning}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {todayName.tribe} Tribe
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {todayName.gender === 'male' ? 'Male' : 'Female'}
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-sm">
                {canRegenerate() 
                  ? "New name available tomorrow!" 
                  : "This is your name for today. Check back tomorrow for a new one!"}
              </p>
              {canRegenerate() && (
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Get New Daily Name
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="h-8 w-8 animate-spin mx-auto mb-4 text-white/70" />
            <p className="text-white/70">Generating your daily name...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

