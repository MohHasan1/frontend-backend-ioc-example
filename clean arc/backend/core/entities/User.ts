import "server-only"

export interface IUser {
  name: string;
  email: string;
  role: "user";
}

export type TSignUpUser = IUser & {
  password: string;
  confirmPassword: string;
};

export type TSignInUser = Pick<IUser, "email"> & {
  password: string;
};

export function isPasswordSame(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

