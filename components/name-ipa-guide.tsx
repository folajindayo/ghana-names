'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Volume2 } from 'lucide-react'

interface NameIPAGuideProps {
  name: string
  tribe?: string
}

// IPA pronunciation guide for common Ghanaian names
const ipaGuide: Record<string, { ipa: string; phonetic: string; notes?: string }> = {
  'Kwame': { ipa: '/ˈkwɑːmeɪ/', phonetic: 'KWAH-may', notes: 'Stress on first syllable' },
  'Kofi': { ipa: '/ˈkoʊfi/', phonetic: 'KOH-fee', notes: 'Long O sound' },
  'Kwesi': { ipa: '/ˈkweɪsi/', phonetic: 'KWAY-see', notes: 'First syllable stressed' },
  'Akosua': { ipa: '/ɑːˈkoʊswɑː/', phonetic: 'ah-KOH-swah', notes: 'Stress on second syllable' },
  'Ama': { ipa: '/ˈɑːmɑː/', phonetic: 'AH-mah', notes: 'Both syllables equally stressed' },
  'Adwoa': { ipa: '/ɑːˈdwoʊɑː/', phonetic: 'ah-DWOH-ah', notes: 'Stress on middle syllable' },
  'Kwabena': { ipa: '/kwɑːˈbeɪnɑː/', phonetic: 'kwah-BAY-nah', notes: 'Stress on second syllable' },
  'Abena': { ipa: '/ɑːˈbeɪnɑː/', phonetic: 'ah-BAY-nah', notes: 'Stress on second syllable' },
  'Yaw': { ipa: '/jɑː/', phonetic: 'yah', notes: 'Single syllable' },
  'Yaa': { ipa: '/jɑː/', phonetic: 'yah', notes: 'Single syllable' },
  'Afua': { ipa: '/ɑːˈfuːɑː/', phonetic: 'ah-FOO-ah', notes: 'Stress on middle syllable' },
  'Nii': { ipa: '/niː/', phonetic: 'nee', notes: 'Long E sound' },
  'Naa': { ipa: '/nɑː/', phonetic: 'nah', notes: 'Long A sound' },
}

export function NameIPAGuide({ name, tribe }: NameIPAGuideProps) {
  const guide = ipaGuide[name]
  
  if (!guide) {
    // Generate basic IPA for unknown names
    const phonetic = name
      .replace(/kw/gi, 'kw')
      .replace(/ky/gi, 'ky')
      .replace(/([aeiou])/gi, '$1')
      .toLowerCase()
    
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            Pronunciation Guide
          </CardTitle>
          <CardDescription className="text-white/70">
            Phonetic pronunciation for {name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-white/70 text-sm mb-1">Phonetic Spelling</p>
              <p className="text-white font-mono text-lg">{phonetic}</p>
            </div>
            <p className="text-white/60 text-xs">
              Note: This is an approximate pronunciation. For accurate IPA, consult a Ghanaian language expert.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border-purple-500/30 border">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-400" />
          IPA Pronunciation Guide
        </CardTitle>
        <CardDescription className="text-white/70">
          International Phonetic Alphabet notation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <p className="text-white/70 text-sm mb-1">IPA Notation</p>
            <p className="text-white font-mono text-2xl font-semibold">{guide.ipa}</p>
          </div>
          <div>
            <p className="text-white/70 text-sm mb-1">Phonetic Spelling</p>
            <p className="text-white text-xl font-semibold">{guide.phonetic}</p>
          </div>
          {guide.notes && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              <Volume2 className="mr-1 h-3 w-3" />
              {guide.notes}
            </Badge>
          )}
        </div>

        {tribe && (
          <div className="pt-3 border-t border-white/10">
            <p className="text-white/70 text-xs">
              Pronunciation may vary slightly by {tribe} dialect and region.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

