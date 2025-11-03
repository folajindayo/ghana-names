'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, FileJson, FileSpreadsheet, Image, File } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import html2canvas from 'html2canvas'

interface NameExportEnhancedProps {
  data: Array<{
    name: string
    lastName?: string
    meaning: string
    tribe?: string
    gender?: string
    explanation?: string
    [key: string]: any
  }>
  filename?: string
  exportAsImage?: boolean
  elementId?: string
}

export function NameExportEnhanced({
  data,
  filename = 'ghanaian-names',
  exportAsImage = false,
  elementId,
}: NameExportEnhancedProps) {
  const { toast } = useToast()
  const [exporting, setExporting] = useState(false)

  const exportToJSON = () => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "Generate or select names first.",
        variant: "destructive",
      })
      return
    }

    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exported!",
      description: `Exported ${data.length} names as JSON.`,
    })
  }

  const exportToCSV = () => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "Generate or select names first.",
        variant: "destructive",
      })
      return
    }

    const headers = ['Name', 'Last Name', 'Meaning', 'Tribe', 'Gender', 'Explanation']
    const rows = data.map((item) => {
      return [
        item.name || '',
        item.lastName || '',
        item.meaning || '',
        item.tribe || '',
        item.gender || '',
        item.explanation || '',
      ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
    })

    const csvContent = [
      headers.map((h) => `"${h}"`).join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exported!",
      description: `Exported ${data.length} names as CSV.`,
    })
  }

  const exportToTXT = () => {
    if (data.length === 0) {
      toast({
        title: "No data to export",
        description: "Generate or select names first.",
        variant: "destructive",
      })
      return
    }

    const txtContent = data
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} ${item.lastName || ''}\n   Meaning: ${item.meaning}\n   ${
            item.tribe ? `Tribe: ${item.tribe}\n   ` : ''
          }${item.gender ? `Gender: ${item.gender}\n   ` : ''}${item.explanation ? `Explanation: ${item.explanation}` : ''}\n`
      )
      .join('\n')

    const blob = new Blob([txtContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Exported!",
      description: `Exported ${data.length} names as TXT.`,
    })
  }

  const exportAsImage = async () => {
    if (!elementId) {
      toast({
        title: "Element ID required",
        description: "Please provide an element ID to export.",
        variant: "destructive",
      })
      return
    }

    setExporting(true)
    try {
      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error('Element not found')
      }

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      })

      canvas.toBlob((blob) => {
        if (!blob) return

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${filename}-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: "Exported!",
          description: "Exported as PNG image.",
        })
      })
    } catch (error) {
      console.error('Error exporting image:', error)
      toast({
        title: "Export failed",
        description: "Could not export as image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={exportToJSON}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        disabled={data.length === 0}
      >
        <FileJson className="mr-2 h-4 w-4" />
        JSON
      </Button>
      <Button
        onClick={exportToCSV}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        disabled={data.length === 0}
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        CSV
      </Button>
      <Button
        onClick={exportToTXT}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        disabled={data.length === 0}
      >
        <FileText className="mr-2 h-4 w-4" />
        TXT
      </Button>
      {exportAsImage && elementId && (
        <Button
          onClick={exportAsImage}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          disabled={exporting}
        >
          <Image className="mr-2 h-4 w-4" />
          {exporting ? 'Exporting...' : 'PNG'}
        </Button>
      )}
    </div>
  )
}

