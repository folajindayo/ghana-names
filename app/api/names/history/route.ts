import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

// Store generated names history (even if not claimed)
// This is a simple in-memory store - in production, use Redis or database
const nameHistoryStore = new Map<string, Array<{
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  explanation?: string
  isAIGenerated: boolean
  timestamp: string
}>>

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

    // For now, return claimed names as history
    // In production, you'd store all generated names
    if (!walletAddress) {
      return NextResponse.json({ history: [] }, { status: 200 })
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ history: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ history: [] }, { status: 200 })
    }

    const nameCards = await NameCard.find({
      walletAddress: walletAddress.toLowerCase(),
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    const history = nameCards.map(card => ({
      name: card.name,
      lastName: card.lastName,
      meaning: card.meaning,
      tribe: card.tribe,
      gender: card.gender,
      explanation: card.explanation,
      isAIGenerated: !!card.explanation,
      timestamp: card.createdAt,
      claimed: true,
      ipfsUrl: card.ipfsUrl,
    }))

    return NextResponse.json({ history }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching name history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, name, lastName, meaning, tribe, gender, explanation, isAIGenerated } = body

    if (!walletAddress || !name || !lastName || !meaning) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in memory (in production, use database)
    const key = walletAddress.toLowerCase()
    if (!nameHistoryStore.has(key)) {
      nameHistoryStore.set(key, [])
    }

    const history = nameHistoryStore.get(key) || []
    history.unshift({
      name,
      lastName,
      meaning,
      tribe,
      gender,
      explanation,
      isAIGenerated: isAIGenerated || false,
      timestamp: new Date().toISOString(),
    })

    // Keep only last 100 entries per user
    if (history.length > 100) {
      history.splice(100)
    }

    nameHistoryStore.set(key, history)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error saving to history:', error)
    return NextResponse.json(
      { error: 'Failed to save to history', details: error.message },
      { status: 500 }
    )
  }
}

