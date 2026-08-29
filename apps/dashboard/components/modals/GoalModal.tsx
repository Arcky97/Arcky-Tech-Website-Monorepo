import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useMutation,  useQuery, useQueryClient } from "@tanstack/react-query";
import { ColorButton } from "ui";
import InputNumber from "ui/src/components/InputNumber";
import LoadingOverlay from "../overlays/loadingOverlay";
import { useEffect, useRef, useState } from "react";
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

// Fields that are user-editable and saved when the modal closes
const EDITABLE_FIELDS = ["name", "views", "likes", "comments", "watchHours"] as const;
type EditableField = typeof EDITABLE_FIELDS[number];

type GoalFields = Pick<GoalInput, EditableField>;

type GoalInput = {
  uid: string;
  id?: number;
  name: string;
  views: number;
  likes: number;
  comments: number;
  watchHours: number;
};

const MIN_SAVE_DISPLAY_MS = 2000;

const createEmptyGoal = (): GoalInput => ({
  uid: crypto.randomUUID(),
  name: "",
  views: 0,
  likes: 0,
  comments: 0,
  watchHours: 0
});

const extractFields = (goal: GoalFields): GoalFields => ({
  name: goal.name,
  views: goal.views,
  likes: goal.likes,
  comments: goal.comments,
  watchHours: goal.watchHours
});

const fieldsAreEqual = (a: GoalFields, b: GoalFields) =>
  EDITABLE_FIELDS.every(field => a[field] === b[field]);

