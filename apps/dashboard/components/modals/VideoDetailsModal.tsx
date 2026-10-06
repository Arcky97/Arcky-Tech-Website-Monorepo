
import { YoutubePlaylist, YoutubeVideo, YoutubeVideoSnapshot } from "@/types";
import { ColorButton } from "ui";
import { ComponentType, SVGProps, useEffect, useRef, useState } from "react";
import LoadingOverlay from "../overlays/loadingOverlay";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import {
  DocumentDuplicateIcon,
  ListBulletIcon
} from "@heroicons/react/24/outline";
import * as Icons from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { youtubeKeys } from "@/queries/youtube";
import { apiFetch } from "@/lib/apiFetch";
import { getColorByPercentage } from "@/lib/getColorByPercentage";
import { YoutubeGoalProfile } from "@/types/youtube/GoalProfile";
import InputSelect from "ui/src/components/InputSelect";
import GoalProgress from "../GoalProgress";

type VideoStatKey =
  | "views"
  | "likes"
  | "comments"
  | "shares"
  | "subscribersGained"
  | "subscribersLost";

type VideoStat = {
  key: VideoStatKey;
  title: string;
  icon: keyof typeof Icons;  
};

const VideoStats: VideoStat[] = [
  {
    key: "views",
    title: "Views",
    icon: "EyeIcon"
  },
  {
    key: "likes",
    title: "Likes",
    icon: "HandThumbUpIcon"
  },
  {
    key: "comments",
    title: "Comments",
    icon: "ChatBubbleBottomCenterTextIcon"
  },
  {
    key: "shares",
    title: "Shares",
    icon: "ShareIcon"
  },
  {
    key: "subscribersGained",
    title: "Subscribers Gained",
    icon: "UserPlusIcon"
  },
  {
    key: "subscribersLost",
    title: "Subscribers Lost",
    icon: "UserMinusIcon"
  }
];

