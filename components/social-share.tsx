'use client'

import { Button } from '@/components/ui/button'
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface SocialShareProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  ipfsUrl?: string
}

export function SocialShare({ name, lastName, meaning, tribe, ipfsUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const fullName = `${name} ${lastName}`
  const text = `🇬🇭 I just discovered my Ghanaian name: ${fullName}\n\nMeaning: "${meaning}"${tribe ? `\nTribe: ${tribe}` : ''}\n\nDiscover yours at ${typeof window !== 'undefined' ? window.location.origin : ''}`

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}${ipfsUrl ? `&url=${encodeURIComponent(ipfsUrl)}` : ''}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ipfsUrl || window.location.href)}&quote=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'width=550,height=420')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Ghanaian Name: ${fullName}`,
          text: text,
          url: ipfsUrl || window.location.href,
        })
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled')
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {navigator.share && (
        <Button
          onClick={handleNativeShare}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      )}
      <Button
        onClick={handleTwitterShare}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-500/30"
      >
        <Twitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>
      <Button
        onClick={handleFacebookShare}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-blue-600/20 hover:border-blue-600/30"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      <Button
        onClick={handleCopy}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </>
        )}
      </Button>
    </div>
  )
}

