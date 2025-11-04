import { QueryClient } from "@tanstack/react-query";

// Helper to handle API errors consistently
export function handleQueryError(error: unknown) {
  // Add your error handling logic here
  let message = "An error occurred";
  if (error instanceof Error) {
    message = error.message;
  }
  return message;
}

// Prefetch helper
export async function prefetchQuery(
  queryClient: QueryClient,
  queryKey: string[],
  queryFn: () => Promise<unknown>
) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000, // Match the default staleTime
  });
}

// Type for common query error
export type QueryError = {
  message: string;
  status?: number;
};
