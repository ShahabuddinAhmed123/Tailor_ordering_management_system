import { type NextRequest, NextResponse } from "next/server"
import { getMessaging } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables first
    const requiredEnvVars = ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"]
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
      console.error("Missing environment variables:", missingVars)
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration incomplete",
          details: `Missing environment variables: ${missingVars.join(", ")}`,
        },
        { status: 500 },
      )
    }

    const { token, title, body, data } = await request.json()

    // Validate request data
    if (!token || !title || !body) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: token, title, and body are required",
        },
        { status: 400 },
      )
    }

    // Get Firebase messaging instance
    const messaging = getMessaging()

    const message = {
      notification: {
        title,
        body,
      },
      data: data || {},
      token,
    }

    const response = await messaging.send(message)

    return NextResponse.json({
      success: true,
      messageId: response,
    })
  } catch (error: any) {
    console.error("Error sending notification:", error)

    // Handle specific Firebase errors
    if (error.code === "messaging/invalid-registration-token") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid FCM token",
        },
        { status: 400 },
      )
    }

    if (error.code === "messaging/registration-token-not-registered") {
      return NextResponse.json(
        {
          success: false,
          error: "FCM token not registered",
        },
        { status: 400 },
      )
    }

    if (error.message?.includes("project_id")) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase project configuration error",
          details: "Please check FIREBASE_PROJECT_ID environment variable",
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send notification",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
