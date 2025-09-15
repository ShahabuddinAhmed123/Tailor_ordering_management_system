import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface Order {
  id?: string
  customerId: string
  customerName: string
  customerEmail: string
  item: string
  description?: string
  measurements?: Record<string, number>
  fabric?: string
  status: "pending" | "measuring" | "in-progress" | "completed" | "delivered"
  amount: number
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  notes?: string
}

const ORDERS_COLLECTION = "orders"

export const createOrder = async (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => {
  try {
    const order: Omit<Order, "id"> = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...order,
      createdAt: Timestamp.fromDate(order.createdAt),
      updatedAt: Timestamp.fromDate(order.updatedAt),
      dueDate: order.dueDate ? Timestamp.fromDate(order.dueDate) : null,
    })

    return { id: docRef.id, error: null }
  } catch (error: any) {
    return { id: null, error: error.message }
  }
}

export const updateOrder = async (orderId: string, updates: Partial<Order>) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    const updateData = {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    }

    if (updates.dueDate) {
      updateData.dueDate = Timestamp.fromDate(updates.dueDate)
    }

    await updateDoc(orderRef, updateData)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const deleteOrder = async (orderId: string) => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId))
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
      } as Order
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export const getOrdersByStatus = async (status: Order["status"]): Promise<Order[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), where("status", "==", status), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
      } as Order
    })
  } catch (error) {
    console.error("Error fetching orders by status:", error)
    return []
  }
}

export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"))

  return onSnapshot(q, (querySnapshot) => {
    const orders = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        dueDate: data.dueDate ? data.dueDate.toDate() : undefined,
      } as Order
    })
    callback(orders)
  })
}
