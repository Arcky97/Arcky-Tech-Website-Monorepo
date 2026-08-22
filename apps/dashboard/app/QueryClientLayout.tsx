import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default async function QueryClientWrapper({children}: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  });
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: youtubeKeys.videos(),
      queryFn: () => apiFetch("/api/youtube/videos")
    })
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}