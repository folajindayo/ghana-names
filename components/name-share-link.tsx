'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Check, Link as LinkIcon, Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameShareLinkProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

export function NameShareLink({ name, lastName, meaning, tribe, gender }: NameShareLinkProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateShareLink = () => {
    const params = new URLSearchParams({
      name,
      lastName,
      meaning,
      ...(tribe && { tribe }),
      ...(gender && { gender }),
    })

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}/share?${params.toString()}`
  }

  const shareLink = generateShareLink()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink)
      setCopied(true)
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast({
        title: "Copy failed",
        description: "Could not copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} ${lastName} - Ghanaian Name`,
          text: `Check out my Ghanaian name: ${name} ${lastName}. Meaning: "${meaning}"`,
          url: shareLink,
        })
      } catch (error) {
        // User cancelled or error occurred
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={shareLink}
          readOnly
          className="bg-white/10 border-white/20 text-white text-sm"
        />
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="icon"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        {navigator.share && (
          <Button
            onClick={shareNative}
            variant="outline"
            size="icon"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <p className="text-white/60 text-xs">
        Share this link to let others view this name
      </p>
    </div>
  )
}

