'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

export default function SharePage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const lastName = searchParams.get('lastName')
  const meaning = searchParams.get('meaning')
  const tribe = searchParams.get('tribe')
  const gender = searchParams.get('gender')

  if (!name || !lastName || !meaning) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: "url('/bg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white">Invalid Share Link</CardTitle>
            <CardDescription className="text-white/70">
              This share link is invalid or missing required information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: "url('/bg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-2xl w-full">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-white/10 border-white/20 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
        </Link>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center text-4xl mb-2">
              {name} {lastName}
            </CardTitle>
            <CardDescription className="text-white/70 text-center text-lg">
              Shared Ghanaian Name
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/90 text-xl mb-1">Meaning</p>
              <p className="text-yellow-400 text-2xl font-semibold">"{meaning}"</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {tribe && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <MapPin className="mr-1 h-3 w-3" />
                  {tribe} Tribe
                </Badge>
              )}
              {gender && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Users className="mr-1 h-3 w-3" />
                  {gender === 'male' ? 'Male' : 'Female'}
                </Badge>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-white/70 text-sm mb-4">
                Discover your own Ghanaian name with meaning and tribe
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  Generate Your Name
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

