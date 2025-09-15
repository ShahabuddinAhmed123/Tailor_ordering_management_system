import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Test environment variables
    const envVars = {
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? "✓ Set" : "✗ Missing",
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? "✓ Set" : "✗ Missing",
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? "✓ Set" : "✗ Missing",
      FIREBASE_VAPID_KEY: process.env.FIREBASE_VAPID_KEY ? "✓ Set" : "✗ Missing",
    }

    const allSet = Object.values(envVars).every((status) => status.includes("✓"))

    return NextResponse.json({
      status: allSet ? "All environment variables configured" : "Missing environment variables",
      variables: envVars,
      ready: allSet,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "Error checking configuration",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
