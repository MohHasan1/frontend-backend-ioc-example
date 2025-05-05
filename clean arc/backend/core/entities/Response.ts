import "server-only"

export type TAppResponse<T> = {
  result: T | null;
  status: "success" | "error";
  errorMessage?: string;
};

export function successResponse<T>(result: T): TAppResponse<T> {
  return {
    result,
    status: "success",
  };
}

export function errorResponse<T = unknown>(errorMessage: string): TAppResponse<T> {
  return {
    result: null,
    status: "error",
    errorMessage,
  };
}
