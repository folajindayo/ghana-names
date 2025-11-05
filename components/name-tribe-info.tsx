'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, BookOpen, Users, ChevronRight } from 'lucide-react'

interface TribeInfo {
  name: string
  description: string
  location: string
  population: string
  languages: string[]
  namingTraditions: string[]
}

const tribeInfo: Record<string, TribeInfo> = {
  Akan: {
    name: 'Akan',
    description: 'The Akan people are one of the largest ethnic groups in Ghana, known for their rich cultural traditions and naming ceremonies.',
    location: 'Central and Southern Ghana',
    population: 'Approximately 11 million',
    languages: ['Twi', 'Fante', 'Akuapem'],
    namingTraditions: [
      'Day names based on birth day',
      'Spiritual names from ancestors',
      'Names reflecting circumstances of birth',
    ],
  },
  Ga: {
    name: 'Ga',
    description: 'The Ga people are primarily located in the Greater Accra Region, with unique naming traditions tied to their coastal heritage.',
    location: 'Greater Accra Region',
    population: 'Approximately 1.5 million',
    languages: ['Ga', 'Dangme'],
    namingTraditions: [
      'Names based on birth order',
      'Names from natural elements',
      'Names reflecting family history',
    ],
  },
  Ewe: {
    name: 'Ewe',
    description: 'The Ewe people are found in the Volta Region, with distinct naming practices that emphasize family lineage and spiritual connections.',
    location: 'Volta Region',
    population: 'Approximately 3 million',
    languages: ['Ewe'],
    namingTraditions: [
      'Names honoring ancestors',
      'Names from local deities',
      'Names reflecting personality traits',
    ],
  },
  Dagomba: {
    name: 'Dagomba',
    description: 'The Dagomba people are from the Northern Region, with naming traditions that reflect their royal heritage and Islamic influences.',
    location: 'Northern Region',
    population: 'Approximately 2 million',
    languages: ['Dagbani'],
    namingTraditions: [
      'Names from Islamic calendar',
      'Names reflecting social status',
      'Names honoring chiefs',
    ],
  },
}

export function NameTribeInfo() {
  const [selectedTribe, setSelectedTribe] = useState<string | null>(null)

  const tribes = Object.keys(tribeInfo)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-400" />
          Tribe Information
        </CardTitle>
        <CardDescription className="text-white/70">
          Learn about Ghanaian ethnic groups and naming traditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {tribes.map((tribe) => (
            <Button
              key={tribe}
              onClick={() => setSelectedTribe(selectedTribe === tribe ? null : tribe)}
              variant="outline"
              className={`${
                selectedTribe === tribe
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-200'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              } font-semibold`}
            >
              {tribe}
            </Button>
          ))}
        </div>

        {selectedTribe && tribeInfo[selectedTribe] && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div>
              <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-yellow-400" />
                {tribeInfo[selectedTribe].name} People
              </h3>
              <p className="text-white/90 leading-relaxed">{tribeInfo[selectedTribe].description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-white/70 text-xs">Location</span>
                </div>
                <p className="text-white font-semibold text-sm">{tribeInfo[selectedTribe].location}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-green-400" />
                  <span className="text-white/70 text-xs">Population</span>
                </div>
                <p className="text-white font-semibold text-sm">{tribeInfo[selectedTribe].population}</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {tribeInfo[selectedTribe].languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Naming Traditions</h4>
              <ul className="space-y-1">
                {tribeInfo[selectedTribe].namingTraditions.map((tradition, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/80 text-sm">
                    <ChevronRight className="h-4 w-4 text-yellow-400 mt-0.5" />
                    {tradition}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!selectedTribe && (
          <p className="text-white/60 text-center py-4">Select a tribe to learn more</p>
        )}
      </CardContent>
    </Card>
  )
}

