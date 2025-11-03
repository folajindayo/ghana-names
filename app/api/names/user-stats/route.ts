import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import Favorite from '@/models/Favorite'
import Vote from '@/models/Vote'
import Comment from '@/models/Comment'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')?.toLowerCase()

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
      return NextResponse.json({
        totalNames: 0,
        totalFavorites: 0,
        totalVotes: 0,
        totalComments: 0,
        namesByTribe: [],
        namesByGender: [],
        mostVotedName: null,
      }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({
        totalNames: 0,
        totalFavorites: 0,
        totalVotes: 0,
        totalComments: 0,
        namesByTribe: [],
        namesByGender: [],
        mostVotedName: null,
      }, { status: 200 })
    }

    // Basic counts
    const totalNames = await NameCard.countDocuments({ walletAddress })
    const totalFavorites = await Favorite.countDocuments({ walletAddress })
    const totalVotes = await Vote.countDocuments({ walletAddress })
    const totalComments = await Comment.countDocuments({ walletAddress })

    // Names by tribe
    const namesByTribe = await NameCard.aggregate([
      { $match: { walletAddress, tribe: { $exists: true, $ne: null } } },
      { $group: { _id: '$tribe', count: { $sum: 1 } } },
      { $project: { tribe: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ])

    // Names by gender
    const namesByGender = await NameCard.aggregate([
      { $match: { walletAddress, gender: { $exists: true, $ne: null } } },
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $project: { gender: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ])

    // Most voted name (names that user has claimed)
    const userNames = await NameCard.find({ walletAddress }).select('name lastName').lean()
    const nameStrings = userNames.map(n => `${n.name} ${n.lastName}`)
    
    const mostVotedNameResult = await Vote.aggregate([
      {
        $match: {
          $expr: {
            $in: [{ $concat: ['$name', ' ', '$lastName'] }, nameStrings],
          },
        },
      },
      {
        $group: {
          _id: { name: '$name', lastName: '$lastName' },
          upvotes: { $sum: { $cond: [{ $eq: ['$voteType', 'upvote'] }, 1, 0] } },
          downvotes: { $sum: { $cond: [{ $eq: ['$voteType', 'downvote'] }, 1, 0] } },
        },
      },
      {
        $project: {
          name: '$_id.name',
          lastName: '$_id.lastName',
          score: { $subtract: ['$upvotes', '$downvotes'] },
          _id: 0,
        },
      },
      { $sort: { score: -1 } },
      { $limit: 1 },
    ])

    const mostVotedName = mostVotedNameResult.length > 0 ? mostVotedNameResult[0] : null

    return NextResponse.json({
      success: true,
      totalNames,
      totalFavorites,
      totalVotes,
      totalComments,
      namesByTribe,
      namesByGender,
      mostVotedName,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user stats', details: error.message },
      { status: 500 }
    )
  }
}

