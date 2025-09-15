"use client"

import { useState } from "react"
import {
  Users,
  ShoppingBag,
  Scissors,
  MessageSquare,
  CreditCard,
  Star,
  BarChart3,
  Bell,
  Search,
  Menu,
  Home,
  DollarSign,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import { useAuth } from "@/hooks/useAuth"
import { useOrders } from "@/hooks/useOrders"
import CreateOrderDialog from "@/components/orders/create-order-dialog"
import LoginForm from "@/components/auth/login-form"
import OrderDetailsModal from "@/components/orders/order-details-modal"
import ChatSystem from "@/components/chat/chat-system"
import CreateUserDialog from "@/components/users/create-user-dialog"
import UserProfileModal from "@/components/users/user-profile-modal"

const modules = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "orders", name: "Orders", icon: ShoppingBag },
  { id: "users", name: "Users", icon: Users },
  { id: "measurements", name: "Measurements & Fabric", icon: Scissors },
  { id: "chat", name: "Chat", icon: MessageSquare },
  { id: "payments", name: "Payments", icon: CreditCard },
  { id: "reviews", name: "Reviews & Ratings", icon: Star },
  { id: "analytics", name: "Analytics & Reports", icon: BarChart3 },
  { id: "notifications", name: "Notifications", icon: Bell },
]

export type Order = {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  item: string
  status: "pending" | "in-progress" | "completed" | "measuring"
  amount: number
  createdAt: Date
  updatedAt: Date
  description: string
  fabric: string
  notes: string
}

