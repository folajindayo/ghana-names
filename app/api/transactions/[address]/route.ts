import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import NameCard from '@/models/NameCard'

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    await connectDB()

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
      { error: 'Failed to fetch transactions', details: error.message },
      { status: 500 }
    )
  }
}

