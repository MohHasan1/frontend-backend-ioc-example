import { AuthAdapter } from "../backend/adapter";
import { createContainer, asFunction} from "awilix";

// manual
// export function getAuthAdapter() {
//   return AuthAdapter;
// }

// auto
export const container = createContainer();

container.register({
  userService: asFunction(AuthAdapter).singleton(),
});
