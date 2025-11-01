import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import NameCard from '@/models/NameCard'
import Favorite from '@/models/Favorite'
import { getNamesByTribe, getNamesByGender, type GhanaianName } from '@/lib/ghanaian-names'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('walletAddress')
    const preferredTribe = searchParams.get('tribe')
    const preferredGender = searchParams.get('gender') as 'male' | 'female' | null

    let recommendations: GhanaianName[] = []
    let dbConnected = false

    try {
      await connectDB()
      dbConnected = true
    } catch (error) {
      console.error('MongoDB connection error:', error)
      // Continue with basic recommendations even if DB fails
    }

    // Get user's favorites and claimed names to avoid duplicates
    let userPreferences: {
      favoriteTribes?: string[]
      favoriteGenders?: string[]
      claimedNames?: string[]
    } = {}

    if (dbConnected && walletAddress) {
      try {
        const [favorites, claimedNames] = await Promise.all([
          Favorite.find({ walletAddress: walletAddress.toLowerCase() }).limit(10),
          NameCard.find({ walletAddress: walletAddress.toLowerCase() }).limit(10),
        ])

        userPreferences = {
          favoriteTribes: [...new Set(favorites.filter(f => f.tribe).map(f => f.tribe!))],
          favoriteGenders: [...new Set(favorites.filter(f => f.gender).map(f => f.gender!))],
          claimedNames: claimedNames.map(n => n.name.toLowerCase()),
        }
      } catch (err) {
        console.error('Error fetching user preferences:', err)
      }
    }

    // Generate recommendations based on preferences
    const allNames = [...require('@/lib/ghanaian-names').ghanaianNames] as GhanaianName[]
    const filteredNames: GhanaianName[] = []

    // Filter by preferences
    for (const name of allNames) {
      // Skip if user already claimed this name
      if (userPreferences.claimedNames?.includes(name.name.toLowerCase())) {
        continue
      }

      let matches = true

      // Filter by preferred tribe
      if (preferredTribe && preferredTribe !== 'all') {
        if (name.tribe !== preferredTribe) {
          matches = false
        }
      } else if (userPreferences.favoriteTribes && userPreferences.favoriteTribes.length > 0) {
        // Prioritize user's favorite tribes
        if (!userPreferences.favoriteTribes.includes(name.tribe)) {
          // Still include, but lower priority
        }
      }

      // Filter by preferred gender
      if (preferredGender && preferredGender !== 'any') {
        if (name.gender !== preferredGender) {
          matches = false
        }
      } else if (userPreferences.favoriteGenders && userPreferences.favoriteGenders.length > 0) {
        // Prioritize user's favorite genders
        if (!userPreferences.favoriteGenders.includes(name.gender)) {
          // Still include, but lower priority
        }
      }

      if (matches) {
        filteredNames.push(name)
      }
    }

    // Prioritize based on user preferences
    const prioritized = filteredNames.sort((a, b) => {
      let scoreA = 0
      let scoreB = 0

      // Boost score if matches favorite tribe
      if (userPreferences.favoriteTribes?.includes(a.tribe)) scoreA += 2
      if (userPreferences.favoriteTribes?.includes(b.tribe)) scoreB += 2

      // Boost score if matches favorite gender
      if (userPreferences.favoriteGenders?.includes(a.gender)) scoreA += 1
      if (userPreferences.favoriteGenders?.includes(b.gender)) scoreB += 1

      return scoreB - scoreA
    })

    // Get top 10 recommendations
    recommendations = prioritized.slice(0, 10)

    // If we don't have enough, add random ones
    if (recommendations.length < 10) {
      const remaining = allNames.filter(
        n => !recommendations.some(r => r.name === n.name) &&
             !userPreferences.claimedNames?.includes(n.name.toLowerCase())
      )
      recommendations.push(...remaining.slice(0, 10 - recommendations.length))
    }

    return NextResponse.json({
      recommendations: recommendations.slice(0, 10),
      basedOn: {
        tribe: preferredTribe || (userPreferences.favoriteTribes?.[0] || 'all'),
        gender: preferredGender || (userPreferences.favoriteGenders?.[0] || 'any'),
        userPreferences: userPreferences.favoriteTribes || [],
      },
    }, { status: 200 })
  } catch (error: any) {
    console.error('Error generating recommendations:', error)
    return NextResponse.json(
      { error: 'Failed to generate recommendations', details: error.message },
      { status: 500 }
    )
  }
}

