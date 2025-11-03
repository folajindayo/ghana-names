import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Comment from '@/models/Comment'

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
      return NextResponse.json({ comments: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ comments: [] }, { status: 200 })
    }

    const query: any = {}
    if (nameCardId) {
      query.nameCardId = nameCardId
    } else {
      query.name = name
      query.lastName = lastName
    }
    query.parentCommentId = null // Only top-level comments

    const comments = await Comment.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    return NextResponse.json({ comments }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nameCardId, name, lastName, walletAddress, comment, parentCommentId } = body

    if (!walletAddress || !comment || (!nameCardId && (!name || !lastName))) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (comment.length > 500) {
      return NextResponse.json(
        { error: 'Comment too long (max 500 characters)' },
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

    const newComment = await Comment.create({
      nameCardId,
      name,
      lastName,
      walletAddress: walletAddress.toLowerCase(),
      comment: comment.trim(),
      parentCommentId: parentCommentId || null,
    })

    return NextResponse.json({
      success: true,
      comment: newComment,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment', details: error.message },
      { status: 500 }
    )
  }
}

