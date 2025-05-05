const ValidateFirebaseEnvVar = (throwError: boolean = true) => {
  // If throwError is disabled (works only during development //
  if (process.env.NODE_ENV === "development" && !throwError) {
    console.warn(
      "\nWARNING: Please note that the Firebase config error has been silenced. Please enable it in the next.config.ts file if you are using Firebase.\n"
    );
    return;
  }

  const requiredEnvVariables = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PROJECT_ID",
    
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    
    "FIREBASE_STORAGE_BUCKET",
  ];
  // "NEXT_PUBLIC_FIREBASE_EMULATORS",

  const missingVariables = requiredEnvVariables.filter((envVar) => !process.env[envVar]);

  if (missingVariables.length > 0) {
    console.warn(
      "\nWARNING-FIREBASE-ERROR: (Please read before you worry! Ignore this message if you have set ValidateFirebaseEnvVar() to false.)\n"
    );
    console.error(`Missing required Firebase environment variables: ${missingVariables.join(", ")}`);
    console.warn(
      "\nIf you are working on static pages and don't need Firebase configured, go to next.config.ts in the root directory and set ValidateFirebaseEnvVar(true) to false.\n"
    );

    throw new Error(`Missing required Firebase environment variables: ${missingVariables.join(", ")}`);
  }
};

export default ValidateFirebaseEnvVar;
