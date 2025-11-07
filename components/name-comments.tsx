'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Send, Heart, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Comment {
  id: string
  name: string
  author: string
  text: string
  timestamp: Date
  likes: number
  userLiked: boolean
}

const sampleComments: Comment[] = [
  {
    id: '1',
    name: 'Kwame',
    author: 'Ama',
    text: 'This is such a beautiful name! My grandfather was named Kwame.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 12,
    userLiked: false,
  },
  {
    id: '2',
    name: 'Akosua',
    author: 'Kofi',
    text: 'I love the meaning behind this name. Perfect for a Sunday-born child!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 8,
    userLiked: false,
  },
]

export function NameComments() {
  const [selectedName, setSelectedName] = useState('Kwame')
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem('nameComments')
    if (savedComments) {
      try {
        const parsed = JSON.parse(savedComments)
        setComments(parsed.map((c: any) => ({ ...c, timestamp: new Date(c.timestamp) })))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both your name and comment",
        variant: "destructive",
      })
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      name: selectedName,
      author: authorName,
      text: newComment,
      timestamp: new Date(),
      likes: 0,
      userLiked: false,
    }

    const updated = [comment, ...comments]
    setComments(updated)
    localStorage.setItem('nameComments', JSON.stringify(updated))
    setNewComment('')
    setAuthorName('')

    toast({
      title: "Comment added!",
      description: "Your comment has been posted.",
    })
  }

  const handleLike = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.map((comment) => {
        if (comment.id === commentId) {
          const newLikes = comment.userLiked ? comment.likes - 1 : comment.likes + 1
          return { ...comment, userLiked: !comment.userLiked, likes: newLikes }
        }
        return comment
      })
      localStorage.setItem('nameComments', JSON.stringify(updated))
      return updated
    })
  }

  const handleDelete = (commentId: string) => {
    setComments((prev) => {
      const updated = prev.filter((comment) => comment.id !== commentId)
      localStorage.setItem('nameComments', JSON.stringify(updated))
      return updated
    })
    toast({
      title: "Comment deleted",
      description: "The comment has been removed.",
    })
  }

  const filteredComments = comments.filter((c) => c.name === selectedName)

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          Name Comments
        </CardTitle>
        <CardDescription className="text-white/70">
          Share your thoughts and experiences about Ghanaian names
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {['Kwame', 'Akosua', 'Kofi', 'Ama'].map((name) => (
            <Button
              key={name}
              size="sm"
              variant={selectedName === name ? 'default' : 'outline'}
              onClick={() => setSelectedName(name)}
              className={
                selectedName === name
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }
            >
              {name}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-2"
            />
            <Textarea
              placeholder={`Share your thoughts about ${selectedName}...`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-2"
              rows={3}
            />
            <Button
              onClick={handleAddComment}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredComments.length === 0 ? (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-white/60 text-sm">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            filteredComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-white">{comment.author}</span>
                      <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 text-xs">
                        {comment.name}
                      </Badge>
                      <span className="text-white/50 text-xs">{formatTimeAgo(comment.timestamp)}</span>
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleLike(comment.id)}
                      className={`${
                        comment.userLiked
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${comment.userLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <span className="text-white/60 text-xs">{comment.likes}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(comment.id)}
                      className="text-white/60 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-blue-500/10 rounded border border-blue-500/30">
          <p className="text-white/80 text-xs">
            <strong className="text-white">Note:</strong> Comments are saved locally. Share your experiences and help others discover great names!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
