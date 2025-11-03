import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import NameCard from '@/models/NameCard'
import Vote from '@/models/Vote'

export async function GET() {
  try {
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ leaderboard: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ leaderboard: [] }, { status: 200 })
    }

    // Top users by names claimed
    const topUsers = await User.find({})
      .sort({ totalNamesClaimed: -1 })
      .limit(10)
      .select('walletAddress totalNamesClaimed')
      .lean()

    // Top names by votes
    const topNames = await Vote.aggregate([
      {
        $group: {
          _id: {
            name: '$name',
            lastName: '$lastName',
          },
          upvotes: {
            $sum: { $cond: [{ $eq: ['$voteType', 'upvote'] }, 1, 0] },
          },
          downvotes: {
            $sum: { $cond: [{ $eq: ['$voteType', 'downvote'] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          name: '$_id.name',
          lastName: '$_id.lastName',
          score: { $subtract: ['$upvotes', '$downvotes'] },
          totalVotes: { $add: ['$upvotes', 'downvotes'] },
        },
      },
      {
        $sort: { score: -1 },
      },
      {
        $limit: 10,
      },
    ])

    return NextResponse.json({
      success: true,
      topUsers: topUsers.map((user, index) => ({
        rank: index + 1,
        walletAddress: user.walletAddress,
        totalNamesClaimed: user.totalNamesClaimed || 0,
      })),
      topNames,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard', details: error.message },
      { status: 500 }
    )
  }
}

