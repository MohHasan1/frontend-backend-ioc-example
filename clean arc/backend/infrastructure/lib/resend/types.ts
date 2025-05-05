/**
 * Type for API responses to maintain consistency.
 */
export interface IApiResponse<T> {
  status: "success" | "error";
  result: T | null;
  errorMessage?: string[];
}
