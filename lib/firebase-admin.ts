import admin from "firebase-admin"

// Singleton pattern for Firebase Admin initialization
let firebaseAdmin: admin.app.App | null = null

export const getFirebaseAdmin = () => {
  if (firebaseAdmin) {
    return firebaseAdmin
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY

    // Validate required environment variables
    if (!projectId) {
      throw new Error("FIREBASE_PROJECT_ID environment variable is required")
    }

    if (!clientEmail) {
      throw new Error("FIREBASE_CLIENT_EMAIL environment variable is required")
    }

    if (!privateKey) {
      throw new Error("FIREBASE_PRIVATE_KEY environment variable is required")
    }

    // Check if already initialized
    if (admin.apps.length > 0) {
      firebaseAdmin = admin.apps[0]
      return firebaseAdmin
    }

    const serviceAccount = {
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }

    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId,
    })

    console.log("Firebase Admin initialized successfully")
    return firebaseAdmin
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error)
    throw new Error(`Firebase Admin initialization failed: ${error.message}`)
  }
}

// Helper function to get messaging instance
export const getMessaging = () => {
  const app = getFirebaseAdmin()
  return admin.messaging(app)
}

// Helper function to get Firestore instance
export const getFirestore = () => {
  const app = getFirebaseAdmin()
  return admin.firestore(app)
}
