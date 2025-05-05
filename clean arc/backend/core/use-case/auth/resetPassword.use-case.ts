import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";

export function resetPasswordUseCase(email: string, token: string) {
  return AuthServicePort.resetPassword(email, token);
}

