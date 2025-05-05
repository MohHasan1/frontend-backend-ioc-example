import "server-only";

import { TAuthPorts } from "@/interface-ports/auth/auth.ports";
import { createSession, deleteSession, verifySession } from "@backend/Services/auth/auth.service";

import { resetPasswordUseCase } from "@backend-core/use-case/auth/resetPassword.use-case";
import { verifySessionUseCase } from "@backend-core/use-case/auth/verifySession.use-case";
import { forgotPasswordUseCase } from "@backend-core/use-case/auth/forgotPassword.use-case";
import { signInUseCase } from "@backend-core/use-case/auth/signin.use-case";
import { signOutUseCase } from "@backend-core/use-case/auth/signout.use-case";
import { signUpUseCase } from "@backend-core/use-case/auth/signup.use-case";

export function AuthlAdapter(): TAuthPorts {
  return {
    createSession: createSession,
    verifySession: verifySession,
    deleteSession: deleteSession,
  };
}

export function AuthInterfaceAdapter() {
  return {
    signUp: signUpUseCase,
    signIn: signInUseCase,
    signOut: signOutUseCase,
    resetPassword: resetPasswordUseCase,
    verifySession: verifySessionUseCase,
    forgotPassword: forgotPasswordUseCase,
  };
}
