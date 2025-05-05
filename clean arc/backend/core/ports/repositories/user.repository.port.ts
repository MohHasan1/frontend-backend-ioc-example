// user-repository-port
import "server-only"

import * as User from "@backend-core/entities/User";
import * as Res from "@backend-core/entities/Response";
import { resolveUserRepoAdapter } from "@backend/di/container";

export type TUserRepoPort = {
  getOnebyEmail: (email: string) => Promise<Res.TAppResponse<User.IUser>>;
  getOnebyId: (Id: string) => Promise<Res.TAppResponse<User.IUser>>;
  create: (data: User.TSignUpUser) => Promise<Res.TAppResponse<User.IUser>>;
};

export const UserRepoPort: TUserRepoPort = resolveUserRepoAdapter();
