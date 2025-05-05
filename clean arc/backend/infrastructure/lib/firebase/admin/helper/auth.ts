import "server-only";

import { type DecodedIdToken, type UserRecord } from "firebase-admin/auth";
import { type FirebaseError } from "firebase-admin";
import { type ApiResponse } from "../../types";
import { logError } from "@/utils/log";
import { auth } from "../admin";

/**
 * Retrieves a Firebase Authentication user by their UID.
 *
 * @param uid - The unique identifier of the user.
 * @returns A promise that resolves to an ApiResponse containing the user record on success,
 *          or an error message if the operation fails.
 */
export const getUserById = async (uid: string): Promise<ApiResponse<UserRecord>> => {
  try {
    const userRecord = await auth.getUser(uid);
    return { status: "success", result: userRecord };
  } catch (error: unknown) {
    logError("Error fetching user:", (error as FirebaseError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as FirebaseError).code,
    };
  }
};

/**
 * Creates a session cookie from a Firebase ID token.
 *
 * @param idToken - The Firebase ID token to exchange for a session cookie.
 * @param expiresIn - The duration in milliseconds for which the session cookie is valid.
 * @returns A promise that resolves to an ApiResponse containing the session cookie string on success,
 *          or an error message if the operation fails.
 */
export const createSessionCookie = async (idToken: string, expiresIn: number): Promise<ApiResponse<string>> => {
  try {
    // Create the session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    return { status: "success", result: sessionCookie };
  } catch (error: unknown) {
    logError("Error creating session cookie:", (error as FirebaseError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as FirebaseError).code,
    };
  }
};

/**
 * Verifies the provided Firebase ID token and decodes it.
 *
 * @param idToken - The Firebase ID token to verify.
 * @returns A promise that resolves to an ApiResponse containing the decoded token on success,
 *          or an error message if verification fails.
 */
export const verifyIdToken = async (
  idToken: string,
  checkRevoked: boolean = true
): Promise<ApiResponse<DecodedIdToken>> => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken, checkRevoked);
    return { status: "success", result: decodedToken };
  } catch (error: unknown) {
    logError("Error verifying token:", (error as FirebaseError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as FirebaseError).code,
    };
  }
};

/**
 * Verifies a Firebase session cookie and returns the user's UID.
 *
 * @param sessionCookie - The session cookie to verify.
 * @param checkRevoked - Whether to check if the ID token is revoked.
 * @returns A promise that resolves to an OperationResult containing the user's UID on success,
 *          or an error message if the operation fails.
 */
export const verifySessionCookie = async (
  sessionCookie: string,
  checkRevoked: boolean = true
): Promise<ApiResponse<DecodedIdToken>> => {
  try {
    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, checkRevoked);
    return { status: "success", result: decodedClaims };
  } catch (error: unknown) {
    logError("Error verifying session cookie:", (error as FirebaseError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as FirebaseError).code,
    };
  }
};

/**
 * Revokes all refresh tokens for a specified user, effectively invalidating their sessions.
 *
 * @param uid - The UID of the user whose sessions are to be revoked.
 * @returns A promise that resolves to an object indicating the success or failure of the operation.
 */
export const revokeUserSessions = async (uid: string): Promise<ApiResponse<DecodedIdToken>> => {
  try {
    await auth.revokeRefreshTokens(uid);
    return { status: "success", result: null };
  } catch (error: unknown) {
    console.error("Error revoking user sessions:", (error as FirebaseError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as FirebaseError).code,
    };
  }
};
