import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  updateProfile,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: "admin" | "tailor" | "customer"
  createdAt: Date
  phone?: string
  address?: string
}

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error: any) {
    let errorMessage = "An error occurred during sign in"

    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No account found with this email address"
        break
      case "auth/wrong-password":
        errorMessage = "Incorrect password"
        break
      case "auth/invalid-email":
        errorMessage = "Invalid email address"
        break
      case "auth/user-disabled":
        errorMessage = "This account has been disabled"
        break
      case "auth/too-many-requests":
        errorMessage = "Too many failed attempts. Please try again later"
        break
      default:
        errorMessage = error.message
    }

    return { user: null, error: errorMessage }
  }
}

export const signUp = async (
  email: string,
  password: string,
  displayName: string,
  role: "admin" | "tailor" | "customer" = "customer",
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    // Update profile
    await updateProfile(result.user, { displayName })

    // Create user document in Firestore
    const userProfile: UserProfile = {
      uid: result.user.uid,
      email: result.user.email!,
      displayName,
      role,
      createdAt: new Date(),
    }

    await setDoc(doc(db, "users", result.user.uid), userProfile)

    return { user: result.user, error: null }
  } catch (error: any) {
    let errorMessage = "An error occurred during sign up"

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "An account with this email already exists"
        break
      case "auth/invalid-email":
        errorMessage = "Invalid email address"
        break
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters"
        break
      default:
        errorMessage = error.message
    }

    return { user: null, error: errorMessage }
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
