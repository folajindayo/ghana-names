'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shuffle, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'

export function NameCombinationGenerator() {
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [count, setCount] = useState('5')
  const [combinations, setCombinations] = useState<Array<GhanaianName & { fullName: string }>>([])
  const { toast } = useToast()

  const generateCombinations = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name",
        variant: "destructive",
      })
      return
    }

    const num = parseInt(count) || 5
    const max = Math.min(num, 20)
    const generated: Array<GhanaianName & { fullName: string }> = []

    for (let i = 0; i < max; i++) {
      const name = getRandomName(gender, lastName)
      generated.push({
        ...name,
        fullName: `${name.name} ${lastName}`,
      })
    }

    setCombinations(generated)
    toast({
      title: "Combinations generated!",
      description: `Generated ${generated.length} name combinations`,
    })
  }

  const clearCombinations = () => {
    setCombinations([])
    toast({
      title: "Cleared",
      description: "Combinations cleared",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-purple-400" />
          Combination Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate multiple name combinations at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Last Name</Label>
          <Input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Gender</Label>
            <Select value={gender} onValueChange={(value: 'any' | 'male' | 'female') => setGender(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Count</Label>
            <Input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="bg-white/10 border-white/20 text-white text-xs h-9"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={generateCombinations}
            disabled={!lastName.trim()}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Generate
          </Button>
          {combinations.length > 0 && (
            <Button
              onClick={clearCombinations}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Clear
            </Button>
          )}
        </div>

        {combinations.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <p className="text-white/80 text-sm">
              {combinations.length} combination{combinations.length !== 1 ? 's' : ''} generated
            </p>
            {combinations.map((combo, index) => (
              <div
                key={index}
                className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{combo.fullName}</h4>
                    <p className="text-white/80 text-xs mb-2">"{combo.meaning}"</p>
                    <div className="flex gap-2">
                      {combo.tribe && (
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold text-xs">
                          {combo.tribe}
                        </Badge>
                      )}
                      {combo.gender && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold text-xs">
                          {combo.gender}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-600/40 text-purple-100 border-purple-400/50 font-semibold text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {lastName && combinations.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to create name combinations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

