'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BirthdayName {
  name: string
  meaning: string
  dayOfWeek: string
  significance: string
  traditions: string[]
}

const dayNames: Record<string, { male: string; female: string; meaning: string; significance: string; traditions: string[] }> = {
  Monday: {
    male: 'Kojo',
    female: 'Adwoa',
    meaning: 'Peaceful and calm',
    significance: 'Monday-born children are associated with peace and tranquility',
    traditions: ['Peace ceremonies', 'Meditation practices', 'Calm environments'],
  },
  Tuesday: {
    male: 'Kwabena',
    female: 'Abena',
    meaning: 'Warrior and protector',
    significance: 'Tuesday-born children are strong and protective',
    traditions: ['Strength rituals', 'Protection ceremonies', 'Warrior traditions'],
  },
  Wednesday: {
    male: 'Kwaku',
    female: 'Akua',
    meaning: 'Spiritual and wise',
    significance: 'Wednesday-born children are spiritually connected',
    traditions: ['Spiritual practices', 'Wisdom ceremonies', 'Divine connections'],
  },
  Thursday: {
    male: 'Yaw',
    female: 'Yaa',
    meaning: 'Earth and nature',
    significance: 'Thursday-born children are connected to nature',
    traditions: ['Nature rituals', 'Earth ceremonies', 'Agricultural practices'],
  },
  Friday: {
    male: 'Kofi',
    female: 'Efua',
    meaning: 'Wanderer and traveler',
    significance: 'Friday-born children are adventurous and free-spirited',
    traditions: ['Travel blessings', 'Adventure ceremonies', 'Freedom rituals'],
  },
  Saturday: {
    male: 'Kwame',
    female: 'Ama',
    meaning: 'God and divine',
    significance: 'Saturday-born children are blessed and divine',
    traditions: ['Divine blessings', 'Sacred ceremonies', 'Spiritual connections'],
  },
  Sunday: {
    male: 'Kwasi',
    female: 'Akosua',
    meaning: 'Sun and light',
    significance: 'Sunday-born children bring light and joy',
    traditions: ['Light ceremonies', 'Joy celebrations', 'Sun rituals'],
  },
}

export function NameBirthdayGenerator() {
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [generatedName, setGeneratedName] = useState<BirthdayName | null>(null)
  const { toast } = useToast()

  const generateName = () => {
    if (!birthday) {
      toast({
        title: "Birthday required",
        description: "Please enter your birthday",
        variant: "destructive",
      })
      return
    }

    const date = new Date(birthday)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' })
    const dayData = dayNames[dayOfWeek]

    if (!dayData) {
      toast({
        title: "Invalid date",
        description: "Please enter a valid date",
        variant: "destructive",
      })
      return
    }

    const name = gender === 'male' ? dayData.male : dayData.female

    setGeneratedName({
      name,
      meaning: dayData.meaning,
      dayOfWeek,
      significance: dayData.significance,
      traditions: dayData.traditions,
    })

    toast({
      title: "Name generated!",
      description: `${name} - Born on ${dayOfWeek}`,
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-pink-400" />
          Birthday Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate traditional Ghanaian day names based on birthday
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Birthday</Label>
          <Input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Gender</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setGender('male')}
              variant={gender === 'male' ? 'default' : 'outline'}
              className={
                gender === 'male'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              Male
            </Button>
            <Button
              onClick={() => setGender('female')}
              variant={gender === 'female' ? 'default' : 'outline'}
              className={
                gender === 'female'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              Female
            </Button>
          </div>
        </div>

        <Button
          onClick={generateName}
          disabled={!birthday}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Day Name
        </Button>

        {generatedName && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{generatedName.name}</h3>
              <Badge variant="secondary" className="bg-pink-600/40 text-pink-100 border-pink-400/50 font-semibold text-sm px-4 py-2">
                {generatedName.dayOfWeek}
              </Badge>
              <p className="text-white/90 text-sm mt-3">"{generatedName.meaning}"</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Significance</h4>
              <p className="text-white/80 text-xs">{generatedName.significance}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Traditions</h4>
              <div className="flex flex-wrap gap-2">
                {generatedName.traditions.map((tradition, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs"
                  >
                    {tradition}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {birthday && !generatedName && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to get your day name</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

