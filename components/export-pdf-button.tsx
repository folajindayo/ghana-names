'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useToast } from '@/hooks/use-toast'

interface ExportPDFButtonProps {
  nameCardIds?: string[]
}

export function ExportPDFButton({ nameCardIds }: ExportPDFButtonProps) {
  const { address, isConnected } = useAccount()
  const [exporting, setExporting] = useState(false)
  const { toast } = useToast()

  const handleExportPDF = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to export names.",
        variant: "destructive",
      })
      return
    }

    setExporting(true)
    try {
      const response = await fetch('/api/names/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          nameCardIds: nameCardIds || [],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to export names')
      }

      const data = await response.json()

      // Dynamic import of jsPDF
      const { default: jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Set up PDF
      let yPos = 20
      const pageWidth = doc.internal.pageSize.width
      const margin = 20

      // Title
      doc.setFontSize(20)
      doc.setTextColor(102, 126, 234) // #667eea
      doc.text('My Ghanaian Names Collection', pageWidth / 2, yPos, { align: 'center' })
      yPos += 15

      // Date
      doc.setFontSize(10)
      doc.setTextColor(128, 128, 128)
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' })
      yPos += 20

      // Add each name card
      data.nameCards.forEach((card: any, index: number) => {
        // Check if we need a new page
        if (yPos > 250) {
          doc.addPage()
          yPos = 20
        }

        // Name
        doc.setFontSize(18)
        doc.setTextColor(0, 0, 0)
        doc.text(`${card.name} ${card.lastName}`, margin, yPos)
        yPos += 10

        // Meaning
        doc.setFontSize(12)
        doc.setTextColor(100, 100, 100)
        doc.text(`"${card.meaning}"`, margin, yPos)
        yPos += 8

        // Details
        doc.setFontSize(10)
        const details: string[] = []
        if (card.tribe) details.push(`Tribe: ${card.tribe}`)
        if (card.gender) details.push(`Gender: ${card.gender}`)
        if (details.length > 0) {
          doc.text(details.join(' • '), margin, yPos)
          yPos += 8
        }

        // Explanation (if AI-generated)
        if (card.explanation) {
          doc.setFontSize(9)
          doc.setTextColor(80, 80, 80)
          const splitExplanation = doc.splitTextToSize(card.explanation, pageWidth - 2 * margin)
          doc.text(splitExplanation, margin, yPos)
          yPos += splitExplanation.length * 5
        }

        // IPFS Link
        if (card.ipfsUrl) {
          doc.setFontSize(8)
          doc.setTextColor(100, 150, 255)
          doc.text(`IPFS: ${card.ipfsUrl}`, margin, yPos, { maxWidth: pageWidth - 2 * margin })
          yPos += 8
        }

        yPos += 10 // Spacing between cards
      })

      // Footer on last page
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setTextColor(150, 150, 150)
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' })
      }

      // Save PDF
      doc.save(`ghanaian-names-${Date.now()}.pdf`)
      
      toast({
        title: "Exported!",
        description: `Exported ${data.nameCards.length} names as PDF.`,
      })
    } catch (error: any) {
      console.error('PDF export error:', error)
      toast({
        title: "Export failed",
        description: error.message || "Could not export PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <Button
      onClick={handleExportPDF}
      disabled={exporting || !isConnected}
      variant="outline"
      size="sm"
      className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
    >
      {exporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <FileDown className="mr-2 h-4 w-4" />
          Export as PDF
        </>
      )}
    </Button>
  )
}

