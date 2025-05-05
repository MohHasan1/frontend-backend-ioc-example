import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";

export async function signOutUseCase() {
  return AuthServicePort.signOut();
}
