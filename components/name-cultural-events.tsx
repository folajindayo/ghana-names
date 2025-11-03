'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock } from 'lucide-react'

interface CulturalEvent {
  name: string
  date: string
  description: string
  tribe: string
  type: 'festival' | 'ceremony' | 'celebration'
  relatedNames?: string[]
}

const culturalEvents: CulturalEvent[] = [
  {
    name: 'Homowo Festival',
    date: 'August-September',
    description: 'A harvest festival celebrated by the Ga people of Accra, meaning "hooting at hunger". Names given during this period often reflect abundance and gratitude.',
    tribe: 'Ga-Adangbe',
    type: 'festival',
    relatedNames: ['Nii', 'Naa', 'Kpakpo'],
  },
  {
    name: 'Kundum Festival',
    date: 'August-September',
    description: 'Celebrated by the Ahanta and Nzema people in the Western Region. This festival is associated with harvest and spiritual renewal.',
    tribe: 'Akan',
    type: 'festival',
    relatedNames: ['Kwame', 'Akosua'],
  },
  {
    name: 'Aboakyer Festival',
    date: 'May',
    description: 'The deer hunting festival of the Effutu people in Winneba. Names given during this time often reflect courage and hunting prowess.',
    tribe: 'Akan',
    type: 'festival',
    relatedNames: ['Kojo', 'Adwoa'],
  },
  {
    name: 'Damba Festival',
    date: 'September-October',
    description: 'Celebrated by the Dagomba people in the Northern Region, marking the birth of Prophet Mohammed. Names often reflect Islamic traditions.',
    tribe: 'Mole-Dagbani',
    type: 'festival',
    relatedNames: ['Fuseini', 'Mariama'],
  },
  {
    name: 'Hogbetsotso Festival',
    date: 'November',
    description: 'The migration festival of the Anlo Ewe people in the Volta Region. Commemorates the migration from Notsie in Togo.',
    tribe: 'Ewe',
    type: 'festival',
    relatedNames: ['Komla', 'Abla'],
  },
  {
    name: 'Odwira Festival',
    date: 'September-October',
    description: 'A purification festival celebrated by the Akan people, particularly in Akropong. Names during this period often reflect renewal and cleansing.',
    tribe: 'Akan',
    type: 'festival',
    relatedNames: ['Kwabena', 'Abena'],
  },
]

export function NameCulturalEvents() {
  const currentMonth = new Date().getMonth() + 1
  const currentEvents = culturalEvents.filter((event) => {
    const eventMonths = event.date.split('-').map((m) => {
      const monthMap: Record<string, number> = {
        january: 1,
        february: 2,
        march: 3,
        april: 4,
        may: 5,
        june: 6,
        july: 7,
        august: 8,
        september: 9,
        october: 10,
        november: 11,
        december: 12,
      }
      return monthMap[m.toLowerCase()]
    })
    return eventMonths.some((m) => Math.abs(m - currentMonth) <= 1)
  })

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-yellow-400" />
          Cultural Events & Festivals
        </CardTitle>
        <CardDescription className="text-white/70">
          Ghanaian festivals and their connection to naming traditions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentEvents.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-yellow-400" />
              <p className="text-white font-semibold text-sm">Happening Now or Soon</p>
            </div>
            <p className="text-white/70 text-xs">
              {currentEvents.length} festival{currentEvents.length > 1 ? 's' : ''} this month
            </p>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {culturalEvents.map((event, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg">{event.name}</h4>
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <Badge
                      variant="secondary"
                      className={
                        event.type === 'festival'
                          ? 'bg-purple-500/20 text-purple-300'
                          : event.type === 'ceremony'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-green-500/20 text-green-300'
                      }
                    >
                      {event.type}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      <MapPin className="mr-1 h-3 w-3" />
                      {event.tribe}
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                      <Calendar className="mr-1 h-3 w-3" />
                      {event.date}
                    </Badge>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
              {event.relatedNames && event.relatedNames.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-white/70 text-xs mb-2">Related Names:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.relatedNames.map((name, nameIndex) => (
                      <Badge
                        key={nameIndex}
                        variant="secondary"
                        className="bg-white/10 text-white border-white/20"
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

