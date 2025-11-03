'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, BookOpen, Users, Heart, Zap, Star } from 'lucide-react'
import type { GhanaianName } from '@/lib/ghanaian-names'
import { getRandomName, getNamesByTribe, getNamesByGender } from '@/lib/ghanaian-names'

interface NameGeneratorPresetsProps {
  lastName: string
  onNameGenerated: (name: GhanaianName) => void
}

type PresetType = 'random' | 'tribe-akan' | 'tribe-ewe' | 'tribe-ga' | 'male-only' | 'female-only' | 'popular'

const presets: Array<{
  id: PresetType
  label: string
  description: string
  icon: React.ReactNode
  color: string
}> = [
  {
    id: 'random',
    label: 'Random',
    description: 'Any random name',
    icon: <Sparkles className="h-4 w-4" />,
    color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'tribe-akan',
    label: 'Akan Tribe',
    description: 'Traditional Akan names',
    icon: <BookOpen className="h-4 w-4" />,
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'tribe-ewe',
    label: 'Ewe Tribe',
    description: 'Traditional Ewe names',
    icon: <BookOpen className="h-4 w-4" />,
    color: 'bg-green-500/20 text-green-300 border-green-500/30',
  },
  {
    id: 'tribe-ga',
    label: 'Ga Tribe',
    description: 'Traditional Ga names',
    icon: <BookOpen className="h-4 w-4" />,
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
  {
    id: 'male-only',
    label: 'Male Names',
    description: 'Male names only',
    icon: <Users className="h-4 w-4" />,
    color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    id: 'female-only',
    label: 'Female Names',
    description: 'Female names only',
    icon: <Heart className="h-4 w-4" />,
    color: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  },
  {
    id: 'popular',
    label: 'Popular',
    description: 'Most claimed names',
    icon: <Star className="h-4 w-4" />,
    color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
]

export function NameGeneratorPresets({ lastName, onNameGenerated }: NameGeneratorPresetsProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetType | null>(null)

  const handlePresetClick = (presetId: PresetType) => {
    setSelectedPreset(presetId)
    let generatedName: GhanaianName | null = null

    switch (presetId) {
      case 'random':
        generatedName = getRandomName('any', lastName)
        break
      case 'tribe-akan':
        const akanNames = getNamesByTribe('Akan')
        if (akanNames.length > 0) {
          generatedName = {
            ...akanNames[Math.floor(Math.random() * akanNames.length)],
            lastName,
          }
        }
        break
      case 'tribe-ewe':
        const eweNames = getNamesByTribe('Ewe')
        if (eweNames.length > 0) {
          generatedName = {
            ...eweNames[Math.floor(Math.random() * eweNames.length)],
            lastName,
          }
        }
        break
      case 'tribe-ga':
        const gaNames = getNamesByTribe('Ga-Adangbe')
        if (gaNames.length > 0) {
          generatedName = {
            ...gaNames[Math.floor(Math.random() * gaNames.length)],
            lastName,
          }
        }
        break
      case 'male-only':
        generatedName = getRandomName('male', lastName)
        break
      case 'female-only':
        generatedName = getRandomName('female', lastName)
        break
      case 'popular':
        // For popular, just get a random name (in real app, would fetch from API)
        generatedName = getRandomName('any', lastName)
        break
    }

    if (generatedName) {
      onNameGenerated(generatedName)
    }

    // Reset selection after a short delay
    setTimeout(() => setSelectedPreset(null), 500)
  }

  if (!lastName.trim()) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Name Presets
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate names with one click using presets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {presets.map((preset) => (
            <Button
              key={preset.id}
              onClick={() => handlePresetClick(preset.id)}
              variant="outline"
              className={`${preset.color} border-2 hover:opacity-80 transition-all ${
                selectedPreset === preset.id ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {preset.icon}
                <div className="text-center">
                  <div className="font-semibold text-sm">{preset.label}</div>
                  <div className="text-xs opacity-80">{preset.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

