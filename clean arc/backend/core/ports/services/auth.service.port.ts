// auth-service-ports
import "server-only"
import * as Response from "@backend-core/entities/Response";
import * as User from "@backend-core/entities/User";
import { resolveAuthAdapter } from "@backend/di/container";

export type TAuthServicePort = {
  signUp: (user: User.TSignUpUser) => Promise<Response.TAppResponse<User.IUser>>;
  signIn: (user: User.TSignInUser) => Promise<Response.TAppResponse<User.IUser>>;
  signOut: () => Promise<Response.TAppResponse<string>>;
  forgotPassword: (email: string) => Promise<Response.TAppResponse<string>>;
  resetPassword: (password: string, token: string) => Promise<Response.TAppResponse<string>>;
  verifySession: () => Promise<Response.TAppResponse<boolean>>;
};

export const AuthServicePort = resolveAuthAdapter();

