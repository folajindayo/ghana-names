'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Sparkles, BookOpen, MapPin, Users, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { GhanaianName } from '@/lib/ghanaian-names'

interface NameComparisonProps {
  lastName: string
}

export function NameComparison({ lastName }: NameComparisonProps) {
  const [names, setNames] = useState<Array<GhanaianName & { id: string }>>([])
  const { toast } = useToast()

  const addName = (name: GhanaianName) => {
    const newName = { ...name, id: Date.now().toString() }
    setNames([...names, newName])
    toast({
      title: "Added to comparison",
      description: `${name.name} added to comparison.`,
    })
  }

  const removeName = (id: string) => {
    setNames(names.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNames([])
    toast({
      title: "Comparison cleared",
      description: "All names removed from comparison.",
    })
  }

  if (!lastName.trim()) {
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Name Comparison
            </CardTitle>
            <CardDescription className="text-white/70">
              Compare multiple names side by side ({names.length}/5)
            </CardDescription>
          </div>
          {names.length > 0 && (
            <Button
              onClick={clearAll}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-red-500/20"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {names.length === 0 ? (
          <div className="text-center py-8 text-white/70">
            <p>Add names to compare them side by side</p>
            <p className="text-sm mt-2">Generate names and they'll appear here for comparison</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {names.map((name) => (
                <Card key={name.id} className="bg-white/5 border-white/10 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeName(name.id)}
                    className="absolute top-2 right-2 h-6 w-6 text-white/70 hover:text-red-400 hover:bg-red-500/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xl font-bold text-yellow-400 mb-2">
                          {name.name} {lastName}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs">
                            <BookOpen className="mr-1 h-2 w-2" />
                            {name.meaning}
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                            <MapPin className="mr-1 h-2 w-2" />
                            {name.tribe}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                            <Users className="mr-1 h-2 w-2" />
                            {name.gender === 'male' ? 'Male' : 'Female'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Summary */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-3">Comparison Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Tribes</p>
                    <p className="text-white font-medium">
                      {[...new Set(names.map(n => n.tribe))].join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Genders</p>
                    <p className="text-white font-medium">
                      {[...new Set(names.map(n => n.gender))].map(g => g === 'male' ? 'Male' : 'Female').join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Total Names</p>
                    <p className="text-white font-medium">{names.length}</p>
                  </div>
                  <div>
                    <p className="text-white/60">Most Common Tribe</p>
                    <p className="text-white font-medium">
                      {names.reduce((acc, n) => {
                        acc[n.tribe] = (acc[n.tribe] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)}
                      {Object.entries(names.reduce((acc, n) => {
                        acc[n.tribe] = (acc[n.tribe] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Export function to add names from parent
export function useNameComparison() {
  const [comparisonNames, setComparisonNames] = useState<Array<GhanaianName & { id: string }>>([])

  const addToComparison = (name: GhanaianName) => {
    if (comparisonNames.length >= 5) {
      return { success: false, message: 'Maximum 5 names can be compared at once' }
    }
    const newName = { ...name, id: Date.now().toString() }
    setComparisonNames([...comparisonNames, newName])
    return { success: true, message: `${name.name} added to comparison` }
  }

  return {
    comparisonNames,
    addToComparison,
    clearComparison: () => setComparisonNames([]),
  }
}

