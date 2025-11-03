'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface DayName {
  day: string
  maleName: string
  femaleName: string
  meaning: string
}

const dayNames: DayName[] = [
  {
    day: 'Sunday',
    maleName: 'Kwesi',
    femaleName: 'Akosua',
    meaning: 'Born on Sunday',
  },
  {
    day: 'Monday',
    maleName: 'Kojo',
    femaleName: 'Adwoa',
    meaning: 'Born on Monday',
  },
  {
    day: 'Tuesday',
    maleName: 'Kwabena',
    femaleName: 'Abena',
    meaning: 'Born on Tuesday',
  },
  {
    day: 'Wednesday',
    maleName: 'Kwaku',
    femaleName: 'Akua',
    meaning: 'Born on Wednesday',
  },
  {
    day: 'Thursday',
    maleName: 'Yaw',
    femaleName: 'Yaa',
    meaning: 'Born on Thursday',
  },
  {
    day: 'Friday',
    maleName: 'Kofi',
    femaleName: 'Afua',
    meaning: 'Born on Friday',
  },
  {
    day: 'Saturday',
    maleName: 'Kwame',
    femaleName: 'Ama',
    meaning: 'Born on Saturday',
  },
]

export function NameCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { toast } = useToast()

  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const getDayName = (date: Date) => {
    const day = getDayOfWeek(date)
    return dayNames.find((dn) => dn.day === day) || dayNames[0]
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    toast({
      title: "Today's name",
      description: "Showing name for today.",
    })
  }

  const currentDayName = getDayName(currentDate)
  const isToday = currentDate.toDateString() === new Date().toDateString()

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-400" />
          Day Name Calendar
        </CardTitle>
        <CardDescription className="text-white/70">
          Akan day names based on day of the week
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigateDate('prev')}
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-white font-semibold text-lg">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {isToday && (
              <Badge className="bg-yellow-500/20 text-yellow-300 mt-1">Today</Badge>
            )}
          </div>
          <Button
            onClick={() => navigateDate('next')}
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day Name Display */}
        <div className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4">
          <div className="text-center">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 mb-2">
              {currentDayName.meaning}
            </Badge>
            <p className="text-white/70 text-sm">{currentDayName.day}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded border border-white/10">
              <p className="text-white/70 text-xs mb-2">Male Name</p>
              <p className="text-white font-bold text-xl">{currentDayName.maleName}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded border border-white/10">
              <p className="text-white/70 text-xs mb-2">Female Name</p>
              <p className="text-white font-bold text-xl">{currentDayName.femaleName}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Button
          onClick={goToToday}
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white"
        >
          Go to Today
        </Button>

        {/* All Day Names Table */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-white font-semibold mb-3 text-sm">All Day Names</p>
          <div className="space-y-2">
            {dayNames.map((dayName, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white/5 rounded text-sm"
              >
                <span className="text-white/70">{dayName.day}</span>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                    {dayName.maleName}
                  </Badge>
                  <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 text-xs">
                    {dayName.femaleName}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

