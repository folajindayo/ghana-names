'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GitCompare, BarChart3 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameStats {
  name: string
  length: number
  vowels: number
  consonants: number
  syllables: number
  uniqueness: number
}

export function NameStatsCompare() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [stats1, setStats1] = useState<NameStats | null>(null)
  const [stats2, setStats2] = useState<NameStats | null>(null)
  const { toast } = useToast()

  const calculateStats = (name: string): NameStats => {
    const normalized = name.toLowerCase().trim()
    const vowels = (normalized.match(/[aeiou]/gi) || []).length
    const consonants = normalized.length - vowels - (normalized.match(/[^a-z]/gi) || []).length
    const syllables = Math.max(1, vowels)
    const uniqueness = Math.round((1 - normalized.length / 20) * 100)

    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      length: normalized.length,
      vowels,
      consonants,
      syllables,
      uniqueness,
    }
  }

  const compareNames = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Names required",
        description: "Please enter both names",
        variant: "destructive",
      })
      return
    }

    const s1 = calculateStats(name1)
    const s2 = calculateStats(name2)

    setStats1(s1)
    setStats2(s2)

    toast({
      title: "Comparison complete!",
      description: `Comparing ${s1.name} and ${s2.name}`,
    })
  }

  const StatCard = ({ label, value1, value2, higher }: { label: string; value1: number; value2: number; higher: 'first' | 'second' | 'equal' }) => {
    return (
      <div className="p-3 bg-white/5 rounded border border-white/10">
        <p className="text-white/70 text-xs mb-2">{label}</p>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className={`text-xl font-bold ${higher === 'first' ? 'text-green-400' : 'text-white'}`}>
              {value1}
            </p>
          </div>
          <div className="mx-2 text-white/50">vs</div>
          <div className="text-center flex-1">
            <p className={`text-xl font-bold ${higher === 'second' ? 'text-green-400' : 'text-white'}`}>
              {value2}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-blue-400" />
          Name Statistics Comparison
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare statistical properties of two names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80">First Name</Label>
            <Input
              placeholder="Name 1"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Second Name</Label>
            <Input
              placeholder="Name 2"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && compareNames()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        <Button
          onClick={compareNames}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Compare Statistics
        </Button>

        {stats1 && stats2 && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center mb-4">
              <div>
                <h4 className="text-white font-semibold text-lg">{stats1.name}</h4>
                <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 mt-1">
                  Name 1
                </Badge>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">{stats2.name}</h4>
                <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 mt-1">
                  Name 2
                </Badge>
              </div>
            </div>

            <StatCard
              label="Length"
              value1={stats1.length}
              value2={stats2.length}
              higher={stats1.length > stats2.length ? 'first' : stats2.length > stats1.length ? 'second' : 'equal'}
            />

            <StatCard
              label="Vowels"
              value1={stats1.vowels}
              value2={stats2.vowels}
              higher={stats1.vowels > stats2.vowels ? 'first' : stats2.vowels > stats1.vowels ? 'second' : 'equal'}
            />

            <StatCard
              label="Consonants"
              value1={stats1.consonants}
              value2={stats2.consonants}
              higher={stats1.consonants > stats2.consonants ? 'first' : stats2.consonants > stats1.consonants ? 'second' : 'equal'}
            />

            <StatCard
              label="Syllables"
              value1={stats1.syllables}
              value2={stats2.syllables}
              higher={stats1.syllables > stats2.syllables ? 'first' : stats2.syllables > stats1.syllables ? 'second' : 'equal'}
            />

            <StatCard
              label="Uniqueness Score"
              value1={stats1.uniqueness}
              value2={stats2.uniqueness}
              higher={stats1.uniqueness > stats2.uniqueness ? 'first' : stats2.uniqueness > stats1.uniqueness ? 'second' : 'equal'}
            />
          </div>
        )}

        {name1 && name2 && !stats1 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Click compare to see statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

