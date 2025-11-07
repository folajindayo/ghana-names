'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Sparkles, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface GeneratedName {
  name: string
  meaning: string
  tribe: string
  gender: string
}

const namePool: GeneratedName[] = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Male' },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', gender: 'Female' },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Male' },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', gender: 'Female' },
  { name: 'Kojo', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Male' },
  { name: 'Abena', meaning: 'Born on Tuesday', tribe: 'Akan', gender: 'Female' },
  { name: 'Kwaku', meaning: 'Born on Wednesday', tribe: 'Akan', gender: 'Male' },
  { name: 'Efua', meaning: 'Born on Friday', tribe: 'Akan', gender: 'Female' },
  { name: 'Yaw', meaning: 'Born on Thursday', tribe: 'Akan', gender: 'Male' },
  { name: 'Adwoa', meaning: 'Born on Monday', tribe: 'Akan', gender: 'Female' },
]

export function NameBatchGenerator() {
  const [count, setCount] = useState('5')
  const [gender, setGender] = useState<string>('')
  const [tribe, setTribe] = useState<string>('')
  const [generated, setGenerated] = useState<GeneratedName[]>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateBatch = () => {
    const num = parseInt(count) || 5
    if (num < 1 || num > 20) {
      toast({
        title: "Invalid count",
        description: "Please enter a number between 1 and 20",
        variant: "destructive",
      })
      return
    }

    let filtered = [...namePool]

    if (gender) {
      filtered = filtered.filter((name) => name.gender.toLowerCase() === gender.toLowerCase())
    }

    if (tribe) {
      filtered = filtered.filter((name) => name.tribe.toLowerCase() === tribe.toLowerCase())
    }

    if (filtered.length === 0) {
      toast({
        title: "No names available",
        description: "Try different filters",
        variant: "destructive",
      })
      return
    }

    const batch: GeneratedName[] = []
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      batch.push(filtered[randomIndex])
    }

    setGenerated(batch)
    toast({
      title: "Batch generated!",
      description: `Generated ${batch.length} name(s)`,
    })
  }

  const copyAll = () => {
    const text = generated.map((n) => `${n.name} - ${n.meaning}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "All names copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Batch Name Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate multiple names at once with filters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Number of Names (1-20)</Label>
            <Input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/80">Gender (Optional)</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Tribe (Optional)</Label>
              <Select value={tribe} onValueChange={setTribe}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="akan">Akan</SelectItem>
                  <SelectItem value="ewe">Ewe</SelectItem>
                  <SelectItem value="ga">Ga</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={generateBatch}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Batch
          </Button>
        </div>

        {generated.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-sm">
                Generated Names ({generated.length})
              </h4>
              <Button
                size="sm"
                variant="outline"
                onClick={copyAll}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {generated.map((name, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/60 text-xs">#{index + 1}</span>
                        <h3 className="text-lg font-bold text-white">{name.name}</h3>
                        <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                          {name.tribe}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={
                            name.gender === 'Male'
                              ? 'bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs'
                              : 'bg-pink-600/40 text-pink-100 border-pink-400/50 text-xs'
                          }
                        >
                          {name.gender}
                        </Badge>
                      </div>
                      <p className="text-white/70 text-sm">"{name.meaning}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {generated.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Set your preferences and click "Generate Batch" to create multiple names</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

