import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import { ghanaianNames } from '@/lib/ghanaian-names'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] }, { status: 200 })
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
    }

    const suggestions: Array<{
      name: string
      meaning: string
      tribe?: string
      gender?: string
      type: 'database' | 'static'
      count?: number
    }> = []

    // Search in database (claimed names)
    if (dbConnected) {
      const dbResults = await NameCard.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { meaning: { $regex: query, $options: 'i' } },
        ],
      })
        .limit(limit)
        .lean()

      const nameGroups = new Map<string, { count: number; data: any }>()

      dbResults.forEach((card) => {
        const key = card.name.toLowerCase()
        if (!nameGroups.has(key)) {
          nameGroups.set(key, { count: 0, data: card })
        }
        nameGroups.get(key)!.count++
      })

      nameGroups.forEach(({ count, data }) => {
        suggestions.push({
          name: data.name,
          meaning: data.meaning,
          tribe: data.tribe,
          gender: data.gender,
          type: 'database',
          count,
        })
      })
    }

    // Search in static name list
    const staticResults = ghanaianNames.filter(
      (name) =>
        name.name.toLowerCase().includes(query.toLowerCase()) ||
        name.meaning.toLowerCase().includes(query.toLowerCase())
    )

    staticResults.forEach((name) => {
      // Avoid duplicates
      if (!suggestions.some((s) => s.name.toLowerCase() === name.name.toLowerCase())) {
        suggestions.push({
          name: name.name,
          meaning: name.meaning,
          tribe: name.tribe,
          gender: name.gender,
          type: 'static',
        })
      }
    })

    // Sort by relevance (database names with higher counts first, then alphabetically)
    suggestions.sort((a, b) => {
      if (a.type === 'database' && b.type === 'static') return -1
      if (a.type === 'static' && b.type === 'database') return 1
      if (a.count && b.count) return b.count - a.count
      return a.name.localeCompare(b.name)
    })

    return NextResponse.json({
      suggestions: suggestions.slice(0, limit),
      query,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error searching names:', error)
    return NextResponse.json(
      { error: 'Failed to search names', details: error.message },
      { status: 500 }
    )
  }
}

