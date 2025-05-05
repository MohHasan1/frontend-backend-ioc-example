"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { connectClientToEmulator } from "../emulator/client";

const firebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

// Initialize Firebase
const clientApp = getApps().length === 0 ? initializeApp(firebaseClientConfig) : getApp();

// Initialize Firebase Authentication
const auth = getAuth(clientApp);
const googleProvider = new GoogleAuthProvider();

// Conditionally import emulator configuration
connectClientToEmulator(process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "true");

export { auth, googleProvider };

// import { getAnalytics } from "firebase/analytics";
// measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// const analytics = getAnalytics(app);
