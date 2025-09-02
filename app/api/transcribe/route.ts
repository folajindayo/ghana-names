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

    const assemblyApiKey = process.env.ASSEMBLY_AI_API_KEY
    if (!assemblyApiKey) {
      return NextResponse.json(
        { error: 'Assembly AI API key not configured' },
        { status: 500 }
      )
    }

    console.log('Transcribing audio file with Assembly AI:', audioFile.name, audioFile.size, 'bytes')

    try {
      // Step 1: Upload audio file to Assembly AI
      const uploadFormData = new FormData()
      uploadFormData.append('audio', audioFile)
      
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'Authorization': assemblyApiKey,
        },
        body: uploadFormData,
      })

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text()
        console.error('Assembly AI upload error:', uploadResponse.status, errorText)
        throw new Error(`Upload failed: ${uploadResponse.status}`)
      }

      const uploadResult = await uploadResponse.json()
      console.log('Upload result:', uploadResult)
      const audioUrl = uploadResult.upload_url

      // Step 2: Create transcription job with accent-optimized settings
      const transcriptRequest = {
        audio_url: audioUrl,
        language_detection: true,
        punctuate: true,
        format_text: true,
        speaker_labels: false,
        // Optimized for accents and diverse speech patterns
        acoustic_model: 'assemblyai_default',
        language_confidence_threshold: 0.5,
        speech_model: 'best'
      }

      const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': assemblyApiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transcriptRequest),
      })

      if (!transcriptResponse.ok) {
        const errorText = await transcriptResponse.text()
        console.error('Assembly AI transcript error:', transcriptResponse.status, errorText)
        throw new Error(`Transcript request failed: ${transcriptResponse.status}`)
      }

      const transcriptResult = await transcriptResponse.json()
      console.log('Transcript job created:', transcriptResult)
      const transcriptId = transcriptResult.id

      // Step 3: Poll for completion (with timeout)
      let transcript = ''
      let attempts = 0
      const maxAttempts = 30 // 30 seconds timeout
      
      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
        
        const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
          method: 'GET',
          headers: {
            'Authorization': assemblyApiKey,
          },
        })

        if (statusResponse.ok) {
          const statusResult = await statusResponse.json()
          console.log(`Transcription status (attempt ${attempts + 1}):`, statusResult.status)
          
          if (statusResult.status === 'completed') {
            transcript = statusResult.text || ''
            break
          } else if (statusResult.status === 'error') {
            throw new Error('Transcription failed: ' + statusResult.error)
          }
        }
        
        attempts++
      }

      if (!transcript && attempts >= maxAttempts) {
        throw new Error('Transcription timeout')
      }

      console.log('Final transcript:', transcript)

      return NextResponse.json({
        transcript: transcript
      })
    } catch (error) {
      console.error('Assembly AI transcription error:', error)
      return NextResponse.json(
        { error: 'Failed to transcribe audio with Assembly AI' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    )
  }
}