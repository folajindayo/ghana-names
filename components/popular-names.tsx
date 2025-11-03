'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, Calendar, Users, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PopularName {
  name: string
  count: number
  lastClaimed: string
  meaning?: string
  tribe?: string
  gender?: string
}

export function PopularNames() {
  const [popularNames, setPopularNames] = useState<PopularName[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'all'>('all')
  const { toast } = useToast()

  useEffect(() => {
    fetchPopularNames()
  }, [timeframe])

  const fetchPopularNames = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/names/popularity?limit=10&timeframe=${timeframe}`)
      if (response.ok) {
        const data = await response.json()
        setPopularNames(data.popularNames || [])
      } else {
        throw new Error('Failed to fetch popular names')
      }
    } catch (error) {
      console.error('Error fetching popular names:', error)
      toast({
        title: "Error",
        description: "Could not load popular names.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const timeframeLabels = {
    week: 'This Week',
    month: 'This Month',
    all: 'All Time',
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              Popular Names
            </CardTitle>
            <CardDescription className="text-white/70">
              Most claimed Ghanaian names
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'all'] as const).map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className={
                  timeframe === tf
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                {timeframeLabels[tf]}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-white/70" />
          </div>
        ) : popularNames.length === 0 ? (
          <p className="text-white/70 text-center py-8">No popular names data available</p>
        ) : (
          <div className="space-y-3">
            {popularNames.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{item.name}</span>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs">
                        {item.count} {item.count === 1 ? 'claim' : 'claims'}
                      </Badge>
                    </div>
                    {item.meaning && (
                      <p className="text-white/60 text-xs">"{item.meaning}"</p>
                    )}
                    <div className="flex gap-2 mt-1">
                      {item.tribe && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                          {item.tribe}
                        </Badge>
                      )}
                      {item.gender && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                          {item.gender === 'male' ? 'Male' : 'Female'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.lastClaimed).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

