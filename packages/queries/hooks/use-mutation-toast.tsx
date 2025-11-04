import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@aws-ticket/ui/hooks/use-toast";
import { handleQueryError } from "../lib/query-utils";

export function useMutationWithToast<TData, TError, TVariables>(
  options: UseMutationOptions<TData, TError, TVariables> & {
    successMessage?: string;
    errorMessage?: string;
    invalidateQueries?: string | string[]; // New option for query invalidation
  }
) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  console.log("option", options.invalidateQueries);
  return useMutation({
    ...options,

    onSuccess: async (data, variables, context) => {
      if (options.successMessage) {
        toast({
          title: `${data.message}`,
          // description: options.successMessage,
        });
      }
      if (options.invalidateQueries) {
        const queriesToInvalidate = Array.isArray(options.invalidateQueries)
          ? options.invalidateQueries
          : [options.invalidateQueries];

        await Promise.all(
          queriesToInvalidate.map((queryKey) =>
            queryClient.invalidateQueries({ queryKey: [queryKey] })
          )
        );
      }

      // Call original onSuccess if provided
      await options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      const message = options.errorMessage || handleQueryError(error);

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });

      options.onError?.(error, variables, context);
    },
  });
}
