'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Image as ImageIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ExportNameCardProps {
  name: string
  lastName: string
  meaning: string
  tribe?: string
  gender?: string
  explanation?: string
}

export function ExportNameCardButton({ name, lastName, meaning, tribe, gender, explanation }: ExportNameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleExport = async () => {
    if (!cardRef.current) return

    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#667eea',
        scale: 2,
        logging: false,
        useCORS: false,
        allowTaint: false,
        removeContainer: true,
        windowWidth: 800,
        windowHeight: 600,
        onclone: (clonedDoc) => {
          // Remove any stylesheets that might have oklch colors
          const styleSheets = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]')
          styleSheets.forEach((style) => {
            if (style.parentNode) {
              style.parentNode.removeChild(style)
            }
          })
        },
      })

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Export failed",
            description: "Could not generate image.",
            variant: "destructive",
          })
          return
        }

        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${name}-${lastName}-ghanaian-name.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: "Exported!",
          description: "Name card saved as image.",
        })
      }, 'image/png')
    } catch (error) {
      console.error('Export error:', error)
      toast({
        title: "Export failed",
        description: "Could not export image. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Button
        onClick={handleExport}
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <ImageIcon className="mr-2 h-4 w-4" />
        Export as Image
      </Button>

      {/* Hidden card for export - completely isolated from page styles */}
      <div 
        ref={cardRef} 
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '-9999px',
          width: '800px',
          height: '600px',
          visibility: 'hidden',
          zIndex: -9999,
        }}
      >
        <div
          style={{
            width: '800px',
            height: '600px',
            backgroundColor: '#667eea',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: '#ffffff',
            position: 'relative',
            boxSizing: 'border-box',
            margin: '0',
            border: 'none',
            outline: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#ffffff',
            backgroundColor: 'transparent',
          }}>
            🇬🇭 Ghanaian Name
          </div>

          {/* Name */}
          <div style={{ 
            fontSize: '72px', 
            fontWeight: 'bold', 
            marginBottom: '40px', 
            textAlign: 'center',
            color: '#ffffff',
            backgroundColor: 'transparent',
          }}>
            {name} {lastName}
          </div>

          {/* Meaning */}
          <div style={{ 
            fontSize: '32px', 
            marginBottom: '30px', 
            textAlign: 'center', 
            maxWidth: '600px',
            color: '#ffffff',
            backgroundColor: 'transparent',
          }}>
            "{meaning}"
          </div>

          {/* Details */}
          <div style={{ 
            display: 'flex', 
            gap: '30px', 
            marginTop: '40px',
            color: '#ffffff',
            backgroundColor: 'transparent',
          }}>
            {tribe && (
              <div style={{ 
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}>
                <strong style={{ fontWeight: 'bold', color: '#ffffff' }}>Tribe:</strong> {tribe}
              </div>
            )}
            {gender && (
              <div style={{ 
                fontSize: '24px',
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}>
                <strong style={{ fontWeight: 'bold', color: '#ffffff' }}>Gender:</strong> {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </div>
            )}
          </div>

          {/* Explanation if available */}
          {explanation && (
            <div
              style={{
                fontSize: '20px',
                marginTop: '40px',
                textAlign: 'center',
                maxWidth: '650px',
                lineHeight: '1.6',
                color: '#ffffff',
                backgroundColor: 'transparent',
              }}
            >
              {explanation}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: 'transparent',
            }}
          >
            Generated by Ghanaian Name Generator
          </div>
        </div>
      </div>
    </>
  )
}

