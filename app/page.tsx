"use client"

import type React from "react"
import { GhanaianNameGenerator } from "@/components/ghanaian-name-generator"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Compass, Heart, BarChart3, Clock, FolderPlus, MapPin, TrendingUp, Trophy, Menu, X } from "lucide-react"
import { PopularNames } from "@/components/popular-names"
import { FeaturedNames } from "@/components/featured-names"
import { RecentClaimsFeed } from "@/components/recent-claims-feed"
import { NameQuiz } from "@/components/name-quiz"
import { NameHistoryLocal } from "@/components/name-history-local"
import { NameWishlist } from "@/components/name-wishlist"
import { NameFavoriteCategories } from "@/components/name-favorite-categories"
import { NameOfTheDay } from "@/components/name-of-the-day"
import { NameQuickStats } from "@/components/name-quick-stats"
import { NameDiscoveryCarousel } from "@/components/name-discovery-carousel"
import { NameGeneratorShortcuts } from "@/components/name-generator-shortcuts"
import { NameBookmarkWidget } from "@/components/name-bookmark-widget"
import { NameTrendingWidget } from "@/components/name-trending-widget"
import { NameRandomGenerator } from "@/components/name-random-generator"
import { NameSearchWidget } from "@/components/name-search-widget"
import { NameCultureTips } from "@/components/name-culture-tips"
import { NameRecentActivity } from "@/components/name-recent-activity"
import { NameSuggestionsSmart } from "@/components/name-suggestions-smart"
import { NameSocialProof } from "@/components/name-social-proof"
import { NameBirthChart } from "@/components/name-birth-chart"
import { NameMeaningTranslator } from "@/components/name-meaning-translator"
import { NameFavoritesStats } from "@/components/name-favorites-stats"
import { NameGeneratorHistory } from "@/components/name-generator-history"
import { NameTribeInfo } from "@/components/name-tribe-info"
import { NameFortuneTeller } from "@/components/name-fortune-teller"
import { NameCompatibilityChecker } from "@/components/name-compatibility-checker"
import { NameNumerology } from "@/components/name-numerology"
import { NameNameDayFinder } from "@/components/name-name-day-finder"
import { NameAnagramGenerator } from "@/components/name-anagram-generator"
import { NamePhoneticGuide } from "@/components/name-phonetic-guide"
import { NameVariationsGenerator } from "@/components/name-variations-generator"
import { NameFrequencyAnalyzer } from "@/components/name-frequency-analyzer"
import { NameRhythmAnalyzer } from "@/components/name-rhythm-analyzer"
import { NameInitialGenerator } from "@/components/name-initial-generator"
import { NameSoundAlike } from "@/components/name-sound-alike"
import { NameGeneratorAdvanced } from "@/components/name-name-generator-advanced"
import { NameStatsCompare } from "@/components/name-name-stats-compare"
import { NamePalindromeChecker } from "@/components/name-palindrome-checker"
import { NameWordPlay } from "@/components/name-word-play"
import { NameColorAssociation } from "@/components/name-color-association"
import { NameElementAnalyzer } from "@/components/name-element-analyzer"
import { NameAstrologyCompatibility } from "@/components/name-astrology-compatibility"
import { NameLuckyNumbers } from "@/components/name-lucky-numbers"
import { NameLengthAnalyzer } from "@/components/name-name-length-analyzer"
import { NameVibeChecker } from "@/components/name-vibe-checker"
import { NameGeneratorQuick } from "@/components/name-name-generator-quick"
import { NameSuggestionsAI } from "@/components/name-name-suggestions-ai"
import { NameBatchExport } from "@/components/name-name-batch-export"
import { NameValidator } from "@/components/name-name-validator"
import { NameStatsDashboard } from "@/components/name-name-stats-dashboard"
import { NameFavoritesManager } from "@/components/name-name-favorites-manager"
import { NameTrendAnalyzer } from "@/components/name-name-trend-analyzer"
import { NameSimilarityMatrix } from "@/components/name-name-similarity-matrix"
import { NameCultureMatch } from "@/components/name-name-culture-match"
import { NameGenerationHistoryViewer } from "@/components/name-name-generation-history-viewer"
import { NameExportFormatsAdvanced } from "@/components/name-name-export-formats-advanced"
import { NameSearchAdvanced } from "@/components/name-name-search-advanced"
import { NameBirthdayGenerator } from "@/components/name-name-birthday-generator"
import { NameMeaningExplorer } from "@/components/name-name-meaning-explorer"
import { NamePopularityChart } from "@/components/name-name-popularity-chart"
import { NameRandomPicker } from "@/components/name-name-random-picker"
import { NameFavoriteComparison } from "@/components/name-name-favorite-comparison"
import { NameShortlistManager } from "@/components/name-name-shortlist-manager"
import { NameQuickActions } from "@/components/name-name-quick-actions"
import { useState } from "react"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/explore", icon: Compass, label: "Explore" },
    { href: "/favorites", icon: Heart, label: "Favorites" },
    { href: "/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/history", icon: Clock, label: "History" },
    { href: "/collections", icon: FolderPlus, label: "Collections" },
    { href: "/tribes", icon: MapPin, label: "Tribes" },
    { href: "/stats", icon: TrendingUp, label: "My Stats" },
    { href: "/leaderboard", icon: Trophy, label: "Leaderboard" },
  ]

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-yellow-400">🇬🇭</span>
              <span className="text-xl font-bold text-white">Ghana Names</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href}>
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Icon className="mr-2 h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                        <Icon className="mr-2 h-4 w-4" />
                        {link.label}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section - Featured Names & Name of the Day */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FeaturedNames />
              </div>
              <div>
                <NameOfTheDay />
              </div>
            </div>
          </section>

          {/* Quick Stats & Discovery */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NameQuickStats />
              <NameDiscoveryCarousel />
            </div>
          </section>

          {/* Trending & Random Generator */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameTrendingWidget />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRandomGenerator />
              </div>
            </div>
          </section>

          {/* Search & Culture Tips */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSearchWidget />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCultureTips />
              </div>
            </div>
          </section>

          {/* Social Proof & Recent Activity */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSocialProof />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRecentActivity />
              </div>
            </div>
          </section>

          {/* Main Generator Section */}
          <section className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <GhanaianNameGenerator />
          </section>

          {/* Popular Content Section */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <PopularNames />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <RecentClaimsFeed />
              </div>
            </div>
          </section>

          {/* Interactive Features Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Interactive Features</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameQuiz />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameHistoryLocal />
              </div>
            </div>
          </section>

          {/* Personal Collections Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Your Collections</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWishlist />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFavoriteCategories />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBookmarkWidget />
              </div>
            </div>
          </section>

          {/* Tools & Shortcuts Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Tools & Shortcuts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameGeneratorShortcuts />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameGeneratorHistory />
              </div>
            </div>
          </section>

          {/* Educational Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Educational Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBirthChart />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameMeaningTranslator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameTribeInfo />
              </div>
            </div>
          </section>

          {/* Fun Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Fun Tools & Games</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFortuneTeller />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCompatibilityChecker />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameNumerology />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameNameDayFinder />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAnagramGenerator />
              </div>
            </div>
          </section>

          {/* Analysis Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Name Analysis Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePhoneticGuide />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameVariationsGenerator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFrequencyAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRhythmAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameInitialGenerator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSoundAlike />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameGeneratorAdvanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameStatsCompare />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePalindromeChecker />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWordPlay />
              </div>
            </div>
          </section>

          {/* Mystical & Spiritual Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Mystical & Spiritual Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameColorAssociation />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameElementAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAstrologyCompatibility />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLuckyNumbers />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLengthAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameVibeChecker />
              </div>
            </div>
          </section>

          {/* Generator & Utility Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Generator & Utility Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameGeneratorQuick lastName="Asante" />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSuggestionsAI />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameValidator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameStatsDashboard />
              </div>
            </div>
          </section>

          {/* Management Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Management Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFavoritesManager />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBatchExport names={[]} />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameGenerationHistoryViewer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameExportFormatsAdvanced names={[]} />
              </div>
            </div>
          </section>

          {/* Analysis & Comparison Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Analysis & Comparison Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameTrendAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSimilarityMatrix />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCultureMatch />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePopularityChart />
              </div>
            </div>
          </section>

          {/* Search & Discovery Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Search & Discovery Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSearchAdvanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBirthdayGenerator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameMeaningExplorer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRandomPicker />
              </div>
            </div>
          </section>

          {/* Quick Tools & Actions Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Quick Tools & Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFavoriteComparison />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameShortlistManager />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameQuickActions
                  name="Kwame"
                  lastName="Asante"
                  meaning="Born on Saturday"
                  tribe="Akan"
                  gender="Male"
                />
              </div>
            </div>
          </section>

          {/* User Stats Section */}
          <section>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <NameFavoritesStats />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-black/30 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/70 text-sm">
              © 2024 Ghana Names Generator. Discover your Ghanaian identity.
            </div>
            <div className="flex items-center gap-4">
              {navLinks.slice(0, 4).map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href} className="text-white/70 hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
