"use client";

import {
  applyActionCode,
  type Auth,
  type AuthError,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  inMemoryPersistence,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
  verifyPasswordResetCode,
} from "firebase/auth";
import { type ApiResponse } from "../../types";
import { auth, googleProvider } from "../client";
import { logError, logWarn } from "@/utils/log";

/**
 * Signs in a user with email and password in client side.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<ApiResponse<UserCredential>>} - Resolves with the user credential on success,
 *          or a firebase error code if the operation fails.
 */
export const signInUser = async (email: string, password: string): Promise<ApiResponse<UserCredential>> => {
  try {
    // Set in-memory persistence
    await setPersistence(auth, inMemoryPersistence);

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { status: "success", result: userCredential };
  } catch (error: unknown) {
    logError("Error signing in:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Signs out the current user from client side.
 * @returns {Promise<ApiResponse<void>>} - Resolves when the user is signed out,
 *         or a firebase error code if the operation fails.
 */
export const signOutUser = async (): Promise<ApiResponse<void>> => {
  try {
    await signOut(auth);
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error signing out:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Signs up a user with email and password in the client side.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to an ApiResponse containing the user credential on success,
 *         or a firebase error code if the operation fails.
 */
export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<ApiResponse<UserCredential>> => {
  try {
    // Set in-memory persistence
    await setPersistence(auth, inMemoryPersistence);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { status: "success", result: userCredential };
  } catch (error: unknown) {
    logError("Error signing up with email and password:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Signs in or signs up a user with Google in the client side.
 * @returns {Promise<ApiResponse<UserCredential>>} - A promise that resolves to an ApiResponse containing the user credential on success,
 *        or a firebase error code if the operation fails.
 *
 * When using Firebase Authentication with Google, the signInWithPopup method handles both sign-in and sign-up.
 * If a user signs in with a Google account that hasn't been used with your app before, Firebase automatically
 * creates a new user account for them.
 */
export const signUpInWithGoogle = async (): Promise<ApiResponse<UserCredential>> => {
  try {
    // Set in-memory persistence
    await setPersistence(auth, inMemoryPersistence);

    const userCredential = await signInWithPopup(auth, googleProvider);
    return { status: "success", result: userCredential };
  } catch (error: unknown) {
    logWarn("Error signing up with Google:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Verifies the user's email address in teh client side.
 * @param {User} user - The user object (from firebase) to verify the email for.
 * @returns {Promise<ApiResponse<void>>} - A promise that resolves to an ApiResponse containing no result on success,
 *         or a firebase error code if the operation fails.
 *
 * When using Firebase Authentication, the sendEmailVerification method sends an email to the user with a link to verify their email address.
 */
export const sendEmailVerificationLink = async (user: User): Promise<ApiResponse<void>> => {
  try {
    await sendEmailVerification(user);
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error sending email verification:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Verifies a user's email using Firebase on the client side.
 *
 * @param {string} mode - The action mode, which should be `"verifyEmail"`.
 * @param {string} actionCode - The unique action code sent to the user's email for verification.
 * @returns {Promise<ApiResponse<void>>} - An object containing the success status or an firebase error code.
 *
 * @description
 * - Ensures the `mode` is `"verifyEmail"` before proceeding.
 * - Uses Firebase's `applyActionCode` to verify the email.
 * - Handles errors and returns appropriate messages.
 */
export const verifyEmail = async (mode: string, actionCode: string): Promise<ApiResponse<void>> => {
  try {
    // 1. Validate mode to ensure only "verifyEmail" operations are allowed.
    if (mode !== "verifyEmail")
      return { status: "error", result: null, errorMessage: "Invalid mode provided. Expected 'verifyEmail'." };

    // 2. Apply the action code to verify the user's email.
    await applyActionCode(auth, actionCode);

    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error verifying email:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Sends a password reset email to the specified user.
 * @param {string} email - The email address of the user requesting the password reset.
 * @returns {Promise<ApiResponse<void>>} - A promise that resolves to an ApiResponse containing no result on success,
 *         or a Firebase error code if the operation fails.
 */
export const sendForgotPasswordLink = async (email: string): Promise<ApiResponse<void>> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error sending password reset email:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Resets the user's password using the provided action code and new password.
 *
 * @param {string} mode -The action mode, which should be `"resetPassword"`.
 * @param {string} actionCode - The unique action code from the password reset email.
 * @param {string} newPassword - The new password entered by the user.
 * @param {string} confirmPassword - The confirmation of the new password.
 * @returns {Promise<ApiResponse<void>>} - An object indicating success or containing an error message.
 *
 * @description
 * - Verifies the validity of the action code.
 * - Ensures the new password and confirmation match and meet security criteria.
 * - Confirms the password reset with the new password.
 * - Handles errors and returns appropriate messages.
 */
export const resetPassword = async (
  mode: string,
  actionCode: string,
  newPassword: string,
  confirmPassword: string
): Promise<ApiResponse<void>> => {
  try {
    // Validate the new password and confirmation.
    if (mode !== "resetPassword")
      return { status: "error", result: null, errorMessage: "Invalid mode provided. Expected 'resetPassword'." };

    // Validate the new password and confirmation.
    if (newPassword !== confirmPassword) {
      return {
        status: "error",
        result: null,
        errorMessage: "Passwords do not match.",
      };
    }

    // 1. Verify the password reset code is valid.
    await verifyPasswordResetCode(auth, actionCode);

    // 2. Confirm the password reset with the new password.
    await confirmPasswordReset(auth, actionCode, newPassword);

    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error resetting password:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};

/**
 * Sets in-memory persistence for the given authentication instance.
 *
 * This function attempts to set the authentication persistence mode to in-memory using the
 * provided auth instance. It returns an ApiResponse indicating the success or failure of the operation.
 *
 * @param auth - The authentication instance for which persistence is to be set.
 * @returns A promise that resolves to an ApiResponse object. On success, the result is null.
 *          On error, the errorMessage field contains the error code.
 */
export const setInMemoryAuthPersistence = async (auth: Auth): Promise<ApiResponse<void>> => {
  try {
    await setPersistence(auth, inMemoryPersistence);
    return { status: "success", result: null };
  } catch (error: unknown) {
    logError("Error sending email verification:", (error as AuthError).message);
    return {
      status: "error",
      result: null,
      errorMessage: (error as AuthError).code,
    };
  }
};
