'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Type, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface InitialCombination {
  initials: string
  style: 'monogram' | 'separated' | 'linked' | 'stylized'
  description: string
}

export function NameInitialGenerator() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [combinations, setCombinations] = useState<InitialCombination[]>([])
  const { toast } = useToast()

  const generateInitials = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both first and last names",
        variant: "destructive",
      })
      return
    }

    const f = firstName.trim().charAt(0).toUpperCase()
    const l = lastName.trim().charAt(0).toUpperCase()

    const generated: InitialCombination[] = [
      {
        initials: `${f}${l}`,
        style: 'monogram',
        description: 'Classic monogram style',
      },
      {
        initials: `${f}.${l}.`,
        style: 'separated',
        description: 'Separated with periods',
      },
      {
        initials: `${f} ${l}`,
        style: 'separated',
        description: 'Separated with space',
      },
      {
        initials: `${f}-${l}`,
        style: 'linked',
        description: 'Linked with hyphen',
      },
      {
        initials: `${f}${l}`.toLowerCase(),
        style: 'stylized',
        description: 'Lowercase style',
      },
      {
        initials: `${f}${l}${f}${l}`,
        style: 'stylized',
        description: 'Repeated pattern',
      },
    ]

    setCombinations(generated)
    toast({
      title: "Initials generated!",
      description: `Generated ${generated.length} initial combinations`,
    })
  }

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'monogram':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'separated':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'linked':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'stylized':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Type className="h-5 w-5 text-indigo-400" />
          Initial Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate various initial combinations from names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">First Name</Label>
            <Input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Last Name</Label>
            <Input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateInitials()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={generateInitials}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Initials
        </Button>

        {combinations.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              {combinations.length} combination{combinations.length !== 1 ? 's' : ''} generated
            </p>
            <div className="space-y-2">
              {combinations.map((combo, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold text-white font-mono">{combo.initials}</div>
                    <Badge variant="secondary" className={`${getStyleColor(combo.style)} font-semibold text-xs`}>
                      {combo.style}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm">{combo.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {firstName && lastName && combinations.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to create initial combinations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

