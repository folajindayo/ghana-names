import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import User from '@/models/User'
import Favorite from '@/models/Favorite'
import Transaction from '@/models/Transaction'

export async function GET() {
  try {
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json(
        { 
          analytics: null,
          note: 'Database not available. Analytics require MongoDB connection.',
        },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json(
        { analytics: null },
        { status: 503 }
      )
    }

    // Get all analytics data in parallel
    const [
      totalNamesClaimed,
      totalUsers,
      totalFavorites,
      totalTransactions,
      popularTribes,
      popularNames,
      recentNames,
      genderDistribution,
    ] = await Promise.all([
      // Total counts
      NameCard.countDocuments(),
      User.countDocuments(),
      Favorite.countDocuments(),
      Transaction.countDocuments(),
      
      // Popular tribes (aggregation)
      NameCard.aggregate([
        { $match: { tribe: { $exists: true, $ne: null, $ne: '' } } },
        { $group: { _id: '$tribe', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      
      // Popular names (aggregation)
      NameCard.aggregate([
        { $group: { _id: '$name', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      
      // Recent names (last 7 days)
      NameCard.find({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }).countDocuments(),
      
      // Gender distribution
      NameCard.aggregate([
        { $match: { gender: { $exists: true, $ne: null } } },
        { $group: { _id: '$gender', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ])

    // Calculate growth trends (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const namesLast30Days = await NameCard.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    })

    // Calculate average names per user
    const avgNamesPerUser = totalUsers > 0 ? (totalNamesClaimed / totalUsers).toFixed(2) : 0

    const analytics = {
      overview: {
        totalNamesClaimed,
        totalUsers,
        totalFavorites,
        totalTransactions,
        namesLast30Days,
        avgNamesPerUser: parseFloat(avgNamesPerUser),
      },
      trends: {
        recentNamesLast7Days: recentNames,
        growthRate: totalUsers > 0 ? ((namesLast30Days / totalUsers) * 100).toFixed(1) : '0',
      },
      popular: {
        tribes: popularTribes.map(t => ({ tribe: t._id, count: t.count })),
        names: popularNames.map(n => ({ name: n._id, count: n.count })),
      },
      distribution: {
        gender: genderDistribution.map(g => ({ gender: g._id, count: g.count })),
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({ analytics }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error.message },
      { status: 500 }
    )
  }
}

