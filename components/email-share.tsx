'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Mail, Send } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface EmailShareProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  ipfsUrl?: string
}

export function EmailShare({ name, lastName, meaning, tribe, ipfsUrl }: EmailShareProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setSending(true)

    // Create mailto link (client-side email)
    const subject = encodeURIComponent(`Check out my Ghanaian name: ${name} ${lastName}`)
    const body = encodeURIComponent(
      `Hi!

I wanted to share my Ghanaian name with you:

Name: ${name} ${lastName}
Meaning: "${meaning}"
${tribe ? `Tribe: ${tribe}` : ''}
${message ? `\nPersonal message: ${message}` : ''}
${ipfsUrl ? `\nView on IPFS: ${ipfsUrl}` : ''}

Discover your own Ghanaian name at ${typeof window !== 'undefined' ? window.location.origin : ''}

Best regards`
    )

    // Open email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`

    toast({
      title: "Email client opened",
      description: "Your email client should open with a pre-filled message.",
    })

    setSending(false)
    setOpen(false)
    setEmail('')
    setMessage('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-blue-500/20 hover:border-blue-500/30"
        >
          <Mail className="mr-2 h-4 w-4" />
          Share via Email
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white">Share Name via Email</DialogTitle>
          <DialogDescription className="text-white/70">
            Send "{name} {lastName}" to a friend or family member
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">
              Recipient Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="friend@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailMessage" className="text-white/90">
              Personal Message (Optional)
            </Label>
            <textarea
              id="emailMessage"
              placeholder="Add a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="flex-1 w-full rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm px-3 py-2 text-sm"
            />
          </div>
          <div className="p-3 bg-white/5 rounded-md border border-white/10">
            <p className="text-white/70 text-sm">
              <strong className="text-white">Preview:</strong> Your email client will open with a message
              about <strong className="text-yellow-400">{name} {lastName}</strong>
            </p>
          </div>
          <Button
            onClick={handleSend}
            disabled={sending || !email.trim()}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? 'Opening Email...' : 'Open Email Client'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

