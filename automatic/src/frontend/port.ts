// import { getAuthAdapter } from "../di/container"; - manual
import { container } from "../di/container";

// function interface using type - the functions that are expected from the auth-port.
export type TAuthPort = {
  login: () => void;
  logout: () => void;
};

// gets the actual implementation - connect the port (interface) with the adapter (implemntation)
// export const AuthPort: TAuthPort = getAuthAdapter(); - manual
export const authService = container.resolve<TAuthPort>("userService");


// using a container in between back and front totally isolates each other - but more code.
// Note - we can directly import adapter from backend without container: (see below)
// import { AuthAdapter } from "../backend/adapter";
// export const AuthPort: TPort = AuthAdapter;