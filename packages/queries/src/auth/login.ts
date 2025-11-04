import { useMutationWithToast } from "../../hooks/use-mutation-toast";
import { apiClient } from "@aws-ticket/utils/client";

export function useLogin() {
  return useMutationWithToast({
    mutationFn: (_login) =>
      apiClient.fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(_login),
      }),
    successMessage: "Login successful",
    errorMessage: "Failed to Login",
  });
}
