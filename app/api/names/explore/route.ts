import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function GET(request: NextRequest) {
  try {
    // Try to connect to MongoDB, but handle connection errors gracefully
    try {
      await connectDB()
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError.message)
      // Return empty results instead of error if DB is not available
      return NextResponse.json({
        success: true,
        nameCards: [],
        total: 0,
        limit: parseInt(request.nextUrl.searchParams.get('limit') || '20'),
        offset: parseInt(request.nextUrl.searchParams.get('offset') || '0'),
        error: 'Database not available. Please configure MongoDB connection string for local development.',
      })
    }

    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0')
    const walletAddress = request.nextUrl.searchParams.get('walletAddress')
    const searchQuery = request.nextUrl.searchParams.get('search') || ''
    const tribe = request.nextUrl.searchParams.get('tribe')
    const gender = request.nextUrl.searchParams.get('gender')

    const query: any = {}
    if (walletAddress) {
      query.walletAddress = walletAddress.toLowerCase()
    }

    // Add search filter
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { meaning: { $regex: searchQuery, $options: 'i' } },
        { walletAddress: { $regex: searchQuery, $options: 'i' } },
      ]
    }

    // Add tribe filter
    if (tribe && tribe !== 'all') {
      query.tribe = tribe
    }

    // Add gender filter
    if (gender && gender !== 'all') {
      query.gender = gender
    }

    const nameCards = await NameCard.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .lean()

    // Get unique tribes for filter dropdown
    const allTribes = await NameCard.distinct('tribe')
    const uniqueTribes = allTribes.filter((tribe) => tribe && tribe.trim() !== '')

    const total = await NameCard.countDocuments(query)

    return NextResponse.json({
      success: true,
      nameCards,
      total,
      limit,
      offset,
      availableTribes: uniqueTribes,
    })
  } catch (error: any) {
    console.error('Error fetching name cards:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch name cards', 
        details: error.message,
        nameCards: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}

