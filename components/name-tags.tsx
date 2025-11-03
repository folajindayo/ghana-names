'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { X, Plus, Tag } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameTagsProps {
  name: string
  lastName: string
  onTagsChange?: (tags: string[]) => void
}

const predefinedTags = [
  'Traditional',
  'Modern',
  'Spiritual',
  'Strong',
  'Beautiful',
  'Unique',
  'Popular',
  'Rare',
  'Day Name',
  'Family',
]

export function NameTags({ name, lastName, onTagsChange }: NameTagsProps) {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const { toast } = useToast()

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase()
    if (!trimmedTag) return
    if (tags.includes(trimmedTag)) {
      toast({
        title: "Tag already exists",
        description: "This tag has already been added.",
        variant: "destructive",
      })
      return
    }
    if (tags.length >= 10) {
      toast({
        title: "Too many tags",
        description: "Maximum 10 tags allowed.",
        variant: "destructive",
      })
      return
    }
    const updated = [...tags, trimmedTag]
    setTags(updated)
    onTagsChange?.(updated)
    setNewTag('')
  }

  const removeTag = (tagToRemove: string) => {
    const updated = tags.filter((tag) => tag !== tagToRemove)
    setTags(updated)
    onTagsChange?.(updated)
  }

  const handlePredefinedTag = (tag: string) => {
    addTag(tag)
  }

  const handleAddCustomTag = () => {
    if (newTag.trim()) {
      addTag(newTag)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-purple-400" />
          <h4 className="text-white font-semibold">Tags for {name} {lastName}</h4>
        </div>

        {/* Current Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30 flex items-center gap-1"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:bg-purple-500/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Predefined Tags */}
        <div>
          <p className="text-white/70 text-sm mb-2">Quick Tags:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedTags.map((tag) => (
              <Button
                key={tag}
                onClick={() => handlePredefinedTag(tag)}
                variant="outline"
                size="sm"
                disabled={tags.includes(tag.toLowerCase())}
                className="bg-white/10 border-white/20 text-white text-xs h-7"
              >
                <Plus className="mr-1 h-3 w-3" />
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Tag Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Add custom tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddCustomTag()
              }
            }}
            maxLength={20}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button
            onClick={handleAddCustomTag}
            disabled={!newTag.trim() || tags.length >= 10}
            variant="outline"
            className="bg-white/10 border-white/20 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-white/60 text-xs">
          {tags.length}/10 tags • Tags help categorize and organize names
        </p>
      </CardContent>
    </Card>
  )
}

