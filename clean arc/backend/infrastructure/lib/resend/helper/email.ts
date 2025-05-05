"use server";

import "server-only";

import { ErrorResponse, type CreateEmailResponseSuccess } from "resend";
import { IApiResponse } from "../types";
import { type ReactNode } from "react";
import resend from "../config";

export async function sendEmail(
  from: string,
  to: [string],
  subject: string,
  template: ReactNode,
): Promise<IApiResponse<CreateEmailResponseSuccess>> {
  try {
    const { data, error } = await resend.emails.send({
      from: from,
      to: to,
      subject: subject,
      react: template,
    });

    if (error) {
      return {
        status: "error",
        result: null,
        errorMessage: [error.name, error?.message],
      };
    }

    return { status: "success", result: data };
  } catch (e: unknown) {
    const error = e as ErrorResponse;
    return {
      status: "error",
      result: null,
      errorMessage: [error.name, error?.message],
    };
  }
}
