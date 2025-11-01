import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

// Get all favorites for a wallet address
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
      return NextResponse.json(
        { favorites: [], note: 'Database not available. Favorites will be stored locally only.' },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json({ favorites: [] }, { status: 200 })
    }

    const favorites = await Favorite.find({ 
      walletAddress: walletAddress.toLowerCase() 
    }).sort({ createdAt: -1 })

    return NextResponse.json({ favorites }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching favorites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites', details: error.message },
      { status: 500 }
    )
  }
}

// Add a favorite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, name, lastName, meaning, tribe, gender, explanation, isAIGenerated } = body

    if (!walletAddress || !name || !lastName || !meaning) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
        { 
          success: false,
          note: 'Database not available. Favorite saved locally only.' 
        },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      // Store in localStorage on client side if DB unavailable
      return NextResponse.json(
        { 
          success: false,
          note: 'Database not available. Please save favorites in browser localStorage.' 
        },
        { status: 503 }
      )
    }

    const favorite = await Favorite.findOneAndUpdate(
      {
        walletAddress: walletAddress.toLowerCase(),
        name,
        lastName,
      },
      {
        walletAddress: walletAddress.toLowerCase(),
        name,
        lastName,
        meaning,
        tribe,
        gender,
        explanation,
        isAIGenerated: isAIGenerated || false,
      },
      {
        upsert: true,
        new: true,
      }
    )

    return NextResponse.json({ 
      success: true, 
      favorite,
      savedToDatabase: true,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error saving favorite:', error)
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Name already in favorites' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save favorite', details: error.message },
      { status: 500 }
    )
  }
}

// Delete a favorite
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')
    const name = searchParams.get('name')
    const lastName = searchParams.get('lastName')

    if (!walletAddress || !name || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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
        { 
          success: false,
          note: 'Database not available. Favorite deletion may not persist.' 
        },
        { status: 503 }
      )
    }

    if (!dbConnected) {
      return NextResponse.json(
        { 
          success: false,
          note: 'Database not available.' 
        },
        { status: 503 }
      )
    }

    await Favorite.deleteOne({
      walletAddress: walletAddress.toLowerCase(),
      name,
      lastName,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting favorite:', error)
    return NextResponse.json(
      { error: 'Failed to delete favorite', details: error.message },
      { status: 500 }
    )
  }
}

