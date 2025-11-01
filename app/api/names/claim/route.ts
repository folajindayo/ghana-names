import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { uploadToPinata, type NameCardData } from '@/lib/pinata'
import User from '@/models/User'
import NameCard from '@/models/NameCard'
import Transaction from '@/models/Transaction'

export async function POST(request: NextRequest) {
  try {
    // Try to connect to MongoDB, but handle connection errors gracefully
    // We'll proceed with IPFS upload even if DB is not available
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (dbError: any) {
      console.warn('MongoDB connection error (continuing with IPFS upload):', dbError.message)
      dbConnected = false
      // Don't return error - we'll still upload to IPFS
    }

    const body = await request.json()
    const { walletAddress, name, lastName, meaning, tribe, gender, explanation } = body

    // Validate required fields
    if (!walletAddress || !name || !lastName || !meaning) {
      return NextResponse.json(
        { error: 'Missing required fields: walletAddress, name, lastName, meaning' },
        { status: 400 }
      )
    }

    // Normalize wallet address
    const normalizedAddress = walletAddress.toLowerCase()

    // Create name card data
    const nameCardData: NameCardData = {
      name,
      lastName,
      fullName: `${name} ${lastName}`,
      meaning,
      tribe: tribe || undefined,
      gender: gender || undefined,
      explanation: explanation || undefined,
      walletAddress: normalizedAddress,
      timestamp: new Date().toISOString(),
      platform: 'Ghanaian Name Generator',
    }

    // Upload to Pinata IPFS
    const { ipfsHash, ipfsUrl } = await uploadToPinata(nameCardData)

    // Only save to database if connected
    let nameCardId = null
    if (dbConnected) {
      try {
        // Create or update user
        let user = await User.findOne({ walletAddress: normalizedAddress })
        if (!user) {
          user = await User.create({
            walletAddress: normalizedAddress,
            totalNamesClaimed: 0,
          })
        }

        // Create name card record
        const nameCard = await NameCard.create({
          walletAddress: normalizedAddress,
          name,
          lastName,
          meaning,
          tribe: tribe || undefined,
          gender: gender || undefined,
          ipfsHash,
          ipfsUrl,
          explanation: explanation || undefined,
        })

        nameCardId = nameCard._id

        // Update user's total names claimed
        user.totalNamesClaimed += 1
        await user.save()

        // Create transaction record
        await Transaction.create({
          type: 'claim',
          fromAddress: normalizedAddress,
          nameCardId: nameCard._id,
          ipfsHash,
          metadata: {
            name,
            lastName,
            fullName: nameCardData.fullName,
          },
        })
      } catch (dbSaveError: any) {
        console.error('Error saving to database:', dbSaveError)
        // Continue anyway - IPFS upload succeeded
      }
    }

    return NextResponse.json({
      success: true,
      nameCard: {
        id: nameCardId || 'temp',
        name,
        lastName,
        fullName: nameCardData.fullName,
        meaning,
        tribe,
        gender,
        ipfsHash,
        ipfsUrl,
        explanation,
        createdAt: new Date().toISOString(),
      },
      savedToDatabase: dbConnected,
      note: dbConnected ? undefined : 'Name saved to IPFS only. Configure MongoDB to save to database.',
    })
  } catch (error: any) {
    console.error('Error claiming name:', error)
    return NextResponse.json(
      { error: 'Failed to claim name', details: error.message },
      { status: 500 }
    )
  }
}

