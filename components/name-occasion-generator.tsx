'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Gift, Sparkles, Cake, Heart, GraduationCap, Baby } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface OccasionName {
  name: string
  meaning: string
  tribe: string
  gender: string
  occasion: string
}

const occasionNames: Record<string, OccasionName[]> = {
  birthday: [
    { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Male', occasion: 'Birthday' },
    { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', gender: 'Female', occasion: 'Birthday' },
    { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male', occasion: 'Birthday' },
  ],
  wedding: [
    { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Female', occasion: 'Wedding' },
    { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Male', occasion: 'Wedding' },
  ],
  graduation: [
    { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female', occasion: 'Graduation' },
    { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan', gender: 'Male', occasion: 'Graduation' },
  ],
  newbaby: [
    { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Female', occasion: 'New Baby' },
    { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan', gender: 'Male', occasion: 'New Baby' },
  ],
}

const occasionIcons: Record<string, any> = {
  birthday: Cake,
  wedding: Heart,
  graduation: GraduationCap,
  newbaby: Baby,
}

export function NameOccasionGenerator() {
  const [occasion, setOccasion] = useState('')
  const [gender, setGender] = useState('')
  const [generated, setGenerated] = useState<OccasionName | null>(null)
  const { toast } = useToast()

  const generate = () => {
    if (!occasion) {
      toast({
        title: "Occasion required",
        description: "Please select an occasion",
        variant: "destructive",
      })
      return
    }

    if (!gender) {
      toast({
        title: "Gender required",
        description: "Please select a gender",
        variant: "destructive",
      })
      return
    }

    const names = occasionNames[occasion] || []
    let filtered = names.filter((n) => n.gender.toLowerCase() === gender.toLowerCase())

    if (filtered.length === 0) {
      toast({
        title: "No names available",
        description: "Try different occasion or gender",
        variant: "destructive",
      })
      return
    }

    const random = filtered[Math.floor(Math.random() * filtered.length)]
    setGenerated(random)
    toast({
      title: "Name generated!",
      description: `Perfect for ${occasion}: ${random.name}`,
    })
  }

  const OccasionIcon = occasion ? occasionIcons[occasion] : Gift

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Gift className="h-5 w-5 text-orange-400" />
          Occasion Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate names for special occasions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Occasion</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">
                  <div className="flex items-center gap-2">
                    <Cake className="h-4 w-4" />
                    <span>Birthday</span>
                  </div>
                </SelectItem>
                <SelectItem value="wedding">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Wedding</span>
                  </div>
                </SelectItem>
                <SelectItem value="graduation">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Graduation</span>
                  </div>
                </SelectItem>
                <SelectItem value="newbaby">
                  <div className="flex items-center gap-2">
                    <Baby className="h-4 w-4" />
                    <span>New Baby</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={generate}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Name
          </Button>
        </div>

        {generated && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                {occasion && <OccasionIcon className="h-6 w-6 text-orange-400" />}
                <h3 className="text-3xl font-bold text-white">{generated.name}</h3>
              </div>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-orange-600/40 text-orange-100 border-orange-400/50">
                  {generated.occasion}
                </Badge>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50">
                  {generated.tribe}
                </Badge>
                <Badge
                  variant="secondary"
                  className={
                    generated.gender === 'Male'
                      ? 'bg-blue-600/40 text-blue-100 border-blue-400/50'
                      : 'bg-pink-600/40 text-pink-100 border-pink-400/50'
                  }
                >
                  {generated.gender}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10 text-center">
              <h4 className="text-white font-semibold mb-2 text-sm">Meaning</h4>
              <p className="text-white/80 text-sm">"{generated.meaning}"</p>
            </div>
          </div>
        )}

        {occasion && gender && !generated && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click generate to get a name for this occasion</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

