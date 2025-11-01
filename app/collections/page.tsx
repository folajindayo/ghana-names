'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { WalletConnect } from '@/components/wallet-connect'
import { FolderPlus, Plus, Trash2, Edit, ArrowLeft, Palette } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Collection {
  _id: string
  name: string
  description?: string
  color: string
  nameCardIds: string[]
  createdAt: string
}

export default function CollectionsPage() {
  const { address, isConnected } = useAccount()
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [collectionName, setCollectionName] = useState('')
  const [collectionDescription, setCollectionDescription] = useState('')
  const [collectionColor, setCollectionColor] = useState('#667eea')
  const { toast } = useToast()

  useEffect(() => {
    if (isConnected && address) {
      fetchCollections()
    } else {
      setLoading(false)
    }
  }, [isConnected, address])

  const fetchCollections = async () => {
    if (!address) return

    setLoading(true)
    try {
      const response = await fetch(`/api/collections?walletAddress=${address}`)
      if (response.ok) {
        const data = await response.json()
        setCollections(data.collections || [])
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
      toast({
        title: "Error",
        description: "Failed to load collections.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCollection = async () => {
    if (!address || !collectionName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a collection name.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          name: collectionName,
          description: collectionDescription,
          color: collectionColor,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          toast({
            title: "Collection created!",
            description: "Your new collection has been created.",
          })
          setDialogOpen(false)
          setCollectionName('')
          setCollectionDescription('')
          setCollectionColor('#667eea')
          fetchCollections()
        }
      } else {
        throw new Error('Failed to create collection')
      }
    } catch (error) {
      console.error('Error creating collection:', error)
      toast({
        title: "Error",
        description: "Failed to create collection. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection?')) return

    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Deleted",
          description: "Collection deleted successfully.",
        })
        fetchCollections()
      }
    } catch (error) {
      console.error('Error deleting collection:', error)
      toast({
        title: "Error",
        description: "Failed to delete collection.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-center">Collections</CardTitle>
            <CardDescription className="text-white/70 text-center">
              Connect your wallet to organize your names into collections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <WalletConnect />
            <Link href="/">
              <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white">
                Back to Generator
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <FolderPlus className="h-8 w-8" />
              My Collections
            </h1>
            <p className="text-white/70">Organize your names into custom collections</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  New Collection
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/10 backdrop-blur-sm border-white/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Create New Collection</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Organize your names into themed collections
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="collectionName" className="text-white/90">
                      Collection Name *
                    </Label>
                    <Input
                      id="collectionName"
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                      placeholder="e.g., Baby Names, Family Names"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collectionDescription" className="text-white/90">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="collectionDescription"
                      value={collectionDescription}
                      onChange={(e) => setCollectionDescription(e.target.value)}
                      placeholder="Describe this collection..."
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/90 flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Color
                    </Label>
                    <div className="flex gap-2">
                      {['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140'].map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setCollectionColor(color)}
                          className={`w-10 h-10 rounded-full border-2 ${
                            collectionColor === color ? 'border-white' : 'border-white/20'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateCollection}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  >
                    Create Collection
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white/70 py-12">
            Loading collections...
          </div>
        ) : collections.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="py-12 text-center">
              <FolderPlus className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 mb-4">No collections yet</p>
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create First Collection
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((collection) => (
              <Card
                key={collection._id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors relative"
                style={{
                  borderLeftColor: collection.color,
                  borderLeftWidth: '4px',
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white" style={{ color: collection.color }}>
                        {collection.name}
                      </CardTitle>
                      {collection.description && (
                        <CardDescription className="text-white/70 mt-1">
                          {collection.description}
                        </CardDescription>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCollection(collection._id)}
                      className="text-white/70 hover:text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">
                        {collection.nameCardIds?.length || 0} names
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        Created {new Date(collection.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

