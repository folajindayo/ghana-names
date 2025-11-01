import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { WalletProvider } from "@/components/wallet-provider"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Ghanaian Name Generator",
  description: "Discover your authentic Ghanaian name with Web3",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="font-sans" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
