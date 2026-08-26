import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useQuery } from "@tanstack/react-query";
import { ColorButton } from "ui";
import InputNumber from "ui/src/components/InputNumber";

type GoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

type GoalProfile = {
  id: number,
  channelId: string,
  name: string,
  goalViews: number,
  goalLikes: number,
  goalComments: number,
  goalWatchhours: number
}

export default function GoalModal({ isVisible, onClose }: GoalModalProps) {

  const goalQuery = useQuery({
    queryKey: youtubeKeys.goalProfiles(),
    queryFn: () => apiFetch<GoalProfile[]>("/api/youtube/profiles"),
    enabled: isVisible
  });

  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide"}`}
      onClick={onClose}
    >
      <div 
        className={`modal-content ${isVisible ? "show" : "hide"} "max-w-[95%] w-[65%]"`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="modal-header">
          <h1 className="modal-title">Goals</h1>

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
                <th>ID</th>
                <th>Name</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Watch Hours</th>
              </tr>
            </thead>
            <tbody>
              {goalQuery.isLoading && (
                <tr><td colSpan={6}>Loading Goals...</td></tr>
              )}
              {goalQuery.data?.map(goal => (
                <tr key={goal.id}>
                  <td>{goal.id}</td>
                  <td>{goal.name}</td>
                  <td>
                    <InputNumber
                      value={goal.goalViews}
                      range={{ min: 1, max: 9999 }}
                      placeholder="Likes"
                      handleChange={() => ""}
                      handleBlur={() => ""}
                      width={7}
                      extra=""                    
                    /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}