
export async function apiFetch<T>(
  url: string,
  method: string = "GET",
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Request failed");
  }
  
  return data;
}