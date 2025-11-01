import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import User from '@/models/User'
import Favorite from '@/models/Favorite'

export async function GET() {
  try {
    console.log('Testing MongoDB connection...')
    
    // Try to connect
    await connectDB()
    console.log('✅ MongoDB connection successful')
    
    // Test query - count documents in collections
    const nameCardCount = await NameCard.countDocuments()
    const userCount = await User.countDocuments()
    const favoriteCount = await Favorite.countDocuments()
    
    // Test write operation
    const testResult = await User.findOne({ walletAddress: 'test-connection' })
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      connectionStatus: 'Connected',
      databaseStats: {
        nameCards: nameCardCount,
        users: userCount,
        favorites: favoriteCount,
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 })
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:', error)
    
    return NextResponse.json({
      success: false,
      message: 'MongoDB connection failed',
      connectionStatus: 'Failed',
      error: error.message,
      errorCode: error.code || 'UNKNOWN',
      timestamp: new Date().toISOString(),
      troubleshooting: {
        checkUri: 'Verify MONGODB_URI in .env.local is correct',
        checkNetwork: 'Ensure MongoDB server is accessible',
        checkCredentials: 'Verify username/password are correct',
      },
    }, { status: 503 })
  }
}

