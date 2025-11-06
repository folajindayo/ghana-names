'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Download, FileText, FileJson, FileSpreadsheet, Image, File } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NameData {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
}

interface NameExportFormatsAdvancedProps {
  names: NameData[]
  onExport?: (format: string) => void
}

export function NameExportFormatsAdvanced({ names, onExport }: NameExportFormatsAdvancedProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('json')
  const { toast } = useToast()

  const exportData = () => {
    if (names.length === 0) {
      toast({
        title: "No names to export",
        description: "Please add names before exporting",
        variant: "destructive",
      })
      return
    }

    switch (selectedFormat) {
      case 'json':
        exportJSON()
        break
      case 'csv':
        exportCSV()
        break
      case 'txt':
        exportTXT()
        break
      case 'xml':
        exportXML()
        break
      case 'yaml':
        exportYAML()
        break
      default:
        toast({
          title: "Format not supported",
          description: "Please select a valid format",
          variant: "destructive",
        })
    }

    if (onExport) {
      onExport(selectedFormat)
    }
  }

  const exportJSON = () => {
    const json = JSON.stringify(names, null, 2)
    downloadFile(json, 'application/json', 'names.json')
    toast({
      title: "Exported!",
      description: "Names exported as JSON",
    })
  }

  const exportCSV = () => {
    const headers = ['Name', 'Last Name', 'Meaning', 'Tribe', 'Gender']
    const rows = names.map((n) => [n.name, n.lastName, n.meaning, n.tribe || '', n.gender || ''])
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    downloadFile(csv, 'text/csv', 'names.csv')
    toast({
      title: "Exported!",
      description: "Names exported as CSV",
    })
  }

  const exportTXT = () => {
    const text = names
      .map((n, index) => {
        return `${index + 1}. ${n.name} ${n.lastName}\n   Meaning: ${n.meaning}${n.tribe ? `\n   Tribe: ${n.tribe}` : ''}${n.gender ? `\n   Gender: ${n.gender}` : ''}`
      })
      .join('\n\n')
    downloadFile(text, 'text/plain', 'names.txt')
    toast({
      title: "Exported!",
      description: "Names exported as TXT",
    })
  }

  const exportXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<names>\n${names
      .map(
        (n) =>
          `  <name>\n    <first>${n.name}</first>\n    <last>${n.lastName}</last>\n    <meaning>${n.meaning}</meaning>${n.tribe ? `\n    <tribe>${n.tribe}</tribe>` : ''}${n.gender ? `\n    <gender>${n.gender}</gender>` : ''}\n  </name>`
      )
      .join('\n')}\n</names>`
    downloadFile(xml, 'application/xml', 'names.xml')
    toast({
      title: "Exported!",
      description: "Names exported as XML",
    })
  }

  const exportYAML = () => {
    const yaml = `names:\n${names
      .map(
        (n, index) =>
          `  - name: ${n.name}\n    lastName: ${n.lastName}\n    meaning: ${n.meaning}${n.tribe ? `\n    tribe: ${n.tribe}` : ''}${n.gender ? `\n    gender: ${n.gender}` : ''}`
      )
      .join('\n')}`
    downloadFile(yaml, 'text/yaml', 'names.yaml')
    toast({
      title: "Exported!",
      description: "Names exported as YAML",
    })
  }

  const downloadFile = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'json':
        return <FileJson className="h-4 w-4" />
      case 'csv':
        return <FileSpreadsheet className="h-4 w-4" />
      case 'txt':
        return <FileText className="h-4 w-4" />
      case 'xml':
        return <File className="h-4 w-4" />
      case 'yaml':
        return <FileText className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  if (names.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Download className="h-5 w-5 text-indigo-400" />
            Advanced Export
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
          <Download className="h-5 w-5 text-indigo-400" />
          Advanced Export
        </CardTitle>
        <CardDescription className="text-white/70">
          Export {names.length} name{names.length !== 1 ? 's' : ''} in multiple formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
          <span className="text-white/80 text-sm">Total Names</span>
          <Badge variant="secondary" className="bg-blue-600/40 text-blue-100 border-blue-400/50 font-semibold">
            {names.length}
          </Badge>
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Export Format</Label>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="yaml">YAML</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={exportData}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold"
        >
          {getFormatIcon(selectedFormat)}
          <span className="ml-2">Export as {selectedFormat.toUpperCase()}</span>
        </Button>

        <div className="grid grid-cols-2 gap-2">
          {['json', 'csv', 'txt', 'xml', 'yaml'].map((format) => (
            <Button
              key={format}
              onClick={() => {
                setSelectedFormat(format)
                setTimeout(exportData, 100)
              }}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {getFormatIcon(format)}
              <span className="ml-2 text-xs">{format.toUpperCase()}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

