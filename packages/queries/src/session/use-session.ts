import { apiClient } from "@aws-ticket/utils/client";
import { useMutationWithToast } from "../../hooks/use-mutation-toast";
import { useQuery } from "@tanstack/react-query";

export const sessionDetailKeys = {
  all: ["sessionDetail"] as const,
  lists: () => [...sessionDetailKeys.all, "list"] as const,
  details: (id: string) => [...sessionDetailKeys.all, "detail", id] as const,
};

export function useFetchSessionList() {
  return useQuery({
    queryKey: [...sessionDetailKeys.lists()],
    queryFn: () => apiClient.fetch("/api/session/get"),
  });
}

export function useFetchSessionById(id: string) {
  return useQuery({
    queryKey: [...sessionDetailKeys.details(id)],
    queryFn: () => apiClient.fetch(`/api/session/${id}`),
  });
}

export function useAddSessionDetail() {
  return useMutationWithToast({
    mutationFn: (session) =>
      apiClient.fetch("/api/session/add", {
        method: "POST",
        body: JSON.stringify(session),
      }),
    successMessage: "Session added successfully",
    errorMessage: "Failed to add session",
  });
}

export function useUpdateSessionDetail(id: string) {
  return useMutationWithToast({
    mutationFn: (session) =>
      apiClient.fetch("/api/session/update", {
        method: "PUT",
        body: JSON.stringify(session),
      }),
    successMessage: "Session updated successfully",
    errorMessage: "Failed to update session",
    invalidateQueries: [...sessionDetailKeys.details(id)],
  });
}
