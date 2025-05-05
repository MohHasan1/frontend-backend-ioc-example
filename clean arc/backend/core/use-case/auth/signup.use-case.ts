import * as User from "@backend-core/entities/User";
import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";

export async function signUpUseCase(user: User.TSignUpUser) {
  return AuthServicePort.signUp(user);
}
