'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

interface WhatsAppShareProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
}

export function WhatsAppShare({ name, lastName, meaning, tribe }: WhatsAppShareProps) {
  const handleShare = () => {
    const message = encodeURIComponent(
      `Check out my Ghanaian name!\n\n` +
      `Name: ${name} ${lastName}\n` +
      `Meaning: "${meaning}"\n` +
      `${tribe ? `Tribe: ${tribe}\n` : ''}` +
      `\nDiscover your own Ghanaian name at ${typeof window !== 'undefined' ? window.location.origin : ''}`
    )
    
    const whatsappUrl = `https://wa.me/?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30"
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Share on WhatsApp
    </Button>
  )
}

