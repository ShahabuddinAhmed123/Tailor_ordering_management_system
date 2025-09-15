"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  requestNotificationPermission,
  onMessageListener,
  getNotificationPermission,
} from "@/lib/firebase-notifications"
import { useToast } from "@/hooks/use-toast"

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [permission, setPermission] = useState<string>("default")
  const { toast } = useToast()

  useEffect(() => {
    const initializeNotifications = async () => {
      // Check permission status
      const currentPermission = getNotificationPermission()
      setPermission(currentPermission)

      if (currentPermission === "denied") {
        console.log("Notifications are blocked by user")
        return
      }

      if (currentPermission === "unsupported") {
        console.log("Notifications not supported in this browser")
        return
      }

      // Initialize service worker with Firebase config
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")

          // Fetch Firebase config from server and send to service worker
          const configResponse = await fetch("/api/firebase-config")
          const { config } = await configResponse.json()

          if (registration.active) {
            registration.active.postMessage({
              type: "FIREBASE_CONFIG",
              config: config,
            })
          }
        } catch (error) {
          console.error("Service worker registration failed:", error)
        }
      }

      // Only try to get FCM token if permission is granted
      if (currentPermission === "granted") {
        const fcmToken = await requestNotificationPermission()
        if (fcmToken) {
          setToken(fcmToken)
          console.log("FCM Token:", fcmToken)

          // Listen for foreground messages
          onMessageListener((payload) => {
            toast({
              title: payload.notification?.title || "New Notification",
              description: payload.notification?.body || "You have a new notification",
            })
          })
        }
      }
    }

    initializeNotifications()
  }, [toast])

  return <>{children}</>
}
