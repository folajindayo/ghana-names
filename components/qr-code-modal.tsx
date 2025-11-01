'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, Share2, Copy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import QRCode from 'qrcode.react'

interface QRCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ipfsUrl: string
  nameCardTitle?: string
}

export function QRCodeModal({ open, onOpenChange, ipfsUrl, nameCardTitle }: QRCodeModalProps) {
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(ipfsUrl)
    toast({
      title: "Copied!",
      description: "IPFS URL copied to clipboard.",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: nameCardTitle || 'My Ghanaian Name',
          text: `Check out my Ghanaian name card: ${nameCardTitle}`,
          url: ipfsUrl,
        })
      } catch (error) {
        // User cancelled or error occurred
        handleCopy()
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Share Name Card</DialogTitle>
          <DialogDescription className="text-white/70">
            Scan the QR code or copy the link to share your Ghanaian name card
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center bg-white p-4 rounded-lg">
            <QRCode
              value={ipfsUrl}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Link
            </Button>
            <Button
              onClick={handleCopy}
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy URL
            </Button>
          </div>
          <div className="text-xs text-white/60 break-all p-2 bg-white/5 rounded">
            {ipfsUrl}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

