import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Vote from '@/models/Vote'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nameCardId, name, lastName, walletAddress, voteType } = body

    if (!walletAddress || !voteType || (!nameCardId && (!name || !lastName))) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['upvote', 'downvote'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      )
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json(
        { success: false, note: 'Database not available.' },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json(
        { success: false, note: 'Database not available.' },
        { status: 503 }
      )
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({
      $or: [
        { nameCardId, walletAddress: walletAddress.toLowerCase() },
        { name, lastName, walletAddress: walletAddress.toLowerCase() },
      ],
    })

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if clicking same type
        await Vote.findByIdAndDelete(existingVote._id)
        return NextResponse.json({
          success: true,
          voteRemoved: true,
          message: 'Vote removed',
        })
      } else {
        // Update vote type
        existingVote.voteType = voteType
        await existingVote.save()
        return NextResponse.json({
          success: true,
          voteUpdated: true,
          vote: existingVote,
        })
      }
    }

    // Create new vote
    const vote = await Vote.create({
      nameCardId,
      name,
      lastName,
      walletAddress: walletAddress.toLowerCase(),
      voteType,
    })

    return NextResponse.json({
      success: true,
      vote,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error voting:', error)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'You have already voted on this name' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to vote', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const nameCardId = searchParams.get('nameCardId')
    const name = searchParams.get('name')
    const lastName = searchParams.get('lastName')

    if (!nameCardId && (!name || !lastName)) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ upvotes: 0, downvotes: 0, userVote: null }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ upvotes: 0, downvotes: 0, userVote: null }, { status: 200 })
    }

    const query: any = {}
    if (nameCardId) {
      query.nameCardId = nameCardId
    } else {
      query.name = name
      query.lastName = lastName
    }

    const upvotes = await Vote.countDocuments({ ...query, voteType: 'upvote' })
    const downvotes = await Vote.countDocuments({ ...query, voteType: 'downvote' })

    const walletAddress = searchParams.get('walletAddress')
    let userVote = null
    if (walletAddress) {
      const vote = await Vote.findOne({
        ...query,
        walletAddress: walletAddress.toLowerCase(),
      })
      userVote = vote ? vote.voteType : null
    }

    return NextResponse.json({
      upvotes,
      downvotes,
      total: upvotes - downvotes,
      userVote,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching votes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch votes', details: error.message },
      { status: 500 }
    )
  }
}

