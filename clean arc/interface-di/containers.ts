// file: di.container.ts
// desc: To inject actual implemention from backend (adapter) to frontend (ports)

import "server-only";

import { EmailAdapter } from "@backend/interface-adapters/public/email.adapter";
import { AuthInterfaceAdapter, AuthlAdapter } from "@backend/interface-adapters/auth/auth.adapter";
import { AuthServiceAdapter } from "@backend-infra/adapters/services/auth.payload.service";

export function resolveEmailAdapter() {
  return EmailAdapter();
}

export function resolveAuthAdapter() {
  // return AuthServiceAdapter();
  return AuthInterfaceAdapter()
}
