import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import NameCard from '@/models/NameCard'

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    // Try to connect to MongoDB, but handle connection errors gracefully
    try {
      await connectDB()
    } catch (dbError: any) {
      console.error('MongoDB connection error:', dbError.message)
      // Return empty results instead of error if DB is not available
      return NextResponse.json({
        success: true,
        transactions: [],
        total: 0,
        limit: parseInt(request.nextUrl.searchParams.get('limit') || '50'),
        offset: parseInt(request.nextUrl.searchParams.get('offset') || '0'),
        error: 'Database not available. Please configure MongoDB connection string for local development.',
      })
    }

    const address = params.address.toLowerCase()
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0')

    // Find transactions for this address (both sent and received)
    const transactions = await Transaction.find({
      $or: [{ fromAddress: address }, { toAddress: address }],
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .populate('nameCardId', 'name lastName meaning tribe gender ipfsHash ipfsUrl')
      .lean()

    const total = await Transaction.countDocuments({
      $or: [{ fromAddress: address }, { toAddress: address }],
    })

    return NextResponse.json({
      success: true,
      transactions,
      total,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch transactions', 
        details: error.message,
        transactions: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}

