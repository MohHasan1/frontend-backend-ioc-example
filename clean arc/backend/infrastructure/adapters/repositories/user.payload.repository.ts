// user-repository-adapter
import "server-only"

import * as User from "@backend-core/entities/User";
import * as Res from "@backend-core/entities/Response";
import { TUserRepoPort } from "@backend-core/ports/repositories/user.repository.port";
import { getPayloadClient } from "@backend-infra/payload/helpers/client";

export function UserRepoAdapter(): TUserRepoPort {
  return {
    getOnebyEmail: getOnebyEmail,
    getOnebyId: getOnebyId,
    create: create,
  };
}

async function getOnebyEmail(email: string): Promise<Res.TAppResponse<User.IUser>> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.find({
      collection: "users",
      pagination: false,
      where: {
        email: {
          equals: email,
        },
      },
    });

    const user = result.docs[0];

    return Res.successResponse<User.IUser>(user);
  } catch (e: any) {
    const error = e as Error;
    return Res.errorResponse(error.message);
  }
}

async function getOnebyId(id: string): Promise<Res.TAppResponse<User.IUser>> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.findByID({
      collection: "users",
      id,
    });

    const user = result;
    // TODO: use dto //
    return Res.successResponse<User.IUser>(user);
  } catch (e: any) {
    const error = e as Error;
    return Res.errorResponse(error.message);
  }
}

async function create(data: User.TSignUpUser): Promise<Res.TAppResponse<User.IUser>> {
  try {
    const payload = await getPayloadClient();

    const result = await payload.create({
      collection: "users",
      data,
    });

    const user = result;
    // TODO: use dto //
    return Res.successResponse<User.IUser>(user);
  } catch (e: any) {
    const error = e as Error;
    return Res.errorResponse(error.message);
  }
}
