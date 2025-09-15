"use client"

import TestUsers from "@/components/auth/test-users"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Firebase Setup</h1>
          <p className="text-muted-foreground mt-2">Create test users for your Tailor Management System</p>
        </div>
        <TestUsers />
      </div>
    </div>
  )
}
