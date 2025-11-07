'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

interface DayName {
  day: string
  maleName: string
  femaleName: string
  meaning: string
}

const dayNames: DayName[] = [
  { day: 'Sunday', maleName: 'Kwasi', femaleName: 'Akosua', meaning: 'Born on Sunday' },
  { day: 'Monday', maleName: 'Kojo', femaleName: 'Adwoa', meaning: 'Born on Monday' },
  { day: 'Tuesday', maleName: 'Kwabena', femaleName: 'Abena', meaning: 'Born on Tuesday' },
  { day: 'Wednesday', maleName: 'Kwaku', femaleName: 'Akua', meaning: 'Born on Wednesday' },
  { day: 'Thursday', maleName: 'Yaw', femaleName: 'Yaa', meaning: 'Born on Thursday' },
  { day: 'Friday', maleName: 'Kofi', femaleName: 'Efua', meaning: 'Born on Friday' },
  { day: 'Saturday', maleName: 'Kwame', femaleName: 'Ama', meaning: 'Born on Saturday' },
]

export function NameNameDayCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getDayName = (date: Date): DayName => {
    const dayOfWeek = date.getDay()
    return dayNames[dayOfWeek]
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const days = getDaysInMonth(currentDate)
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-400" />
          Name Day Calendar
        </CardTitle>
        <CardDescription className="text-white/70">
          View Ghanaian day names for each day of the month
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={previousMonth}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-bold text-white">{monthName}</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={nextMonth}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-white/70 text-xs font-semibold p-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={index} className="aspect-square" />
            }

            const dayName = getDayName(date)
            const isToday =
              date.toDateString() === new Date().toDateString()

            return (
              <div
                key={index}
                className={`aspect-square p-1 rounded border ${
                  isToday
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                } transition-colors cursor-pointer`}
                title={`${dayName.day}: ${dayName.maleName} / ${dayName.femaleName}`}
              >
                <div className="text-white/90 text-xs font-semibold mb-1">
                  {date.getDate()}
                </div>
                <div className="space-y-0.5">
                  <div className="text-[8px] text-blue-300 truncate">{dayName.maleName}</div>
                  <div className="text-[8px] text-pink-300 truncate">{dayName.femaleName}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 className="text-white font-semibold mb-3 text-sm">Day Names Legend</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {dayNames.map((dayName) => (
              <div key={dayName.day} className="p-2 bg-white/5 rounded border border-white/10">
                <div className="font-semibold text-white mb-1">{dayName.day}</div>
                <div className="text-blue-300">{dayName.maleName}</div>
                <div className="text-pink-300">{dayName.femaleName}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> Click on any date to see the Ghanaian day names. Blue indicates male names, pink indicates female names.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

