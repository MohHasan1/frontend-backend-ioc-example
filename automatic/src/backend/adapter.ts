import { TAuthPort } from "../frontend/port";
import { login, logout } from "./implementation";

export const AuthAdapter = (): TAuthPort => {
  return {
    login: login,
    logout: logout,
  };
};
