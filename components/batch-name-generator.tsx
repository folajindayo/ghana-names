'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Download, BookOpen, MapPin, Users } from 'lucide-react'
import { getRandomName, type GhanaianName } from '@/lib/ghanaian-names'
import { useToast } from '@/hooks/use-toast'

export function BatchNameGenerator() {
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [count, setCount] = useState(5)
  const [generatedNames, setGeneratedNames] = useState<GhanaianName[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateBatch = () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name.",
        variant: "destructive",
      })
      return
    }

    if (count < 1 || count > 20) {
      toast({
        title: "Invalid count",
        description: "Please enter a number between 1 and 20.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    
    // Generate multiple unique names
    const names: GhanaianName[] = []
    const seenNames = new Set<string>()
    
    let attempts = 0
    const maxAttempts = count * 10 // Prevent infinite loop
    
    while (names.length < count && attempts < maxAttempts) {
      const name = getRandomName(gender, lastName)
      const key = `${name.name}-${name.tribe}`
      
      if (!seenNames.has(key)) {
        names.push(name)
        seenNames.add(key)
      }
      attempts++
    }

    setGeneratedNames(names)
    setIsGenerating(false)

    toast({
      title: "Batch generation complete!",
      description: `Generated ${names.length} unique names.`,
    })
  }

  const handleExport = () => {
    if (generatedNames.length === 0) return

    const data = generatedNames.map(name => ({
      name: `${name.name} ${lastName}`,
      meaning: name.meaning,
      tribe: name.tribe,
      gender: name.gender,
    }))

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghanaian-names-${lastName}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exported!",
      description: "Names exported as JSON file.",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Batch Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate multiple unique Ghanaian names at once
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="batchLastName" className="text-white/90">
              Last Name
            </Label>
            <Input
              id="batchLastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batchGender" className="text-white/90">
              Gender Preference
            </Label>
            <Select value={gender} onValueChange={(value: 'any' | 'male' | 'female') => setGender(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/20">
                <SelectItem value="any">Any Gender</SelectItem>
                <SelectItem value="male">Male Names Only</SelectItem>
                <SelectItem value="female">Female Names Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="batchCount" className="text-white/90">
              Number of Names (1-20)
            </Label>
            <Input
              id="batchCount"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 5)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
            />
          </div>
        </div>

        <Button
          onClick={handleGenerateBatch}
          disabled={!lastName.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
        >
          {isGenerating ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate {count} Names
            </>
          )}
        </Button>

        {generatedNames.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Generated Names ({generatedNames.length})</h3>
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {generatedNames.map((name, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-yellow-400">
                        {name.name} {lastName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          <BookOpen className="mr-1 h-3 w-3" />
                          {name.meaning}
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          <MapPin className="mr-1 h-3 w-3" />
                          {name.tribe} Tribe
                        </Badge>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                          <Users className="mr-1 h-3 w-3" />
                          {name.gender === 'male' ? 'Male' : 'Female'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

