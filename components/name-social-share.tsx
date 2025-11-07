'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, Check, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ShareData {
  name: string
  meaning: string
  tribe: string
  gender?: string
}

export function NameSocialShare() {
  const [shareData, setShareData] = useState<ShareData>({
    name: '',
    meaning: '',
    tribe: '',
    gender: '',
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateShareText = () => {
    let text = `Check out this beautiful Ghanaian name: ${shareData.name}`
    if (shareData.meaning) {
      text += `\nMeaning: "${shareData.meaning}"`
    }
    if (shareData.tribe) {
      text += `\nTribe: ${shareData.tribe}`
    }
    if (shareData.gender) {
      text += `\nGender: ${shareData.gender}`
    }
    text += '\n\nDiscover more at Ghana Names Generator!'
    return text
  }

  const generateShareUrl = () => {
    const params = new URLSearchParams()
    if (shareData.name) params.set('name', shareData.name)
    if (shareData.meaning) params.set('meaning', shareData.meaning)
    if (shareData.tribe) params.set('tribe', shareData.tribe)
    return `${window.location.origin}?${params.toString()}`
  }

  const handleCopy = () => {
    const text = generateShareText()
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Share text copied to clipboard",
    })
  }

  const handleShare = (platform: string) => {
    const text = generateShareText()
    const url = generateShareUrl()
    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(`Ghanaian Name: ${shareData.name}`)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
      toast({
        title: "Opening share dialog",
        description: `Sharing on ${platform}`,
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share2 className="h-5 w-5 text-green-400" />
          Social Share
        </CardTitle>
        <CardDescription className="text-white/70">
          Share your favorite Ghanaian names on social media
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Name</Label>
            <Input
              placeholder="e.g., Kwame"
              value={shareData.name}
              onChange={(e) => setShareData({ ...shareData, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Meaning</Label>
            <Input
              placeholder="e.g., Born on Saturday"
              value={shareData.meaning}
              onChange={(e) => setShareData({ ...shareData, meaning: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/80">Tribe</Label>
              <Input
                placeholder="e.g., Akan"
                value={shareData.tribe}
                onChange={(e) => setShareData({ ...shareData, tribe: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Gender (Optional)</Label>
              <Input
                placeholder="e.g., Male, Female"
                value={shareData.gender || ''}
                onChange={(e) => setShareData({ ...shareData, gender: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </div>

        {shareData.name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white font-semibold mb-2 text-sm">Preview</h4>
            <div className="space-y-1 text-sm">
              <p className="text-white/90">
                <strong className="text-white">Name:</strong> {shareData.name}
              </p>
              {shareData.meaning && (
                <p className="text-white/90">
                  <strong className="text-white">Meaning:</strong> "{shareData.meaning}"
                </p>
              )}
              {shareData.tribe && (
                <p className="text-white/90">
                  <strong className="text-white">Tribe:</strong> {shareData.tribe}
                </p>
              )}
              {shareData.gender && (
                <p className="text-white/90">
                  <strong className="text-white">Gender:</strong> {shareData.gender}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Share on Social Media</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleShare('twitter')}
              className="bg-blue-400 hover:bg-blue-500 text-white"
              disabled={!shareData.name}
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            <Button
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!shareData.name}
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
            <Button
              onClick={() => handleShare('linkedin')}
              className="bg-blue-700 hover:bg-blue-800 text-white"
              disabled={!shareData.name}
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            <Button
              onClick={() => handleShare('email')}
              className="bg-gray-600 hover:bg-gray-700 text-white"
              disabled={!shareData.name}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleCopy}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            disabled={!shareData.name}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Share Text
              </>
            )}
          </Button>
        </div>

        {!shareData.name && (
          <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
            <p className="text-white/80 text-xs">
              <strong className="text-white">Tip:</strong> Fill in the name details above to generate shareable content for social media platforms.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

