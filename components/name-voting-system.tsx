'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown, TrendingUp, Users } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameVote {
  name: string
  meaning: string
  tribe: string
  upvotes: number
  downvotes: number
  userVote: 'up' | 'down' | null
}

const sampleNames: NameVote[] = [
  { name: 'Kwame', meaning: 'Born on Saturday', tribe: 'Akan', upvotes: 45, downvotes: 2, userVote: null },
  { name: 'Akosua', meaning: 'Born on Sunday', tribe: 'Akan', upvotes: 38, downvotes: 1, userVote: null },
  { name: 'Kofi', meaning: 'Born on Friday', tribe: 'Akan', upvotes: 52, downvotes: 3, userVote: null },
  { name: 'Ama', meaning: 'Born on Saturday', tribe: 'Akan', upvotes: 41, downvotes: 0, userVote: null },
]

export function NameVotingSystem() {
  const [names, setNames] = useState<NameVote[]>(sampleNames)
  const { toast } = useToast()

  useEffect(() => {
    // Load votes from localStorage
    const savedVotes = localStorage.getItem('nameVotes')
    if (savedVotes) {
      try {
        const parsed = JSON.parse(savedVotes)
        setNames((prev) =>
          prev.map((name) => {
            const saved = parsed.find((v: NameVote) => v.name === name.name)
            return saved ? { ...name, ...saved } : name
          })
        )
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const handleVote = (nameIndex: number, voteType: 'up' | 'down') => {
    setNames((prev) => {
      const updated = [...prev]
      const name = updated[nameIndex]
      const previousVote = name.userVote

      // Remove previous vote
      if (previousVote === 'up') name.upvotes--
      if (previousVote === 'down') name.downvotes--

      // Add new vote
      if (previousVote === voteType) {
        // Toggle off
        name.userVote = null
      } else {
        // Set new vote
        name.userVote = voteType
        if (voteType === 'up') name.upvotes++
        else name.downvotes++
      }

      // Save to localStorage
      localStorage.setItem('nameVotes', JSON.stringify(updated))

      return updated
    })

    toast({
      title: "Vote recorded!",
      description: `Your ${voteType === 'up' ? 'upvote' : 'downvote'} has been saved.`,
    })
  }

  const sortedNames = [...names].sort((a, b) => {
    const scoreA = a.upvotes - a.downvotes
    const scoreB = b.upvotes - b.downvotes
    return scoreB - scoreA
  })

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Name Voting System
        </CardTitle>
        <CardDescription className="text-white/70">
          Vote for your favorite Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {sortedNames.map((name, index) => {
            const score = name.upvotes - name.downvotes
            const totalVotes = name.upvotes + name.downvotes
            const approvalRate = totalVotes > 0 ? Math.round((name.upvotes / totalVotes) * 100) : 0

            return (
              <div
                key={name.name}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{name.name}</h3>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {name.tribe}
                      </Badge>
                      {score > 20 && (
                        <Badge variant="secondary" className="bg-green-600/40 text-green-100 border-green-400/50 text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/80 text-sm mb-2">"{name.meaning}"</p>
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {totalVotes} votes
                      </span>
                      <span>{approvalRate}% approval</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={name.userVote === 'up' ? 'default' : 'outline'}
                        onClick={() => handleVote(index, 'up')}
                        className={`${
                          name.userVote === 'up'
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-white font-semibold min-w-[2rem] text-center">{score}</span>
                      <Button
                        size="sm"
                        variant={name.userVote === 'down' ? 'default' : 'outline'}
                        onClick={() => handleVote(index, 'down')}
                        className={`${
                          name.userVote === 'down'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-white/60 text-center">
                      <div className="text-green-400">{name.upvotes} ↑</div>
                      <div className="text-red-400">{name.downvotes} ↓</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Tip:</strong> Your votes are saved locally. Help the community discover the best Ghanaian names!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

