'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface NameVotingProps {
  nameCardId?: string
  name: string
  lastName: string
}

export function NameVoting({ nameCardId, name, lastName }: NameVotingProps) {
  const { address, isConnected } = useAccount()
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(0)
  const [userVote, setUserVote] = useState<'upvote' | 'downvote' | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchVotes()
  }, [nameCardId, name, lastName])

  const fetchVotes = async () => {
    try {
      const params = new URLSearchParams()
      if (nameCardId) params.append('nameCardId', nameCardId)
      params.append('name', name)
      params.append('lastName', lastName)
      if (address) params.append('walletAddress', address)

      const response = await fetch(`/api/names/vote?${params}`)
      if (response.ok) {
        const data = await response.json()
        setUpvotes(data.upvotes || 0)
        setDownvotes(data.downvotes || 0)
        setUserVote(data.userVote || null)
      }
    } catch (error) {
      console.error('Error fetching votes:', error)
    }
  }

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/names/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameCardId,
          name,
          lastName,
          walletAddress: address,
          voteType,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.voteRemoved) {
          toast({
            title: "Vote removed",
            description: "Your vote has been removed.",
          })
        } else {
          toast({
            title: voteType === 'upvote' ? "Upvoted!" : "Downvoted!",
            description: `You ${voteType === 'upvote' ? 'upvoted' : 'downvoted'} this name.`,
          })
        }
        fetchVotes()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to vote')
      }
    } catch (error: any) {
      console.error('Error voting:', error)
      toast({
        title: "Vote failed",
        description: error.message || "Could not vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const totalScore = upvotes - downvotes

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => handleVote('upvote')}
        disabled={loading || !isConnected}
        variant="outline"
        size="sm"
        className={`bg-white/10 border-white/20 text-white hover:bg-green-500/20 ${
          userVote === 'upvote' ? 'bg-green-500/30 border-green-500/50' : ''
        }`}
      >
        <ThumbsUp className={`h-4 w-4 ${userVote === 'upvote' ? 'fill-white' : ''}`} />
        <span className="ml-1">{upvotes}</span>
      </Button>
      <Button
        onClick={() => handleVote('downvote')}
        disabled={loading || !isConnected}
        variant="outline"
        size="sm"
        className={`bg-white/10 border-white/20 text-white hover:bg-red-500/20 ${
          userVote === 'downvote' ? 'bg-red-500/30 border-red-500/50' : ''
        }`}
      >
        <ThumbsDown className={`h-4 w-4 ${userVote === 'downvote' ? 'fill-white' : ''}`} />
        <span className="ml-1">{downvotes}</span>
      </Button>
      {totalScore !== 0 && (
        <Badge
          variant="secondary"
          className={
            totalScore > 0
              ? 'bg-green-500/20 text-green-300'
              : 'bg-red-500/20 text-red-300'
          }
        >
          {totalScore > 0 ? '+' : ''}{totalScore}
        </Badge>
      )}
    </div>
  )
}

