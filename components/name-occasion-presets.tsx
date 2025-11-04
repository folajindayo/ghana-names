'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Cake, GraduationCap, Heart, Baby, Sparkles, Gift, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

interface OccasionPreset {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  color: string
  gender?: 'male' | 'female'
  tribe?: string
}

const occasionPresets: OccasionPreset[] = [
  {
    id: 'birthday',
    label: 'Birthday',
    description: 'Celebrate a new year of life',
    icon: <Cake className="h-4 w-4" />,
    color: 'from-pink-500 to-rose-500',
    gender: 'any',
  },
  {
    id: 'newborn',
    label: 'Newborn',
    description: 'Welcome a new baby',
    icon: <Baby className="h-4 w-4" />,
    color: 'from-blue-500 to-cyan-500',
    gender: 'any',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    description: 'Celebrate a union',
    icon: <Heart className="h-4 w-4" />,
    color: 'from-red-500 to-pink-500',
    gender: 'any',
  },
  {
    id: 'graduation',
    label: 'Graduation',
    description: 'Celebrate academic achievement',
    icon: <GraduationCap className="h-4 w-4" />,
    color: 'from-purple-500 to-indigo-500',
    gender: 'any',
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    description: 'Mark a special milestone',
    icon: <Calendar className="h-4 w-4" />,
    color: 'from-yellow-500 to-orange-500',
    gender: 'any',
  },
  {
    id: 'gift',
    label: 'Gift Name',
    description: 'A name to gift someone special',
    icon: <Gift className="h-4 w-4" />,
    color: 'from-green-500 to-emerald-500',
    gender: 'any',
  },
]

interface NameOccasionPresetsProps {
  lastName: string
  onNameGenerated: (name: GhanaianName) => void
}

export function NameOccasionPresets({ lastName, onNameGenerated }: NameOccasionPresetsProps) {
  const { toast } = useToast()

  const handlePresetClick = (preset: OccasionPreset) => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name first.",
        variant: "destructive",
      })
      return
    }

    const name = getRandomName(preset.gender || 'any', lastName)
    onNameGenerated(name)

    toast({
      title: "Name generated!",
      description: `Special name for ${preset.label.toLowerCase()}: ${name.name} ${lastName}`,
    })
  }

  if (!lastName.trim()) return null

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-400" />
          Special Occasion Names
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate names for special occasions and celebrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {occasionPresets.map((preset) => (
            <Button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`bg-gradient-to-r ${preset.color} hover:opacity-90 text-white h-auto py-4 flex flex-col items-center gap-2`}
            >
              {preset.icon}
              <div className="text-center">
                <div className="font-semibold text-sm">{preset.label}</div>
                <div className="text-xs opacity-90">{preset.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

