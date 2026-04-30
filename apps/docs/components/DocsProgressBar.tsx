"use client";
import { useEffect, useState } from "react";
import { DocProgress, ProjectProgress } from "@/lib/getDocProgress";
import { Skeleton } from "ui";

export default function DocsProgressBar() {
  const [progressData, setProgressData] = useState<ProjectProgress[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch("/api/docs/progress");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = (await res.json()) as ProjectProgress[];
        setProgressData(data);
      } catch (error) {
        setError("Could not load documentation progress.");
        console.error("Error Loading documentation progress:", error);
      }
    }

    fetchProgress();

    const delayTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(delayTimeout);
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!progressData || showLoading) {
    return (
      <div className="space-y-4 mb-4">
        {Array.from({ length: progressData?.length || 1 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} color="bg-gray-800" width="w-full" height="h-full" rounded="rounded-xl" className="p-4 shadow border border-gray-600/75" variant="pulse">
            <Skeleton width="w-1/2" height="h-6" className="mx-auto mb-3"/>
            <Skeleton color="bg-gray-700" width="w-full" height="h-5" rounded="rounded-full" className="mb-3"/>
            <Skeleton width="w-1/3" height="h-4" className="ml-3"/>
          </Skeleton>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-4">
      {progressData.map((data, index) => (
        <div key={`progress-${index}`} className="w-full p-4 bg-gray-800 rounded-xl shadow border border-gray-600/75">
          <h2 className="text-lg font-semibold mb-2 text-white text-center">
            {data.project} Documentation Progress
          </h2>
          <div className="w-full bg-gray-300 rounded-full h-5 mb-2 overflow-hidden border border-gray-800">
            <div
              className="bg-blue-500 h-full transition-all duration-500"
              style={{ width: `${data.progress.percentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 pl-3">
            {data.progress.completed !== 0
              ? `${data.progress.completed} of ${data.progress.total} pages completed (${data.progress.percentage}%)`
              : "Not started"
            }
          </p>
        </div>
      ))}
    </div>
  );
}