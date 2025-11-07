'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shuffle, Copy, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const firstNamePool = ['Kwame', 'Kofi', 'Kojo', 'Yaw', 'Kwaku', 'Fiifi']
const middleNamePool = ['Ama', 'Akosua', 'Abena', 'Efua', 'Adwoa', 'Aba']
const lastNamePool = ['Mensah', 'Asante', 'Osei', 'Appiah', 'Boateng', 'Darko']

export function NameCombinationGenerator() {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [combinations, setCombinations] = useState<string[]>([])
  const { toast } = useToast()

  const generateCombinations = () => {
    const fName = firstName.trim() || firstNamePool[Math.floor(Math.random() * firstNamePool.length)]
    const mName = middleName.trim() || middleNamePool[Math.floor(Math.random() * middleNamePool.length)]
    const lName = lastName.trim() || lastNamePool[Math.floor(Math.random() * lastNamePool.length)]

    const newCombinations: string[] = []
    
    // Generate various combinations
    newCombinations.push(`${fName} ${mName} ${lName}`)
    newCombinations.push(`${fName} ${lName}`)
    newCombinations.push(`${fName} ${mName.charAt(0)}. ${lName}`)
    newCombinations.push(`${fName.charAt(0)}. ${mName} ${lName}`)
    newCombinations.push(`${fName} ${mName}-${lName}`)

    setCombinations(newCombinations)
    toast({
      title: "Combinations generated!",
      description: `Generated ${newCombinations.length} name combinations`,
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Name combination copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-pink-400" />
          Name Combination Generator
        </CardTitle>
        <CardDescription className="text-white/70">
          Generate various combinations of first, middle, and last names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-white/80">First Name</Label>
            <Input
              placeholder="e.g., Kwame"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Middle Name</Label>
            <Input
              placeholder="e.g., Ama"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Last Name</Label>
            <Input
              placeholder="e.g., Mensah"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={generateCombinations}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Combinations
        </Button>

        {combinations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Generated Combinations</h4>
            {combinations.map((combination, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-white">{combination}</p>
                    <p className="text-white/60 text-xs mt-1">
                      {combination.split(' ').length} parts
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(combination)}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {combinations.length === 0 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">
              Enter names (or leave blank for random) and click generate to create combinations
            </p>
          </div>
        )}

        <div className="p-3 bg-pink-500/10 rounded border border-pink-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Tip:</strong> Leave fields blank to use random names from the database. You can also enter your own names for custom combinations.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

