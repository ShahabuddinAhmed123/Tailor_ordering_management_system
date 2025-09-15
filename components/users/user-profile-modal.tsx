"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Edit,
  Save,
  X,
  Star,
  Clock,
  Award,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfileModalProps {
  user: any | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserUpdate?: (updatedUser: any) => void
}

export default function UserProfileModal({ user, open, onOpenChange, onUserUpdate }: UserProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  if (!user) return null

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser({
      name: user.name,
      email: user.email,
      phone: user.phone || "+92 300 1234567",
      address: user.address || "Lahore, Pakistan",
      specialization: user.specialization || "",
      experience: user.experience || "",
      hourlyRate: user.hourlyRate || "",
    })
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = { ...user, ...editedUser }
      onUserUpdate?.(updatedUser)

      toast({
        title: "Success",
        description: "User profile updated successfully",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser({})
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "vip":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "regular":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              User Profile - {user.name}
            </span>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            {user.role === "customer" ? "Customer" : user.role === "tailor" ? "Tailor" : "Admin"} profile and
            information
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg font-semibold">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold">{user.name}</h3>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    {user.role && (
                      <Badge variant="outline">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{user.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editedUser.email || user.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        placeholder="Email address"
                      />
                    ) : (
                      <div>
                        <p className="text-sm font-medium">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Email Address</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editedUser.phone || user.phone || "+92 300 1234567"}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        placeholder="Phone number"
                      />
                    ) : (
                      <div>
                        <p className="text-sm font-medium">{user.phone || "+92 300 1234567"}</p>
                        <p className="text-xs text-muted-foreground">Phone Number</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    {isEditing ? (
                      <Textarea
                        value={editedUser.address || user.address || "Lahore, Pakistan"}
                        onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                        placeholder="Address"
                        className="min-h-[60px]"
                      />
                    ) : (
                      <div>
                        <p className="text-sm font-medium">{user.address || "Lahore, Pakistan"}</p>
                        <p className="text-xs text-muted-foreground">Address</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  {user.role === "customer" ? (
                    <ShoppingBag className="h-5 w-5 mr-2" />
                  ) : (
                    <Award className="h-5 w-5 mr-2" />
                  )}
                  {user.role === "customer" ? "Order Statistics" : "Professional Info"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.role === "customer" ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Total Orders</p>
                        <p className="text-lg font-bold">{user.orders || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Total Spent</p>
                        <p className="text-lg font-bold">{user.totalSpent || "₨0"}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Average Rating</p>
                        <p className="text-lg font-bold">4.8/5</p>
                      </div>
                    </div>
                  </>
                ) : user.role === "tailor" ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4 text-purple-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Specialization</p>
                        {isEditing ? (
                          <Input
                            value={editedUser.specialization || user.specialization || "Traditional Wear"}
                            onChange={(e) => setEditedUser({ ...editedUser, specialization: e.target.value })}
                            placeholder="Specialization"
                          />
                        ) : (
                          <p className="text-sm">{user.specialization || "Traditional Wear"}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Experience</p>
                        {isEditing ? (
                          <Input
                            value={editedUser.experience || user.experience || "5 years"}
                            onChange={(e) => setEditedUser({ ...editedUser, experience: e.target.value })}
                            placeholder="Experience"
                          />
                        ) : (
                          <p className="text-sm">{user.experience || "5 years"}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Hourly Rate</p>
                        {isEditing ? (
                          <Input
                            value={editedUser.hourlyRate || user.hourlyRate || "₨500"}
                            onChange={(e) => setEditedUser({ ...editedUser, hourlyRate: e.target.value })}
                            placeholder="Hourly rate"
                          />
                        ) : (
                          <p className="text-sm">{user.hourlyRate || "₨500"}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Rating</p>
                        <p className="text-sm">4.9/5 (127 reviews)</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Admin user profile</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {user.role === "customer" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Shalwar Kameez</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-001 • Completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₨3,500</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Formal Suit</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-002 • In Progress</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₨8,000</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
