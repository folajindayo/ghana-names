import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { uploadToPinata, type NameCardData } from '@/lib/pinata'
import User from '@/models/User'
import NameCard from '@/models/NameCard'
import Transaction from '@/models/Transaction'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

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

    return NextResponse.json({
      success: true,
      nameCard: {
        id: nameCard._id,
        name,
        lastName,
        fullName: nameCardData.fullName,
        meaning,
        tribe,
        gender,
        ipfsHash,
        ipfsUrl,
        explanation,
        createdAt: nameCard.createdAt,
      },
    })
  } catch (error: any) {
    console.error('Error claiming name:', error)
    return NextResponse.json(
      { error: 'Failed to claim name', details: error.message },
      { status: 500 }
    )
  }
}

