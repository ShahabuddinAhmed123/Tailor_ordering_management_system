"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createOrder } from "@/lib/firebase-orders"
import { Plus } from "lucide-react"

export default function CreateOrderDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    item: "",
    description: "",
    amount: "",
    fabric: "",
    status: "pending" as const,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const orderData = {
      customerId: "temp-customer-id", // In real app, get from auth
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      item: formData.item,
      description: formData.description,
      amount: Number.parseFloat(formData.amount),
      fabric: formData.fabric,
      status: formData.status,
    }

    const { id, error } = await createOrder(orderData)

    if (error) {
      console.error("Error creating order:", error)
    } else {
      console.log("Order created with ID:", id)
      setOpen(false)
      setFormData({
        customerName: "",
        customerEmail: "",
        item: "",
        description: "",
        amount: "",
        fabric: "",
        status: "pending",
      })
    }

    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>Add a new order to the system. Fill in all the required details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerEmail" className="text-right">
                Email
              </Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item" className="text-right">
                Item
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, item: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shalwar-kameez">Shalwar Kameez</SelectItem>
                  <SelectItem value="formal-suit">Formal Suit</SelectItem>
                  <SelectItem value="wedding-dress">Wedding Dress</SelectItem>
                  <SelectItem value="casual-dress">Casual Dress</SelectItem>
                  <SelectItem value="kurta">Kurta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fabric" className="text-right">
                Fabric
              </Label>
              <Select onValueChange={(value) => setFormData({ ...formData, fabric: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select fabric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="silk">Silk</SelectItem>
                  <SelectItem value="linen">Linen</SelectItem>
                  <SelectItem value="wool">Wool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₨)
              </Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder="Additional details..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
