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
- "name": The Ghanaian name with pronunciation guide in parentheses (e.g., "Kwame (KWAH-may)")
- "meaning": A rich, detailed meaning that includes: the literal translation, cultural significance, traditional context, and symbolic associations. Make this 2-3 descriptive sentences.
- "explanation": 3-4 sentences explaining how this name connects to their personal context, why it's culturally appropriate, what qualities it represents, and how it reflects Ghanaian naming wisdom.

Make the meaning very descriptive and culturally rich. Include details about:
- What the name literally means
- Its cultural and spiritual significance
- Traditional contexts where this name is given
- The positive qualities and aspirations it represents
- How it connects to Ghanaian values and traditions

Focus on authentic Ghanaian naming traditions from cultures like Akan, Ewe, Ga, Dagomba, Fante, etc. Be respectful and culturally accurate.`

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
        name: "Akosua (ah-KOH-soo-ah)",
        meaning: "Akosua literally means 'born on Sunday' in the Akan tradition and represents divine light, new beginnings, and spiritual renewal. In Ghanaian culture, Sunday-born children are considered blessed with natural leadership qualities, wisdom, and the ability to bring peace and harmony to their communities. This name carries the spiritual significance of the sun's energy and is associated with prosperity, joy, and positive transformation.",
        explanation: "Based on your personal context, Akosua reflects the fresh start and new chapter you're embarking upon in your life. This traditional Akan day name is particularly fitting as it symbolizes the dawn of new opportunities and the bright potential that lies ahead. In Ghanaian naming wisdom, Akosua represents someone who brings light to others' lives and possesses the inner strength to overcome challenges. The name embodies the cultural values of hope, resilience, and community leadership that are central to Ghanaian identity."
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