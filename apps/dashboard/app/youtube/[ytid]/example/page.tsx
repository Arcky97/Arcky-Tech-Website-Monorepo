import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { ExampleClient } from "./ExampleClient";

// Server Component: runs on the server, can prefetch before anything reaches the browser.
export default async function ExamplePage() {
  const queryClient = new QueryClient();

  // Seed the cache server-side so the client mounts with data already available.
  await queryClient.prefetchQuery({
    queryKey: youtubeKeys.videos(),
    queryFn: () => apiFetch("/api/youtube/videos")
  });

  return (
    // HydrationBoundary ships the prefetched cache down to the client's QueryClientProvider.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ExampleClient />
    </HydrationBoundary>
  );
}
