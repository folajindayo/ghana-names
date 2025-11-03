'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Folder, Plus, Edit, Trash2, Tag } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface FavoriteCategory {
  id: string
  name: string
  color: string
  count: number
}

const defaultCategories: FavoriteCategory[] = [
  { id: '1', name: 'Family Names', color: '#3b82f6', count: 0 },
  { id: '2', name: 'Strong Names', color: '#ef4444', count: 0 },
  { id: '3', name: 'Beautiful Names', color: '#ec4899', count: 0 },
  { id: '4', name: 'Traditional', color: '#10b981', count: 0 },
  { id: '5', name: 'Modern', color: '#8b5cf6', count: 0 },
]

export function NameFavoriteCategories() {
  const { address, isConnected } = useAccount()
  const [categories, setCategories] = useState<FavoriteCategory[]>(defaultCategories)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryColor, setNewCategoryColor] = useState('#60a5fa')
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadCategories()
    updateCategoryCounts()
  }, [])

  const loadCategories = () => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('ghanaian-name-categories')
      if (stored) {
        const loaded = JSON.parse(stored)
        setCategories(loaded.length > 0 ? loaded : defaultCategories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const saveCategories = (cats: FavoriteCategory[]) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('ghanaian-name-categories', JSON.stringify(cats))
    } catch (error) {
      console.error('Error saving categories:', error)
    }
  }

  const updateCategoryCounts = () => {
    if (typeof window === 'undefined') return
    try {
      const favorites = localStorage.getItem('ghanaian-name-favorites')
      const favoriteData = favorites ? JSON.parse(favorites) : []

      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          count: favoriteData.filter((fav: any) => fav.categoryId === cat.id).length,
        }))
      )
    } catch (error) {
      console.error('Error updating counts:', error)
    }
  }

  const addCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a category name.",
        variant: "destructive",
      })
      return
    }

    const newCategory: FavoriteCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
      count: 0,
    }

    const updated = [...categories, newCategory]
    setCategories(updated)
    saveCategories(updated)
    setNewCategoryName('')
    setNewCategoryColor('#60a5fa')

    toast({
      title: "Category added",
      description: `${newCategory.name} category created.`,
    })
  }

  const deleteCategory = (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return

    const updated = categories.filter((cat) => cat.id !== id)
    setCategories(updated)
    saveCategories(updated)

    toast({
      title: "Category deleted",
      description: "Category has been removed.",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Folder className="h-5 w-5 text-blue-400" />
          Favorite Categories
        </CardTitle>
        <CardDescription className="text-white/70">
          Organize your favorite names into categories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Category */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="category-name" className="text-white/90 text-xs">
                Category Name
              </Label>
              <Input
                id="category-name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Spiritual Names"
                className="bg-white/10 border-white/20 text-white text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="category-color" className="text-white/90 text-xs">
                Color
              </Label>
              <Input
                id="category-color"
                type="color"
                value={newCategoryColor}
                onChange={(e) => setNewCategoryColor(e.target.value)}
                className="h-8 w-full p-1 rounded border-white/20 bg-white/10 cursor-pointer"
              />
            </div>
          </div>
          <Button
            onClick={addCategory}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/20"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex-1">
                  <p className="text-white font-semibold">{category.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="bg-white/10 text-white/70 text-xs">
                      {category.count} names
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  onClick={() => deleteCategory(category.id)}
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <p className="text-white/60 text-center py-4">No categories yet. Create one to get started!</p>
        )}
      </CardContent>
    </Card>
  )
}

