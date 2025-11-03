'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Volume2, Mic, CheckCircle, XCircle, RotateCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NamePronunciationPracticeProps {
  name: string
  correctPronunciation: string
}

export function NamePronunciationPractice({ name, correctPronunciation }: NamePronunciationPracticeProps) {
  const [userAttempt, setUserAttempt] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const { toast } = useToast()

  const speakName = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(correctPronunciation)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      })
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      // In a real implementation, you would use Web Speech API or a speech recognition service
      toast({
        title: "Recording started",
        description: "Speak the name clearly.",
      })
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false)
        setUserAttempt('User pronunciation attempt')
      }, 2000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access.",
        variant: "destructive",
      })
    }
  }

  const checkPronunciation = () => {
    if (!userAttempt.trim()) {
      toast({
        title: "No attempt recorded",
        description: "Please record your pronunciation first.",
        variant: "destructive",
      })
      return
    }

    // Simple similarity check (in real app, would use speech recognition)
    const similarity = calculateSimilarity(userAttempt.toLowerCase(), correctPronunciation.toLowerCase())
    setScore(similarity)
    setAttempts(attempts + 1)

    if (similarity >= 80) {
      toast({
        title: "Excellent!",
        description: `Great pronunciation! ${similarity}% accurate.`,
      })
    } else if (similarity >= 60) {
      toast({
        title: "Good attempt",
        description: `You're getting there! ${similarity}% accurate.`,
      })
    } else {
      toast({
        title: "Keep practicing",
        description: `Try again! ${similarity}% accurate.`,
        variant: "destructive",
      })
    }
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    const editDistance = levenshteinDistance(str1, str2)
    return Math.round(((longer.length - editDistance) / longer.length) * 100)
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null))

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        )
      }
    }

    return matrix[str2.length][str1.length]
  }

  const reset = () => {
    setUserAttempt('')
    setScore(null)
    setAttempts(0)
    setShowHint(false)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-purple-400" />
          Pronunciation Practice
        </CardTitle>
        <CardDescription className="text-white/70">
          Practice pronouncing "{name}" correctly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Correct Pronunciation */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/70 text-sm">Correct Pronunciation:</p>
            <Button
              onClick={speakName}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Listen
            </Button>
          </div>
          <p className="text-white font-mono text-lg">{correctPronunciation}</p>
        </div>

        {/* User Attempt */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={startRecording}
              disabled={isRecording}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white"
            >
              <Mic className="mr-2 h-4 w-4" />
              {isRecording ? 'Recording...' : 'Record Your Pronunciation'}
            </Button>
            <Button
              onClick={checkPronunciation}
              disabled={!userAttempt || isRecording}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              Check
            </Button>
          </div>

          {userAttempt && (
            <div className="p-3 bg-white/5 rounded border border-white/10">
              <p className="text-white/70 text-sm mb-1">Your attempt:</p>
              <p className="text-white font-mono">{userAttempt}</p>
            </div>
          )}

          {/* Score Display */}
          {score !== null && (
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-semibold">Accuracy Score</p>
                {score >= 80 ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-yellow-400" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Accuracy</span>
                  <Badge
                    className={
                      score >= 80
                        ? 'bg-green-500/20 text-green-300'
                        : score >= 60
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                    }
                  >
                    {score}%
                  </Badge>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      score >= 80
                        ? 'bg-green-500'
                        : score >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-white/60 text-xs">
                  Attempts: {attempts} {score >= 80 && '• Perfect!'}
                </p>
              </div>
            </div>
          )}

          {/* Hint */}
          <Button
            onClick={() => setShowHint(!showHint)}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white"
            size="sm"
          >
            {showHint ? 'Hide' : 'Show'} Hint
          </Button>

          {showHint && (
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <p className="text-white/90 text-sm">
                <strong>Tip:</strong> Break the name into syllables and practice each part slowly.
              </p>
            </div>
          )}

          {/* Reset */}
          <Button
            onClick={reset}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white"
            size="sm"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Reset Practice
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

