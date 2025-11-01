import { NextRequest, NextResponse } from 'next/server'
import { uploadToPinata, type NameCardData } from '@/lib/pinata'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const nameCardData: NameCardData = body

    // Validate required fields
    if (!nameCardData.name || !nameCardData.lastName || !nameCardData.meaning || !nameCardData.walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: name, lastName, meaning, walletAddress' },
        { status: 400 }
      )
    }

    // Upload to Pinata
    const result = await uploadToPinata(nameCardData)

    return NextResponse.json({
      success: true,
      ...result,
    })
  } catch (error: any) {
    console.error('Pinata upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload to Pinata', details: error.message },
      { status: 500 }
    )
  }
}

