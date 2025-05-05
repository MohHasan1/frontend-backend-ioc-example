import { Access, AccessArgs } from "payload";

export const isRootAdmin: Access = ({ req }: AccessArgs) => {
  return req.user?.role === "root-admin";
};

export const isAdmin: Access = ({ req }: AccessArgs) => {
  return req.user?.role === "admin";
};

export const isEditor: Access = ({ req }: AccessArgs) => {
  return req.user?.role === "editor";
};

export const isUser: Access = ({ req }: AccessArgs) => {
  return req.user?.role === "user";
};

//isRootOrAdminOrEditor
export const isStaff: Access = ({ req }: AccessArgs) => {
  return ["root-admin", "admin", "editor"].includes(req.user?.role ?? "");
};

export const isAtLeastAdmin: Access = ({ req }: AccessArgs) => {
  return ["root-admin", "admin"].includes(req.user?.role ?? "");
};

export const isSelfOrStaff: Access = ({ req, id }: AccessArgs) => {
  return req.user?.id === id || req.user?.role === "root-admin" || req.user?.role === "admin";
};

export const allowAnyone: Access = () => true;

export const denyAll: Access = () => false;
