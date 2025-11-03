import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'

export async function GET() {
  try {
    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      return NextResponse.json({ featuredNames: [] }, { status: 200 })
    }

    if (!dbConnected) {
      return NextResponse.json({ featuredNames: [] }, { status: 200 })
    }

    // Get week number to ensure consistent weekly rotation
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const daysSinceStart = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24))
    const weekNumber = Math.floor(daysSinceStart / 7)

    // Use week number as seed for consistent selection
    const allNames = await NameCard.aggregate([
      {
        $group: {
          _id: {
            name: '$name',
            meaning: '$meaning',
            tribe: '$tribe',
            gender: '$gender',
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: '$_id.name',
          meaning: '$_id.meaning',
          tribe: '$_id.tribe',
          gender: '$_id.gender',
          count: 1,
        },
      },
    ])

    // Select 3 names based on week number (deterministic randomness)
    const featuredCount = 3
    const selectedNames: any[] = []
    const usedIndices = new Set<number>()

    for (let i = 0; i < Math.min(featuredCount, allNames.length); i++) {
      let index: number
      do {
        // Use week number + index for pseudo-random selection
        index = (weekNumber * featuredCount + i) % allNames.length
      } while (usedIndices.has(index) && usedIndices.size < allNames.length)

      usedIndices.add(index)
      selectedNames.push({
        ...allNames[index],
        weekNumber,
      })
    }

    return NextResponse.json({
      success: true,
      featuredNames: selectedNames,
      weekNumber,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error fetching featured names:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured names', details: error.message },
      { status: 500 }
    )
  }
}

