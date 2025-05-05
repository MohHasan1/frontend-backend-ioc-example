import { ClientErrorObject } from "../types/error";
/**
 * Maps Firebase authentication error codes to a categorized sign-in error type.
 *
 * @param {FirebaseAuthErrorCode} errorCode - The Firebase error code (e.g., `"auth/wrong-password"`, `"auth/user-not-found"`).
 * @returns {SignInErrorProps} - Categorized error type (`"sign-in-error"`, `"network-error"`, `"quota-exceeded"`, `"other-sign-in-error"`).
 *
 * @description
 * This function helps categorize Firebase authentication errors to improve error handling in the UI.
 * It maps specific error codes into predefined categories:
 *
 * - **Sign-In Errors** (`"sign-in-error"`) → Wrong credentials, invalid email, user not found.
 * - **Network Errors** (`"network-error"`) → Issues with network connectivity.
 * - **Quota Errors** (`"quota-exceeded"`) → Exceeded request limits.
 * - **Other Errors** (`"other-sign-in-error"`) → Any other unhandled authentication errors.
 *
 * This structured approach allows for better error messaging and user feedback.
 */
export const getSignInError = (errorCode: string): ClientErrorObject<SignInErrorProps> => {
  switch (errorCode) {
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-email":
    case "auth/invalid-credential":
      return {
        type: "sign-in-error",
        title: "Sign-In Failed",
        desc: "Incorrect credentials. Please check your email and password.",
      };

    case "auth/network-request-failed":
      return {
        type: "network-error",
        title: "Network Error",
        desc: "A network error occurred. Please check your connection and try again.",
      };

    case "auth/quota-exceeded":
      return {
        type: "quota-exceeded",
        title: "Quota Exceeded",
        desc: "You have exceeded the allowed quota. Try again later.",
      };

    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return {
        type: "popup-error",
        title: "Sign-in Canceled",
        desc: "The sign-in popup was closed before completing authentication. Please try again.",
      };

    default:
      return {
        type: "other-sign-in-error",
        title: "Unknown Error",
        desc: "An unknown error occurred. Please try again later.",
      };
  }
};

/**
 * Error categories related to sign-in authentication.
 */
export type SignInErrorProps =
  | "sign-in-error"
  | "network-error"
  | "quota-exceeded"
  | "other-sign-in-error"
  | "popup-error";

/**
 * Maps Firebase authentication error codes to a categorized sign-up error type.
 *
 * @param {string} errorCode - The Firebase error code (e.g., `"auth/email-already-in-use"`, `"auth/weak-password"`).
 * @returns {SignUpErrorProps} - A categorized error type (`"email-error"`, `"password-error"`, `"network-error"`, `"quota-exceeded"`, or `"other-sign-up-error"`).
 *
 * @description
 * This function helps categorize Firebase authentication errors to improve error handling in the UI.
 * It maps specific error codes into predefined categories:
 *
 * - **Email Errors** (`"email-error"`) → Invalid or already registered email.
 * - **Password Errors** (`"password-error"`) → Weak password issues.
 * - **Network Errors** (`"network-error"`) → Issues with network connectivity.
 * - **Quota Errors** (`"quota-exceeded"`) → Exceeded request limits.
 * - **Other Errors** (`"other-sign-up-error"`) → Any other unhandled authentication errors.
 *
 * This structured approach allows for better error messaging and user feedback.
 */
export const getSignUpError = (errorCode: string): ClientErrorObject<SignUpErrorProps> => {
  switch (errorCode) {
    case "auth/email-already-in-use":
    case "auth/invalid-email":
      return {
        type: "email-error",
        title: "Email Error",
        desc: "This email is already in use or invalid. Please try another email.",
      };

    case "auth/weak-password":
      return {
        type: "password-error",
        title: "Weak Password",
        desc: "Your password is too weak. Please use a stronger password.",
      };

    case "auth/network-request-failed":
      return {
        type: "network-error",
        title: "Network Error",
        desc: "A network error occurred. Please check your connection and try again.",
      };

    case "auth/quota-exceeded":
      return {
        type: "quota-exceeded",
        title: "Quota Exceeded",
        desc: "You have exceeded the allowed quota. Try again later.",
      };

    default:
      return {
        type: "other-sign-up-error",
        title: "Unknown Error",
        desc: "An unknown error occurred during sign-up. Please try again later.",
      };
  }
};

/**
 * Error categories related to sign-up authentication.
 */
export type SignUpErrorProps =
  | "email-error"
  | "password-error"
  | "network-error"
  | "quota-exceeded"
  | "other-sign-up-error";

export const getForgetPasswordError = (errorCode: string): ClientErrorObject<ForgetPasswordErrorProps> => {
  switch (errorCode) {
    case "auth/user-not-found":
    case "auth/invalid-email":
    case "auth/invalid-credential":
      return {
        type: "email-error",
        title: "Email Error",
        desc: "This email is already in use or invalid. Please try another email.",
      };

    case "auth/network-request-failed":
      return {
        type: "network-error",
        title: "Network Error",
        desc: "A network error occurred. Please check your connection and try again.",
      };

    case "auth/quota-exceeded":
      return {
        type: "quota-exceeded",
        title: "Quota Exceeded",
        desc: "You have exceeded the allowed quota. Try again later.",
      };

    default:
      return {
        type: "other-error",
        title: "Unknown Error",
        desc: "An unknown error occurred during sign-up. Please try again later.",
      };
  }
};

/**
 * Error categories related to sign-up authentication.
 */
export type ForgetPasswordErrorProps =
  | "email-error"
  | "password-error"
  | "network-error"
  | "quota-exceeded"
  | "other-error";
