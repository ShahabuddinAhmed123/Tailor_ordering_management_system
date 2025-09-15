"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { signIn } from "@/lib/firebase-auth"

const testCredentials = [
  { email: "admin@tailorshop.com", password: "admin123456", role: "Admin" },
  { email: "tailor@tailorshop.com", password: "tailor123456", role: "Tailor" },
  { email: "customer@tailorshop.com", password: "customer123456", role: "Customer" },
]

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { user, error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError)
    } else if (user) {
      // Redirect to root route instead of /dashboard
      router.push("/")
    }

    setLoading(false)
  }

  const useTestCredentials = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the Tailor Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Test Credentials Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Test Credentials</CardTitle>
            <CardDescription className="text-xs">Click to use test login credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {testCredentials.map((cred, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded cursor-pointer hover:bg-muted"
                onClick={() => useTestCredentials(cred.email, cred.password)}
              >
                <div className="text-sm">
                  <div className="font-medium">{cred.email}</div>
                  <div className="text-xs text-muted-foreground">{cred.password}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {cred.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
