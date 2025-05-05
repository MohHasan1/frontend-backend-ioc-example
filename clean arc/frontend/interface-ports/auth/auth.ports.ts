import { IApiResponse } from "@/types/api-response.type";
import { resolveAuthAdapter } from "@interface-di/containers";

import { DecodedIdToken } from "firebase-admin/auth";

export type TAuthPorts = {
  createSession(idToken: string): Promise<IApiResponse<void>>;
  verifySession(): Promise<IApiResponse<DecodedIdToken | void>>;
  deleteSession(): Promise<IApiResponse<void>>;
};

// type AuthPorts = {
//   signIn: string;
//   signUp: string;
//   verifyEmail: string;
//   forgotPassword: string;
//   resetPassword: string;
// };

export const AuthServicePort = resolveAuthAdapter();
