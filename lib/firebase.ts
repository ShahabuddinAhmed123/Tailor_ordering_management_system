import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getMessaging, isSupported } from "firebase/messaging"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyD_ZN65sBxn8oj38oBqH2NcQSzv1GCLIzY",
  authDomain: "tailor-management-system-8ac9d.firebaseapp.com",
  projectId: "tailor-management-system-8ac9d",
  storageBucket: "tailor-management-system-8ac9d.firebasestorage.app",
  messagingSenderId: "362299837816",
  appId: "1:362299837816:web:bb222862edaa8c5ea24c8d",
  measurementId: "G-7N1T1JDS7H",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize analytics only on client side
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

// Initialize messaging only if supported (client-side only)
export const getMessagingInstance = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getMessaging(app)
  }
  return null
}

export default app
