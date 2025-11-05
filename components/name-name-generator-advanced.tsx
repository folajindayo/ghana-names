'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, RefreshCw, Settings } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

interface AdvancedOptions {
  gender: 'any' | 'male' | 'female'
  tribe?: string
  minLength?: number
  maxLength?: number
  startsWith?: string
  endsWith?: string
}

export function NameGeneratorAdvanced() {
  const [lastName, setLastName] = useState('')
  const [options, setOptions] = useState<AdvancedOptions>({
    gender: 'any',
  })
  const [generatedName, setGeneratedName] = useState<GhanaianName | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateName = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      let attempts = 0
      let name: GhanaianName | null = null

      while (attempts < 50 && !name) {
        const candidate = getRandomName(options.gender, lastName)

        // Check length constraints
        if (options.minLength && candidate.name.length < options.minLength) continue
        if (options.maxLength && candidate.name.length > options.maxLength) continue

        // Check starts with
        if (options.startsWith && !candidate.name.toLowerCase().startsWith(options.startsWith.toLowerCase())) {
          continue
        }

        // Check ends with
        if (options.endsWith && !candidate.name.toLowerCase().endsWith(options.endsWith.toLowerCase())) {
          continue
        }

        // Check tribe
        if (options.tribe && candidate.tribe !== options.tribe) {
          continue
        }

        name = candidate
        break
      }

      if (name) {
        setGeneratedName(name)
        toast({
          title: "Name generated!",
          description: `${name.name} ${lastName}`,
        })
      } else {
        toast({
          title: "No match found",
          description: "Try relaxing your criteria",
          variant: "destructive",
        })
      }

      setIsGenerating(false)
    }, 500)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-400" />
          Advanced Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate names with custom criteria
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
            <Label className="text-white/80">Gender</Label>
            <Select
              value={options.gender}
              onValueChange={(value: any) => setOptions({ ...options, gender: value })}
            >
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

          <div className="space-y-2">
            <Label className="text-white/80">Tribe (Optional)</Label>
            <Select
              value={options.tribe || 'any'}
              onValueChange={(value) => setOptions({ ...options, tribe: value === 'any' ? undefined : value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Tribe</SelectItem>
                <SelectItem value="Akan">Akan</SelectItem>
                <SelectItem value="Ga">Ga</SelectItem>
                <SelectItem value="Ewe">Ewe</SelectItem>
                <SelectItem value="Dagomba">Dagomba</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">Min Length</Label>
            <Input
              type="number"
              placeholder="Min"
              value={options.minLength || ''}
              onChange={(e) => setOptions({ ...options, minLength: e.target.value ? parseInt(e.target.value) : undefined })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1"
              max="20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Max Length</Label>
            <Input
              type="number"
              placeholder="Max"
              value={options.maxLength || ''}
              onChange={(e) => setOptions({ ...options, maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              min="1"
              max="20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">Starts With</Label>
            <Input
              placeholder="e.g., K, A"
              value={options.startsWith || ''}
              onChange={(e) => setOptions({ ...options, startsWith: e.target.value || undefined })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={2}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Ends With</Label>
            <Input
              placeholder="e.g., e, a"
              value={options.endsWith || ''}
              onChange={(e) => setOptions({ ...options, endsWith: e.target.value || undefined })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={2}
            />
          </div>
        </div>

        <Button
          onClick={generateName}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Name
            </>
          )}
        </Button>

        {generatedName && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{generatedName.name} {lastName}</h3>
              <p className="text-white/90 text-lg">"{generatedName.meaning}"</p>
            </div>
            <div className="flex justify-center gap-2">
              {generatedName.tribe && (
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                  {generatedName.tribe}
                </Badge>
              )}
              {generatedName.gender && (
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 font-semibold">
                  {generatedName.gender}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

