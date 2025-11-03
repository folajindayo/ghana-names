import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, nameCardIds } = body

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 503 }
      )
    }

    let nameCards
    if (nameCardIds && nameCardIds.length > 0) {
      nameCards = await NameCard.find({
        _id: { $in: nameCardIds },
        walletAddress: walletAddress.toLowerCase(),
      }).lean()
    } else {
      nameCards = await NameCard.find({
        walletAddress: walletAddress.toLowerCase(),
      }).sort({ createdAt: -1 }).limit(50).lean()
    }

    if (nameCards.length === 0) {
      return NextResponse.json(
        { error: 'No name cards found' },
        { status: 404 }
      )
    }

    // Return JSON data for client-side PDF generation
    // Client will use jsPDF or similar library
    return NextResponse.json({
      success: true,
      nameCards: nameCards.map(card => ({
        name: card.name,
        lastName: card.lastName,
        meaning: card.meaning,
        tribe: card.tribe,
        gender: card.gender,
        explanation: card.explanation,
        ipfsUrl: card.ipfsUrl,
        createdAt: card.createdAt,
      })),
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error exporting names:', error)
    return NextResponse.json(
      { error: 'Failed to export names', details: error.message },
      { status: 500 }
    )
  }
}