export default function VideoDetailsModal({
  video,
  isVisible,
  onClose,
  isBackfilling = false,
  backfillMessage = "Loading video history",
  playlists,
  onGoalProfileChange
}: {
  video: YoutubeVideo | null,
  isVisible: boolean,
  onClose: () => void,
  isBackfilling?: boolean,
  backfillMessage?: string,
  playlists: YoutubePlaylist[],
  onGoalProfileChange: (
    videoId: string,
    goalProfileId: number
  ) => void;
}) {
  const queryClient = useQueryClient();
  const displayedVideoRef = useRef<YoutubeVideo | null>(video);
  const [goalProfileId, setGoalProfileId] = useState<number | null>(video?.goalProfileId ?? null);

  if (video !== null) {
    displayedVideoRef.current = video;
  }

  const displayedVideo = video ?? displayedVideoRef.current;

  const videoSnapshotsQuery = useQuery({
    queryKey: youtubeKeys.videoSnapshots(displayedVideo?.videoId ?? ""),
    queryFn: () => apiFetch<YoutubeVideoSnapshot[]>(`/api/youtube/videos/${displayedVideo?.videoId}/snapshots`),
    enabled: !!displayedVideo?.videoId && !isBackfilling
  });

  const goalProfilesQuery = useQuery({
    queryKey: youtubeKeys.goalProfiles(),
    queryFn: () => apiFetch<YoutubeGoalProfile[]>(`/api/youtube/profiles`)
  });

  const updateVideoMutation = useMutation({
    mutationFn: (vars: { 
      videoId: string, 
      goalProfileId: number
    }) =>
      apiFetch(
        `/api/youtube/videos/${vars.videoId}`, 
        "PATCH", 
        { goalProfileId: vars.goalProfileId }
      ),

    onMutate: async (vars) => {
      await queryClient.cancelQueries({ 
        queryKey: youtubeKeys.videos() 
      });

      const previousVideos = 
        queryClient.getQueryData<YoutubeVideo[]>(
          youtubeKeys.videos()
        );

      queryClient.setQueryData<YoutubeVideo[]>(
        youtubeKeys.videos(), 
        (old) =>
          old?.map(video =>
            video.videoId === vars.videoId 
              ? { 
                  ...video, 
                  goalProfileId: video.goalProfileId 
                } 
              : video
          )
      );

      return { previousVideos };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousVideos) {
        queryClient.setQueryData(
          youtubeKeys.videos(), 
          context.previousVideos
        );
      }
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ 
        queryKey: youtubeKeys.videos() 
      });

      queryClient.invalidateQueries({ 
        queryKey: youtubeKeys.video(vars.videoId) 
      });

      queryClient.invalidateQueries({
        queryKey: youtubeKeys.latestVideos()
      });
    }
  });

  const goalProfile =
    goalProfilesQuery.data?.find(
      (profile) => profile.id === goalProfileId
    ) ?? null;

  useEffect(() => {
    if (!video) return;

    setGoalProfileId(video.goalProfileId);
  }, [video]);

  useEffect(() => {
    if (!isVisible) {
      displayedVideoRef.current = null;
    }
  }, [isVisible]);

  const getVideoplaylists = (videoPlaylistIds: string[]) => {
    if (!playlists) return ["Unable to retrieve Playlists"];

    const result = playlists.filter(playlist =>
      videoPlaylistIds.includes(playlist.playlistId)
    );

    if (!result.length) return ["None"];

    return result.map(res => res.title);
  };

  const formatDate = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).formatToParts(new Date(date));

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find(part => part.type === type)?.value ?? "";

    return `${get("hour")}:${get("minute")} ${get("dayPeriod")} on ${get("month")} ${get("day")}, ${get("year")}`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`;
  };

  const getRangeTotal = (key: VideoStatKey) => {
    if (!videoSnapshotsQuery.data || !displayedVideo) return null;

    const publishedAt = new Date(displayedVideo.publishedAt)
    const now = new Date();

    const ageInDays =
      Math.floor((now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60 * 24));

    let rangeDays: number;

    if (ageInDays < 7) {
      return null
    } else if (ageInDays < 28) {
      rangeDays = 7;
    } else if (ageInDays < 90) {
      rangeDays = 28;
    } else if (ageInDays < 365) {
      rangeDays = 90;
    } else if (ageInDays < 730) {
      rangeDays = 365;
    } else {
      return null;
    }

    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - rangeDays);

    const snapshots = videoSnapshotsQuery.data 
      .filter(snapshot => new Date(snapshot.snapshotDate) <= cutoffDate)
      .sort((a, b) => 
        new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
      )
      .map(snapshot => snapshot[key]);


    const snapshotSum = snapshots.reduce((curr, total) => curr + total, 0);
    const lastRangeDays = displayedVideo[key] - snapshotSum;

    const color = getColorByPercentage(displayedVideo[key], snapshotSum, { yellow: 15, orange: 25 });

    return <p><span className={color}>{lastRangeDays >= 0 ? "+" : "-"}{lastRangeDays}</span> in last {rangeDays} days</p>
  }

  return (
    <div
      className={`modal-overlay ${
        isVisible ? "show" : "hide pointer-events-none"
      } backdrop-blur-[5px]`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${
          isVisible ? "show" : "hide"
        } max-w-[85%] max-h-[90vh] relative overflow-y-scroll`}
        onClick={(e) => e.stopPropagation()}
      >
        <LoadingOverlay
          variant="absolute"
          text={backfillMessage}
          disabled={isBackfilling}
        />
        {/* Header */}
        <div className="modal-header">
          <h1 className="modal-title">
            Video Details
          </h1>
          <ColorButton
            color="red-800"
            text="Close"
            action={onClose}
          />
        </div>
        {/* Video Overview */}
        <div className="flex items-stretch text-white max-h-[30vh]">
          {/* LEFT: Thumbnail + title + description */}
          <div className="flex gap-3 p-2 bg-gray-800 rounded-lg w-[75%] min-w-0 min-h-0 overflow-hidden m-2">
            {displayedVideo?.thumbnailUrl ? (
              <Image
                src={displayedVideo.thumbnailUrl}
                alt="Video Thumbnail"
                width={256}
                height={144}
                loading="eager"
                className="w-64 h-36 object-cover rounded-lg border-white border-2 shrink-0 self-start mt-4"
              />
            ) : (
              <div className="flex items-center justify-center rounded-lg w-64 h-36 bg-gray-700 shrink-0">
                <p className="text-white font-bold text-center">
                  No Thumbnail
                </p>
              </div>
            )}
            <div className="flex flex-col min-w-0 min-h-0 flex-1">
              {/* Title */}
              <p className="text-lg font-bold text-wrap shrink-0 min-h-14 flex items-center">
                {displayedVideo?.title}
              </p>
              {/* Description */}
              <div className="mt-1 min-h-0 flex-1 overflow-y-scroll border border-gray-400 rounded-l-lg pl-2">
                <div className="text-wrap whitespace-pre-line py-2">
                  {displayedVideo?.description}
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT: Video information */}
          <div className="flex flex-col gap-3 p-2 whitespace-nowrap bg-gray-800 rounded-lg w-[25%] min-w-0 overflow-y-scroll m-2">
            {/* Published */}
            <div className="flex">
              <div className="w-10 justify-center pt-1 shrink-0">
                <Calendar className="w-7 h-7 text-red-500" />
              </div>
              <div className="flex flex-col text-wrap min-w-0">
                <p className="text-gray-300">
                  Published at
                </p>
                <p className="font-bold text-base">
                  {formatDate(
                    displayedVideo?.publishedAt ?? new Date()
                  )}
                </p>
              </div>
            </div>
            {/* Duration */}
            <div className="flex">
              <div className="w-10 justify-center pt-1 shrink-0">
                <Clock className="w-7 h-7 text-red-500" />
              </div>
              <div className="flex flex-col text-wrap min-w-0">
                <p className="text-gray-300">
                  Duration
                </p>
                <p className="font-bold text-base">
                  {formatDuration(
                    displayedVideo?.durationSeconds ?? 0
                  )}
                </p>
              </div>
            </div>
            {/* Video URL */}
            <div className="flex">
              <div className="w-10 justify-center pt-1 shrink-0">
                <DocumentDuplicateIcon className="w-7 h-7 text-red-500" />
              </div>
              <div className="flex flex-col text-wrap min-w-0">
                <p className="text-gray-300">
                  Video Url
                </p>
                <p className="font-bold text-base break-all">
                  {displayedVideo?.videoId}
                </p>
              </div>
            </div>
            {/* Playlists */}
            <div className="flex">
              <div className="w-10 justify-center pt-1 shrink-0">
                <ListBulletIcon className="w-7 h-7 text-red-500" />
              </div>
              <div className="flex flex-col text-wrap min-w-0">
                <p className="text-gray-300">
                  Playlist(s)
                </p>
                <p className="font-bold text-base wrap-break">
                  {getVideoplaylists(
                    displayedVideo?.playlistIds ?? []
                  ).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Video Analytics */}
        <div className="grid grid-cols-6 max-h-[30vh]">
          {VideoStats.map(({ key, title, icon }) => {
            const IconComp = Icons[icon] as ComponentType<SVGProps<SVGElement>>;

            return (
              <div key={key} className="flex items-start bg-gray-800 rounded-lg gap-3 m-2 p-2">
                <div className="w-10 flex justify-center pt-1">
                  <IconComp className="w-7 h-7 text-red-500"/>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-300">
                    {title}
                  </p>
                  <p className="font-bold text-2xl">
                    {displayedVideo?.[key].toLocaleString()}
                  </p>
                  {getRangeTotal(key)}
                </div>
              </div>
            )
          })}
        </div>
        {/* Video Goals */}
        <div className="bg-gray-800 rounded-lg p-2 m-2">
          {!goalProfilesQuery.data ? (
            <p className="text-center text-gray-300">
              Loading goal Profiles...
            </p>
          ) : goalProfilesQuery.data.length === 0 ? (
            <p className="text-center text-gray-300">
              No Goal Profiles were found.
              (Click Goals in the top right menu to add new Goals)
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold">
                    {goalProfile?.name ?? "No Goal selected"}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    {goalProfile 
                      ? "Track this video's progress towards your goals."
                      : "Select a goal profile to track this videos's progress."
                    }
                  </p>
                </div>

                <InputSelect
                  width={300}
                  initValue={goalProfileId ?? ""}
                  initLabel={goalProfilesQuery.data.find(profile => profile.id === goalProfileId)?.name ?? ""}
                  handleChange={(option) => {
                    const videoId = displayedVideo?.videoId;

                    if (!videoId) return;

                    const newGoalProfileId = option
                      ? Number(option.value)
                      : null;

                    setGoalProfileId(newGoalProfileId);

                    if (newGoalProfileId !== null) {
                      onGoalProfileChange(
                        videoId,
                        newGoalProfileId
                      );

                      updateVideoMutation.mutate({
                        videoId,
                        goalProfileId: newGoalProfileId
                      });
                    }
                  }}
                  options={goalProfilesQuery.data.map(
                    profile => ({ 
                      value: profile.id, 
                      label: profile.name
                    })
                  )}
                  placeholder="Select a Goal"
                  isDisabled={updateVideoMutation.isPending}
                  isClearable
                  placement="auto"
                />
              </div>

              {goalProfile && displayedVideo ? (
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <GoalProgress
                    title="Views"
                    current={displayedVideo.views}
                    target={goalProfile.views}
                  />

                  <GoalProgress
                    title="Likes"
                    current={displayedVideo.likes}
                    target={goalProfile.likes}
                  />

                  <GoalProgress
                    title="Watch Hours"
                    current={displayedVideo.watchHours}
                    target={goalProfile.watchHours}
                    formatValue={(value) =>
                      value.toLocaleString(undefined, {
                        maximumFractionDigits: 1
                      })
                    }
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-lg border boeder-dashed border-gray-600 p-6 text-center">
                  <p className="text-gray-300">
                    No goal selected
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose a goal profile above to view your progress
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {/* Video Goal Calculator */}
      </div>
    </div>
  );
}