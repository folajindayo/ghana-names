'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Play, Pause, Square, Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameAudioRecorderProps {
  name: string
  meaning: string
}

export function NameAudioRecorder({ name, meaning }: NameAudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      toast({
        title: "Recording started",
        description: "Speak the name and meaning clearly.",
      })
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      toast({
        title: "Recording stopped",
        description: "Audio saved successfully.",
      })
    }
  }

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${name}-pronunciation-${Date.now()}.webm`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Audio downloaded",
        description: "Pronunciation audio saved.",
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mic className="h-5 w-5 text-blue-400" />
          Record Pronunciation
        </CardTitle>
        <CardDescription className="text-white/70">
          Record audio pronunciation for "{name}"
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white font-semibold mb-1">Name: {name}</p>
          <p className="text-white/70 text-sm">Meaning: {meaning}</p>
        </div>

        {!audioUrl ? (
          <div className="space-y-3">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="text-center">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">
                    Recording... {formatTime(recordingTime)}
                  </Badge>
                </div>
                <Button
                  onClick={stopRecording}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Stop Recording
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={playAudio}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white"
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
              <Button
                onClick={downloadAudio}
                variant="outline"
                className="bg-white/10 border-white/20 text-white"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  setAudioBlob(null)
                  setAudioUrl(null)
                  setIsPlaying(false)
                }}
                variant="outline"
                className="bg-white/10 border-white/20 text-white"
              >
                <MicOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <p className="text-white/60 text-xs text-center">
          Record your own pronunciation or have someone else pronounce it for you
        </p>
      </CardContent>
    </Card>
  )
}

