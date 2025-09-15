"use client"

import { useState, useEffect } from "react"
import { type Order, getOrders, subscribeToOrders } from "@/lib/firebase-orders"

export const useOrders = (realtime = false) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (realtime) {
      // Subscribe to real-time updates
      const unsubscribe = subscribeToOrders((orders) => {
        setOrders(orders)
        setLoading(false)
      })

      return () => unsubscribe()
    } else {
      // Fetch orders once
      const fetchOrders = async () => {
        try {
          const ordersData = await getOrders()
          setOrders(ordersData)
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      fetchOrders()
    }
  }, [realtime])

  return { orders, loading, error, setOrders }
}
