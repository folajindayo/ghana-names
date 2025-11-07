'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles, Gift } from 'lucide-react'
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
    maleName: 'Kwasi',
    femaleName: 'Akosua',
    meaning: 'Born on Sunday - associated with the sun',
  },
  {
    day: 'Monday',
    maleName: 'Kojo',
    femaleName: 'Adwoa',
    meaning: 'Born on Monday - associated with the moon',
  },
  {
    day: 'Tuesday',
    maleName: 'Kwabena',
    femaleName: 'Abena',
    meaning: 'Born on Tuesday - associated with Mars',
  },
  {
    day: 'Wednesday',
    maleName: 'Kwaku',
    femaleName: 'Akua',
    meaning: 'Born on Wednesday - associated with Mercury',
  },
  {
    day: 'Thursday',
    maleName: 'Yaw',
    femaleName: 'Yaa',
    meaning: 'Born on Thursday - associated with Jupiter',
  },
  {
    day: 'Friday',
    maleName: 'Kofi',
    femaleName: 'Efua',
    meaning: 'Born on Friday - associated with Venus',
  },
  {
    day: 'Saturday',
    maleName: 'Kwame',
    femaleName: 'Ama',
    meaning: 'Born on Saturday - associated with Saturn',
  },
]

export function NameBirthdayCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | ''>('')
  const [result, setResult] = useState<DayName | null>(null)
  const { toast } = useToast()

  const calculateDayName = () => {
    if (!birthDate) {
      toast({
        title: "Birth date required",
        description: "Please enter a birth date",
        variant: "destructive",
      })
      return
    }

    if (!gender) {
      toast({
        title: "Gender required",
        description: "Please select a gender",
        variant: "destructive",
      })
      return
    }

    const date = new Date(birthDate)
    const dayOfWeek = date.getDay()
    const dayNamesArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = dayNamesArray[dayOfWeek]

    const dayNameData = dayNames.find((d) => d.day === dayName)

    if (dayNameData) {
      setResult(dayNameData)
      toast({
        title: "Day name calculated!",
        description: `Your Ghanaian day name is ${gender === 'male' ? dayNameData.maleName : dayNameData.femaleName}`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-400" />
          Birthday Day Name Calculator
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover your traditional Ghanaian day name based on your birthday
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Birth Date</Label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Gender</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={gender === 'male' ? 'default' : 'outline'}
                onClick={() => setGender('male')}
                className={
                  gender === 'male'
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                Male
              </Button>
              <Button
                size="sm"
                variant={gender === 'female' ? 'default' : 'outline'}
                onClick={() => setGender('female')}
                className={
                  gender === 'female'
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                Female
              </Button>
            </div>
          </div>
          <Button
            onClick={calculateDayName}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Calculate Day Name
          </Button>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Gift className="h-6 w-6 text-orange-400" />
                <h3 className="text-3xl font-bold text-white">
                  {gender === 'male' ? result.maleName : result.femaleName}
                </h3>
              </div>
              <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50 text-sm px-3 py-1">
                {result.day}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Meaning</h4>
              <p className="text-white/80 text-sm leading-relaxed">{result.meaning}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Alternative Names</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                  Male: {result.maleName}
                </Badge>
                <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs">
                  Female: {result.femaleName}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {birthDate && gender && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click calculate to find your Ghanaian day name</p>
          </div>
        )}

        <div className="p-3 bg-orange-500/10 rounded border border-orange-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> In Akan culture, children are traditionally named based on the day of the week they were born. This is an important part of Ghanaian naming traditions.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

