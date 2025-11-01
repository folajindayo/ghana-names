"use client"

import type React from "react"
import { GhanaianNameGenerator } from "@/components/ghanaian-name-generator"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Compass, Heart, BarChart3, Clock, FolderPlus } from "lucide-react"

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
      </div>
      <GhanaianNameGenerator />
      <Toaster />
    </div>
  )
}