export default function TailorManagementDashboard() {
  const { user, userProfile, loading: authLoading } = useAuth()
  const { orders: firebaseOrders, loading: ordersLoading } = useOrders(true) // Enable real-time updates
  const [activeModule, setActiveModule] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)

  // Declare customers and fabrics variables
  const customers = [
    { name: "Ahmed Ali", email: "ahmed.ali@email.com", orders: 45, spent: "₨157,500", status: "VIP", id: "1" },
    { name: "Fatima Khan", email: "fatima.khan@email.com", orders: 32, spent: "₨256,000", status: "Regular", id: "2" },
    { name: "Hassan Sheikh", email: "hassan.sheikh@email.com", orders: 18, spent: "₨270,000", status: "VIP", id: "3" },
    { name: "Ayesha Malik", email: "ayesha.malik@email.com", orders: 12, spent: "₨50,400", status: "Regular", id: "4" },
    { name: "Zainab", email: "zainab@email.com", orders: 8, spent: "₨24,000", status: "Regular", id: "5" },
  ]

  const fabrics = [
    { name: "Cotton", stock: 100, unit: "meters", price: "₨100", status: "In Stock" },
    { name: "Silk", stock: 25, unit: "meters", price: "₨200", status: "Low Stock" },
    { name: "Polyester", stock: 50, unit: "meters", price: "₨80", status: "In Stock" },
    { name: "Linen", stock: 30, unit: "meters", price: "₨150", status: "In Stock" },
    { name: "Denim", stock: 40, unit: "meters", price: "₨120", status: "In Stock" },
  ]

  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const [userProfileOpen, setUserProfileOpen] = useState(false)
  const [users, setUsers] = useState(customers)
  const [tailors, setTailors] = useState([
    {
      id: "1",
      name: "Master Ali",
      email: "ali.master@tailorshop.com",
      phone: "+92 301 1234567",
      address: "Main Bazaar, Lahore",
      specialization: "Traditional Wear",
      experience: "15 years",
      hourlyRate: "₨800",
      status: "Active",
      rating: "4.9",
      reviews: 156,
      ordersCompleted: 450,
      role: "tailor",
      createdAt: new Date("2020-01-15"),
    },
    {
      id: "2",
      name: "Ustad Hassan",
      email: "hassan.ustad@tailorshop.com",
      phone: "+92 302 2345678",
      address: "Liberty Market, Lahore",
      specialization: "Formal Wear",
      experience: "12 years",
      hourlyRate: "₨750",
      status: "Active",
      rating: "4.8",
      reviews: 203,
      ordersCompleted: 380,
      role: "tailor",
      createdAt: new Date("2021-03-20"),
    },
    {
      id: "3",
      name: "Khalil Ahmed",
      email: "khalil.ahmed@tailorshop.com",
      phone: "+92 303 3456789",
      address: "Anarkali Bazaar, Lahore",
      specialization: "Wedding Dresses",
      experience: "20 years",
      hourlyRate: "₨1000",
      status: "Active",
      rating: "4.9",
      reviews: 89,
      ordersCompleted: 250,
      role: "tailor",
      createdAt: new Date("2019-06-10"),
    },
    {
      id: "4",
      name: "Fatima Bibi",
      email: "fatima.bibi@tailorshop.com",
      phone: "+92 304 4567890",
      address: "Model Town, Lahore",
      specialization: "Ladies Suits",
      experience: "8 years",
      hourlyRate: "₨600",
      status: "Active",
      rating: "4.7",
      reviews: 134,
      ordersCompleted: 320,
      role: "tailor",
      createdAt: new Date("2022-01-05"),
    },
    {
      id: "5",
      name: "Muhammad Tariq",
      email: "tariq.muhammad@tailorshop.com",
      phone: "+92 305 5678901",
      address: "Gulberg, Lahore",
      specialization: "Alterations",
      experience: "6 years",
      hourlyRate: "₨400",
      status: "Active",
      rating: "4.6",
      reviews: 98,
      ordersCompleted: 180,
      role: "tailor",
      createdAt: new Date("2023-02-14"),
    },
  ])

  const handleViewUserProfile = (user: any) => {
    setSelectedUser(user)
    setUserProfileOpen(true)
  }

  const handleUserCreated = (newUser: any) => {
    if (newUser.role === "tailor") {
      setTailors((prev) => [...prev, newUser])
    } else {
      setUsers((prev) => [...prev, newUser])
    }
  }

  const handleUserUpdate = (updatedUser: any) => {
    if (updatedUser.role === "tailor") {
      setTailors((prev) => prev.map((t) => (t.id === updatedUser.id ? updatedUser : t)))
    } else {
      setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
    }
  }

  // Show login form if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  // Use Firebase orders if available, otherwise fall back to mock data
  const recentOrders =
    firebaseOrders.length > 0
      ? firebaseOrders.slice(0, 4).map((order) => ({
          id: order.id || "",
          customer: order.customerName,
          item: order.item,
          status:
            order.status === "in-progress"
              ? "In Progress"
              : order.status === "completed"
                ? "Completed"
                : order.status === "pending"
                  ? "Pending"
                  : "Measuring",
          amount: `₨${order.amount.toLocaleString()}`,
          date: order.createdAt.toLocaleDateString(),
        }))
      : [
          // Keep existing mock data as fallback
          {
            id: "ORD-001",
            customer: "Ahmed Ali",
            item: "Shalwar Kameez",
            status: "In Progress",
            amount: "₨3,500",
            date: "2024-01-15",
          },
          {
            id: "ORD-002",
            customer: "Fatima Khan",
            item: "Wedding Dress",
            status: "Completed",
            amount: "₨15,000",
            date: "2024-01-14",
          },
          {
            id: "ORD-003",
            customer: "Hassan Sheikh",
            item: "Formal Suit",
            status: "Pending",
            amount: "₨8,000",
            date: "2024-01-13",
          },
          {
            id: "ORD-004",
            customer: "Ayesha Malik",
            item: "Casual Dress",
            status: "Measuring",
            amount: "₨4,200",
            date: "2024-01-12",
          },
        ]

  // Update stats based on Firebase data
  const currentDate = new Date()
  const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  // Calculate current month orders
  const thisMonthOrders = firebaseOrders.filter((order) => order.createdAt >= thisMonth)
  const lastMonthOrders = firebaseOrders.filter((order) => order.createdAt >= lastMonth && order.createdAt < thisMonth)

  // Calculate stats with real data
  const totalOrders = firebaseOrders.length
  const activeCustomers = new Set(firebaseOrders.map((o) => o.customerId)).size
  const totalRevenue = firebaseOrders.reduce((sum, order) => sum + order.amount, 0)
  const pendingOrders = firebaseOrders.filter((o) => o.status === "pending").length

  // Calculate percentage changes
  const totalOrdersChange =
    lastMonthOrders.length > 0
      ? Math.round(((thisMonthOrders.length - lastMonthOrders.length) / lastMonthOrders.length) * 100)
      : 0

  const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.amount, 0)
  const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.amount, 0)
  const revenueChange =
    lastMonthRevenue > 0 ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) : 0

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: `${totalOrdersChange >= 0 ? "+" : ""}${totalOrdersChange}%`,
      icon: ShoppingBag,
      color: "text-blue-600",
    },
    {
      title: "Active Customers",
      value: activeCustomers.toString(),
      change: "+8%", // Keep static for now as we don't have historical customer data
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Revenue",
      value: `₨${totalRevenue.toLocaleString()}`,
      change: `${revenueChange >= 0 ? "+" : ""}${revenueChange}%`,
      icon: DollarSign,
      color: "text-purple-600",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      change: "-5%", // Keep static for demo
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  // Generate revenue data from Firebase orders
  const generateRevenueData = () => {
    const monthlyData = []
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1)

      const monthOrders = firebaseOrders.filter((order) => order.createdAt >= date && order.createdAt < nextMonth)

      const revenue = monthOrders.reduce((sum, order) => sum + order.amount, 0)
      const orderCount = monthOrders.length

      monthlyData.push({
        month: months[5 - i] || date.toLocaleDateString("en-US", { month: "short" }),
        revenue: revenue,
        orders: orderCount,
      })
    }

    return monthlyData
  }

  const revenueData = generateRevenueData()

  // Generate order status data from Firebase
  const generateOrderStatusData = () => {
    const statusCounts = {
      completed: firebaseOrders.filter((o) => o.status === "completed").length,
      "in-progress": firebaseOrders.filter((o) => o.status === "in-progress").length,
      pending: firebaseOrders.filter((o) => o.status === "pending").length,
      measuring: firebaseOrders.filter((o) => o.status === "measuring").length,
    }

    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0)

    if (total === 0) {
      // Return default data if no orders
      return [
        { name: "Completed", value: 65, color: "#10b981" },
        { name: "In Progress", value: 25, color: "#f59e0b" },
        { name: "Pending", value: 10, color: "#ef4444" },
      ]
    }

    return [
      {
        name: "Completed",
        value: Math.round((statusCounts.completed / total) * 100),
        color: "#10b981",
      },
      {
        name: "In Progress",
        value: Math.round(((statusCounts["in-progress"] + statusCounts.measuring) / total) * 100),
        color: "#f59e0b",
      },
      {
        name: "Pending",
        value: Math.round((statusCounts.pending / total) * 100),
        color: "#ef4444",
      },
    ]
  }

  const orderStatusData = generateOrderStatusData()

  // Generate popular items data from Firebase
  const generatePopularItemsData = () => {
    const itemCounts = {}
    const itemRevenue = {}

    firebaseOrders.forEach((order) => {
      const item = order.item.charAt(0).toUpperCase() + order.item.slice(1).replace("-", " ")
      itemCounts[item] = (itemCounts[item] || 0) + 1
      itemRevenue[item] = (itemRevenue[item] || 0) + order.amount
    })

    const popularItems = Object.entries(itemCounts)
      .map(([item, orders]) => ({
        item,
        orders: orders as number,
        revenue: itemRevenue[item] as number,
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5)

    // If no Firebase data, return default
    if (popularItems.length === 0) {
      return [
        { item: "Shalwar Kameez", orders: 45, revenue: 157500 },
        { item: "Formal Suit", orders: 32, revenue: 256000 },
        { item: "Wedding Dress", orders: 18, revenue: 270000 },
        { item: "Casual Dress", orders: 12, revenue: 50400 },
        { item: "Kurta", orders: 8, revenue: 24000 },
      ]
    }

    return popularItems
  }

  const popularItemsData = generatePopularItemsData()

  // Generate customer growth data (keep static for now as we don't have historical data)
  const customerGrowthData = [
    { month: "Jan", newCustomers: 12, totalCustomers: 145 },
    { month: "Feb", newCustomers: 18, totalCustomers: 163 },
    { month: "Mar", newCustomers: 15, totalCustomers: 178 },
    { month: "Apr", newCustomers: 22, totalCustomers: 200 },
    { month: "May", newCustomers: 28, totalCustomers: 228 },
    { month: "Jun", newCustomers: Math.max(1, activeCustomers - 228), totalCustomers: activeCustomers },
  ]

  const handleViewOrderDetails = (order: any) => {
    // Convert the order format to match Order interface
    const orderData: Order = {
      id: order.id,
      customerId: "temp-customer-id",
      customerName: order.customer,
      customerEmail: `${order.customer.toLowerCase().replace(" ", ".")}@email.com`,
      item: order.item.toLowerCase().replace(" ", "-"),
      status: order.status.toLowerCase().replace(" ", "-") as Order["status"],
      amount: Number.parseInt(order.amount.replace("₨", "").replace(",", "")),
      createdAt: new Date(order.date),
      updatedAt: new Date(),
      description: `${order.item} for ${order.customer}`,
      fabric: "cotton", // Default fabric
      notes: `Order created on ${order.date}`,
    }
    setSelectedOrder(orderData)
    setOrderDetailsOpen(true)
  }

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Revenue and Orders Chart */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₨${value.toLocaleString()}`, "Revenue"]} />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current order status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={orderStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {orderStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Orders and Customer Growth */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Orders</CardTitle>
                  <CardDescription>Number of orders completed each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                  <CardDescription>New customers acquired each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={customerGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="newCustomers"
                        stroke="#8884d8"
                        strokeWidth={3}
                        dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                        name="New Customers"
                      />
                      <Line
                        type="monotone"
                        dataKey="totalCustomers"
                        stroke="#82ca9d"
                        strokeWidth={3}
                        dot={{ fill: "#82ca9d", strokeWidth: 2, r: 4 }}
                        name="Total Customers"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Popular Items and Recent Orders */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                  <CardDescription>Best-selling items by order count</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={popularItemsData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="item" type="category" width={100} />
                      <Tooltip formatter={(value) => [value, "Orders"]} />
                      <Bar dataKey="orders" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest customer orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.item}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "In Progress"
                                    ? "secondary"
                                    : order.status === "Pending"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Key performance indicators for your tailor business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Order Completion Rate</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">4.8/5</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Delivery</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Revenue Growth</span>
                      <span className="font-medium">+15%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "orders":
        // Filter orders by status
        const getFilteredOrders = (status?: string) => {
          if (!status) return recentOrders // All orders

          const statusMap = {
            pending: ["Pending"],
            progress: ["In Progress", "Measuring"],
            completed: ["Completed", "Delivered"],
          }

          return recentOrders.filter((order) => statusMap[status]?.includes(order.status))
        }

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
              <CreateOrderDialog />
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>Manage all customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredOrders().map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.item}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.status === "Completed"
                                    ? "default"
                                    : order.status === "In Progress"
                                      ? "secondary"
                                      : order.status === "Pending"
                                        ? "destructive"
                                        : "outline"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>Orders waiting to be processed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredOrders("pending").length > 0 ? (
                          getFilteredOrders("pending").map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.item}</TableCell>
                              <TableCell>
                                <Badge variant="destructive">{order.status}</Badge>
                              </TableCell>
                              <TableCell>{order.amount}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No pending orders found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders In Progress</CardTitle>
                    <CardDescription>Orders currently being worked on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredOrders("progress").length > 0 ? (
                          getFilteredOrders("progress").map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.item}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">{order.status}</Badge>
                              </TableCell>
                              <TableCell>{order.amount}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No orders in progress found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Orders</CardTitle>
                    <CardDescription>Successfully completed orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredOrders("completed").length > 0 ? (
                          getFilteredOrders("completed").map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>{order.customer}</TableCell>
                              <TableCell>{order.item}</TableCell>
                              <TableCell>
                                <Badge variant="default">{order.status}</Badge>
                              </TableCell>
                              <TableCell>{order.amount}</TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No completed orders found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
              <CreateUserDialog onUserCreated={handleUserCreated} />
            </div>

            <Tabs defaultValue="customers" className="space-y-4">
              <TabsList>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="tailors">Tailors</TabsTrigger>
              </TabsList>

              <TabsContent value="customers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage customer accounts and profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Orders</TableHead>
                          <TableHead>Total Spent</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((customer, index) => (
                          <TableRow key={customer.id || index}>
                            <TableCell className="font-medium">{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.orders}</TableCell>
                            <TableCell>{customer.spent || customer.totalSpent}</TableCell>
                            <TableCell>
                              <Badge variant={customer.status === "VIP" ? "default" : "secondary"}>
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleViewUserProfile(customer)}>
                                View Profile
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tailors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tailor Management</CardTitle>
                    <CardDescription>Manage tailor accounts and profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Hourly Rate</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tailors.map((tailor) => (
                          <TableRow key={tailor.id}>
                            <TableCell className="font-medium">{tailor.name}</TableCell>
                            <TableCell>{tailor.email}</TableCell>
                            <TableCell>{tailor.specialization}</TableCell>
                            <TableCell>{tailor.experience}</TableCell>
                            <TableCell>{tailor.hourlyRate}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{tailor.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default">{tailor.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleViewUserProfile(tailor)}>
                                View Profile
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "measurements":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">Measurements & Fabric</h2>
              <Button>Add New Fabric</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Fabric Inventory</CardTitle>
                  <CardDescription>Manage fabric stock and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fabric</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fabrics.map((fabric, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{fabric.name}</TableCell>
                          <TableCell>
                            {fabric.stock} {fabric.unit}
                          </TableCell>
                          <TableCell>{fabric.price}</TableCell>
                          <TableCell>
                            <Badge variant={fabric.status === "In Stock" ? "default" : "destructive"}>
                              {fabric.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Measurement Templates</CardTitle>
                  <CardDescription>Standard measurement templates for different garments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Shalwar Kameez (Men)</h4>
                    <p className="text-sm text-muted-foreground">Chest, Waist, Length, Shoulder, Sleeve</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Formal Suit</h4>
                    <p className="text-sm text-muted-foreground">Chest, Waist, Hip, Inseam, Outseam</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Wedding Dress</h4>
                    <p className="text-sm text-muted-foreground">Bust, Waist, Hip, Length, Sleeve</p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "chat":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Chat Module</h2>
            <ChatSystem />
          </div>
        )

      case "payments":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">Payment Module</h2>
              <Button>Generate Invoice</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₨125,000</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₨15,500</div>
                  <p className="text-sm text-muted-foreground">5 orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₨109,500</div>
                  <p className="text-sm text-muted-foreground">87% completion rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TXN-001</TableCell>
                      <TableCell>Ahmed Ali</TableCell>
                      <TableCell>ORD-001</TableCell>
                      <TableCell>₨3,500</TableCell>
                      <TableCell>JazzCash</TableCell>
                      <TableCell>
                        <Badge>Completed</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TXN-002</TableCell>
                      <TableCell>Fatima Khan</TableCell>
                      <TableCell>ORD-002</TableCell>
                      <TableCell>₨15,000</TableCell>
                      <TableCell>Bank Transfer</TableCell>
                      <TableCell>
                        <Badge>Completed</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )

      case "reviews":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Reviews & Ratings</h2>

            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-sm text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>5 Star Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-sm text-muted-foreground">139 reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95%</div>
                  <p className="text-sm text-muted-foreground">Within 24h</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Latest customer feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>AA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Ahmed Ali</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                  <p className="text-sm">
                    Excellent work! The shalwar kameez fits perfectly and the quality is outstanding. Highly
                    recommended!
                  </p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>FK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Fatima Khan</p>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-3 w-3 text-gray-300" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                  <p className="text-sm">
                    Good quality work, but delivery was a bit delayed. Overall satisfied with the wedding dress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₨125,000</div>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Orders Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-sm text-green-600">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₨4,200</div>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                  <CardDescription>Most ordered items this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Shalwar Kameez</span>
                    <span className="font-medium">45 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Formal Suit</span>
                    <span className="font-medium">32 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wedding Dress</span>
                    <span className="font-medium">18 orders</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Casual Dress</span>
                    <span className="font-medium">12 orders</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Order Completion Rate</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Customer Satisfaction</span>
                      <span>4.8/5</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time Delivery</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold tracking-tight">Notification Module</h2>
              <Button>Send Notification</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>Latest system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 mt-1 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">Order Completed</p>
                      <p className="text-sm text-muted-foreground">
                        Order #ORD-002 has been completed and is ready for pickup.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 mt-1 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">Payment of ₨3,500 received for Order #ORD-001.</p>
                      <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Bell className="h-4 w-4 mt-1 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-medium">Low Stock Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Silk fabric stock is running low (25 meters remaining).
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-muted-foreground">Notify customers about order status changes</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Alerts</p>
                      <p className="text-sm text-muted-foreground">Notify about payment confirmations</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Stock Alerts</p>
                      <p className="text-sm text-muted-foreground">Alert when inventory is low</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return <div>Module not found</div>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold">Tailor Management</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {modules.map((module) => (
            <Button
              key={module.id}
              variant={activeModule === module.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                setActiveModule(module.id)
                setSidebarOpen(false)
              }}
            >
              <module.icon className="mr-2 h-4 w-4" />
              {module.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 w-64" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarFallback>TA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>
      <OrderDetailsModal
        order={selectedOrder}
        open={orderDetailsOpen}
        onOpenChange={setOrderDetailsOpen}
        onOrderUpdate={(updatedOrder) => {
          // Handle order update if needed
          console.log("Order updated:", updatedOrder)
        }}
      />
      <UserProfileModal
        user={selectedUser}
        open={userProfileOpen}
        onOpenChange={setUserProfileOpen}
        onUserUpdate={handleUserUpdate}
      />
    </div>
  )
}
