'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ChevronDown, ChevronUp, Info } from 'lucide-react'

interface NameMeaningDeepDiveProps {
  name: string
  meaning: string
  tribe?: string
  gender?: 'male' | 'female'
}

export function NameMeaningDeepDive({ name, meaning, tribe, gender }: NameMeaningDeepDiveProps) {
  const [expanded, setExpanded] = useState(false)

  // Generate cultural context based on name and tribe
  const getCulturalContext = () => {
    if (tribe === 'Akan') {
      return {
        context: 'In Akan culture, names often reflect the day of birth, personal characteristics, or family history. Names are deeply meaningful and connect individuals to their heritage.',
        traditions: 'Akan people traditionally give day names based on the day of the week a child is born. This practice dates back centuries and is still widely observed today.',
        significance: 'Names in Akan culture are not just labels but are considered to have spiritual significance, influencing a person\'s character and destiny.',
      }
    } else if (tribe === 'Ewe') {
      return {
        context: 'Ewe names often reflect the circumstances of birth, family history, or desired characteristics for the child. They celebrate the continuity of family and community.',
        traditions: 'Ewe naming ceremonies are important community events, often involving extended family members and traditional prayers.',
        significance: 'Names serve as a connection to ancestors and the community, carrying forward family legacies and cultural values.',
      }
    } else if (tribe === 'Ga-Adangbe') {
      return {
        context: 'Ga-Adangbe names frequently relate to natural elements, the sea, or significant life events. They reflect the community\'s close relationship with their coastal environment.',
        traditions: 'The Ga people have a rich tradition of naming ceremonies, often held shortly after birth, involving family elders and community members.',
        significance: 'Names in Ga culture often tell a story, connecting the individual to their family history and the community\'s shared experiences.',
      }
    }
    return {
      context: 'Ghanaian names carry deep cultural significance, often reflecting family history, personal characteristics, or spiritual beliefs.',
      traditions: 'Naming ceremonies are important cultural events that bring families and communities together to celebrate new life.',
      significance: 'Names are not merely identifiers but carry meaning, history, and connection to one\'s cultural heritage and community.',
    }
  }

  const culturalContext = getCulturalContext()

  return (
    <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border-blue-500/30 border">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          Deep Dive: {name}
        </CardTitle>
        <CardDescription className="text-white/70">
          Explore the cultural meaning and significance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
              Meaning
            </Badge>
            <span className="text-white font-semibold">"{meaning}"</span>
          </div>
          {tribe && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                Tribe
              </Badge>
              <span className="text-white">{tribe}</span>
            </div>
          )}
          {gender && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                Gender
              </Badge>
              <span className="text-white capitalize">{gender}</span>
            </div>
          )}
        </div>

        <Button
          onClick={() => setExpanded(!expanded)}
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          {expanded ? (
            <>
              <ChevronUp className="mr-2 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 h-4 w-4" />
              Learn More About This Name
            </>
          )}
        </Button>

        {expanded && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <h4 className="text-white font-semibold">Cultural Context</h4>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{culturalContext.context}</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Traditional Practices</h4>
              <p className="text-white/80 text-sm leading-relaxed">{culturalContext.traditions}</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-2">Significance</h4>
              <p className="text-white/80 text-sm leading-relaxed">{culturalContext.significance}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

