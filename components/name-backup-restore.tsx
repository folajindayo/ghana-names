'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Download, Database, CheckCircle, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BackupData {
  history: any[]
  favorites: any[]
  collections: any[]
  timestamp: string
  version: string
}

export function NameBackupRestore() {
  const [backupFile, setBackupFile] = useState<File | null>(null)
  const { toast } = useToast()

  const createBackup = () => {
    if (typeof window === 'undefined') return

    try {
      // Get data from localStorage
      const history = localStorage.getItem('ghanaian-name-history')
      const favorites = localStorage.getItem('ghanaian-name-favorites')
      const collections = localStorage.getItem('ghanaian-name-collections')

      const backupData: BackupData = {
        history: history ? JSON.parse(history) : [],
        favorites: favorites ? JSON.parse(favorites) : [],
        collections: collections ? JSON.parse(collections) : [],
        timestamp: new Date().toISOString(),
        version: '1.0',
      }

      const jsonStr = JSON.stringify(backupData, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ghanaian-name-backup-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Backup created!",
        description: "Your data has been exported successfully.",
      })
    } catch (error) {
      console.error('Error creating backup:', error)
      toast({
        title: "Backup failed",
        description: "Could not create backup. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== 'application/json') {
        toast({
          title: "Invalid file",
          description: "Please select a JSON backup file.",
          variant: "destructive",
        })
        return
      }
      setBackupFile(file)
    }
  }

  const restoreBackup = () => {
    if (!backupFile) {
      toast({
        title: "No file selected",
        description: "Please select a backup file first.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backupData: BackupData = JSON.parse(e.target?.result as string)

        if (!backupData.version) {
          throw new Error('Invalid backup format')
        }

        if (typeof window === 'undefined') return

        // Restore data to localStorage
        if (backupData.history && backupData.history.length > 0) {
          localStorage.setItem('ghanaian-name-history', JSON.stringify(backupData.history))
        }
        if (backupData.favorites && backupData.favorites.length > 0) {
          localStorage.setItem('ghanaian-name-favorites', JSON.stringify(backupData.favorites))
        }
        if (backupData.collections && backupData.collections.length > 0) {
          localStorage.setItem('ghanaian-name-collections', JSON.stringify(backupData.collections))
        }

        toast({
          title: "Restore successful!",
          description: "Your data has been restored. Please refresh the page.",
        })

        setBackupFile(null)
        // Reset file input
        const fileInput = document.getElementById('backup-file') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } catch (error) {
        console.error('Error restoring backup:', error)
        toast({
          title: "Restore failed",
          description: "Invalid backup file format. Please check the file.",
          variant: "destructive",
        })
      }
    }

    reader.readAsText(backupFile)
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-400" />
          Backup & Restore
        </CardTitle>
        <CardDescription className="text-white/70">
          Save and restore your name data locally
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Backup Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-green-400" />
            <h4 className="text-white font-semibold">Create Backup</h4>
          </div>
          <p className="text-white/70 text-sm">
            Export all your local data (history, favorites, collections) to a JSON file.
          </p>
          <Button
            onClick={createBackup}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Backup
          </Button>
        </div>

        <div className="border-t border-white/10 pt-4" />

        {/* Restore Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-blue-400" />
            <h4 className="text-white font-semibold">Restore Backup</h4>
          </div>
          <p className="text-white/70 text-sm">
            Import previously saved backup data. This will replace your current local data.
          </p>
          <div className="space-y-2">
            <Label htmlFor="backup-file" className="text-white/90">
              Select Backup File
            </Label>
            <Input
              id="backup-file"
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="bg-white/10 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>
          {backupFile && (
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">{backupFile.name}</span>
              </div>
            </div>
          )}
          <Button
            onClick={restoreBackup}
            disabled={!backupFile}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white disabled:opacity-50"
          >
            <Upload className="mr-2 h-4 w-4" />
            Restore Backup
          </Button>
        </div>

        <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
            <p className="text-white/80 text-xs">
              <strong>Note:</strong> This only backs up local browser data. Cloud data (claimed names, favorites) must be backed up separately.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

