import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Collection from '@/models/Collection'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')

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
      return NextResponse.json({ collections: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ collections: [] }, { status: 200 })
    }

    const collections = await Collection.find({
      walletAddress: walletAddress.toLowerCase(),
    })
      .populate('nameCardIds')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ collections }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, name, description, color } = body

    if (!walletAddress || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, name' },
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
        { success: false, note: 'Database not available.' },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json(
        { success: false, note: 'Database not available.' },
        { status: 503 }
      )
    }

    const collection = await Collection.create({
      walletAddress: walletAddress.toLowerCase(),
      name,
      description,
      color: color || '#667eea',
      nameCardIds: [],
    })

    return NextResponse.json({ success: true, collection }, { status: 200 })
  } catch (error: any) {
    console.error('Error creating collection:', error)
    return NextResponse.json(
      { error: 'Failed to create collection', details: error.message },
      { status: 500 }
    )
  }
}

