import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import { ghanaianNames } from '@/lib/ghanaian-names'

// Simple string similarity function (Levenshtein distance)
function similarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  if (longer.length === 0) return 1.0

  const distance = levenshteinDistance(longer, shorter)
  return (longer.length - distance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[str2.length][str1.length]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const limit = parseInt(searchParams.get('limit') || '5')

    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 })
    }

    let dbConnected = false
    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
    }

    const similarNames: Array<{
      name: string
      meaning: string
      tribe?: string
      gender?: string
      similarity: number
      type: 'database' | 'static'
    }> = []

    // Find similar names in database
    if (dbConnected) {
      const allDbNames = await NameCard.find({}).distinct('name').lean()
      
      allDbNames.forEach((dbName: string) => {
        const sim = similarity(name.toLowerCase(), dbName.toLowerCase())
        if (sim > 0.3 && dbName.toLowerCase() !== name.toLowerCase()) {
          // Get sample data for this name
          NameCard.findOne({ name: dbName })
            .lean()
            .then((card) => {
              if (card) {
                similarNames.push({
                  name: card.name,
                  meaning: card.meaning,
                  tribe: card.tribe,
                  gender: card.gender,
                  similarity: sim,
                  type: 'database',
                })
              }
            })
        }
      })
    }

    // Find similar names in static list
    ghanaianNames.forEach((staticName) => {
      const nameSim = similarity(name.toLowerCase(), staticName.name.toLowerCase())
      const meaningSim = similarity(name.toLowerCase(), staticName.meaning.toLowerCase())
      const maxSim = Math.max(nameSim, meaningSim * 0.5) // Meaning similarity weighted less

      if (maxSim > 0.3 && staticName.name.toLowerCase() !== name.toLowerCase()) {
        similarNames.push({
          name: staticName.name,
          meaning: staticName.meaning,
          tribe: staticName.tribe,
          gender: staticName.gender,
          similarity: maxSim,
          type: 'static',
        })
      }
    })

    // Sort by similarity and remove duplicates
    similarNames.sort((a, b) => b.similarity - a.similarity)

    // Remove duplicates
    const uniqueNames = new Map<string, typeof similarNames[0]>()
    similarNames.forEach((n) => {
      const key = n.name.toLowerCase()
      if (!uniqueNames.has(key) || uniqueNames.get(key)!.similarity < n.similarity) {
        uniqueNames.set(key, n)
      }
    })

    const results = Array.from(uniqueNames.values())
      .slice(0, limit)
      .map((n) => ({
        ...n,
        similarity: Math.round(n.similarity * 100), // Convert to percentage
      }))

    return NextResponse.json({
      success: true,
      similarNames: results,
      queryName: name,
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error finding similar names:', error)
    return NextResponse.json(
      { error: 'Failed to find similar names', details: error.message },
      { status: 500 }
    )
  }
}

