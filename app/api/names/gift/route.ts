import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import Transaction from '@/models/Transaction'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { fromAddress, toAddress, nameCardId, message } = body

    if (!fromAddress || !toAddress || !nameCardId) {
      return NextResponse.json(
        { error: 'Missing required fields: fromAddress, toAddress, nameCardId' },
        { status: 400 }
      )
    }

    const normalizedFromAddress = fromAddress.toLowerCase()
    const normalizedToAddress = toAddress.toLowerCase()

    // Find the name card
    const nameCard = await NameCard.findById(nameCardId)
    if (!nameCard) {
      return NextResponse.json({ error: 'Name card not found' }, { status: 404 })
    }

    // Verify ownership
    if (nameCard.walletAddress !== normalizedFromAddress) {
      return NextResponse.json({ error: 'Not authorized to gift this name' }, { status: 403 })
    }

    // Transfer ownership
    nameCard.walletAddress = normalizedToAddress
    await nameCard.save()

    // Create transaction record
    await Transaction.create({
      type: 'gift',
      fromAddress: normalizedFromAddress,
      toAddress: normalizedToAddress,
      nameCardId: nameCard._id,
      ipfsHash: nameCard.ipfsHash,
      metadata: {
        name: nameCard.name,
        lastName: nameCard.lastName,
        message: message || undefined,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Name card gifted successfully',
      nameCard: {
        id: nameCard._id,
        walletAddress: normalizedToAddress,
        ipfsHash: nameCard.ipfsHash,
        ipfsUrl: nameCard.ipfsUrl,
      },
    })
  } catch (error: any) {
    console.error('Error gifting name:', error)
    return NextResponse.json(
      { error: 'Failed to gift name', details: error.message },
      { status: 500 }
    )
  }
}

