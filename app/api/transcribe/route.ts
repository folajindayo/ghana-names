import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get('audio') as File
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      )
    }

    const googleApiKey = process.env.GOOGLE_SPEECH_API_KEY
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'Google Speech API key not configured' },
        { status: 500 }
      )
    }

    console.log('Transcribing audio file with Google Speech:', audioFile.name, audioFile.size, 'bytes')

    // Convert audio file to base64
    const audioBuffer = await audioFile.arrayBuffer()
    const audioBase64 = Buffer.from(audioBuffer).toString('base64')

    // Google Speech-to-Text API request
    const requestBody = {
      config: {
        encoding: audioFile.type.includes('webm') ? 'WEBM_OPUS' : 'MP4',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        alternativeLanguageCodes: ['en-NG', 'en-GH', 'en-KE', 'en-ZA'], // African English variants
        enableAutomaticPunctuation: true,
        model: 'latest_long', // Better for longer audio
        useEnhanced: true, // Use enhanced model for better accuracy
      },
      audio: {
        content: audioBase64
      }
    }

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${googleApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Speech API error:', response.status, errorText)
      return NextResponse.json(
        { error: `Transcription failed: ${response.status}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    console.log('Google Speech result:', result)

    // Extract transcript from Google's response
    let transcript = ''
    if (result.results && result.results.length > 0) {
      transcript = result.results
        .map((r: any) => r.alternatives[0]?.transcript || '')
        .join(' ')
        .trim()
    }

    return NextResponse.json({
      transcript: transcript
    })
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}