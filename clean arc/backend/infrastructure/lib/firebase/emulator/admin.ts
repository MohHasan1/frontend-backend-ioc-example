import { logInfo } from "@/utils/log";

export function connectAdminToEmulator(run:boolean) {
  if (run && process.env.NODE_ENV === "development") {
    logInfo("Firebase Emulator: Admin is connected to the Emulator.");

    // Set environment variables to connect to emulators
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
    process.env.FIREBASE_STORAGE_EMULATOR_HOST = "localhost:9199";

    // Optionally, set the project ID for the emulators
    process.env.GCLOUD_PROJECT = process.env.FIREBASE_PROJECT_ID;
  }
}
