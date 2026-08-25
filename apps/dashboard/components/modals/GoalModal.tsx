import { ColorButton } from "ui";

type GoalModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export default function GoalModal({ isVisible, onClose }: GoalModalProps) {
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

        {/* Actual Import content */}
        <div className="modal-body px-2 pb-12">
          
        </div>
      </div>
    </div>
  )
}