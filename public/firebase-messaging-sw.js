// Firebase messaging service worker
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")

// Declare the firebase variable
const firebase = self.firebase

// Fetch Firebase config from server
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    const firebaseConfig = event.data.config

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)

      const messaging = firebase.messaging()

      messaging.onBackgroundMessage((payload) => {
        console.log("Received background message ", payload)

        const notificationTitle = payload.notification?.title || "New Notification"
        const notificationOptions = {
          body: payload.notification?.body || "You have a new message",
          icon: "/icon-192x192.png",
        }

        self.registration.showNotification(notificationTitle, notificationOptions)
      })
    }
  }
})
