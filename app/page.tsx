"use client"

import type React from "react"
import { GhanaianNameGenerator } from "@/components/ghanaian-name-generator"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Compass, Heart, BarChart3, Clock, FolderPlus, MapPin, TrendingUp, Trophy } from "lucide-react"
import { PopularNames } from "@/components/popular-names"
import { FeaturedNames } from "@/components/featured-names"
import { RecentClaimsFeed } from "@/components/recent-claims-feed"
import { NameQuiz } from "@/components/name-quiz"
import { NameHistoryLocal } from "@/components/name-history-local"
import { NameWishlist } from "@/components/name-wishlist"
import { NameFavoriteCategories } from "@/components/name-favorite-categories"

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href="/favorites">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <Heart className="mr-2 h-4 w-4" />
            Favorites
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <Compass className="mr-2 h-4 w-4" />
            Explore
          </Button>
        </Link>
        <Link href="/analytics">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </Link>
        <Link href="/history">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <Clock className="mr-2 h-4 w-4" />
            History
          </Button>
        </Link>
        <Link href="/collections">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <FolderPlus className="mr-2 h-4 w-4" />
            Collections
          </Button>
        </Link>
        <Link href="/tribes">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <MapPin className="mr-2 h-4 w-4" />
            Tribes
          </Button>
        </Link>
        <Link href="/stats">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <TrendingUp className="mr-2 h-4 w-4" />
            My Stats
          </Button>
        </Link>
        <Link href="/leaderboard">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            <Trophy className="mr-2 h-4 w-4" />
            Leaderboard
          </Button>
        </Link>
      </div>
      
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <FeaturedNames />
        <GhanaianNameGenerator />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PopularNames />
          <RecentClaimsFeed />
        </div>
        <NameQuiz />
        <NameHistoryLocal />
        <NameWishlist />
        <NameFavoriteCategories />
      </div>
      
      <Toaster />
    </div>
  )
}
