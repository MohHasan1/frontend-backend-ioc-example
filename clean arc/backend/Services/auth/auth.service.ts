"use server";

import "server-only";

import { cookies } from "next/headers";
import { type IApiResponse } from "@/types/api-response.type";
import { logInfo } from "@/utils/log";
import { errorObject, successObject } from "@/utils/api-response";
import { SESSION_COOKIE_NAME } from "@/constant/cookie";
import {
  createSessionCookie,
  verifyIdToken,
  verifySessionCookie,
} from "@backend/infrastructure/lib/firebase/admin/helper/auth";

import { DecodedIdToken } from "firebase-admin/auth";
import { deleteCookie, getCookie, getCookieConfig } from "@backend/utils/cookie";

/**
 * Creates a session for the user by verifying the provided Firebase ID token,
 * generating a session cookie, and setting it in the response cookies.
 *
 * This function follows these steps:
 * 1. Verifies the provided Google Firebase ID token.
 * 2. Creates a Firebase session cookie from the verified ID token.
 * 3. Sets the session cookie on the client's browser with a specified duration and security options.
 *
 * @param {string} idToken - The Firebase ID token obtained after user authentication.
 * @returns {Promise<IApiResponse<void>>} - A promise that resolves to an IApiResponse indicating success or failure.
 */
export async function createSession(idToken: string): Promise<IApiResponse<void>> {
  logInfo("Creating session on server");

  // Step 1: Verify the Firebase ID token (e.r - medium)
  const decodedToken = await verifyIdToken(idToken);
  if (decodedToken.status === "error") return errorObject(decodedToken.errorMessage!);

  // Get cookie configuration
  const cookie = await getCookieConfig(SESSION_COOKIE_NAME);

  // Step 2: Create the Firebase session cookie (e.r - medium)
  const fbSessionCookie = await createSessionCookie(idToken, cookie.duration);
  if (fbSessionCookie.status === "error") return errorObject(fbSessionCookie.errorMessage!);

  // Step 3: Set the session cookie in the response
  const cookieStore = await cookies();
  cookieStore.set(cookie.name, fbSessionCookie.result!, {
    ...cookie.options,
    maxAge: cookie.duration / 1000,
  });

  return successObject(null);
}

/**
 * Verifies the user's session by checking the session cookie.
 * If the session is valid, it returns the decoded ID token; otherwise, ErrorObject.
 * @returns {Promise<IApiResponse<DecodedIdToken | void>>} - A promise that resolves to an IApiResponse containing the decoded ID token or an error message.
 */
export async function verifySession(): Promise<IApiResponse<DecodedIdToken | void>> {
  // 1. Retrieve the session cookie from the request
  const sessionCookie = await getCookie(SESSION_COOKIE_NAME);
  if (sessionCookie.status === "error") {
    return errorObject(sessionCookie.errorMessage!);
  }

  // 2. Verify the session cookie
  const sessionRes = await verifySessionCookie(sessionCookie.result!);
  if (sessionRes.status === "error") {
    return errorObject(sessionRes.errorMessage!);
  }

  return successObject<DecodedIdToken>(sessionRes.result!);
}

/**
 * Deletes the user's session by removing the session cookie.
 * @returns {Promise<IApiResponse<void>>} - A promise that resolves to an IApiResponse indicating success.
 */
export async function deleteSession(): Promise<IApiResponse<void>> {
  // 1. Delete the session cookie
  await deleteCookie(SESSION_COOKIE_NAME);
  return successObject(null);
}
