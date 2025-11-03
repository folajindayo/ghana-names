'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Bell, CheckCircle, XCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function NameNotifications() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted')
      setNotificationsEnabled(Notification.permission === 'granted')
    }
  }, [])

  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      toast({
        title: "Not supported",
        description: "Notifications are not supported in this browser.",
        variant: "destructive",
      })
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setPermissionGranted(permission === 'granted')
      setNotificationsEnabled(permission === 'granted')

      if (permission === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "You'll receive notifications for name updates.",
        })
      } else {
        toast({
          title: "Notifications blocked",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      toast({
        title: "Error",
        description: "Failed to request notification permission.",
        variant: "destructive",
      })
    }
  }

  const sendTestNotification = () => {
    if (!permissionGranted) {
      requestPermission()
      return
    }

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Ghanaian Name Generator', {
        body: 'Test notification! Your name generator is ready.',
        icon: '/favicon.ico',
        tag: 'test-notification',
      })
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-yellow-400" />
          Browser Notifications
        </CardTitle>
        <CardDescription className="text-white/70">
          Get notified about name updates and new features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications" className="text-white">
              Enable Notifications
            </Label>
            <p className="text-white/60 text-sm">
              Receive browser notifications for updates
            </p>
          </div>
          {permissionGranted ? (
            <div className="flex items-center gap-2">
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={(checked) => {
                  if (checked && !permissionGranted) {
                    requestPermission()
                  } else {
                    setNotificationsEnabled(checked)
                  }
                }}
              />
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
          ) : (
            <Button
              onClick={requestPermission}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white"
            >
              Request Permission
            </Button>
          )}
        </div>

        {permissionGranted && (
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm">Notifications enabled</span>
            </div>
          </div>
        )}

        {!permissionGranted && (
          <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm">Notifications not enabled</span>
            </div>
          </div>
        )}

        {permissionGranted && (
          <Button
            onClick={sendTestNotification}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white"
          >
            Send Test Notification
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Helper function to send notifications
export function sendNameNotification(title: string, body: string) {
  if (typeof window === 'undefined' || !('Notification' in window)) return

  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: 'name-notification',
    })
  }
}

