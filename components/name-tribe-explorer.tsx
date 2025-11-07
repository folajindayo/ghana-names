'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Sparkles, Users, BookOpen } from 'lucide-react'

interface TribeInfo {
  name: string
  description: string
  region: string
  population: string
  names: Array<{ name: string; meaning: string; gender: string }>
}

const tribeData: Record<string, TribeInfo> = {
  Akan: {
    name: 'Akan',
    description: 'The Akan people are the largest ethnic group in Ghana, known for their rich cultural traditions including the day-naming system.',
    region: 'Central and Southern Ghana',
    population: '~11 million',
    names: [
      { name: 'Kwame', meaning: 'Born on Saturday', gender: 'Male' },
      { name: 'Akosua', meaning: 'Born on Sunday', gender: 'Female' },
      { name: 'Kofi', meaning: 'Born on Friday', gender: 'Male' },
      { name: 'Ama', meaning: 'Born on Saturday', gender: 'Female' },
      { name: 'Kojo', meaning: 'Born on Monday', gender: 'Male' },
    ],
  },
  Ewe: {
    name: 'Ewe',
    description: 'The Ewe people are primarily found in the Volta Region of Ghana, known for their unique naming traditions and cultural practices.',
    region: 'Volta Region',
    population: '~3 million',
    names: [
      { name: 'Kofi', meaning: 'Born on Friday', gender: 'Male' },
      { name: 'Ama', meaning: 'Born on Saturday', gender: 'Female' },
    ],
  },
  Ga: {
    name: 'Ga',
    description: 'The Ga people are indigenous to the Greater Accra Region, with distinct naming customs and cultural heritage.',
    region: 'Greater Accra Region',
    population: '~2 million',
    names: [
      { name: 'Kofi', meaning: 'Born on Friday', gender: 'Male' },
      { name: 'Ama', meaning: 'Born on Saturday', gender: 'Female' },
    ],
  },
}

export function NameTribeExplorer() {
  const [selectedTribe, setSelectedTribe] = useState<string>('')

  const tribe = selectedTribe ? tribeData[selectedTribe] : null

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-400" />
          Tribe Explorer
        </CardTitle>
        <CardDescription className="text-white/70">
          Explore Ghanaian tribes and their naming traditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-white/80 text-sm">Select a Tribe</label>
          <Select value={selectedTribe} onValueChange={setSelectedTribe}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Choose a tribe to explore" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(tribeData).map((tribeName) => (
                <SelectItem key={tribeName} value={tribeName}>
                  {tribeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {tribe && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{tribe.name}</h3>
              <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50">
                {tribe.region}
              </Badge>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-green-400" />
                About
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">{tribe.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-green-400" />
                  <span className="text-white/70 text-xs">Population</span>
                </div>
                <p className="text-white font-semibold text-sm">{tribe.population}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-green-400" />
                  <span className="text-white/70 text-xs">Names</span>
                </div>
                <p className="text-white font-semibold text-sm">{tribe.names.length}</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-3 text-sm">Common Names</h4>
              <div className="space-y-2">
                {tribe.names.map((name, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">{name.name}</h4>
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
                    <p className="text-white/70 text-sm mt-1">"{name.meaning}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!selectedTribe && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <MapPin className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-sm mb-2">Select a tribe to explore</p>
            <p className="text-white/50 text-xs">
              Learn about different Ghanaian tribes and their naming traditions
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

