import { ServiceAccount } from "firebase-admin";

export const credentials = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,

  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  type: process.env.FIREBASE_TYPE,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

export const service_account: ServiceAccount = {
  projectId: credentials.project_id,
  privateKey: credentials.private_key,
  clientEmail: credentials.client_email,
};
