import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";

export function signInUseCase(email: string, password: string) {
  return AuthServicePort.signIn({ email, password });
}
