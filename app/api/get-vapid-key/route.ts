import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return the VAPID key from server-side environment variable
    const vapidKey = process.env.FIREBASE_VAPID_KEY

    if (!vapidKey) {
      console.error("FIREBASE_VAPID_KEY environment variable not set")
      return NextResponse.json({ error: "VAPID key not configured" }, { status: 500 })
    }

    return NextResponse.json({ vapidKey })
  } catch (error) {
    console.error("Error getting VAPID key:", error)
    return NextResponse.json({ error: "Failed to get VAPID key" }, { status: 500 })
  }
}