export default function GoalModal({ isVisible, onClose }: GoalModalProps) {
  const queryClient = useQueryClient();

  const [goals, setGoals] = useState<GoalInput[]>([]);

  // Snapshot of goals as they were when the modal was opened, used for "reset"
  const originalGoalsRef = useRef<Record<string, GoalFields>>({});
  // Snapshot of the last values successfully persisted to the server, used to decide what needs saving
  const lastSavedGoalsRef = useRef<Record<string, GoalFields>>({});
  // Always-current copy of goals, so the close handler reads the latest edits
  const goalsRef = useRef<GoalInput[]>([]);
  const initializedRef = useRef(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    goalsRef.current = goals;
  }, [goals]);

  useEffect(() => {
    if (!isVisible) {
      initializedRef.current = false;
    }
  }, [isVisible]);

  const goalQuery = useQuery({
    queryKey: youtubeKeys.goalProfiles(),
    queryFn: () => apiFetch<GoalProfile[]>("/api/youtube/profiles"),
    enabled: isVisible
  });

  useEffect(() => {
    if (!goalQuery.data || initializedRef.current) {
      return;
    }

    const loadedGoals: GoalInput[] = goalQuery.data.map(goal => ({
      uid: crypto.randomUUID(),
      id: goal.id,
      name: goal.name,
      views: goal.views,
      likes: goal.likes,
      comments: goal.comments,
      watchHours: goal.watchHours
    }));

    originalGoalsRef.current = {};
    lastSavedGoalsRef.current = {};
    loadedGoals.forEach(goal => {
      const fields = extractFields(goal);
      originalGoalsRef.current[goal.uid] = fields;
      lastSavedGoalsRef.current[goal.uid] = fields;
    });

    setGoals(loadedGoals);
    initializedRef.current = true;
  }, [goalQuery.data]);

  const createGoalMutation = useMutation({
    mutationFn: (vars: { uid: string; goal: GoalFields }) =>
      apiFetch<GoalProfile>("/api/youtube/profile", "POST", {
        name: vars.goal.name,
        views: vars.goal.views,
        likes: vars.goal.likes,
        comments: vars.goal.comments,
        watchHours: vars.goal.watchHours
      }),

    onSuccess: (created, vars) => {
      lastSavedGoalsRef.current[vars.uid] = vars.goal;
      setGoals(prev =>
        prev.map(goal =>
          goal.uid === vars.uid ? { ...goal, id: created.id } : goal
        )
      );
      queryClient.invalidateQueries({
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const updateGoalMutation = useMutation({
    mutationFn: (vars: { uid: string; id: number; goal: GoalFields }) =>
      apiFetch(`/api/youtube/profile/${vars.id}`, "PATCH", {
        name: vars.goal.name,
        views: vars.goal.views,
        likes: vars.goal.likes,
        comments: vars.goal.comments,
        watchHours: vars.goal.watchHours
      }),

    onSuccess: (_data, vars) => {
      lastSavedGoalsRef.current[vars.uid] = vars.goal;
      queryClient.invalidateQueries({
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const deleteGoalMutation = useMutation({
    mutationFn: (vars: { uid: string; id: number }) =>
      apiFetch(`/api/youtube/profile/${vars.id}`, "DELETE"),

    onSuccess: (_data, vars) => {
      delete originalGoalsRef.current[vars.uid];
      delete lastSavedGoalsRef.current[vars.uid];
      setGoals(prev => prev.filter(goal => goal.uid !== vars.uid));
      queryClient.invalidateQueries({
        queryKey: youtubeKeys.goalProfiles()
      });
    }
  });

  const handleGoalChange = (
    uid: string,
    field: EditableField,
    value: string | number
  ) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.uid === uid
          ? {
              ...goal,
              [field]: value
            }
          : goal
      )
    );
  };

  const handleAddGoal = () => {
    const goal = createEmptyGoal();
    originalGoalsRef.current[goal.uid] = extractFields(goal);

    setGoals(prev => [...prev, goal]);
  };

  const handleDeleteGoal = (goal: GoalInput) => {
    if (goal.id === undefined) {
      delete originalGoalsRef.current[goal.uid];
      delete lastSavedGoalsRef.current[goal.uid];

      setGoals(prev => prev.filter(g => g.uid !== goal.uid));

      return;
    }

    deleteGoalMutation.mutate({ uid: goal.uid, id: goal.id });
  };

  // Returns the fields to persist for a goal, or null if there's nothing new to save
  const getPendingSave = (goal: GoalInput): GoalFields | null => {
    const baseline =
      lastSavedGoalsRef.current[goal.uid] ??
      originalGoalsRef.current[goal.uid] ??
      extractFields(createEmptyGoal());

    const current = extractFields(goal);

    if (!current.name.trim() || fieldsAreEqual(current, baseline)) {
      return null;
    }

    return current;
  };

  const saveAllGoals = async () => {
    await Promise.all(
      goalsRef.current.map(async goal => {
        const pending = getPendingSave(goal);
        if (!pending) {
          return;
        }

        if (goal.id !== undefined) {
          await updateGoalMutation.mutateAsync({ uid: goal.uid, id: goal.id, goal: pending });
        } else {
          await createGoalMutation.mutateAsync({ uid: goal.uid, goal: pending });
        }
      })
    );
  };

  const handleClose = async () => {
    const hasPendingChanges = goalsRef.current.some(goal => getPendingSave(goal) !== null);

    if (!hasPendingChanges) {
      onClose();
      return;
    }

    setIsSaving(true);
    const start = Date.now();

    try {
      await saveAllGoals();
    } finally {
      const remaining = MIN_SAVE_DISPLAY_MS - (Date.now() - start);
      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
      }

      setIsSaving(false);
      onClose();
    }
  };

  const isMutating =
    createGoalMutation.isPending ||
    updateGoalMutation.isPending || 
    deleteGoalMutation.isPending;

  const lastGoal = goals[goals.length - 1];
  const isAddDisabled = !!lastGoal && !lastGoal.name.trim();

  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide"}`}
      onClick={handleClose}
    >
      <LoadingOverlay
        text={goalQuery.isLoading ? "Loading Goals" : "Saving Changes"}
        disabled={goalQuery.isLoading || isSaving}
      />
      <div 
        className={`modal-content ${isVisible ? "show" : "hide"} "max-w-[95%] w-[75%]"`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="modal-header">
          <div>
            <h1 className="modal-title">
              Goals
            </h1>
          </div>

          <ColorButton
            color="red-800"
            text="Close"
            action={handleClose}
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
                goals.map((goal) => (
                  <tr 
                    key={goal.uid}
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
                            goal.uid,
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
                            goal.uid,
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
                            goal.uid,
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
                            goal.uid,
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
                            goal.uid,
                            "watchHours",
                            value
                          )
                        }
                        width={9}
                        table
                      />
                    </td>

                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <ColorButton
                        color="red-800"
                        text="Delete"
                        disabled={goal.id === undefined}
                        action={() =>
                          handleDeleteGoal(goal)
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
          <div className="flex">
            <ColorButton
              color="blue-800"
              text="Add new Goal"
              disabled={isAddDisabled}
              action={handleAddGoal}
              extraClass="w-1/2 mx-auto mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}