"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, BellOff, Settings, AlertTriangle } from "lucide-react"

export default function NotificationPermissionHandler() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if notifications are supported
    setIsSupported("Notification" in window)

    if ("Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications")
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)

      if (permission === "granted") {
        // Show a test notification
        new Notification("Success!", {
          body: "Notifications are now enabled for Tailor Management System",
          icon: "/icon-192x192.png",
        })
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }

  const getPermissionStatus = () => {
    switch (permission) {
      case "granted":
        return {
          status: "Enabled",
          color: "text-green-600",
          icon: Bell,
          description: "You'll receive notifications for order updates",
        }
      case "denied":
        return {
          status: "Blocked",
          color: "text-red-600",
          icon: BellOff,
          description: "Notifications are blocked. Please enable them in browser settings.",
        }
      default:
        return {
          status: "Not Set",
          color: "text-yellow-600",
          icon: AlertTriangle,
          description: "Click to enable notifications for order updates",
        }
    }
  }

  if (!isSupported) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Your browser doesn't support push notifications.</AlertDescription>
      </Alert>
    )
  }

  const statusInfo = getPermissionStatus()
  const StatusIcon = statusInfo.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
          <span>Notifications {statusInfo.status}</span>
        </CardTitle>
        <CardDescription>{statusInfo.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {permission === "default" && (
          <Button onClick={requestPermission} className="w-full">
            <Bell className="mr-2 h-4 w-4" />
            Enable Notifications
          </Button>
        )}

        {permission === "denied" && (
          <div className="space-y-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>Notifications are blocked. To enable them:</AlertDescription>
            </Alert>

            <div className="text-sm space-y-2">
              <p className="font-medium">Chrome/Edge:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                <li>Click the 🔒 lock icon in the address bar</li>
                <li>Set "Notifications" to "Allow"</li>
                <li>Refresh the page</li>
              </ol>

              <p className="font-medium mt-3">Firefox:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-4">
                <li>Click the shield icon in the address bar</li>
                <li>Click "Enable notifications"</li>
                <li>Refresh the page</li>
              </ol>
            </div>

            <Button variant="outline" onClick={() => window.location.reload()}>
              <Settings className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        )}

        {permission === "granted" && (
          <div className="space-y-2">
            <p className="text-sm text-green-600">✅ Notifications are working!</p>
            <Button
              variant="outline"
              onClick={() => {
                new Notification("Test Notification", {
                  body: "This is a test notification from Tailor Management System",
                  icon: "/icon-192x192.png",
                })
              }}
            >
              Send Test Notification
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
