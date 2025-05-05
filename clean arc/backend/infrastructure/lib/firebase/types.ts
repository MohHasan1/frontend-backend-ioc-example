/**
 * Type for API responses to maintain consistency.
 */
export interface ApiResponse<T> {
  status: "success" | "error" | "not_found";
  result: T | null;
  errorMessage?: string;
}
