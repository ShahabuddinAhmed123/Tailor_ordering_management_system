"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Calendar, Scissors, FileText, Clock, Edit, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  item: string
  status: "pending" | "measuring" | "in-progress" | "completed" | "delivered"
  amount: number
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  notes?: string
  description?: string
  measurements?: Record<string, number>
  fabric?: string
}

interface OrderDetailsModalProps {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrderUpdate?: (updatedOrder: Order) => void
}

export default function OrderDetailsModal({ order, open, onOpenChange, onOrderUpdate }: OrderDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOrder, setEditedOrder] = useState<Partial<Order>>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  if (!order) return null

  const handleEdit = () => {
    setIsEditing(true)
    setEditedOrder({
      status: order.status,
      notes: order.notes || "",
      amount: order.amount,
    })
  }

  const handleSave = async () => {
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Order updated successfully",
      })

      // Update the order object with new values
      const updatedOrder = { ...order, ...editedOrder }
      onOrderUpdate?.(updatedOrder)
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedOrder({})
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "measuring":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "delivered":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {order.id}</span>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Order
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
          <DialogDescription>Complete order information and management options</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Order Status and Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  {isEditing ? (
                    <Select
                      value={editedOrder.status || order.status}
                      onValueChange={(value) => setEditedOrder({ ...editedOrder, status: value as Order["status"] })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="measuring">Measuring</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace("-", " ")}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Item:</span>
                  <span className="text-sm capitalize">{order.item.replace("-", " ")}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fabric:</span>
                  <span className="text-sm capitalize">{order.fabric || "Not specified"}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Amount:</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedOrder.amount || order.amount}
                      onChange={(e) => setEditedOrder({ ...editedOrder, amount: Number(e.target.value) })}
                      className="w-24 px-2 py-1 text-sm border rounded"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-green-600">₨{order.amount.toLocaleString()}</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">Customer Name</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{order.customerEmail}</p>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">+92 300 1234567</p>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Lahore, Pakistan</p>
                    <p className="text-xs text-muted-foreground">Address</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dates and Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Order Created</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{formatDate(order.updatedAt)}</p>
                  </div>
                </div>

                {order.dueDate && (
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Due Date</p>
                      <p className="text-xs text-muted-foreground">{formatDate(order.dueDate)}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Measurements */}
          {order.measurements && Object.keys(order.measurements).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Scissors className="h-5 w-5 mr-2" />
                  Measurements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(order.measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-sm font-medium capitalize">{key.replace("_", " ")}:</span>
                      <span className="text-sm">{value} inches</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description and Notes */}
          <div className="grid gap-4 md:grid-cols-2">
            {order.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{order.description}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedOrder.notes || order.notes || ""}
                    onChange={(e) => setEditedOrder({ ...editedOrder, notes: e.target.value })}
                    placeholder="Add notes about this order..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{order.notes || "No notes added yet."}</p>
                )}
              </CardContent>
            </Card>
          </div>
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
