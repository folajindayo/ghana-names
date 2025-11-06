'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Shuffle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

export function NameRandomPicker() {
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [lastName, setLastName] = useState('')
  const [pickedName, setPickedName] = useState<GhanaianName | null>(null)
  const [pickHistory, setPickHistory] = useState<GhanaianName[]>([])
  const { toast } = useToast()

  const pickRandom = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name",
        variant: "destructive",
      })
      return
    }

    const name = getRandomName(gender, lastName)
    setPickedName(name)
    setPickHistory((prev) => [name, ...prev].slice(0, 5))
    toast({
      title: "Name picked!",
      description: `${name.name} ${lastName}`,
    })
  }

  const clearHistory = () => {
    setPickHistory([])
    toast({
      title: "History cleared",
      description: "Pick history has been cleared",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-purple-400" />
          Random Name Picker
        </CardTitle>
        <CardDescription className="text-white/70">
          Pick a random Ghanaian name instantly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Last Name</Label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && pickRandom()}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Gender</Label>
          <Select value={gender} onValueChange={(value: 'any' | 'male' | 'female') => setGender(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={pickRandom}
          disabled={!lastName.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
        >
          <Shuffle className="mr-2 h-4 w-4" />
          Pick Random Name
        </Button>

        {pickedName && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {pickedName.name} {lastName}
              </h3>
              <p className="text-white/90 text-base mb-3">"{pickedName.meaning}"</p>
              <div className="flex justify-center gap-2">
                {pickedName.tribe && (
                  <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                    {pickedName.tribe}
                  </Badge>
                )}
                {pickedName.gender && (
                  <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                    {pickedName.gender}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {pickHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-white/80 text-sm">Recent Picks</p>
              <Button
                onClick={clearHistory}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white text-xs"
              >
                Clear
              </Button>
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {pickHistory.map((name, index) => (
                <div
                  key={index}
                  className="p-2 bg-white/5 rounded border border-white/10 text-sm"
                >
                  <span className="text-white font-semibold">{name.name}</span>
                  <span className="text-white/70 ml-2">"{name.meaning}"</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!pickedName && lastName && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click pick to get a random name</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

