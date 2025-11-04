'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Calendar, TrendingUp, Filter } from 'lucide-react'
import { useAccount } from 'wagmi'

interface TimelineEntry {
  _id: string
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  createdAt: string
  type: 'claimed' | 'generated' | 'favorited' | 'gifted'
}

export function NameHistoryTimeline() {
  const { address, isConnected } = useAccount()
  const [timeline, setTimeline] = useState<TimelineEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'claimed' | 'generated' | 'favorited' | 'gifted'>('all')

  useEffect(() => {
    if (isConnected && address) {
      fetchTimeline()
    } else {
      setLoading(false)
    }
  }, [isConnected, address, filter])

  const fetchTimeline = async () => {
    if (!address) return
    setLoading(true)
    try {
      // Fetch from multiple sources
      const [namesResponse, transactionsResponse] = await Promise.all([
        fetch(`/api/names/history?walletAddress=${address}`),
        fetch(`/api/transactions/${address}`),
      ])

      const namesData = namesResponse.ok ? await namesResponse.json() : { history: [] }
      const transactionsData = transactionsResponse.ok ? await transactionsResponse.json() : { transactions: [] }

      const timelineEntries: TimelineEntry[] = [
        ...(namesData.history || []).map((name: any) => ({
          ...name,
          type: 'claimed' as const,
        })),
        ...(transactionsData.transactions || []).map((tx: any) => ({
          _id: tx._id,
          name: tx.name || 'Unknown',
          lastName: tx.lastName || '',
          meaning: tx.meaning || '',
          tribe: tx.tribe,
          gender: tx.gender,
          createdAt: tx.createdAt,
          type: tx.type === 'gift' ? (tx.fromAddress === address.toLowerCase() ? 'gifted' : 'claimed') : 'claimed',
        })),
      ]

      // Sort by date
      timelineEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      // Apply filter
      const filtered = filter === 'all' ? timelineEntries : timelineEntries.filter((e) => e.type === filter)
      setTimeline(filtered)
    } catch (error) {
      console.error('Error fetching timeline:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupByDate = (entries: TimelineEntry[]) => {
    const groups: Record<string, TimelineEntry[]> = {}
    entries.forEach((entry) => {
      const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(entry)
    })
    return groups
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'claimed':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'generated':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'favorited':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'gifted':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (!isConnected) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="py-8 text-center text-white/70">
          Connect your wallet to view your name history timeline
        </CardContent>
      </Card>
    )
  }

  const groupedTimeline = groupByDate(timeline)

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-400" />
          Name History Timeline
        </CardTitle>
        <CardDescription className="text-white/70">
          Chronological view of all your name activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'claimed', 'generated', 'favorited', 'gifted'] as const).map((filterType) => (
            <Button
              key={filterType}
              onClick={() => setFilter(filterType)}
              variant="outline"
              size="sm"
              className={`${
                filter === filterType
                  ? 'bg-white/20 border-white/40 text-white'
                  : 'bg-white/10 border-white/20 text-white/70'
              }`}
            >
              <Filter className="mr-1 h-3 w-3" />
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Button>
          ))}
        </div>

        {loading ? (
          <p className="text-white/70 text-center py-8">Loading timeline...</p>
        ) : timeline.length === 0 ? (
          <p className="text-white/70 text-center py-8">No timeline entries yet</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTimeline).map(([date, entries]) => (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <h4 className="text-white font-semibold">{date}</h4>
                  <Badge variant="secondary" className="bg-white/10 text-white/70">
                    {entries.length}
                  </Badge>
                </div>
                <div className="space-y-2 pl-6 border-l-2 border-white/20">
                  {entries.map((entry) => (
                    <div
                      key={entry._id}
                      className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">
                            {entry.name} {entry.lastName}
                          </h5>
                          <p className="text-white/70 text-sm mt-1">"{entry.meaning}"</p>
                        </div>
                        <Badge variant="secondary" className={getTypeColor(entry.type)}>
                          {entry.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {entry.tribe && (
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                            {entry.tribe}
                          </Badge>
                        )}
                        {entry.gender && (
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                            {entry.gender}
                          </Badge>
                        )}
                        <span className="text-white/50 text-xs">
                          {new Date(entry.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

