import { TAppResponse } from "@backend-core/entities/Response";
import { AuthServicePort } from "@backend-core/ports/services/auth.service.port";

export function forgotPasswordUseCase(email: string) {
  return AuthServicePort.forgotPassword(email);
}

type Params = { email: string };
type Ports = { forgotPasswordService: (email: string) => Promise<TAppResponse<string>> };
type TProps = Params & Ports;

export const forgotPasswordUseCasee = ({ email, forgotPasswordService }: TProps) => {
  return forgotPasswordService(email);
};

// fun payment [
//   // user auth
//   // product heck
//   // payment
//   // email
// ]
