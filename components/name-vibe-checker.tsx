'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface VibeAnalysis {
  name: string
  vibe: 'cool' | 'classic' | 'elegant' | 'strong' | 'gentle' | 'unique'
  energy: number
  description: string
  style: string[]
  bestFor: string[]
}

export function NameVibeChecker() {
  const [name, setName] = useState('')
  const [vibe, setVibe] = useState<VibeAnalysis | null>(null)
  const { toast } = useToast()

  const checkVibe = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    let analysis: VibeAnalysis

    // Simple vibe assignment based on name characteristics
    if (normalized.startsWith('kw')) {
      analysis = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        vibe: 'strong',
        energy: 85,
        description: 'Strong and powerful vibes with traditional roots',
        style: ['Bold', 'Traditional', 'Confident', 'Leader'],
        bestFor: ['Formal occasions', 'Professional settings', 'Traditional ceremonies'],
      }
    } else if (normalized.startsWith('a')) {
      if (normalized.length <= 4) {
        analysis = {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          vibe: 'gentle',
          energy: 70,
          description: 'Gentle and elegant with a soft touch',
          style: ['Gentle', 'Elegant', 'Soft', 'Caring'],
          bestFor: ['Personal use', 'Intimate settings', 'Creative fields'],
        }
      } else {
        analysis = {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          vibe: 'elegant',
          energy: 80,
          description: 'Elegant and sophisticated with timeless appeal',
          style: ['Elegant', 'Sophisticated', 'Timeless', 'Refined'],
          bestFor: ['Formal events', 'Professional contexts', 'Artistic pursuits'],
        }
      }
    } else if (normalized.length <= 3) {
      analysis = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        vibe: 'cool',
        energy: 90,
        description: 'Cool and modern with contemporary appeal',
        style: ['Modern', 'Cool', 'Trendy', 'Contemporary'],
        bestFor: ['Casual settings', 'Modern contexts', 'Creative industries'],
      }
    } else if (normalized.length >= 8) {
      analysis = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        vibe: 'unique',
        energy: 75,
        description: 'Unique and distinctive with memorable presence',
        style: ['Unique', 'Distinctive', 'Memorable', 'Unconventional'],
        bestFor: ['Standing out', 'Artistic fields', 'Creative expression'],
      }
    } else {
      analysis = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        vibe: 'classic',
        energy: 75,
        description: 'Classic and timeless with universal appeal',
        style: ['Classic', 'Timeless', 'Versatile', 'Balanced'],
        bestFor: ['All contexts', 'Professional use', 'Everyday life'],
      }
    }

    setVibe(analysis)
    toast({
      title: "Vibe checked!",
      description: `${analysis.name} has ${analysis.vibe} vibes`,
    })
  }

  const getVibeColor = () => {
    if (!vibe) return ''
    switch (vibe.vibe) {
      case 'cool':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'classic':
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
      case 'elegant':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'strong':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      case 'gentle':
        return 'bg-pink-600/40 text-pink-100 border-pink-400/50'
      case 'unique':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      default:
        return ''
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-400" />
          Vibe Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover the vibe and energy of names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkVibe()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={checkVibe}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {vibe && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{vibe.name}</h3>
              <Badge variant="secondary" className={`${getVibeColor()} font-semibold text-sm px-4 py-2 capitalize mb-3`}>
                {vibe.vibe} Vibes
              </Badge>
              <p className="text-white/90 text-sm mb-3">{vibe.description}</p>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/70 text-xs mb-1">Energy Level</p>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all"
                    style={{ width: `${vibe.energy}%` }}
                  />
                </div>
                <p className="text-white font-semibold text-sm mt-1">{vibe.energy}%</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Style Traits</h4>
              <div className="flex flex-wrap gap-2">
                {vibe.style.map((trait, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2">Best For</h4>
              <ul className="space-y-1">
                {vibe.bestFor.map((use, index) => (
                  <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                    <Heart className="h-3 w-3 text-pink-400 mt-1.5" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {name && !vibe && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to check the vibe</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

