import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const timeframe = searchParams.get('timeframe') || 'all' // 'week', 'month', 'all'

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ popularNames: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ popularNames: [] }, { status: 200 })
    }

    // Calculate date range
    let dateFilter: any = {}
    if (timeframe === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      dateFilter = { createdAt: { $gte: weekAgo } }
    } else if (timeframe === 'month') {
      const monthAgo = new Date()
      monthAgo.setMonth(monthAgo.getMonth() - 1)
      dateFilter = { createdAt: { $gte: monthAgo } }
    }

    // Get most popular names (most claimed)
    const popularNames = await NameCard.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
          lastClaimed: { $max: '$createdAt' },
          sample: { $first: '$$ROOT' },
        },
      },
      { $sort: { count: -1, lastClaimed: -1 } },
      { $limit: limit },
      {
        $project: {
          name: '$_id',
          count: 1,
          lastClaimed: 1,
          meaning: '$sample.meaning',
          tribe: '$sample.tribe',
          gender: '$sample.gender',
        },
      },
    ])

    return NextResponse.json({
      success: true,
      popularNames,
      timeframe,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching popular names:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular names', details: error.message },
      { status: 500 }
    )
  }
}

