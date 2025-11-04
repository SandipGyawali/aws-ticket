// import { useAuthStore } from "@/store/useAuthStore";
import { CLIENT_ENVIRONMENT } from "@aws-ticket/env/client";

interface ApiClientConfig {
  baseUrl: string;
}

const API_URL_DEFAULT = CLIENT_ENVIRONMENT.API_URL;

export const apiClient: ApiClientConfig & {
  fetch: <TData>(endpoint: string, options?: RequestInit) => Promise<TData>;
} = {
  baseUrl: API_URL_DEFAULT || "",

  async fetch<TData>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<TData> {
    // const moduleState = useAuthStore.getState().modPermission;

    const moduleType = endpoint.includes("/")
      ? endpoint.split("/")[0]
      : "default";

    console.log("The module type is: ", moduleType);

    let currentBaseUrl: string;
    switch (moduleType) {
      default:
        currentBaseUrl = API_URL_DEFAULT || "";
        console.warn(
          `API Client: Using default base URL for endpoint: ${endpoint}`
        );
        break;
    }

    if (!currentBaseUrl) {
      throw new Error(
        `API Client: Could not determine base URL for endpoint: ${endpoint}. Check environment variables.`
      );
    }

    // select the module
    // eslint-disable-next-line @next/next/no-assign-module-variable
    // const module = moduleState.find(
    //   (mod) => mod.modCd.toLowerCase() === moduleType
    // );

    // const token = module?.accessToken;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      //   ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const finalEndpoint = endpoint.includes("/")
      ? endpoint.split("/").slice(1).join("/")
      : endpoint;

    try {
      const response = await fetch(`${currentBaseUrl}/${finalEndpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: `HTTP error! Status: ${response.status}` }));

        throw new Error(
          errorData?.message ||
            `An error occurred while fetching ${endpoint}. Status: ${response.status}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as TData;
      } else {
        return null as TData;
      }
    } catch (error) {
      console.error(`API Client Fetch Error for endpoint ${endpoint}:`, error);

      throw error;
    }
  },
};
