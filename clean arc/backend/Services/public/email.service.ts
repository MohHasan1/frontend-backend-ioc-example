"use server";

import "server-only";

import { type ReactNode } from "react";
import { type CreateEmailResponseSuccess } from "resend";

import { IApiResponse } from "@/types/api-response.type";

import { logError, logInfo } from "@/utils/log";

import { sendEmail } from "@backend/infrastructure/lib/resend/helper/email";
import { EmailTemplate } from "@backend/infrastructure/lib/resend/template/email-template";


/**
 * Sends an email to a fixed internal address using the Resend email service.
 *
 * This function is typically used for system notifications, contact form submissions,
 * or internal alerts. It accepts a pre-rendered React email template as input.
 *
 * @param template - A React element representing the email content. If not provided, a default template will be used.
 * @returns A promise that resolves to an API-Response object containing the result or error.
 *
 * @example
 * await sendFixedEmail(
    ContactUsEmailTemplate({name, email, message}) as ReactNode);
 */
export async function sendFixedEmail(template?: ReactNode): Promise<IApiResponse<CreateEmailResponseSuccess>> {
  const { status, result, errorMessage } = await sendEmail(
    "onboarding@resend.dev",
    [process.env.RESEND_FIXED_EMAIL!],
    "Test! Leap LMS with Resend",
    template ?? (EmailTemplate({ firstName: "Test - Leap 2025" }) as ReactNode),
  );

  if (status === "error") {
    logError("Email send failed:", errorMessage![0], ":", errorMessage![1]);
    return {
      status: "error",
      result: null,
      errorMessage: errorMessage![0],
    };
  }

  logInfo("Email sent!");
  return { status: "success", result: result };
}
