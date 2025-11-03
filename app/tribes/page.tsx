'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MapPin, Users, BookOpen, Globe } from 'lucide-react'
import Link from 'next/link'

const tribeInformation: Record<string, {
  name: string
  description: string
  region: string
  population: string
  languages: string[]
  traditions: string[]
  notableNames: string[]
}> = {
  'Akan': {
    name: 'Akan',
    description: 'The largest ethnic group in Ghana, known for their rich cultural traditions and naming practices based on days of the week.',
    region: 'Ashanti, Central, Western, Eastern, Brong Ahafo regions',
    population: 'Largest ethnic group',
    languages: ['Twi', 'Fante', 'Akuapem'],
    traditions: ['Day names (Kwame, Akosua, etc.)', 'Golden Stool tradition', 'Kente weaving'],
    notableNames: ['Kwame Nkrumah', 'Kofi Annan'],
  },
  'Ga': {
    name: 'Ga',
    description: 'An ethnic group primarily found in the Greater Accra Region, known for their fishing and trading traditions.',
    region: 'Greater Accra Region',
    population: 'Significant population in Accra',
    languages: ['Ga'],
    traditions: ['Homowo festival', 'Fishing traditions', 'Trading'],
    notableNames: ['Traditional day names'],
  },
  'Ewe': {
    name: 'Ewe',
    description: 'Found in the Volta Region and parts of Togo, known for their music, dance, and vibrant cultural practices.',
    region: 'Volta Region, parts of Togo',
    population: 'Significant in Volta Region',
    languages: ['Ewe'],
    traditions: ['Agbadza dance', 'Drumming traditions', 'Kente patterns'],
    notableNames: ['Cultural day names'],
  },
  'Dagomba': {
    name: 'Dagomba',
    description: 'One of the largest ethnic groups in northern Ghana, known for their kingdom and traditional governance.',
    region: 'Northern Region',
    population: 'Significant in Northern Ghana',
    languages: ['Dagbani'],
    traditions: ['Traditional kingdom', 'Yendi traditions', 'Cultural festivals'],
    notableNames: ['Traditional names'],
  },
  'Mole-Dagbani': {
    name: 'Mole-Dagbani',
    description: 'A major ethnic group in northern Ghana, known for their agricultural practices and traditional customs.',
    region: 'Northern Ghana',
    population: 'Large population',
    languages: ['Dagbani', 'Mole'],
    traditions: ['Agricultural traditions', 'Traditional festivals', 'Cultural practices'],
    notableNames: ['Traditional naming'],
  },
}

export default function TribesPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <MapPin className="h-8 w-8" />
              Ghanaian Tribes
            </h1>
            <p className="text-white/70">Learn about the rich cultural heritage of Ghana's ethnic groups</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(tribeInformation).map(([key, tribe]) => (
            <Card key={key} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  {tribe.name} Tribe
                </CardTitle>
                <CardDescription className="text-white/70">
                  {tribe.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm"><strong>Region:</strong> {tribe.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Users className="h-4 w-4" />
                    <span className="text-sm"><strong>Population:</strong> {tribe.population}</span>
                  </div>
                </div>

                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {tribe.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/90 text-sm font-semibold mb-2">Traditions:</p>
                  <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                    {tribe.traditions.map((tradition, idx) => (
                      <li key={idx}>{tradition}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 text-center">
            <p className="text-white/80 mb-4">
              Ghana is home to over 100 ethnic groups, each with unique cultural practices, 
              languages, and traditions. This diversity is one of Ghana's greatest strengths.
            </p>
            <Link href="/explore">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                Explore Names by Tribe
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

