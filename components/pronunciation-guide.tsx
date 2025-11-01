'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Volume2, VolumeX, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PronunciationGuideProps {
  name: string
  meaning: string
  tribe?: string
}

export function PronunciationGuide({ name, meaning, tribe }: PronunciationGuideProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  const speakName = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not available in your browser.",
        variant: "destructive",
      })
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => {
      setIsPlaying(false)
      toast({
        title: "Error",
        description: "Could not pronounce name.",
        variant: "destructive",
      })
    }

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
  }

  const getPhoneticGuide = (name: string): string => {
    // Simple phonetic guide - can be enhanced with actual Ghanaian pronunciations
    const guides: Record<string, string> = {
      'Kwame': 'KWAH-meh',
      'Kwesi': 'KWEH-see',
      'Kwadwo': 'KWAD-woh',
      'Kwabena': 'kwah-BEH-nah',
      'Kwaku': 'KWAH-ku',
      'Yaw': 'YAW',
      'Kofi': 'KOH-fee',
      'Adwoa': 'ah-DWOH-ah',
      'Abena': 'ah-BEH-nah',
      'Akua': 'ah-KWAH',
      'Yaa': 'YAH',
      'Afua': 'ah-FWAH',
      'Ama': 'AH-mah',
      'Akosua': 'ah-KOH-swa',
    }

    return guides[name] || name
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-white/90 text-sm font-medium">Pronunciation Guide</span>
            </div>
            <p className="text-white/70 text-xs font-mono">
              {getPhoneticGuide(name)}
            </p>
          </div>
          <div className="flex gap-1">
            {isPlaying ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={stopSpeaking}
                className="h-8 w-8 text-white/70 hover:text-red-400"
              >
                <VolumeX className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => speakName(`${name} ${meaning}`)}
                className="h-8 w-8 text-white/70 hover:text-blue-400"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

