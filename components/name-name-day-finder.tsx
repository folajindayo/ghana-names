'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles, Gift } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameDay {
  name: string
  date: string
  dayOfWeek: string
  meaning: string
  celebration: string
}

const nameDays: NameDay[] = [
  {
    name: 'Kwame',
    date: 'January 7',
    dayOfWeek: 'Saturday',
    meaning: 'Born on Saturday',
    celebration: 'Kwame Day is celebrated with special prayers and community gatherings.',
  },
  {
    name: 'Akosua',
    date: 'January 8',
    dayOfWeek: 'Sunday',
    meaning: 'Born on Sunday',
    celebration: 'Akosua Day features traditional music and dance performances.',
  },
  {
    name: 'Kofi',
    date: 'January 13',
    dayOfWeek: 'Friday',
    meaning: 'Born on Friday',
    celebration: 'Kofi Day is marked by family reunions and sharing of traditional foods.',
  },
  {
    name: 'Ama',
    date: 'January 14',
    dayOfWeek: 'Saturday',
    meaning: 'Born on Saturday',
    celebration: 'Ama Day includes spiritual ceremonies and blessings.',
  },
  {
    name: 'Yaw',
    date: 'January 12',
    dayOfWeek: 'Thursday',
    meaning: 'Born on Thursday',
    celebration: 'Yaw Day celebrates with storytelling and cultural activities.',
  },
]

export function NameNameDayFinder() {
  const [searchName, setSearchName] = useState('')
  const [foundDay, setFoundDay] = useState<NameDay | null>(null)
  const { toast } = useToast()

  const findNameDay = () => {
    if (!searchName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = searchName.toLowerCase().trim()
    const found = nameDays.find((day) => day.name.toLowerCase() === normalized)

    if (found) {
      setFoundDay(found)
      toast({
        title: "Name day found!",
        description: `${found.name} Day is on ${found.date}`,
      })
    } else {
      toast({
        title: "Not found",
        description: `No name day found for "${searchName}"`,
        variant: "destructive",
      })
      setFoundDay(null)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-400" />
          Name Day Finder
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover when your name day is celebrated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Your Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && findNameDay()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={findNameDay}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {foundDay && (
          <div className="p-5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-5 w-5 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">{foundDay.name} Day</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/10 rounded border border-white/20">
                <p className="text-white/70 text-xs mb-1">Date</p>
                <p className="text-white font-semibold">{foundDay.date}</p>
              </div>
              <div className="p-3 bg-white/10 rounded border border-white/20">
                <p className="text-white/70 text-xs mb-1">Day</p>
                <p className="text-white font-semibold">{foundDay.dayOfWeek}</p>
              </div>
            </div>

            <div className="p-3 bg-white/10 rounded border border-white/20">
              <p className="text-white/70 text-xs mb-1">Meaning</p>
              <p className="text-white font-semibold">"{foundDay.meaning}"</p>
            </div>

            <div className="p-3 bg-white/10 rounded border border-white/20">
              <p className="text-white/70 text-xs mb-2">Celebration</p>
              <p className="text-white/90 text-sm leading-relaxed">{foundDay.celebration}</p>
            </div>
          </div>
        )}

        <div className="p-3 bg-white/5 rounded border border-white/10">
          <p className="text-white/60 text-xs">
            <strong className="text-white/80">Available names:</strong> Kwame, Akosua, Kofi, Ama, Yaw, Yaa, Kwabena, Abena, Kwaku, Akua, Kwadwo, Adwoa, Kwasi
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

