"use client"

import NotificationPermissionHandler from "@/components/notifications/notification-permission-handler"

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Notification Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your notification preferences</p>
        </div>
        <NotificationPermissionHandler />
      </div>
    </div>
  )
}
