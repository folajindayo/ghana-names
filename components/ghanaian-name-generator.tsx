"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, MapPin, BookOpen } from "lucide-react"
import { getRandomName, type GhanaianName } from "@/lib/ghanaian-names"

export function GhanaianNameGenerator() {
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [lastName, setLastName] = useState('')
  const [generatedName, setGeneratedName] = useState<GhanaianName | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateName = () => {
    if (!lastName.trim()) return
    
    setIsGenerating(true)
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const name = getRandomName(gender, lastName)
      setGeneratedName(name)
      setIsGenerating(false)
    }, 500)
  }

  const handleGenerateAnother = () => {
    handleGenerateName()
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">🇬🇭 Ghanaian Name Generator</h1>
        <p className="text-white/70">Discover your authentic Ghanaian name with meaning and tribe</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Your Name
          </CardTitle>
          <CardDescription className="text-white/70">
            Enter your last name and select gender preferences to generate a Ghanaian name
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white/90">
              Your Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-white/90">
              Gender Preference
            </Label>
            <Select value={gender} onValueChange={(value: 'any' | 'male' | 'female') => setGender(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
                <SelectValue placeholder="Select gender preference" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/20">
                <SelectItem value="any">Any Gender</SelectItem>
                <SelectItem value="male">Male Names Only</SelectItem>
                <SelectItem value="female">Female Names Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerateName}
            disabled={!lastName.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Ghanaian Name
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedName && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Ghanaian Name
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-3">
              <div className="text-4xl font-bold text-yellow-400">
                {generatedName.name} {lastName}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <BookOpen className="mr-1 h-3 w-3" />
                  {generatedName.meaning}
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <MapPin className="mr-1 h-3 w-3" />
                  {generatedName.tribe} Tribe
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Users className="mr-1 h-3 w-3" />
                  {generatedName.gender === 'male' ? 'Male' : 'Female'}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <Button
                onClick={handleGenerateAnother}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Another Name
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">About Ghanaian Names</CardTitle>
        </CardHeader>
        <CardContent className="text-white/80 space-y-3">
          <p>
            Ghanaian names are deeply meaningful and often reflect the day of birth, 
            family history, or desired characteristics. Each name carries cultural 
            significance and connects you to Ghana's rich heritage.
          </p>
          <p>
            <strong>Day Names:</strong> Many Akan names indicate the day of the week 
            when a person was born, such as Kwame (Saturday) or Kofi (Friday).
          </p>
          <p>
            <strong>Tribal Names:</strong> Names vary across Ghana's major ethnic groups 
            including Akan, Ewe, Dagomba, Ga, and Fante, each with unique naming traditions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
