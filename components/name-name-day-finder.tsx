'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Sparkles, Cake } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameDay {
  name: string
  day: string
  date: string
  description: string
  celebration: string
}

const nameDays: NameDay[] = [
  {
    name: 'Kwame',
    day: 'Saturday',
    date: 'Every Saturday',
    description: 'Celebration day for those named Kwame',
    celebration: 'A day to honor Saturday-born individuals',
  },
  {
    name: 'Akosua',
    day: 'Sunday',
    date: 'Every Sunday',
    description: 'Celebration day for those named Akosua',
    celebration: 'A day to honor Sunday-born individuals',
  },
  {
    name: 'Kofi',
    day: 'Friday',
    date: 'Every Friday',
    description: 'Celebration day for those named Kofi',
    celebration: 'A day to honor Friday-born individuals',
  },
  {
    name: 'Ama',
    day: 'Saturday',
    date: 'Every Saturday',
    description: 'Celebration day for those named Ama',
    celebration: 'A day to honor Saturday-born individuals',
  },
  {
    name: 'Kojo',
    day: 'Monday',
    date: 'Every Monday',
    description: 'Celebration day for those named Kojo',
    celebration: 'A day to honor Monday-born individuals',
  },
  {
    name: 'Abena',
    day: 'Tuesday',
    date: 'Every Tuesday',
    description: 'Celebration day for those named Abena',
    celebration: 'A day to honor Tuesday-born individuals',
  },
]

export function NameNameDayFinder() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<NameDay | null>(null)
  const { toast } = useToast()

  const findNameDay = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const found = nameDays.find((nd) => nd.name.toLowerCase() === normalized.toLowerCase())

    if (found) {
      setResult(found)
      toast({
        title: "Name day found!",
        description: `${found.name}'s name day is ${found.day}`,
      })
    } else {
      setResult(null)
      toast({
        title: "Name day not found",
        description: "Name day information not available for this name",
        variant: "destructive",
      })
    }
  }

  const getNextOccurrence = (dayName: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const todayDay = today.getDay()
    const targetDay = days.indexOf(dayName)

    let daysUntil = targetDay - todayDay
    if (daysUntil <= 0) {
      daysUntil += 7
    }

    const nextDate = new Date(today)
    nextDate.setDate(today.getDate() + daysUntil)
    return nextDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-cyan-400" />
          Name Day Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Find when your name day is celebrated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findNameDay()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findNameDay}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Cake className="h-6 w-6 text-cyan-400" />
                <h3 className="text-3xl font-bold text-white">{result.name}</h3>
              </div>
              <Badge variant="secondary" className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 text-sm px-3 py-1">
                {result.day}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Name Day Information</h4>
              <div className="space-y-2 text-sm">
                <p className="text-white/80">
                  <strong className="text-white">Date:</strong> {result.date}
                </p>
                <p className="text-white/80">
                  <strong className="text-white">Next Occurrence:</strong> {getNextOccurrence(result.day)}
                </p>
                <p className="text-white/80 leading-relaxed">{result.description}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Celebration</h4>
              <p className="text-white/80 text-sm leading-relaxed">{result.celebration}</p>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm mb-2">Name day not found</p>
            <p className="text-white/50 text-xs">
              Available names: {nameDays.map((nd) => nd.name).join(', ')}
            </p>
          </div>
        )}

        {!name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="h-4 w-4 text-cyan-400" />
              <h4 className="text-white font-semibold text-sm">Available Names</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {nameDays.map((nameDay) => (
                <Badge
                  key={nameDay.name}
                  variant="secondary"
                  className="bg-cyan-600/40 text-cyan-100 border-cyan-400/50 text-xs cursor-pointer hover:bg-cyan-600/60"
                  onClick={() => {
                    setName(nameDay.name)
                    findNameDay()
                  }}
                >
                  {nameDay.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-cyan-500/10 rounded border border-cyan-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> Name days are celebrated weekly on the day of the week associated with the name. This is a traditional way to honor individuals with Ghanaian day names.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
