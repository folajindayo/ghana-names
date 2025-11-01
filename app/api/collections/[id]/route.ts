import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Collection from '@/models/Collection'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    const { name, description, color, nameCardIds, action, nameCardId } = body

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

    const collection = await Collection.findById(id)
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 })
    }

    if (action === 'add') {
      if (nameCardId && !collection.nameCardIds.includes(nameCardId)) {
        collection.nameCardIds.push(nameCardId)
      }
    } else if (action === 'remove') {
      if (nameCardId) {
        collection.nameCardIds = collection.nameCardIds.filter(
          (id: any) => id.toString() !== nameCardId
        )
      }
    } else {
      // Update collection details
      if (name) collection.name = name
      if (description !== undefined) collection.description = description
      if (color) collection.color = color
      if (nameCardIds) collection.nameCardIds = nameCardIds
    }

    await collection.save()

    return NextResponse.json({ success: true, collection }, { status: 200 })
  } catch (error: any) {
    console.error('Error updating collection:', error)
    return NextResponse.json(
      { error: 'Failed to update collection', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

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

    await Collection.findByIdAndDelete(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting collection:', error)
    return NextResponse.json(
      { error: 'Failed to delete collection', details: error.message },
      { status: 500 }
    )
  }
}

