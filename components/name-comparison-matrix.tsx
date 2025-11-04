'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { X, Plus, GitCompare, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { GhanaianName } from '@/lib/ghanaian-names'

interface ComparisonItem extends GhanaianName {
  id: string
  lastName: string
}

export function NameComparisonMatrix() {
  const [names, setNames] = useState<ComparisonItem[]>([])
  const [newName, setNewName] = useState('')
  const [newMeaning, setNewMeaning] = useState('')
  const [newTribe, setNewTribe] = useState('')
  const [newGender, setNewGender] = useState<'male' | 'female' | 'any'>('any')
  const { toast } = useToast()

  const addName = () => {
    if (!newName.trim() || !newMeaning.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter at least name and meaning.",
        variant: "destructive",
      })
      return
    }

    if (names.length >= 5) {
      toast({
        title: "Maximum reached",
        description: "You can compare up to 5 names at once.",
        variant: "destructive",
      })
      return
    }

    const newItem: ComparisonItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      meaning: newMeaning.trim(),
      tribe: newTribe.trim() || undefined,
      gender: newGender === 'any' ? undefined : newGender,
      lastName: '',
    }

    setNames([...names, newItem])
    setNewName('')
    setNewMeaning('')
    setNewTribe('')
    setNewGender('any')

    toast({
      title: "Name added",
      description: `${newItem.name} added to comparison.`,
    })
  }

  const removeName = (id: string) => {
    setNames(names.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNames([])
    toast({
      title: "Cleared",
      description: "All names removed from comparison.",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-blue-400" />
          Name Comparison Matrix
        </CardTitle>
        <CardDescription className="text-white/70">
          Compare up to 5 names side by side
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Name Form */}
        {names.length < 5 && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
              <Input
                placeholder="Meaning"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Tribe (optional)"
                value={newTribe}
                onChange={(e) => setNewTribe(e.target.value)}
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
              <select
                value={newGender}
                onChange={(e) => setNewGender(e.target.value as 'male' | 'female' | 'any')}
                className="rounded-md border bg-white/10 border-white/20 text-white px-3 py-2 text-sm h-8"
              >
                <option value="any">Any Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <Button
              onClick={addName}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Comparison
            </Button>
          </div>
        )}

        {/* Comparison Matrix */}
        {names.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-white/70 text-sm">
                Comparing {names.length} name{names.length > 1 ? 's' : ''}
              </p>
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white"
              >
                Clear All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${names.length}, minmax(200px, 1fr))` }}>
                {names.map((name) => (
                  <div
                    key={name.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold text-lg">{name.name}</h4>
                      <Button
                        onClick={() => removeName(name.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-white/70 text-sm mb-3">"{name.meaning}"</p>
                    <div className="space-y-1">
                      {name.tribe && (
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                          {name.tribe}
                        </Badge>
                      )}
                      {name.gender && (
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 text-xs">
                          {name.gender}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Summary */}
            {names.length > 1 && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-4">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Comparison Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Total Names:</span>
                    <span className="text-white">{names.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Unique Tribes:</span>
                    <span className="text-white">
                      {new Set(names.map((n) => n.tribe).filter(Boolean)).size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Average Name Length:</span>
                    <span className="text-white">
                      {Math.round(
                        names.reduce((sum, n) => sum + n.name.length, 0) / names.length
                      )}
                      {' '}
                      characters
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {names.length === 0 && (
          <p className="text-white/60 text-center py-8">
            Add names to compare them side by side
          </p>
        )}
      </CardContent>
    </Card>
  )
}

