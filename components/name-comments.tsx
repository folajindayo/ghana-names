'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Send, ThumbsUp, User } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'
import { formatAddress } from '@/lib/walletconnect-utils'

interface NameCommentsProps {
  nameCardId?: string
  name: string
  lastName: string
}

interface Comment {
  _id: string
  comment: string
  walletAddress: string
  likes: number
  createdAt: string
}

export function NameComments({ nameCardId, name, lastName }: NameCommentsProps) {
  const { address, isConnected } = useAccount()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [nameCardId, name, lastName])

  const fetchComments = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (nameCardId) params.append('nameCardId', nameCardId)
      params.append('name', name)
      params.append('lastName', lastName)

      const response = await fetch(`/api/names/comments?${params}`)
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments || [])
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to comment.",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter a comment.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/names/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameCardId,
          name,
          lastName,
          walletAddress: address,
          comment: newComment,
        }),
      })

      if (response.ok) {
        setNewComment('')
        fetchComments()
        toast({
          title: "Comment posted!",
          description: "Your comment has been added.",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }
    } catch (error: any) {
      console.error('Error posting comment:', error)
      toast({
        title: "Comment failed",
        description: error.message || "Could not post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          <h3 className="text-white font-semibold">Comments ({comments.length})</h3>
        </div>

        {isConnected && (
          <div className="space-y-2">
            <Textarea
              placeholder="Share your thoughts about this name..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={500}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[80px]"
            />
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">{newComment.length}/500</span>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !newComment.trim()}
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Post Comment
              </Button>
            </div>
          </div>
        )}

        {!isConnected && (
          <p className="text-white/60 text-sm text-center py-4">
            Connect your wallet to join the discussion
          </p>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {loading ? (
            <p className="text-white/70 text-center py-4">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-white/60 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <Card key={comment._id} className="bg-white/5 border-white/10">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-white/60" />
                      <span className="text-white/80 text-sm font-medium">
                        {formatAddress(comment.walletAddress)}
                      </span>
                    </div>
                    <span className="text-white/50 text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/90 text-sm mb-2">{comment.comment}</p>
                  {comment.likes > 0 && (
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3 text-white/60" />
                      <span className="text-white/60 text-xs">{comment.likes}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

