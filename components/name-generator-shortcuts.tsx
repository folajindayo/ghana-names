'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Keyboard, Zap, Sparkles } from 'lucide-react'

interface Shortcut {
  key: string
  description: string
  action: string
}

const shortcuts: Shortcut[] = [
  { key: 'G', description: 'Generate name', action: 'Generate' },
  { key: 'C', description: 'Clear fields', action: 'Clear' },
  { key: 'F', description: 'Toggle favorites', action: 'Favorite' },
  { key: 'S', description: 'Share name', action: 'Share' },
  { key: 'R', description: 'Random name', action: 'Random' },
  { key: 'E', description: 'Export name', action: 'Export' },
]

export function NameGeneratorShortcuts() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Keyboard className="h-5 w-5 text-blue-400" />
          Keyboard Shortcuts
        </CardTitle>
        <CardDescription className="text-white/70">
          Speed up your workflow with hotkeys
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/20 border border-white/30 rounded text-white font-mono text-sm font-semibold">
                  {shortcut.key}
                </kbd>
                <span className="text-white/80">{shortcut.description}</span>
              </div>
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                {shortcut.action}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Press <kbd className="px-1 py-0.5 bg-yellow-500/20 border border-yellow-500/40 rounded text-xs">?</kbd> for help</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

