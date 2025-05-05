import "server-only";
import { cert, getApp, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { connectAdminToEmulator } from "../emulator/admin";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { service_account } from "./service_account";
import { getAuth } from "firebase-admin/auth";

// Conditionally import emulator configuration
connectAdminToEmulator(process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === "true");

const firebaseAdminConfig = {
  credential: cert(service_account as ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

// Check if any Firebase apps have been initialized
const ServerApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApp();

const auth = getAuth(ServerApp);
const db = getFirestore(ServerApp);
const storage = getStorage(ServerApp).bucket();

export { auth, db, storage };
