'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, FileJson, FileSpreadsheet, Image } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameData {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

interface NameBatchExportProps {
  names: NameData[]
}

export function NameBatchExport({ names }: NameBatchExportProps) {
  const { toast } = useToast()

  const exportToJSON = () => {
    const json = JSON.stringify(names, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghanaian-names-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Names exported as JSON",
    })
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Last Name', 'Meaning', 'Tribe', 'Gender']
    const rows = names.map((n) => [
      n.name,
      n.lastName,
      n.meaning,
      n.tribe || '',
      n.gender || '',
    ])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghanaian-names-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Names exported as CSV",
    })
  }

  const exportToTXT = () => {
    const text = names
      .map((n) => {
        return `${n.name} ${n.lastName}\nMeaning: ${n.meaning}${n.tribe ? `\nTribe: ${n.tribe}` : ''}${n.gender ? `\nGender: ${n.gender}` : ''}\n`
      })
      .join('\n---\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghanaian-names-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Exported!",
      description: "Names exported as TXT",
    })
  }

  if (names.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-green-400" />
            Batch Export
          </CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-white/70">
          No names to export. Generate or select names first.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Download className="h-5 w-5 text-green-400" />
          Batch Export
        </CardTitle>
        <CardDescription className="text-white/70">
          Export {names.length} name{names.length !== 1 ? 's' : ''} in multiple formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
          <span className="text-white/80 text-sm">Total Names</span>
          <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
            {names.length}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={exportToJSON}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <FileJson className="mr-2 h-4 w-4" />
            JSON
          </Button>
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button
            onClick={exportToTXT}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            TXT
          </Button>
          <Button
            variant="outline"
            disabled
            className="bg-white/5 border-white/10 text-white/50"
          >
            <Image className="mr-2 h-4 w-4" />
            PNG
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

