import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function GET() {
  try {
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ trends: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ trends: [] }, { status: 200 })
    }

    // Get trends for last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    // Aggregate by day
    const trends = await NameCard.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ])

    // Get top names by tribe in last 30 days
    const tribeTrends = await NameCard.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
          tribe: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: '$tribe',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          tribe: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ])

    return NextResponse.json({
      success: true,
      dailyTrends: trends,
      tribeTrends,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching trends:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trends', details: error.message },
      { status: 500 }
    )
  }
}

