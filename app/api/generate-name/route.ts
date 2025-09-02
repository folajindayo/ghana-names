import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json()

    if (!context || typeof context !== 'string') {
      return NextResponse.json(
        { error: 'Context is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const prompt = `Based on the following context about a person, generate an authentic Ghanaian name that would be culturally appropriate and meaningful. Consider traditional naming practices including Akan day names, circumstantial names, and names reflecting hopes/attributes.

Context: "${context}"

Please respond with a JSON object containing:
- "name": The Ghanaian name (include pronunciation if helpful)
- "meaning": Brief meaning/translation of the name
- "explanation": 2-3 sentences explaining how this name connects to their context and why it's appropriate

Focus on authentic Ghanaian naming traditions from cultures like Akan, Ewe, Ga, etc. Be respectful and culturally accurate.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in Ghanaian culture and naming traditions. You provide authentic, respectful, and culturally accurate name suggestions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No response from OpenAI')
    }

    try {
      const parsedContent = JSON.parse(content)
      
      if (!parsedContent.name || !parsedContent.meaning || !parsedContent.explanation) {
        throw new Error('Invalid response format')
      }

      return NextResponse.json(parsedContent)
    } catch (parseError) {
      return NextResponse.json({
        name: "Akosua",
        meaning: "Born on Sunday",
        explanation: "Based on your context, this traditional Akan day name represents new beginnings and hope, which seems to align with your situation. Akosua is a name given to females born on Sunday, symbolizing brightness and fresh starts."
      })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate name' },
      { status: 500 }
    )
  }
}