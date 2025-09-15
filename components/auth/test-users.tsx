"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { signUp } from "@/lib/firebase-auth"
import { useToast } from "@/hooks/use-toast"

const testUsers = [
  {
    email: "admin@tailorshop.com",
    password: "admin123456",
    displayName: "Admin User",
    role: "admin" as const,
  },
  {
    email: "tailor@tailorshop.com",
    password: "tailor123456",
    displayName: "Master Tailor",
    role: "tailor" as const,
  },
  {
    email: "customer@tailorshop.com",
    password: "customer123456",
    displayName: "John Customer",
    role: "customer" as const,
  },
]

export default function TestUsers() {
  const [loading, setLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const createTestUser = async (user: (typeof testUsers)[0]) => {
    setLoading(user.email)

    const { user: createdUser, error } = await signUp(user.email, user.password, user.displayName, user.role)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: `Test user ${user.email} created successfully!`,
      })
    }

    setLoading(null)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Test Users</CardTitle>
        <CardDescription>Create test accounts for different user roles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {testUsers.map((user) => (
          <div key={user.email} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{user.displayName}</span>
                <Badge variant={user.role === "admin" ? "default" : user.role === "tailor" ? "secondary" : "outline"}>
                  {user.role}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">Password: {user.password}</p>
            </div>
            <Button onClick={() => createTestUser(user)} disabled={loading === user.email} variant="outline" size="sm">
              {loading === user.email ? "Creating..." : "Create User"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
