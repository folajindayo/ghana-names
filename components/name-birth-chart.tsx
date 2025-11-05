'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface DayName {
  day: string
  name: string
  meaning: string
  gender: 'male' | 'female'
}

const dayNames: Record<string, { male: DayName; female: DayName }> = {
  Sunday: {
    male: { day: 'Sunday', name: 'Kwasi', meaning: 'Born on Sunday', gender: 'male' },
    female: { day: 'Sunday', name: 'Akosua', meaning: 'Born on Sunday', gender: 'female' },
  },
  Monday: {
    male: { day: 'Monday', name: 'Kwadwo', meaning: 'Born on Monday', gender: 'male' },
    female: { day: 'Monday', name: 'Adwoa', meaning: 'Born on Monday', gender: 'female' },
  },
  Tuesday: {
    male: { day: 'Tuesday', name: 'Kwabena', meaning: 'Born on Tuesday', gender: 'male' },
    female: { day: 'Tuesday', name: 'Abena', meaning: 'Born on Tuesday', gender: 'female' },
  },
  Wednesday: {
    male: { day: 'Wednesday', name: 'Kwaku', meaning: 'Born on Wednesday', gender: 'male' },
    female: { day: 'Wednesday', name: 'Akua', meaning: 'Born on Wednesday', gender: 'female' },
  },
  Thursday: {
    male: { day: 'Thursday', name: 'Yaw', meaning: 'Born on Thursday', gender: 'male' },
    female: { day: 'Thursday', name: 'Yaa', meaning: 'Born on Thursday', gender: 'female' },
  },
  Friday: {
    male: { day: 'Friday', name: 'Kofi', meaning: 'Born on Friday', gender: 'male' },
    female: { day: 'Friday', name: 'Afia', meaning: 'Born on Friday', gender: 'female' },
  },
  Saturday: {
    male: { day: 'Saturday', name: 'Kwame', meaning: 'Born on Saturday', gender: 'male' },
    female: { day: 'Saturday', name: 'Ama', meaning: 'Born on Saturday', gender: 'female' },
  },
}

export function NameBirthChart() {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [dayName, setDayName] = useState<DayName | null>(null)
  const { toast } = useToast()

  const calculateDayName = () => {
    if (!birthDate) {
      toast({
        title: "Date required",
        description: "Please enter your birth date",
        variant: "destructive",
      })
      return
    }

    const date = new Date(birthDate)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    const nameInfo = dayNames[dayOfWeek]

    if (nameInfo) {
      const selectedName = nameInfo[gender]
      setDayName(selectedName)
      toast({
        title: "Day name calculated!",
        description: `${selectedName.name} - ${selectedName.meaning}`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-400" />
          Birth Day Name
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover your traditional Ghanaian day name
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Birth Date</Label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Gender</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setGender('male')}
              variant={gender === 'male' ? 'default' : 'outline'}
              className={gender === 'male' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/10 border-white/20 text-white'}
            >
              Male
            </Button>
            <Button
              onClick={() => setGender('female')}
              variant={gender === 'female' ? 'default' : 'outline'}
              className={gender === 'female' ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/10 border-white/20 text-white'}
            >
              Female
            </Button>
          </div>
        </div>

        <Button
          onClick={calculateDayName}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Calculate Day Name
        </Button>

        {dayName && (
          <div className="p-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <h3 className="text-2xl font-bold text-white">{dayName.name}</h3>
            </div>
            <p className="text-white/90 text-lg mb-3">"{dayName.meaning}"</p>
            <div className="flex justify-center gap-2">
              <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                {dayName.day}
              </Badge>
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                {dayName.gender}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

