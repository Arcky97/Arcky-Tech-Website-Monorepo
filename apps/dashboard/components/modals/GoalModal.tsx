import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useMutation,  useQuery, useQueryClient } from "@tanstack/react-query";
import { ColorButton } from "ui";
import InputNumber from "ui/src/components/InputNumber";
import LoadingOverlay from "../overlays/loadingOverlay";
import { useEffect, useState } from "react";
import InputText from "ui/src/components/InputText";

type GoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

type GoalProfile = {
  id: number;
  channelId: string;
  name: string;
  views: number;
  likes: number;
  comments: number;
  watchHours: number;
};

type GoalInput = {
  id?: number;
  name: string;
  views: number;
  likes: number;
  comments: number;
  watchHours: number;
};

const emptyGoal: GoalInput = {
  name: "",
  views: 0,
  likes: 0,
  comments: 0,
  watchHours: 0
};

export default function GoalModal({ isVisible, onClose }: GoalModalProps) {
  const queryClient = useQueryClient();

  const [goals, setGoals] = useState<GoalInput[]>([]);

  const goalQuery = useQuery({
    queryKey: youtubeKeys.goalProfiles(),
    queryFn: () => apiFetch<GoalProfile[]>("/api/youtube/profiles"),
    enabled: isVisible
  });

  useEffect(() => {
    if (!goalQuery.data) {
      setGoals([]);
      return;
    }

    setGoals(
      goalQuery.data.map(goal => ({
        id: goal.id,
        name: goal.name,
        views: goal.views,
        likes: goal.likes,
        comments: goal.comments,
        watchHours: goal.watchHours
      }))
    );
  }, [goalQuery.data]);

  const createGoalMutation = useMutation({
    mutationFn: (newGoal: GoalInput) => 
      apiFetch<GoalProfile>("/api/youtube/profile", "POST", {
        name: newGoal.name,
        views: newGoal.views,
        likes: newGoal.likes,
        comments: newGoal.comments,
        watchHours: newGoal.watchHours
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const updateGoalMutation = useMutation({
    mutationFn: (goal: GoalInput) =>
      apiFetch(`/api/youtube/profile/${goal.id}`, "PUT", {
        name: goal.name,
        views: goal.views,
        likes: goal.likes,
        comments: goal.comments,
        watchHours: goal.watchHours
      }
    ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const deleteGoalMutation = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/youtube/profile/${id}`, "DELETE"),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const handleGoalChange = (
    index: number,
    field: keyof GoalInput,
    value: string | number
  ) => {
    setGoals(prev =>
      prev.map((goal, i) => 
        i === index 
          ? {
              ...goal,
              [field]: value
            }
          : goal
      )
    );
  };

  const handleAddGoal = () => {
    setGoals(prev => [
      ...prev,
      {
        ...emptyGoal
      }
    ]);
  };

  const handleSaveGoal = (goal: GoalInput) => {
    if (!goal.name.trim()) {
      return;
    }

    if (goal.id !== undefined) {
      updateGoalMutation.mutate(goal);
    } else {
      createGoalMutation.mutate(goal);
    }
  };

  const handleDeleteGoal = (
    index: number,
    goal: GoalInput
  ) => {
    if (goal.id === undefined) {
      setGoals(prev =>
        prev.filter((_, i) => i !== index)
      );

      return;
    }

    deleteGoalMutation.mutate(goal.id);
  };

  const isMutating =
    createGoalMutation.isPending ||
    updateGoalMutation.isPending || 
    deleteGoalMutation.isPending;

  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide"}`}
      onClick={onClose}
    >
      <LoadingOverlay
        text="Loading Goals"
        disabled={goalQuery.isLoading}
      />
      <div 
        className={`modal-content ${isVisible ? "show" : "hide"} "max-w-[95%] w-[75%]"`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="modal-header">
          <h1 className="modal-title">
            Goals
          </h1>

          <ColorButton
            color="red-800"
            text="Close"
            action={onClose}
          />
        </div>

        <div className="modal-body px-2 pb-12">
          <table className="w-auto table-auto bg-gray-800 text-white mb-4">
            <thead className="sticky top-0 bg-gray-700 z-16">
              <tr>
                <th className="px-4 py-2">
                  ID
                </th>
                <th className="px-4 py-2">
                  Name
                </th>
                <th className="px-4 py-2">
                  Views
                </th>
                <th className="px-4 py-2">
                  Likes
                </th>
                <th className="px-4 py-2">
                  Comments
                </th>
                <th className="px-4 py-2">
                  Watch Hours
                </th>
                <th className="px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {goals.length > 0 ?(
                goals.map((goal, index) => (
                  <tr 
                    key={
                      goal.id ?? `new-${index}`
                    }
                    className="border-t border-gray-700"
                  >
                    <td className="px-4 py-2">
                      {goal.id ?? "-"}
                    </td>
                    <td className="px-4 py-2">
                      <InputText
                        value={goal.name}
                        placeholder="Goal Name"
                        handleChange={(value) => 
                          handleGoalChange(
                            index,
                            "name",
                            value
                          )
                        }
                        width={17}
                        table
                      />
                    </td>

                    <td className="px-4 py-2">
                      <InputNumber
                        value={goal.views}
                        range={{ 
                          min: 1, 
                          max: 9999 
                        }}
                        placeholder="Views"
                        handleChange={(value) => 
                          handleGoalChange(
                            index,
                            "views",
                            value
                          )
                        }
                        width={9}
                        table               
                      />
                    </td>

                    <td className="px-4 py-2">
                      <InputNumber
                        value={goal.likes}
                        range={{
                          min: 1,
                          max: 9999
                        }}
                        placeholder="Likes"
                        handleChange={(value) =>
                          handleGoalChange(
                            index,
                            "likes",
                            value
                          )
                        }
                        width={9}
                        table
                      />
                    </td>

                    <td className="px-4 py-2">
                      <InputNumber
                        value={goal.comments}
                        range={{
                          min: 1,
                          max: 9999
                        }}
                        placeholder="Comments"
                        handleChange={(value) =>
                          handleGoalChange(
                            index,
                            "comments",
                            value
                          )
                        }
                        width={9}
                        table
                      />
                    </td>

                    <td className="px-4 py-2">
                      <InputNumber
                        value={goal.watchHours}
                        range={{
                          min: 1,
                          max: 9999
                        }}
                        placeholder="Watch Hours"
                        handleChange={(value) =>
                          handleGoalChange(
                            index,
                            "watchHours",
                            value
                          )
                        }
                        width={9}
                        table
                      />
                    </td>

                    <td className="px-4 py-2">
                      <ColorButton
                        color="red-800"
                        text="Delete"
                        action={() =>
                          handleDeleteGoal(index, goal)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-gray-700 hover:bg-gray-800 transition-colors duration-300 ease-in-out">
                  <td
                    colSpan={7}
                    className="px-4 py-3 text-center"
                  >
                    No Goals added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="w-1/2 mx-auto mb-4">
            <ColorButton
              color="blue-800"
              text="Add new Goal"
              action={handleAddGoal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}