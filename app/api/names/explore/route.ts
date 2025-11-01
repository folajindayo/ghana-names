import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0')
    const walletAddress = request.nextUrl.searchParams.get('walletAddress')

    const query: any = {}
    if (walletAddress) {
      query.walletAddress = walletAddress.toLowerCase()
    }

    const nameCards = await NameCard.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .lean()

    const total = await NameCard.countDocuments(query)

    return NextResponse.json({
      success: true,
      nameCards,
      total,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('Error fetching name cards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch name cards', details: error.message },
      { status: 500 }
    )
  }
}

