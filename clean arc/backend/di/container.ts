import "server-only";
import { UserRepoAdapter } from "@backend-infra/adapters/repositories/user.payload.repository";

import { AuthServiceAdapter } from "@backend-infra/adapters/services/auth.payload.service";
import { logInfo } from "@/utils/log";

export function resolveUserRepoAdapter() {
  logInfo("resolveAuthAdapter");

  return UserRepoAdapter();
}

export function resolveAuthAdapter() {
  logInfo("resolveAuthAdapter");
  return AuthServiceAdapter();
}
