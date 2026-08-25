import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import GoalModal from "./modals/GoalModal";

export default function DashboardNav() {
  const { youtubeId } = useParams<{ youtubeId: string}>();

  const [activeModal, setActiveModal] = useState<"goals" | "settings" | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = (modal: "goals" | "settings") => {
    setActiveModal(modal);

    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }

  const closeModal = () => {
    setIsVisible(false);

    setTimeout(() => {
      setActiveModal(null);
    }, 300);
  };

  const navConfig = [
    {
      name: "Home",
      path: "home",
    },
    {
      name: "Videos",
      path: "videos"
    },
    {
      name: "Goals",
      action: () => openModal("goals")
    },
    {
      name: "Settings",
      action: () => openModal("settings")
    }
  ]

  return (
    <>
      <nav className="flex gap-4 px-2 py-2 text-white text-left sticky top-0 w-full bg-gray-900 justify-end text-lg font-bold ">
        {navConfig.map(item => {
          if (item.path) {
            return (
              <Link
                className="hover:text-gray-400 transition-all duration-300 ease-in-out"
                href={`/youtube/${youtubeId}/${item.path}`}
              >{item.name}</Link>
            )
          }
          return (
            <button 
              onClick={item.action}
              className="hover:text-gray-400 transition-all duration-300 ease-in-out cursor-pointer"
            >
              {item.name}
            </button>
          )
        })}
      </nav>

      {activeModal === "goals" && (
        <GoalModal
          isVisible={isVisible}
          onClose={closeModal}
        />
      )}
    </>
  )
}