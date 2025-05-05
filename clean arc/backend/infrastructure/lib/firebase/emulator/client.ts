import { connectAuthEmulator } from "firebase/auth";
import { auth } from "../client/client";
import { logInfo } from "@/utils/log";

export function connectClientToEmulator(run:boolean) {
  if (run && process.env.NODE_ENV === "development") {
    logInfo("Firebase Emulator: Client is connected to the Emulator.");

    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  }
}
