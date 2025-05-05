import "server-only";

import * as Response from "@backend-core/entities/Response";
import * as User from "@backend-core/entities/User";
import { UserRepoPort } from "@backend-core/ports/repositories/user.repository.port";
import { TAuthServicePort } from "@backend-core/ports/services/auth.service.port";

import { getPayloadClient } from "@payload-helpers/client";
import { logout } from "@payloadcms/next/auth";
import config from "@payload-config";
import { headers as nextHeaders } from "next/headers";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

export function AuthServiceAdapter() {
  return {
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    verifySession,
  };
}

async function signUp(user: User.TSignUpUser): Promise<Response.TAppResponse<User.IUser>> {
  // check if password matches
  const isSame = User.isPasswordSame(user.password, user.confirmPassword);
  if (!isSame) return Response.errorResponse("password do no match.");

  const payload = await getPayloadClient();

  // create user
  // const res = await UserRepoPort.create(user);
  const result = await payload.create({
    collection: "users",
    data: user,
  });

  // if (res.status === "error") Response.errorResponse(res.errorMessage!);

  return Response.successResponse<User.IUser>(result!);
}

async function signIn(user: User.TSignInUser): Promise<Response.TAppResponse<User.IUser>> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.login({
      collection: "users",
      data: user,
    });

    // TODO: DTO
    return Response.successResponse<User.IUser>(result.user);
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return Response.errorResponse(error);
  }
}

async function signOut(): Promise<Response.TAppResponse<string>> {
  try {
    const res = await logout({ config });
    if (res.success) return Response.successResponse<string>(res.message);

    return Response.errorResponse<string>(res.message);
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return Response.errorResponse(error);
  }
}

async function forgotPassword(email: string): Promise<Response.TAppResponse<string>> {
  try {
    const payload = await getPayloadClient();

    const token = await payload.forgotPassword({
      collection: "users",
      data: {
        email,
      },
    });

    return Response.successResponse<string>(token);
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return Response.errorResponse(error);
  }
}

async function resetPassword(
  password: string,
  token: string,
): Promise<Response.TAppResponse<string>> {
  try {
    const payload = await getPayloadClient();

    const res = await payload.resetPassword({
      collection: "users",
      data: {
        password,
        token,
      },
      overrideAccess: false,
    });
    // TODO: DTO
    // return Response.successResponse<User.IUser>(res.user);
    return Response.successResponse<string>("Reset");
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return Response.errorResponse(error);
  }
}

async function verifySession(headers: ReadonlyHeaders): Promise<Response.TAppResponse<boolean>> {
  try {
    const payload = await getPayloadClient();

    // const headers = await nextHeaders();
    const result = await payload.auth({ headers });

    if (result.user) return Response.successResponse<boolean>(true);

    return Response.successResponse<boolean>(false);
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    return Response.errorResponse(error);
  }
}
