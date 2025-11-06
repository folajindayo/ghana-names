'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart3, TrendingUp, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PopularityData {
  name: string
  year: number
  count: number
}

interface ChartData {
  name: string
  data: PopularityData[]
  total: number
  trend: 'increasing' | 'decreasing' | 'stable'
  peakYear: number
  peakCount: number
}

export function NamePopularityChart() {
  const [name, setName] = useState('')
  const [timeframe, setTimeframe] = useState('5years')
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generateChart = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const years = timeframe === '5years' ? 5 : timeframe === '10years' ? 10 : 20
      const currentYear = new Date().getFullYear()
      const data: PopularityData[] = []

      // Generate mock data
      for (let i = years - 1; i >= 0; i--) {
        const year = currentYear - i
        const baseCount = Math.floor(Math.random() * 50) + 20
        const trend = Math.random() > 0.5 ? 1 : -1
        const variation = Math.floor(Math.random() * 10) * trend
        data.push({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          year,
          count: Math.max(10, baseCount + variation * (years - i)),
        })
      }

      const total = data.reduce((sum, d) => sum + d.count, 0)
      const peak = data.reduce((max, d) => (d.count > max.count ? d : max), data[0])
      const firstHalf = data.slice(0, Math.floor(data.length / 2))
      const secondHalf = data.slice(Math.floor(data.length / 2))
      const firstAvg = firstHalf.reduce((sum, d) => sum + d.count, 0) / firstHalf.length
      const secondAvg = secondHalf.reduce((sum, d) => sum + d.count, 0) / secondHalf.length

      let trend: 'increasing' | 'decreasing' | 'stable' = 'stable'
      if (secondAvg > firstAvg * 1.1) trend = 'increasing'
      else if (secondAvg < firstAvg * 0.9) trend = 'decreasing'

      setChartData({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        data,
        total,
        trend,
        peakYear: peak.year,
        peakCount: peak.count,
      })

      setIsLoading(false)
      toast({
        title: "Chart generated!",
        description: `Popularity data for ${name}`,
      })
    }, 800)
  }

  const maxCount = chartData ? Math.max(...chartData.data.map((d) => d.count)) : 0

  const getTrendColor = () => {
    if (!chartData) return ''
    switch (chartData.trend) {
      case 'increasing':
        return 'bg-green-600/40 text-green-100 border-green-400/50'
      case 'decreasing':
        return 'bg-red-600/40 text-red-100 border-red-400/50'
      case 'stable':
        return 'bg-yellow-600/40 text-yellow-100 border-yellow-400/50'
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-orange-400" />
          Popularity Chart
        </CardTitle>
        <CardDescription className="text-white/70">
          Visualize name popularity trends over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Name</Label>
            <Input
              placeholder="e.g., Kwame"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateChart()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs h-9"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80 text-xs">Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5years">5 Years</SelectItem>
                <SelectItem value="10years">10 Years</SelectItem>
                <SelectItem value="20years">20 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={generateChart}
          disabled={isLoading || !name.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
        >
          {isLoading ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Chart
            </>
          )}
        </Button>

        {chartData && (
          <div className="p-5 bg-white/5 rounded-lg border border-white/10 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{chartData.name}</h3>
              <Badge variant="secondary" className={`${getTrendColor()} font-semibold text-sm px-4 py-2 capitalize`}>
                {chartData.trend} Trend
              </Badge>
            </div>

            <div className="space-y-2">
              {chartData.data.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-white/70 text-xs w-12">{point.year}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-6 rounded-full transition-all flex items-center justify-end pr-2"
                      style={{ width: `${(point.count / maxCount) * 100}%` }}
                    >
                      <span className="text-white text-xs font-semibold">{point.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
              <div className="p-2 bg-white/5 rounded text-center">
                <p className="text-white/70 text-xs mb-1">Total Claims</p>
                <p className="text-white font-bold">{chartData.total}</p>
              </div>
              <div className="p-2 bg-white/5 rounded text-center">
                <p className="text-white/70 text-xs mb-1">Peak Year</p>
                <p className="text-white font-bold">{chartData.peakYear}</p>
              </div>
            </div>
          </div>
        )}

        {name && !chartData && !isLoading && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
            <p className="text-white/60 text-sm">Enter a name and click to generate chart</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

