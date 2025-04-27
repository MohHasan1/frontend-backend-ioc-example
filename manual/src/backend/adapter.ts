import { TAuthPort } from "../frontend/port";
import { login, logout } from "./implementation";

export const AuthAdapter = (): TAuthPort => {
  return {
    login: login,
    logout: logout,
  };
};

// we can simply export an object instead of creating a function:
// export  AuthAdapter:TAuthPort = {login:fn1, logout:fn2}

// One of the reason to use function so i can easily swap with ioc module to manage lifecycle - edit only the di.container file.
