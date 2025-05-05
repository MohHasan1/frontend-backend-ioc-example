import "server-only";

import { TEmailPorts } from "@/interface-ports/public/email.port";
import { sendFixedEmail } from "../../Services/public/email.service";

export function EmailAdapter(): TEmailPorts {
  return {
    sendFixedEmail: sendFixedEmail,
  };
}
