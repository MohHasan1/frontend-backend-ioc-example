import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export async function verifySessionUseCase(headers: ReadonlyHeaders) {
  return AuthServicePort.verifySession(headers);
}
