"use server";

import "server-only";

import { cookies } from "next/headers";
import { type IApiResponse } from "@/types/api-response.type";
import { errorObject, successObject } from "@/utils/api-response";

/**
 * Retrieves the value of a cookie by its name.
 * @param {string} name - The name of the cookie.
 * @returns {Promise<IApiResponse<string | void>>} - An IApiResponse containing the cookie value or a message if not found.
 */
export async function getCookie(name: string): Promise<IApiResponse<string | void>> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  const value = cookie?.value;

  if (value) {
    return successObject(value);
  } else {
    return errorObject(`Cookie with name '${name}' not found.`);
  }
}

/**
 * Deletes a cookie by its name.
 * @param {string} name - The name of the cookie.
 */
export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

/**
 * Returns a cookie configuration object (does not return an actual cookie).
 * @param duration - Duration in milliseconds (default is 14 days).
 * @returns The cookie configuration object.
 */
export async function getCookieConfig(name: string, duration: "1h" | "1d" | "1w" | "2w" = "2w") {
  // Duration options in milliseconds //
  const durationOptions = {
    "1h": 60 * 60 * 1000,
    "1d": 24 * 60 * 60 * 1000,
    "1w": 7 * 24 * 60 * 60 * 1000,
    "2w": 14 * 24 * 60 * 60 * 1000,
  };

  return {
    name: name,
    duration: durationOptions[duration],
    options: {
      httpOnly: true,
      SameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  };
}
