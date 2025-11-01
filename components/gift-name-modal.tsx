'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Gift, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAccount } from 'wagmi'

interface GiftNameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  nameCardId: string
  nameData: {
    name: string
    lastName: string
    meaning: string
    tribe?: string
    gender?: string
  }
}

export function GiftNameModal({ open, onOpenChange, nameCardId, nameData }: GiftNameModalProps) {
  const { address } = useAccount()
  const [recipientAddress, setRecipientAddress] = useState('')
  const [message, setMessage] = useState('')
  const [isGifting, setIsGifting] = useState(false)
  const { toast } = useToast()

  const handleGift = async () => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to gift names.",
        variant: "destructive",
      })
      return
    }

    if (!recipientAddress.trim()) {
      toast({
        title: "Recipient required",
        description: "Please enter the recipient's wallet address.",
        variant: "destructive",
      })
      return
    }

    // Basic address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress.trim())) {
      toast({
        title: "Invalid address",
        description: "Please enter a valid Ethereum wallet address.",
        variant: "destructive",
      })
      return
    }

    if (recipientAddress.toLowerCase() === address.toLowerCase()) {
      toast({
        title: "Invalid recipient",
        description: "You cannot gift a name to yourself.",
        variant: "destructive",
      })
      return
    }

    setIsGifting(true)

    try {
      const response = await fetch('/api/names/gift', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameCardId,
          fromAddress: address,
          toAddress: recipientAddress.trim(),
          message: message.trim() || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to gift name')
      }

      const result = await response.json()
      
      toast({
        title: "Name gifted! 🎁",
        description: `Successfully gifted ${nameData.name} ${nameData.lastName} to the recipient.`,
      })

      // Reset form
      setRecipientAddress('')
      setMessage('')
      onOpenChange(false)
    } catch (error: any) {
      console.error('Gift error:', error)
      toast({
        title: "Gift failed",
        description: error.message || "There was an error gifting the name. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGifting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-yellow-400" />
            Gift Name
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Share {nameData.name} {nameData.lastName} with someone special
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-white/90">
              Recipient Wallet Address *
            </Label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm font-mono text-sm"
            />
            <p className="text-xs text-white/60">
              Enter the Ethereum wallet address of the person you want to gift this name to
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/90">
              Personal Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Add a heartfelt message to accompany the gift..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-white/60">
              {message.length}/500 characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGift}
              disabled={isGifting || !recipientAddress.trim()}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              {isGifting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gifting...
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-4 w-4" />
                  Send Gift
                </>
              )}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

