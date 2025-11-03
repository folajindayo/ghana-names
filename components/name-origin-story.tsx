'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Info, Users, History } from 'lucide-react'
import { getNameOrigin, type NameOrigin } from '@/lib/name-origins'

interface NameOriginStoryProps {
  name: string
}

export function NameOriginStory({ name }: NameOriginStoryProps) {
  const [origin, setOrigin] = useState<NameOrigin | null>(null)

  useEffect(() => {
    const nameOrigin = getNameOrigin(name)
    setOrigin(nameOrigin)
  }, [name])

  if (!origin) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-blue-500/30 border-2">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          The Story Behind "{name}"
        </CardTitle>
        <CardDescription className="text-white/80">
          Cultural significance and historical context
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Info className="mr-1 h-3 w-3" />
              Origin: {origin.origin}
            </Badge>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-purple-400" />
                <h4 className="text-white font-semibold">Cultural Significance</h4>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{origin.culturalSignificance}</p>
            </div>

            {origin.historicalContext && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <History className="h-4 w-4 text-yellow-400" />
                  <h4 className="text-white font-semibold">Historical Context</h4>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{origin.historicalContext}</p>
              </div>
            )}

            {origin.relatedNames && origin.relatedNames.length > 0 && (
              <div>
                <h4 className="text-white font-semibold mb-2">Related Names</h4>
                <div className="flex flex-wrap gap-2">
                  {origin.relatedNames.map((relatedName) => (
                    <Badge
                      key={relatedName}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20"
                    >
                      {relatedName}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

