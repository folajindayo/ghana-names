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
import { NameSoundChecker } from "@/components/name-name-sound-checker"
import { NameStyleAnalyzer } from "@/components/name-name-style-analyzer"
import { NameInitialsGenerator } from "@/components/name-name-initials-generator"
import { NameCombinationGenerator } from "@/components/name-name-combination-generator"
import { NameRhymingFinder } from "@/components/name-name-rhyming-finder"
import { NameAlliterationFinder } from "@/components/name-name-alliteration-finder"
import { NameFrequencyCounter } from "@/components/name-name-frequency-counter"
import { NamePatternMatcher } from "@/components/name-name-pattern-matcher"
import { NameUniquenessScorer } from "@/components/name-name-uniqueness-scorer"
import { NameSyllableCounter } from "@/components/name-name-syllable-counter"
import { NameVowelAnalyzer } from "@/components/name-name-vowel-analyzer"
import { NameConsonantAnalyzer } from "@/components/name-name-consonant-analyzer"
import { NameLengthComparator } from "@/components/name-name-length-comparator"
import { NameLetterDistribution } from "@/components/name-name-letter-distribution"
import { NamePalindromeCheckerEnhanced } from "@/components/name-name-palindrome-checker-enhanced"
import { NameAnagramSolver } from "@/components/name-name-anagram-solver"
import { NameScrabbleScorer } from "@/components/name-name-scrabble-scorer"
import { NameWordValueCalculator } from "@/components/name-name-word-value-calculator"
import { NameAcronymGenerator } from "@/components/name-name-acronym-generator"
import { NameBackwardsReader } from "@/components/name-name-backwards-reader"
import { NameCaesarCipher } from "@/components/name-name-caesar-cipher"
import { NameMorseCode } from "@/components/name-name-morse-code"
import { NameBinaryConverter } from "@/components/name-name-binary-converter"
import { NameHexConverter } from "@/components/name-name-hex-converter"
import { NameVotingSystem } from "@/components/name-voting-system"
import { NameComments } from "@/components/name-comments"
import { NameQuizGame } from "@/components/name-quiz-game"
import { NameTrendsChart } from "@/components/name-trends-chart"
import { NameLeaderboard } from "@/components/name-leaderboard"
import { NameMeaningSearch } from "@/components/name-meaning-search"
import { NamePopularityPredictor } from "@/components/name-popularity-predictor"
import { NameSoundSimilarity } from "@/components/name-sound-similarity"
import { NamePronunciationGuide } from "@/components/name-pronunciation-guide"
import { NameCulturalStories } from "@/components/name-cultural-stories"
import { NameCombinationGenerator } from "@/components/name-combination-generator"
import { NameSocialShare } from "@/components/name-social-share"
import { NameFavoritesCollection } from "@/components/name-favorites-collection"
import { NameRandomPicker } from "@/components/name-random-picker"
import { NameBirthdayCalculator } from "@/components/name-birthday-calculator"
import { NameNameDayFinder } from "@/components/name-name-day-finder"
import { NameSuggestionEngine } from "@/components/name-suggestion-engine"
import { NameStatisticsDashboard } from "@/components/name-statistics-dashboard"
import { NameExportManager } from "@/components/name-export-manager"
import { NameBatchGenerator } from "@/components/name-batch-generator"
import { NameValidator } from "@/components/name-validator"
import { NameHistoryViewer } from "@/components/name-history-viewer"
import { NameCompareTool } from "@/components/name-compare-tool"
import { NameFavoriteManager } from "@/components/name-favorite-manager"
import { NameQuickActions } from "@/components/name-quick-actions"
import { NameTribeExplorer } from "@/components/name-tribe-explorer"
import { NameMeaningTranslatorEnhanced } from "@/components/name-meaning-translator-enhanced"
import { NameNameGeneratorAIEnhanced } from "@/components/name-name-generator-ai-enhanced"
import { NamePopularityTracker } from "@/components/name-popularity-tracker"
import { NameNameDayCalendar } from "@/components/name-name-day-calendar"
import { NameRhythmAnalyzerEnhanced } from "@/components/name-rhythm-analyzer-enhanced"
import { NameSimilarityFinder } from "@/components/name-similarity-finder"
import { NameOccasionGenerator } from "@/components/name-occasion-generator"
import { NameFrequencyAnalyzerEnhanced } from "@/components/name-frequency-analyzer-enhanced"
import { NameVowelAnalyzerEnhanced } from "@/components/name-vowel-analyzer-enhanced"
import { NameConsonantAnalyzerEnhanced } from "@/components/name-consonant-analyzer-enhanced"
import { NameSyllableCounterEnhanced } from "@/components/name-syllable-counter-enhanced"
import { NamePalindromeCheckerEnhanced } from "@/components/name-palindrome-checker-enhanced"
import { NameAnagramGeneratorEnhanced } from "@/components/name-anagram-generator-enhanced"
import { NameScrabbleScorerEnhanced } from "@/components/name-scrabble-scorer-enhanced"
import { NameWordValueCalculatorEnhanced } from "@/components/name-word-value-calculator-enhanced"
import { NameAcronymGeneratorEnhanced } from "@/components/name-acronym-generator-enhanced"
import { NameBackwardsReaderEnhanced } from "@/components/name-backwards-reader-enhanced"
import { NameCaesarCipherEnhanced } from "@/components/name-caesar-cipher-enhanced"
import { NameRot13EncoderEnhanced } from "@/components/name-rot13-encoder-enhanced"
import { NameBase64EncoderEnhanced } from "@/components/name-base64-encoder-enhanced"
import { NameUrlEncoderEnhanced } from "@/components/name-url-encoder-enhanced"
import { NamePigLatinConverterEnhanced } from "@/components/name-pig-latin-converter-enhanced"
import { NameUppercaseLowercaseConverterEnhanced } from "@/components/name-uppercase-lowercase-converter-enhanced"
import { NameWhitespaceRemoverEnhanced } from "@/components/name-whitespace-remover-enhanced"
import { NameEmojiConverterEnhanced } from "@/components/name-emoji-converter-enhanced"
import { NameLeetSpeakConverterEnhanced } from "@/components/name-leet-speak-converter-enhanced"
import { NameWordCharacterCounterEnhanced } from "@/components/name-word-character-counter-enhanced"
import { NameDuplicateRemoverEnhanced } from "@/components/name-duplicate-remover-enhanced"
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
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCombinationGenerator />
              </div>
            </div>
          </section>

          {/* Phonetic & Sound Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Phonetic & Sound Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRhymingFinder />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAlliterationFinder />
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
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameInitialsGenerator />
              </div>
            </div>
          </section>

          {/* Name Analysis Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Name Analysis Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSoundChecker />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameStyleAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFrequencyCounter />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameUniquenessScorer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSyllableCounter />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameVowelAnalyzer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameConsonantAnalyzer />
              </div>
            </div>
          </section>

          {/* Pattern & Matching Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Pattern & Matching Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePatternMatcher />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLengthComparator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLetterDistribution />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePalindromeCheckerEnhanced />
              </div>
            </div>
          </section>

          {/* Word Games & Fun Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Word Games & Fun Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAnagramSolver />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameScrabbleScorer />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWordValueCalculator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAcronymGenerator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBackwardsReader />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCaesarCipher />
              </div>
            </div>
          </section>

          {/* Encoding & Conversion Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Encoding & Conversion Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameMorseCode />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBinaryConverter />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameHexConverter />
              </div>
            </div>
          </section>

          {/* Community & Interactive Features Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Community & Interactive Features</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameVotingSystem />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameComments />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameQuizGame />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameTrendsChart />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLeaderboard />
              </div>
            </div>
          </section>

          {/* Search & Discovery Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Search & Discovery Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameMeaningSearch />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePopularityPredictor />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSoundSimilarity />
              </div>
            </div>
          </section>

          {/* Educational & Cultural Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Educational & Cultural Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePronunciationGuide />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCulturalStories />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCombinationGenerator />
              </div>
            </div>
          </section>

          {/* Sharing & Collections Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Sharing & Collections</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSocialShare />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFavoritesCollection />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRandomPicker />
              </div>
            </div>
          </section>

          {/* Birthday & Celebration Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Birthday & Celebration Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBirthdayCalculator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameNameDayFinder />
              </div>
            </div>
          </section>

          {/* Suggestion & Analytics Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Suggestion & Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSuggestionEngine />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameStatisticsDashboard />
              </div>
            </div>
          </section>

          {/* Export & Batch Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Export & Batch Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameExportManager />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBatchGenerator />
              </div>
            </div>
          </section>

          {/* Validation & History Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Validation & History Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameValidator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameHistoryViewer />
              </div>
            </div>
          </section>

          {/* Comparison & Management Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Comparison & Management Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCompareTool />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFavoriteManager />
              </div>
            </div>
          </section>

          {/* Quick Tools & Exploration Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Quick Tools & Exploration</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameQuickActions />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameTribeExplorer />
              </div>
            </div>
          </section>

          {/* Enhanced Translation & AI Generation Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Enhanced Translation & AI Generation</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameMeaningTranslatorEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameNameGeneratorAIEnhanced />
              </div>
            </div>
          </section>

          {/* Tracking & Calendar Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Tracking & Calendar Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePopularityTracker />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameNameDayCalendar />
              </div>
            </div>
          </section>

          {/* Advanced Analysis Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Advanced Analysis Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRhythmAnalyzerEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSimilarityFinder />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameOccasionGenerator />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameFrequencyAnalyzerEnhanced />
              </div>
            </div>
          </section>

          {/* Phonetic Analysis Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Phonetic Analysis Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameVowelAnalyzerEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameConsonantAnalyzerEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameSyllableCounterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePalindromeCheckerEnhanced />
              </div>
            </div>
          </section>

          {/* Word Games & Fun Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Word Games & Fun Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAnagramGeneratorEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameScrabbleScorerEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWordValueCalculatorEnhanced />
              </div>
            </div>
          </section>

          {/* Text Manipulation Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Text Manipulation Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameAcronymGeneratorEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBackwardsReaderEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameCaesarCipherEnhanced />
              </div>
            </div>
          </section>

          {/* Encoding & Cipher Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Encoding & Cipher Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameRot13EncoderEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameBase64EncoderEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameUrlEncoderEnhanced />
              </div>
            </div>
          </section>

          {/* Text Conversion Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Text Conversion Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NamePigLatinConverterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameUppercaseLowercaseConverterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWhitespaceRemoverEnhanced />
              </div>
            </div>
          </section>

          {/* Advanced Text Tools Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 px-2">Advanced Text Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameEmojiConverterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameLeetSpeakConverterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameWordCharacterCounterEnhanced />
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <NameDuplicateRemoverEnhanced />
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
