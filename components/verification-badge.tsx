'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle, Verified } from 'lucide-react'

interface VerificationBadgeProps {
  isVerified?: boolean
  verificationLevel?: 'basic' | 'premium' | 'verified'
}

export function VerificationBadge({ isVerified, verificationLevel = 'basic' }: VerificationBadgeProps) {
  if (!isVerified && verificationLevel === 'basic') {
    return null
  }

  const badgeConfig = {
    basic: {
      icon: CheckCircle,
      text: 'Claimed',
      className: 'bg-green-500/20 text-green-300 border-green-500/30',
    },
    premium: {
      icon: Verified,
      text: 'Premium',
      className: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    },
    verified: {
      icon: Verified,
      text: 'Verified',
      className: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
  }

  const config = badgeConfig[verificationLevel]
  const Icon = config.icon

  return (
    <Badge variant="secondary" className={`${config.className} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  )
}

