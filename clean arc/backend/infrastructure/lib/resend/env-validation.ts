const ValidateResendEnvVar = (throwError: boolean = true) => {
  // Skip throwing errors in development if explicitly disabled
  if (process.env.NODE_ENV === "development" && !throwError) {
    console.warn(
      "\n[Resend Warning] Environment variable validation is currently disabled. Make sure to enable it before deploying to production.\n",
    );
    return;
  }

  const requiredEnvVariables = ["RESEND_API_KEY", "RESEND_FIXED_EMAIL"];
  const missingVariables = requiredEnvVariables.filter((envVar) => !process.env[envVar]);

  if (missingVariables.length > 0) {
    console.warn(
      "\n[Resend Config Error] Missing required environment variables for Resend email service:\n",
    );
    console.error(`❌ Missing: ${missingVariables.join(", ")}`);
    console.warn(
      "\nTo fix this:\n" +
        "- Ensure the variables are set in your `.env.local` or hosting environment\n" +
        "- If you're not using Resend yet, you can disable this check by setting `ValidateResendEnvVar(false)` in your config\n",
    );

    throw new Error(
      `Missing required Resend environment variables: ${missingVariables.join(", ")}`,
    );
  }
};

export default ValidateResendEnvVar;
