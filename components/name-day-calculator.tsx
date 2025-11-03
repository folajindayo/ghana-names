'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles, BookOpen, MapPin } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface DayName {
  name: string
  meaning: string
  day: string
  gender: 'male' | 'female'
}

const dayNames: Record<string, { male: DayName; female: DayName }> = {
  'Sunday': {
    male: { name: 'Kwesi', meaning: 'Born on Sunday', day: 'Sunday', gender: 'male' },
    female: { name: 'Akosua', meaning: 'Born on Sunday', day: 'Sunday', gender: 'female' },
  },
  'Monday': {
    male: { name: 'Kwadwo', meaning: 'Born on Monday', day: 'Monday', gender: 'male' },
    female: { name: 'Adwoa', meaning: 'Born on Monday', day: 'Monday', gender: 'female' },
  },
  'Tuesday': {
    male: { name: 'Kwabena', meaning: 'Born on Tuesday', day: 'Tuesday', gender: 'male' },
    female: { name: 'Abena', meaning: 'Born on Tuesday', day: 'Tuesday', gender: 'female' },
  },
  'Wednesday': {
    male: { name: 'Kwaku', meaning: 'Born on Wednesday', day: 'Wednesday', gender: 'male' },
    female: { name: 'Akua', meaning: 'Born on Wednesday', day: 'Wednesday', gender: 'female' },
  },
  'Thursday': {
    male: { name: 'Yaw', meaning: 'Born on Thursday', day: 'Thursday', gender: 'male' },
    female: { name: 'Yaa', meaning: 'Born on Thursday', day: 'Thursday', gender: 'female' },
  },
  'Friday': {
    male: { name: 'Kofi', meaning: 'Born on Friday', day: 'Friday', gender: 'male' },
    female: { name: 'Afua', meaning: 'Born on Friday', day: 'Friday', gender: 'female' },
  },
  'Saturday': {
    male: { name: 'Kwame', meaning: 'Born on Saturday', day: 'Saturday', gender: 'male' },
    female: { name: 'Ama', meaning: 'Born on Saturday', day: 'Saturday', gender: 'female' },
  },
}

export function NameDayCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [lastName, setLastName] = useState('')
  const [dayName, setDayName] = useState<DayName | null>(null)
  const { toast } = useToast()

  const calculateDayName = () => {
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please enter your birth date.",
        variant: "destructive",
      })
      return
    }

    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name.",
        variant: "destructive",
      })
      return
    }

    const date = new Date(birthDate)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    
    const nameData = dayNames[dayOfWeek]
    if (!nameData) {
      toast({
        title: "Error",
        description: "Could not determine day name.",
        variant: "destructive",
      })
      return
    }

    const selectedName = nameData[gender]
    setDayName(selectedName)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Name Day Calculator
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover your traditional Ghanaian day name based on your birth date
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-white/90">
              Birth Date *
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dayLastName" className="text-white/90">
              Last Name *
            </Label>
            <Input
              id="dayLastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dayGender" className="text-white/90">
              Gender
            </Label>
            <select
              id="dayGender"
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full rounded-md border bg-white/10 border-white/20 text-white px-3 py-2 text-sm focus:border-white/40 backdrop-blur-sm"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <Button
          onClick={calculateDayName}
          disabled={!birthDate || !lastName.trim()}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Calculate Day Name
        </Button>

        {dayName && (
          <Card className="bg-white/5 border-white/10 mt-4">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-yellow-400">
                  {dayName.name} {lastName}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {dayName.meaning}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Calendar className="mr-1 h-3 w-3" />
                    {dayName.day}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    {dayName.gender === 'male' ? 'Male' : 'Female'}
                  </Badge>
                </div>
                <p className="text-white/80 text-sm mt-4">
                  In Ghanaian culture, day names are given based on the day of the week you were born. 
                  This is a traditional naming practice among the Akan people of Ghana.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

