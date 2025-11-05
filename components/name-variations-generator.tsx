'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Variation {
  name: string
  type: 'spelling' | 'nickname' | 'diminutive' | 'alternative'
  meaning?: string
}

export function NameVariationsGenerator() {
  const [name, setName] = useState('')
  const [variations, setVariations] = useState<Variation[]>([])
  const { toast } = useToast()

  const generateVariations = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const generated: Variation[] = []

    // Common variations database
    const variationMap: Record<string, Variation[]> = {
      kwame: [
        { name: 'Kwame', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Kwamé', type: 'spelling', meaning: 'Accented variant' },
        { name: 'Kwami', type: 'alternative', meaning: 'Alternative spelling' },
        { name: 'Kwamie', type: 'spelling', meaning: 'Alternative spelling' },
      ],
      akosua: [
        { name: 'Akosua', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Akosuah', type: 'spelling', meaning: 'Alternative spelling' },
        { name: 'Kosua', type: 'nickname', meaning: 'Short form' },
        { name: 'Aku', type: 'diminutive', meaning: 'Pet name' },
      ],
      kofi: [
        { name: 'Kofi', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Kofie', type: 'spelling', meaning: 'Alternative spelling' },
        { name: 'Koffi', type: 'spelling', meaning: 'Alternative spelling' },
        { name: 'Ko', type: 'nickname', meaning: 'Short form' },
      ],
      ama: [
        { name: 'Ama', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Amah', type: 'spelling', meaning: 'Alternative spelling' },
        { name: 'Ami', type: 'diminutive', meaning: 'Pet name' },
      ],
      yaw: [
        { name: 'Yaw', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Yao', type: 'alternative', meaning: 'Alternative spelling' },
      ],
      yaa: [
        { name: 'Yaa', type: 'spelling', meaning: 'Standard spelling' },
        { name: 'Ya', type: 'nickname', meaning: 'Short form' },
      ],
    }

    const found = variationMap[normalized]
    if (found) {
      setVariations(found)
      toast({
        title: "Variations found!",
        description: `Found ${found.length} variation${found.length !== 1 ? 's' : ''} for ${name}`,
      })
    } else {
      // Generate basic variations
      const basic: Variation[] = [
        { name: name.charAt(0).toUpperCase() + name.slice(1), type: 'spelling', meaning: 'Capitalized' },
        { name: name.toUpperCase(), type: 'spelling', meaning: 'Uppercase' },
      ]
      if (name.length > 3) {
        basic.push({ name: name.substring(0, 3), type: 'nickname', meaning: 'Short form' })
      }
      setVariations(basic)
      toast({
        title: "Basic variations generated",
        description: `Generated ${basic.length} variation${basic.length !== 1 ? 's' : ''}`,
      })
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'spelling':
        return 'bg-blue-600/40 text-blue-100 border-blue-400/50'
      case 'nickname':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'diminutive':
        return 'bg-purple-600/40 text-purple-100 border-purple-400/50'
      case 'alternative':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      default:
        return 'bg-gray-600/40 text-gray-100 border-gray-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          Name Variations Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Discover different spellings and variations of names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua, Kofi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateVariations()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={generateVariations}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {variations.length > 0 && (
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              {variations.length} variation{variations.length !== 1 ? 's' : ''} found
            </p>
            <div className="space-y-2">
              {variations.map((variation, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-lg">{variation.name}</h4>
                    <Badge variant="secondary" className={`${getTypeColor(variation.type)} font-semibold text-xs`}>
                      {variation.type}
                    </Badge>
                  </div>
                  {variation.meaning && (
                    <p className="text-white/70 text-sm">{variation.meaning}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {name && variations.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name to generate variations</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

