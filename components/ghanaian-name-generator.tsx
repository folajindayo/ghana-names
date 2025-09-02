"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, MapPin, BookOpen, Mic, MicOff } from "lucide-react"
import { getRandomName, type GhanaianName } from "@/lib/ghanaian-names"
import { useToast } from "@/hooks/use-toast"

type GenerationMode = 'simple' | 'ai'

interface AIGeneratedName {
  name: string
  meaning: string
  explanation: string
}

export function GhanaianNameGenerator() {
  const [mode, setMode] = useState<GenerationMode>('simple')
  const [gender, setGender] = useState<'any' | 'male' | 'female'>('any')
  const [lastName, setLastName] = useState('')
  const [context, setContext] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [speechRecognition, setSpeechRecognition] = useState<any>(null)
  const [interimTranscript, setInterimTranscript] = useState('')
  const [generatedName, setGeneratedName] = useState<GhanaianName | null>(null)
  const [aiGeneratedName, setAiGeneratedName] = useState<AIGeneratedName | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateName = async () => {
    if (!lastName.trim()) {
      toast({
        title: "Last name required",
        description: "Please enter your last name.",
        variant: "destructive",
      })
      return
    }
    
    setIsGenerating(true)
    setGeneratedName(null)
    setAiGeneratedName(null)
    
    if (mode === 'simple') {
      // Simulate a small delay for better UX
      setTimeout(() => {
        const name = getRandomName(gender, lastName)
        setGeneratedName(name)
        setIsGenerating(false)
      }, 500)
    } else {
      // AI generation mode
      if (!context.trim()) {
        toast({
          title: "No context provided",
          description: "Please provide some context about yourself or your situation for AI generation.",
          variant: "destructive",
        })
        setIsGenerating(false)
        return
      }

      try {
        console.log('Sending request with context:', context)
        const response = await fetch('/api/generate-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ context }),
        })

        console.log('Response status:', response.status)
        if (!response.ok) {
          const errorData = await response.text()
          console.error('API Error:', errorData)
          throw new Error(`API Error: ${response.status}`)
        }

        const result = await response.json()
        console.log('API Result:', result)
        setAiGeneratedName(result)
        
      } catch (error) {
        console.error('Generation error:', error)
        toast({
          title: "Generation failed",
          description: "There was an error generating your name. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    }
  }

  const startListening = async () => {
    console.log('Starting speech recording with Whisper API...')

    if (isListening) {
      stopListening()
      return
    }

    // Use Whisper API directly for reliable speech recognition
    await startWhisperRecording()
  }

  const startRealtimeSpeechRecognition = async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    let finalTranscript = ''
    let lastUpdate = Date.now()
    
    recognition.onstart = () => {
      console.log('Real-time speech recognition started')
      setIsListening(true)
      setInterimTranscript('')
      toast({
        title: "Listening...",
        description: "Speak now - text will appear in real-time!",
      })
    }

    recognition.onresult = (event: any) => {
      let interimText = ''
      let finalText = ''
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalText += transcript + ' '
        } else {
          interimText += transcript
        }
      }
      
      // Update interim results in real-time
      if (interimText) {
        setInterimTranscript(interimText)
        lastUpdate = Date.now()
      }
      
      // Add final results to context
      if (finalText.trim()) {
        finalTranscript += finalText
        setContext(prev => {
          const newText = finalText.trim()
          const newContext = prev + (prev && !prev.endsWith(' ') ? ' ' : '') + newText
          return newContext
        })
        setInterimTranscript('') // Clear interim since it's now final
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error, event)
      
      if (event.error === 'network') {
        // Network error - fall back to Whisper immediately
        console.log('Network error detected, switching to Whisper API fallback')
        toast({
          title: "Switching to Whisper API",
          description: "Browser speech had network issues, using backup method...",
        })
        setIsListening(false)
        setInterimTranscript('')
        setSpeechRecognition(null)
        
        // Small delay to ensure state is clean before starting Whisper
        setTimeout(() => {
          startWhisperRecording()
        }, 100)
        return
      }
      
      let errorMessage = "Speech recognition error occurred."
      let shouldStop = true
      
      switch (event.error) {
        case 'not-allowed':
          errorMessage = "Microphone access denied. Please allow microphone permission."
          break
        case 'no-speech':
          // Don't show error for no speech, just continue listening
          console.log('No speech detected, continuing to listen...')
          return
        case 'aborted':
          errorMessage = "Speech recognition was stopped."
          break
        case 'service-not-allowed':
          errorMessage = "Speech service not allowed. Switching to Whisper API..."
          // Also fallback for service issues
          setTimeout(() => {
            startWhisperRecording()
          }, 100)
          break
        default:
          errorMessage = `Speech recognition failed (${event.error}). Trying Whisper API...`
          // Fallback for any unhandled errors
          setTimeout(() => {
            startWhisperRecording()
          }, 100)
      }
      
      toast({
        title: "Speech recognition issue",
        description: errorMessage,
        variant: event.error === 'service-not-allowed' ? "default" : "destructive",
      })
      setIsListening(false)
      setInterimTranscript('')
      setSpeechRecognition(null)
    }

    recognition.onend = () => {
      console.log('Speech recognition ended')
      setIsListening(false)
      setInterimTranscript('')
      
      if (finalTranscript.trim()) {
        toast({
          title: "Speech captured!",
          description: "Your speech has been added to the context.",
        })
      }
    }

    setSpeechRecognition(recognition)
    recognition.start()

    // Auto-stop after 30 seconds of continuous listening
    setTimeout(() => {
      if (recognition && isListening) {
        recognition.stop()
      }
    }, 30000)
  }

  const startWhisperRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Microphone not supported",
        description: "Your browser doesn't support microphone access.",
        variant: "destructive",
      })
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      })
      
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      })
      
      const audioChunks: Blob[] = []
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data)
        }
      }
      
      recorder.onstop = async () => {
        console.log('Recording stopped, processing with Whisper...')
        const audioBlob = new Blob(audioChunks, { type: recorder.mimeType })
        
        try {
          const transcript = await transcribeAudio(audioBlob)
          if (transcript) {
            setContext(prev => {
              const newContext = prev + (prev && !prev.endsWith(' ') ? ' ' : '') + transcript
              return newContext
            })
          }
        } catch (error) {
          console.error('Transcription error:', error)
          toast({
            title: "Transcription failed",
            description: "Could not convert speech to text. Please try again.",
            variant: "destructive",
          })
        }
        
        stream.getTracks().forEach(track => track.stop())
        setIsListening(false)
        setMediaRecorder(null)
      }
      
      setMediaRecorder(recorder)
      setIsListening(true)
      recorder.start()
      
      // Auto-stop after 10 seconds
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop()
        }
      }, 10000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
      toast({
        title: "Microphone error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop()
      setSpeechRecognition(null)
    }
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop()
    }
    setInterimTranscript('')
    setIsListening(false)
  }

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')
    
    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.status}`)
    }
    
    const result = await response.json()
    return result.transcript
  }

  const handleGenerateAnother = () => {
    handleGenerateName()
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">🇬🇭 Ghanaian Name Generator</h1>
        <p className="text-white/70">Discover your authentic Ghanaian name with meaning and tribe</p>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Generate Your Name
          </CardTitle>
          <CardDescription className="text-white/70">
            Choose between simple generation or AI-powered contextual generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/90">Generation Mode</Label>
            <Select value={mode} onValueChange={(value: GenerationMode) => setMode(value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
                <SelectValue placeholder="Select generation mode" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/20">
                <SelectItem value="simple">Simple (From Database)</SelectItem>
                <SelectItem value="ai">AI-Powered (Contextual)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white/90">
              Your Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
              required
            />
          </div>

          {mode === 'simple' && (
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-white/90">
                Gender Preference
              </Label>
              <Select value={gender} onValueChange={(value: 'any' | 'male' | 'female') => setGender(value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-white/40 backdrop-blur-sm">
                  <SelectValue placeholder="Select gender preference" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 border-white/20">
                  <SelectItem value="any">Any Gender</SelectItem>
                  <SelectItem value="male">Male Names Only</SelectItem>
                  <SelectItem value="female">Female Names Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {mode === 'ai' && (
            <div className="space-y-2">
              <Label className="text-white/90">
                Tell us about yourself or your situation:
              </Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <textarea
                    placeholder="E.g., I'm having my first child and hoping for prosperity... or speak by clicking the microphone"
                    value={context + (interimTranscript ? ' ' + interimTranscript : '')}
                    onChange={(e) => {
                      // Only allow editing if not listening
                      if (!isListening) {
                        setContext(e.target.value)
                      }
                    }}
                    className="flex-1 min-h-[100px] w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    readOnly={isListening}
                  />
                  {interimTranscript && (
                    <div className="absolute bottom-2 right-2 text-xs text-yellow-300 bg-yellow-900/50 px-2 py-1 rounded">
                      Speaking...
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={startListening}
                  disabled={isGenerating}
                  className={`shrink-0 ${isListening ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' : ''}`}
                >
                  {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
              {isListening && (
                <p className="text-sm text-white/80 animate-pulse">
                  Recording... click microphone to stop (auto-stops in 10s)
                </p>
              )}
            </div>
          )}

          <Button
            onClick={() => {
              console.log('Generate button clicked!')
              console.log('lastName:', lastName)
              console.log('mode:', mode)
              console.log('context:', context)
              console.log('isGenerating:', isGenerating)
              handleGenerateName()
            }}
            disabled={!lastName.trim() || isGenerating || (mode === 'ai' && !context.trim())}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate {mode === 'ai' ? 'AI-Powered ' : ''}Ghanaian Name
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {(generatedName || aiGeneratedName) && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Ghanaian Name
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedName && (
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-yellow-400">
                  {generatedName.name} {lastName}
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    <BookOpen className="mr-1 h-3 w-3" />
                    {generatedName.meaning}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <MapPin className="mr-1 h-3 w-3" />
                    {generatedName.tribe} Tribe
                  </Badge>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    <Users className="mr-1 h-3 w-3" />
                    {generatedName.gender === 'male' ? 'Male' : 'Female'}
                  </Badge>
                </div>
              </div>
            )}

            {aiGeneratedName && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {aiGeneratedName.name} {lastName}
                  </div>
                  <p className="text-lg text-white/90 font-medium mb-4">
                    {aiGeneratedName.meaning}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wide">
                    Connection to Your Story:
                  </h4>
                  <p className="text-white/80 leading-relaxed">
                    {aiGeneratedName.explanation}
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/20">
              <Button
                onClick={handleGenerateAnother}
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Another Name
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  )
}
