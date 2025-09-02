"use client"

import type React from "react"
import { GhanaianNameGenerator } from "@/components/ghanaian-name-generator"

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
      <GhanaianNameGenerator />
    </div>
  )
}
