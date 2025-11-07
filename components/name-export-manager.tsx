'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Download, FileText, FileJson, FileSpreadsheet, Image, Copy, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ExportData {
  name: string
  meaning: string
  tribe: string
  gender?: string
}

export function NameExportManager() {
  const [exportData, setExportData] = useState<ExportData>({
    name: '',
    meaning: '',
    tribe: '',
    gender: '',
  })
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const exportToJSON = () => {
    const data = JSON.stringify(exportData, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportData.name || 'name'}-data.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Name data exported as JSON",
    })
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Meaning', 'Tribe', 'Gender']
    const row = [
      exportData.name,
      exportData.meaning,
      exportData.tribe,
      exportData.gender || 'N/A',
    ]
    const csv = [headers.join(','), row.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportData.name || 'name'}-data.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Name data exported as CSV",
    })
  }

  const exportToTXT = () => {
    const text = `Name: ${exportData.name}
Meaning: ${exportData.meaning}
Tribe: ${exportData.tribe}
Gender: ${exportData.gender || 'N/A'}`
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportData.name || 'name'}-data.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Name data exported as TXT",
    })
  }

  const copyToClipboard = () => {
    const text = JSON.stringify(exportData, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Name data copied to clipboard",
    })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Download className="h-5 w-5 text-green-400" />
          Export Manager
        </CardTitle>
        <CardDescription className="text-white/70">
          Export name data in multiple formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-white/80">Name</Label>
            <Textarea
              placeholder="Enter name"
              value={exportData.name}
              onChange={(e) => setExportData({ ...exportData, name: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              rows={1}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white/80">Meaning</Label>
            <Textarea
              placeholder="Enter meaning"
              value={exportData.meaning}
              onChange={(e) => setExportData({ ...exportData, meaning: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/80">Tribe</Label>
              <Textarea
                placeholder="Enter tribe"
                value={exportData.tribe}
                onChange={(e) => setExportData({ ...exportData, tribe: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                rows={1}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80">Gender (Optional)</Label>
              <Textarea
                placeholder="Enter gender"
                value={exportData.gender || ''}
                onChange={(e) => setExportData({ ...exportData, gender: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                rows={1}
              />
            </div>
          </div>
        </div>

        {exportData.name && (
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white font-semibold mb-2 text-sm">Preview</h4>
            <pre className="text-white/80 text-xs overflow-x-auto">
              {JSON.stringify(exportData, null, 2)}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm">Export Formats</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={exportToJSON}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!exportData.name}
            >
              <FileJson className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button
              onClick={exportToCSV}
              className="bg-green-500 hover:bg-green-600 text-white"
              disabled={!exportData.name}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button
              onClick={exportToTXT}
              className="bg-gray-500 hover:bg-gray-600 text-white"
              disabled={!exportData.name}
            >
              <FileText className="h-4 w-4 mr-2" />
              TXT
            </Button>
            <Button
              onClick={copyToClipboard}
              className="bg-purple-500 hover:bg-purple-600 text-white"
              disabled={!exportData.name}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {!exportData.name && (
          <div className="p-3 bg-green-500/10 rounded border border-green-500/30">
            <p className="text-white/80 text-xs">
              <strong className="text-white">Tip:</strong> Fill in the name details above to export in various formats (JSON, CSV, TXT) or copy to clipboard.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
