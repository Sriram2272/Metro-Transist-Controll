import { QueryClient } from "@tanstack/react-query";

async function fetchRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "same-origin",
  });

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    const message = await response.text();
    throw new Error(message || `${response.status}: ${response.statusText}`);
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export const apiRequest = {
  get: (url: string) => fetchRequest(url, { method: "GET" }),
  post: (url: string, data?: any) =>
    fetchRequest(url, { method: "POST", body: JSON.stringify(data) }),
  patch: (url: string, data?: any) =>
    fetchRequest(url, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (url: string) => fetchRequest(url, { method: "DELETE" }),
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        return apiRequest.get(url);
      },
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
