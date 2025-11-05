'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, FileText, FileJson, FileSpreadsheet, Image } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ExportData {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

interface NameExportManagerProps {
  data: ExportData | ExportData[]
  filename?: string
}

export function NameExportManager({ data, filename = 'ghanaian-names' }: NameExportManagerProps) {
  const { toast } = useToast()
  const [format, setFormat] = useState<'json' | 'csv' | 'txt' | 'png'>('json')
  const [isExporting, setIsExporting] = useState(false)

  const isArray = Array.isArray(data)
  const exportData = isArray ? data : [data]

  const exportToJSON = () => {
    const json = JSON.stringify(exportData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Last Name', 'Meaning', 'Tribe', 'Gender']
    const rows = exportData.map((item) => [
      item.name,
      item.lastName,
      item.meaning,
      item.tribe || '',
      item.gender || '',
    ])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToTXT = () => {
    const text = exportData
      .map((item) => {
        return `${item.name} ${item.lastName}\nMeaning: ${item.meaning}${item.tribe ? `\nTribe: ${item.tribe}` : ''}${item.gender ? `\nGender: ${item.gender}` : ''}\n`
      })
      .join('\n---\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToPNG = async () => {
    setIsExporting(true)
    try {
      // Dynamic import to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default
      const element = document.getElementById('name-card-export')
      if (!element) {
        toast({
          title: "Error",
          description: "Export element not found",
          variant: "destructive",
        })
        return
      }
      const canvas = await html2canvas(element, { backgroundColor: null })
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.png`
      a.click()
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: "Export failed",
        description: "Unable to export as image",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExport = () => {
    switch (format) {
      case 'json':
        exportToJSON()
        break
      case 'csv':
        exportToCSV()
        break
      case 'txt':
        exportToTXT()
        break
      case 'png':
        exportToPNG()
        break
    }
    toast({
      title: "Exported!",
      description: `Exported ${isArray ? exportData.length : 1} name(s) as ${format.toUpperCase()}`,
    })
  }

  const getFormatIcon = () => {
    switch (format) {
      case 'json':
        return <FileJson className="h-4 w-4" />
      case 'csv':
        return <FileSpreadsheet className="h-4 w-4" />
      case 'txt':
        return <FileText className="h-4 w-4" />
      case 'png':
        return <Image className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Download className="h-5 w-5 text-green-400" />
          Export Manager
        </CardTitle>
        <CardDescription className="text-white/70">
          Export {isArray ? `${exportData.length} names` : 'name'} in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-white/80 text-sm">Export Format</label>
          <Select value={format} onValueChange={(value: any) => setFormat(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">
                <div className="flex items-center gap-2">
                  <FileJson className="h-4 w-4" />
                  JSON
                </div>
              </SelectItem>
              <SelectItem value="csv">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  CSV
                </div>
              </SelectItem>
              <SelectItem value="txt">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </div>
              </SelectItem>
              <SelectItem value="png">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  PNG Image
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
        >
          {getFormatIcon()}
          <span className="ml-2">
            {isExporting ? 'Exporting...' : `Export as ${format.toUpperCase()}`}
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}

