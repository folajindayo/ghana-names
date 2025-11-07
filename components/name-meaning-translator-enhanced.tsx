'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Languages, Sparkles, BookOpen, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TranslationResult {
  name: string
  meaning: string
  literalTranslation: string
  culturalContext: string
  usage: string[]
  relatedNames: string[]
}

const translationDatabase: Record<string, TranslationResult> = {
  Kwame: {
    name: 'Kwame',
    meaning: 'Born on Saturday',
    literalTranslation: 'Saturday child',
    culturalContext: 'In Akan culture, children are named based on the day of the week they are born. Saturday is associated with the sea god.',
    usage: ['First name', 'Day name', 'Traditional name'],
    relatedNames: ['Ama', 'Kwame', 'Kwaku'],
  },
  Akosua: {
    name: 'Akosua',
    meaning: 'Born on Sunday',
    literalTranslation: 'Sunday child',
    culturalContext: 'Sunday-born children are associated with the sun god and are believed to be bright and cheerful.',
    usage: ['First name', 'Day name', 'Traditional name'],
    relatedNames: ['Kwasi', 'Akosua', 'Adwoa'],
  },
  Kofi: {
    name: 'Kofi',
    meaning: 'Born on Friday',
    literalTranslation: 'Friday child',
    culturalContext: 'Friday is associated with Venus and represents love, beauty, and creativity.',
    usage: ['First name', 'Day name', 'Traditional name'],
    relatedNames: ['Efua', 'Kofi', 'Fiifi'],
  },
}

export function NameMeaningTranslatorEnhanced() {
  const [name, setName] = useState('')
  const [result, setResult] = useState<TranslationResult | null>(null)
  const { toast } = useToast()

  const translate = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    const found = translationDatabase[normalized]

    if (found) {
      setResult(found)
      toast({
        title: "Translation found!",
        description: `Found translation for ${normalized}`,
      })
    } else {
      setResult(null)
      toast({
        title: "Translation not found",
        description: "Translation not available for this name yet",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-indigo-400" />
          Enhanced Meaning Translator
        </CardTitle>
        <CardDescription className="text-white/70">
          Deep dive into name meanings and cultural context
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
              onKeyPress={(e) => e.key === 'Enter' && translate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={translate}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{result.name}</h3>
              <Badge variant="secondary" className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50">
                {result.meaning}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Languages className="h-4 w-4 text-indigo-400" />
                Literal Translation
              </h4>
              <p className="text-white/80 text-sm">{result.literalTranslation}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-400" />
                Cultural Context
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">{result.culturalContext}</p>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-400" />
                Usage
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.usage.map((use, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 text-xs"
                  >
                    {use}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Related Names</h4>
              <div className="flex flex-wrap gap-2">
                {result.relatedNames.map((relatedName, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-600/40 text-purple-100 border-purple-400/50 text-xs cursor-pointer hover:bg-purple-600/60"
                    onClick={() => {
                      setName(relatedName)
                      translate()
                    }}
                  >
                    {relatedName}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {name && !result && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm mb-2">Translation not found</p>
            <p className="text-white/50 text-xs">
              Available names: {Object.keys(translationDatabase).join(', ')}
            </p>
          </div>
        )}

        {!name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="h-4 w-4 text-indigo-400" />
              <h4 className="text-white font-semibold text-sm">Available Names</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(translationDatabase).map((name) => (
                <Badge
                  key={name}
                  variant="secondary"
                  className="bg-indigo-600/40 text-indigo-100 border-indigo-400/50 text-xs cursor-pointer hover:bg-indigo-600/60"
                  onClick={() => {
                    setName(name)
                    translate()
                  }}
                >
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

