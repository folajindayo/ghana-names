'use client'

import { Button } from '@/components/ui/button'
import { Download, FileText, FileJson } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ExportFormatsProps {
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
}

export function ExportFormats({ data, filename = 'ghanaian-names' }: ExportFormatsProps) {
  const { toast } = useToast()

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

    // Create CSV headers
    const headers = ['Name', 'Last Name', 'Meaning', 'Tribe', 'Gender', 'Explanation']
    const rows = data.map((item) => {
      return [
        item.name || '',
        item.lastName || '',
        item.meaning || '',
        item.tribe || '',
        item.gender || '',
        item.explanation || '',
      ].map((cell) => `"${String(cell).replace(/"/g, '""')}"`) // Escape quotes
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

  return (
    <div className="flex gap-2">
      <Button
        onClick={exportToJSON}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        disabled={data.length === 0}
      >
        <FileJson className="mr-2 h-4 w-4" />
        Export JSON
      </Button>
      <Button
        onClick={exportToCSV}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
        disabled={data.length === 0}
      >
        <FileText className="mr-2 h-4 w-4" />
        Export CSV
      </Button>
    </div>
  )
}

