import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import Favorite from '@/models/Favorite'
import Transaction from '@/models/Transaction'

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
      return NextResponse.json({ stats: null }, { status: 503 })
    }

    if (!dbConnected) {
      return NextResponse.json({ stats: null }, { status: 503 })
    }

    const [
      totalNamesClaimed,
      totalFavorites,
      totalGiftsSent,
      totalGiftsReceived,
      namesByTribe,
      namesByGender,
      recentActivity,
    ] = await Promise.all([
      NameCard.countDocuments({ walletAddress: walletAddress.toLowerCase() }),
      Favorite.countDocuments({ walletAddress: walletAddress.toLowerCase() }),
      Transaction.countDocuments({ 
        fromAddress: walletAddress.toLowerCase(),
        type: 'gift',
      }),
      Transaction.countDocuments({ 
        toAddress: walletAddress.toLowerCase(),
        type: 'gift',
      }),
      NameCard.aggregate([
        { $match: { walletAddress: walletAddress.toLowerCase(), tribe: { $exists: true } } },
        { $group: { _id: '$tribe', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      NameCard.aggregate([
        { $match: { walletAddress: walletAddress.toLowerCase(), gender: { $exists: true } } },
        { $group: { _id: '$gender', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      NameCard.find({ walletAddress: walletAddress.toLowerCase() })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ])

    const stats = {
      overview: {
        totalNamesClaimed,
        totalFavorites,
        totalGiftsSent,
        totalGiftsReceived,
      },
      distribution: {
        byTribe: namesByTribe.map(t => ({ tribe: t._id, count: t.count })),
        byGender: namesByGender.map(g => ({ gender: g._id, count: g.count })),
      },
      recentActivity: recentActivity.map(n => ({
        name: `${n.name} ${n.lastName}`,
        meaning: n.meaning,
        tribe: n.tribe,
        createdAt: n.createdAt,
      })),
      achievements: {
        collector: totalNamesClaimed >= 10,
        enthusiast: totalNamesClaimed >= 5,
        sharer: totalGiftsSent >= 3,
        popular: totalGiftsReceived >= 5,
      },
    }

    return NextResponse.json({ stats }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    )
  }
}

