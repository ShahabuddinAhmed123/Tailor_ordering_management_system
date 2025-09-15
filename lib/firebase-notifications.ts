import { getMessagingInstance } from "./firebase"
import { getToken, onMessage } from "firebase/messaging"

export const checkNotificationSupport = () => {
  return "Notification" in window && "serviceWorker" in navigator
}

export const getNotificationPermission = () => {
  if (!checkNotificationSupport()) return "unsupported"
  return Notification.permission
}

export const requestNotificationPermission = async () => {
  try {
    // Check if notifications are supported
    if (!checkNotificationSupport()) {
      console.log("Notifications not supported in this browser")
      return null
    }

    // Check current permission
    let permission = Notification.permission

    if (permission === "default") {
      // Request permission
      permission = await Notification.requestPermission()
    }

    if (permission === "denied") {
      console.log("Notification permission denied by user")
      return null
    }

    if (permission === "granted") {
      const messaging = await getMessagingInstance()
      if (!messaging) {
        console.log("Firebase messaging not available")
        return null
      }

      try {
        // Get VAPID key from server
        const response = await fetch("/api/get-vapid-key")

        if (!response.ok) {
          console.error("Failed to fetch VAPID key:", response.status)
          return null
        }

        const { vapidKey, error } = await response.json()

        if (error || !vapidKey) {
          console.error("VAPID key not available:", error)
          return null
        }

        const token = await getToken(messaging, { vapidKey })
        console.log("FCM Token generated successfully")
        return token
      } catch (error) {
        console.error("Error getting FCM token:", error)
        return null
      }
    }

    return null
  } catch (error) {
    console.error("Error requesting notification permission:", error)
    return null
  }
}

export const onMessageListener = async (callback: (payload: any) => void) => {
  try {
    const messaging = await getMessagingInstance()
    if (!messaging) return

    return onMessage(messaging, (payload) => {
      callback(payload)
    })
  } catch (error) {
    console.error("Error setting up message listener:", error)
  }
}

// Send notification via Firebase Cloud Functions
export const sendNotification = async (token: string, title: string, body: string, data?: Record<string, string>) => {
  try {
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        title,
        body,
        data,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("Notification send failed:", result)
      return { error: result.error || "Failed to send notification" }
    }

    return result
  } catch (error) {
    console.error("Error sending notification:", error)
    return { error: "Network error while sending notification" }
  }
}
