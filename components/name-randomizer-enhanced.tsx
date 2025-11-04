'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shuffle, Sparkles, Settings } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

interface RandomizerPreferences {
  gender: 'any' | 'male' | 'female'
  tribe?: string
  avoidDuplicates: boolean
  excludeRecent: boolean
  minLength?: number
  maxLength?: number
}

export function NameRandomizerEnhanced({
  lastName,
  onNameGenerated,
}: {
  lastName: string
  onNameGenerated: (name: GhanaianName) => void
}) {
  const [preferences, setPreferences] = useState<RandomizerPreferences>({
    gender: 'any',
    avoidDuplicates: true,
    excludeRecent: false,
  })
  const [generatedNames, setGeneratedNames] = useState<string[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const { toast } = useToast()

  const generateRandomName = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name first.",
        variant: "destructive",
      })
      return
    }

    let attempts = 0
    let name: GhanaianName | null = null

    while (attempts < 50) {
      name = getRandomName(preferences.gender, lastName)

      // Check duplicates
      if (preferences.avoidDuplicates && generatedNames.includes(name.name)) {
        attempts++
        continue
      }

      // Check length
      if (preferences.minLength && name.name.length < preferences.minLength) {
        attempts++
        continue
      }
      if (preferences.maxLength && name.name.length > preferences.maxLength) {
        attempts++
        continue
      }

      // Check tribe
      if (preferences.tribe && name.tribe !== preferences.tribe) {
        attempts++
        continue
      }

      break
    }

    if (name) {
      setGeneratedNames([...generatedNames, name.name])
      onNameGenerated(name)
      toast({
        title: "Name generated!",
        description: `You got ${name.name} ${lastName}`,
      })
    } else {
      toast({
        title: "Generation failed",
        description: "Could not generate a name matching your preferences. Try adjusting filters.",
        variant: "destructive",
      })
    }
  }

  if (!lastName.trim()) return null

  return (
    <Card className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border-indigo-500/30 border">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-indigo-400" />
          Enhanced Name Randomizer
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate random names with custom preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Generate */}
        <Button
          onClick={generateRandomName}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Random Name
        </Button>

        {/* Settings Toggle */}
        <Button
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white"
          size="sm"
        >
          <Settings className="mr-2 h-4 w-4" />
          {showSettings ? 'Hide' : 'Show'} Preferences
        </Button>

        {/* Preferences */}
        {showSettings && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gender-pref" className="text-white/90 text-sm">
                Gender Preference
              </Label>
              <Select
                value={preferences.gender}
                onValueChange={(value: 'any' | 'male' | 'female') =>
                  setPreferences({ ...preferences, gender: value })
                }
              >
                <SelectTrigger
                  id="gender-pref"
                  className="bg-white/10 border-white/20 text-white text-sm h-9"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/90">
                  <SelectItem value="any">Any Gender</SelectItem>
                  <SelectItem value="male">Male Only</SelectItem>
                  <SelectItem value="female">Female Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tribe-pref" className="text-white/90 text-sm">
                Tribe (Optional)
              </Label>
              <Select
                value={preferences.tribe || 'any'}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, tribe: value === 'any' ? undefined : value })
                }
              >
                <SelectTrigger
                  id="tribe-pref"
                  className="bg-white/10 border-white/20 text-white text-sm h-9"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/90">
                  <SelectItem value="any">Any Tribe</SelectItem>
                  <SelectItem value="Akan">Akan</SelectItem>
                  <SelectItem value="Ewe">Ewe</SelectItem>
                  <SelectItem value="Ga-Adangbe">Ga-Adangbe</SelectItem>
                  <SelectItem value="Mole-Dagbani">Mole-Dagbani</SelectItem>
                  <SelectItem value="Guan">Guan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="avoid-duplicates" className="text-white/90 text-sm">
                  Avoid Duplicates
                </Label>
                <Switch
                  id="avoid-duplicates"
                  checked={preferences.avoidDuplicates}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, avoidDuplicates: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="exclude-recent" className="text-white/90 text-sm">
                  Exclude Recent Names
                </Label>
                <Switch
                  id="exclude-recent"
                  checked={preferences.excludeRecent}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, excludeRecent: checked })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="min-length" className="text-white/90 text-xs">
                  Min Length
                </Label>
                <input
                  id="min-length"
                  type="number"
                  min="1"
                  max="20"
                  value={preferences.minLength || ''}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      minLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full rounded-md border bg-white/10 border-white/20 text-white px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="max-length" className="text-white/90 text-xs">
                  Max Length
                </Label>
                <input
                  id="max-length"
                  type="number"
                  min="1"
                  max="20"
                  value={preferences.maxLength || ''}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full rounded-md border bg-white/10 border-white/20 text-white px-3 py-2 text-sm"
                />
              </div>
            </div>

            {generatedNames.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/70 text-xs mb-2">Recently Generated:</p>
                <div className="flex flex-wrap gap-1">
                  {generatedNames.slice(-5).map((name, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white text-xs">
                      {name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

