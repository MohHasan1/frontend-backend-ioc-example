import { IApiResponse } from "@/types/api-response.type";
import { resolveEmailAdapter } from "@interface-di/containers";


import { type ReactNode } from "react";


export type TEmailPorts = {
  sendFixedEmail(template?: ReactNode): Promise<IApiResponse<{ id: string }>>;
};

export const EmailServicePort: TEmailPorts = resolveEmailAdapter();
