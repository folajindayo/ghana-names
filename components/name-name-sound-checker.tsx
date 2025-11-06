'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Sparkles, Play, Pause } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SoundAnalysis {
  name: string
  syllables: number
  stressPattern: string
  phoneticSpelling: string
  pronunciation: string
  difficulty: 'easy' | 'medium' | 'hard'
  tips: string[]
}

export function NameSoundChecker() {
  const [name, setName] = useState('')
  const [analysis, setAnalysis] = useState<SoundAnalysis | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  const analyzeSound = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    const normalized = name.toLowerCase().trim()
    const vowels = (normalized.match(/[aeiou]/gi) || []).length
    const consonants = normalized.length - vowels
    const syllables = Math.max(1, vowels)

    let stressPattern = ''
    let phoneticSpelling = ''
    let difficulty: 'easy' | 'medium' | 'hard' = 'easy'
    const tips: string[] = []

    if (normalized.length <= 4) {
      stressPattern = 'Single stress'
      phoneticSpelling = normalized.toUpperCase()
      difficulty = 'easy'
      tips.push('Short names are easy to pronounce')
    } else if (normalized.length <= 7) {
      stressPattern = 'First syllable stressed'
      phoneticSpelling = normalized.charAt(0).toUpperCase() + normalized.slice(1)
      difficulty = 'medium'
      tips.push('Emphasize the first syllable')
    } else {
      stressPattern = 'Multiple syllables'
      phoneticSpelling = normalized.split('').map((c, i) => (i === 0 ? c.toUpperCase() : c)).join('')
      difficulty = 'hard'
      tips.push('Break into syllables for easier pronunciation')
    }

    if (normalized.includes('kw') || normalized.includes('gy')) {
      tips.push('Pay attention to consonant clusters')
    }

    if (vowels > consonants) {
      tips.push('Vowel-heavy name, flows smoothly')
    } else {
      tips.push('Consonant-heavy name, may need practice')
    }

    const pronunciation = `Pronounced as: ${normalized.split('').join('-').toUpperCase()}`

    setAnalysis({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      syllables,
      stressPattern,
      phoneticSpelling,
      pronunciation,
      difficulty,
      tips,
    })

    toast({
      title: "Sound analyzed!",
      description: `${syllables} syllable${syllables !== 1 ? 's' : ''}, ${difficulty} to pronounce`,
    })
  }

  const playPronunciation = () => {
    if (!analysis) return

    if (isPlaying) {
      setIsPlaying(false)
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      return
    }

    setIsPlaying(true)
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(analysis.name)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => {
        setIsPlaying(false)
        toast({
          title: "Playback error",
          description: "Could not play pronunciation",
          variant: "destructive",
        })
      }
      window.speechSynthesis.speak(utterance)
    } else {
      setIsPlaying(false)
      toast({
        title: "Not supported",
        description: "Text-to-speech not available",
        variant: "destructive",
      })
    }
  }

  const getDifficultyColor = () => {
    if (!analysis) return ''
    switch (analysis.difficulty) {
      case 'easy':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'medium':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
      case 'hard':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-blue-400" />
          Sound Checker
        </CardTitle>
        <CardDescription className="text-white/70">
          Analyze pronunciation and sound characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter a Name</Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Kwame, Akosua"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeSound()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button
              onClick={analyzeSound}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{analysis.name}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Button
                  onClick={playPronunciation}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>
                <Badge variant="secondary" className={`${getDifficultyColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                  {analysis.difficulty}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Syllables</p>
                <p className="text-2xl font-bold text-white">{analysis.syllables}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 text-center">
                <p className="text-white/70 text-xs mb-1">Stress</p>
                <p className="text-white font-semibold text-sm">{analysis.stressPattern}</p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Phonetic Spelling</h4>
              <p className="text-white/90 text-base font-mono">{analysis.phoneticSpelling}</p>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <h4 className="text-white font-semibold mb-2 text-sm">Pronunciation Guide</h4>
              <p className="text-white/80 text-xs">{analysis.pronunciation}</p>
            </div>

            {analysis.tips.length > 0 && (
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
                <h4 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-blue-400" />
                  Pronunciation Tips
                </h4>
                <ul className="space-y-1">
                  {analysis.tips.map((tip, index) => (
                    <li key={index} className="text-white/80 text-xs flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {name && !analysis && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to analyze sound</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

