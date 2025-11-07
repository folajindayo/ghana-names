'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react'

interface TrendData {
  month: string
  names: { name: string; count: number }[]
}

const sampleTrendData: TrendData[] = [
  {
    month: 'Jan 2024',
    names: [
      { name: 'Kwame', count: 45 },
      { name: 'Akosua', count: 38 },
      { name: 'Kofi', count: 32 },
      { name: 'Ama', count: 28 },
    ],
  },
  {
    month: 'Feb 2024',
    names: [
      { name: 'Kwame', count: 52 },
      { name: 'Akosua', count: 41 },
      { name: 'Kofi', count: 35 },
      { name: 'Ama', count: 31 },
    ],
  },
  {
    month: 'Mar 2024',
    names: [
      { name: 'Kwame', count: 48 },
      { name: 'Akosua', count: 44 },
      { name: 'Kofi', count: 38 },
      { name: 'Ama', count: 33 },
    ],
  },
  {
    month: 'Apr 2024',
    names: [
      { name: 'Kwame', count: 55 },
      { name: 'Akosua', count: 47 },
      { name: 'Kofi', count: 42 },
      { name: 'Ama', count: 36 },
    ],
  },
  {
    month: 'May 2024',
    names: [
      { name: 'Kwame', count: 61 },
      { name: 'Akosua', count: 52 },
      { name: 'Kofi', count: 45 },
      { name: 'Ama', count: 39 },
    ],
  },
  {
    month: 'Jun 2024',
    names: [
      { name: 'Kwame', count: 58 },
      { name: 'Akosua', count: 49 },
      { name: 'Kofi', count: 43 },
      { name: 'Ama', count: 41 },
    ],
  },
]

const nameColors: Record<string, string> = {
  Kwame: 'bg-blue-500',
  Akosua: 'bg-pink-500',
  Kofi: 'bg-green-500',
  Ama: 'bg-purple-500',
}

export function NameTrendsChart() {
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('6m')

  const allNames = Array.from(new Set(sampleTrendData.flatMap((d) => d.names.map((n) => n.name))))
  const maxCount = Math.max(...sampleTrendData.flatMap((d) => d.names.map((n) => n.count)))

  const getBarHeight = (count: number) => {
    return `${(count / maxCount) * 100}%`
  }

  const getTrendForName = (name: string) => {
    const counts = sampleTrendData.map((month) => {
      const nameData = month.names.find((n) => n.name === name)
      return nameData ? nameData.count : 0
    })
    const first = counts[0]
    const last = counts[counts.length - 1]
    const change = last - first
    const percentChange = first > 0 ? ((change / first) * 100).toFixed(1) : '0'
    return { change, percentChange, isPositive: change >= 0 }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-400" />
          Name Trends Chart
        </CardTitle>
        <CardDescription className="text-white/70">
          Visualize name popularity trends over time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            {['6m', '1y', 'all'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'default' : 'outline'}
                onClick={() => setTimeRange(range as '6m' | '1y' | 'all')}
                className={
                  timeRange === range
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }
              >
                {range === '6m' ? '6 Months' : range === '1y' ? '1 Year' : 'All Time'}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-end justify-between gap-2 h-64 mb-4">
            {sampleTrendData.map((month, index) => (
              <div key={month.month} className="flex-1 flex items-end justify-center gap-1 relative">
                {month.names.map((nameData) => {
                  const isSelected = selectedName === null || selectedName === nameData.name
                  return (
                    <div
                      key={nameData.name}
                      className={`flex-1 rounded-t transition-all cursor-pointer hover:opacity-80 ${
                        nameColors[nameData.name] || 'bg-gray-500'
                      } ${isSelected ? 'opacity-100' : 'opacity-30'}`}
                      style={{ height: getBarHeight(nameData.count) }}
                      onClick={() => setSelectedName(selectedName === nameData.name ? null : nameData.name)}
                      title={`${nameData.name}: ${nameData.count}`}
                    />
                  )
                })}
                <div className="absolute -bottom-6 text-xs text-white/60 transform -rotate-45 origin-top-left whitespace-nowrap">
                  {month.month.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {allNames.map((name) => {
            const trend = getTrendForName(name)
            return (
              <div
                key={name}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedName === name
                    ? 'bg-white/10 border-white/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedName(selectedName === name ? null : name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${nameColors[name] || 'bg-gray-500'}`} />
                    <span className="font-semibold text-white">{name}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      trend.isPositive
                        ? 'bg-green-600/40 text-green-100 border-green-400/50'
                        : 'bg-red-600/40 text-red-100 border-red-400/50'
                    } text-xs`}
                  >
                    <TrendingUp
                      className={`h-3 w-3 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`}
                    />
                    {trend.percentChange}%
                  </Badge>
                </div>
                <div className="text-xs text-white/60">
                  {trend.isPositive ? '+' : ''}{trend.change} over period
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-white font-semibold text-sm">Legend</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allNames.map((name) => (
              <div key={name} className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded ${nameColors[name] || 'bg-gray-500'}`} />
                <span className="text-white/70 text-xs">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-white/5 rounded border border-white/10">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Tip:</strong> Click on a name in the legend to filter the chart. Click again to show all names.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

