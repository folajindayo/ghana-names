'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { BarChart3 } from 'lucide-react'

interface CountStats {
  characters: number
  charactersNoSpaces: number
  words: number
  lines: number
  sentences: number
  paragraphs: number
  vowels: number
  consonants: number
  digits: number
  specialChars: number
}

export function NameWordCharacterCounterEnhanced() {
  const [name, setName] = useState('')
  const [stats, setStats] = useState<CountStats | null>(null)

  useEffect(() => {
    if (!name.trim()) {
      setStats(null)
      return
    }

    const characters = name.length
    const charactersNoSpaces = name.replace(/\s/g, '').length
    const words = name.trim().split(/\s+/).filter(w => w.length > 0).length
    const lines = name.split(/\n/).length
    const sentences = name.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const paragraphs = name.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
    const vowels = (name.match(/[aeiouAEIOU]/g) || []).length
    const consonants = (name.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length
    const digits = (name.match(/\d/g) || []).length
    const specialChars = (name.match(/[^a-zA-Z0-9\s]/g) || []).length

    setStats({
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      vowels,
      consonants,
      digits,
      specialChars,
    })
  }, [name])

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Enhanced Word & Character Counter
        </CardTitle>
        <CardDescription className="text-white/70">
          Count words, characters, vowels, consonants, and more
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white/80">Enter Text</Label>
          <Input
            placeholder="e.g., Kwame Mensah, Akosua Asante"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        {stats && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Characters</p>
                <p className="text-white text-2xl font-bold">{stats.characters}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">No Spaces</p>
                <p className="text-white text-2xl font-bold">{stats.charactersNoSpaces}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Words</p>
                <p className="text-white text-2xl font-bold">{stats.words}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Lines</p>
                <p className="text-white text-2xl font-bold">{stats.lines}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Sentences</p>
                <p className="text-white text-2xl font-bold">{stats.sentences}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Paragraphs</p>
                <p className="text-white text-2xl font-bold">{stats.paragraphs}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Vowels</p>
                <p className="text-white text-2xl font-bold">{stats.vowels}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Consonants</p>
                <p className="text-white text-2xl font-bold">{stats.consonants}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <p className="text-white/60 text-xs mb-1">Digits</p>
                <p className="text-white text-2xl font-bold">{stats.digits}</p>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/10 col-span-2 md:col-span-3">
                <p className="text-white/60 text-xs mb-1">Special Characters</p>
                <p className="text-white text-2xl font-bold">{stats.specialChars}</p>
              </div>
            </div>
          </div>
        )}

        {!name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter text to see detailed statistics</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

