import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { loadPBSConfig } from "@/services/pbsConfigStorage";
import { useState } from "react";
import { ColorButton } from "ui";

export default function PBSConfigModal({ isOpen, onClose, requireSetup = false }: { isOpen: boolean, onClose: () => void, requireSetup?: boolean }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleClose = () => {
    if (requireSetup) return;
    onClose();
  };

  return (
    <div
      className={`modal-overlay ${
        isOpen ? "show" : "hide pointer-events-none"
      } backdrop-blur-[5px]`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${
          isOpen ? "show" : "hide"
        } md:max-w-[85%] max-w-[95%] md:max-h-[90dvh] max-h-[95dvh] relative overflow-y-scroll`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h1 className="modal-title">
            PBS Editor Settings
          </h1>
          <ColorButton
            color="red-800"
            text="Close"
            action={handleClose}
            disabled={requireSetup}
          />
          <p></p>
        </div>
        {requireSetup && (
          <div className="modal-body text-white">
            <p className="md:text-lg text-base font-bold">Hello and welcome to Arcky's PBS Editor!</p>
            <br/>
            <p className="text-gray-200">To get started, choose how you want to provide your PBS files:</p>
            <ul className="list-disc pl-6 md:text-base text-sm">
              <li className="pt-1">
                <strong>Project Folder:</strong> Grant file access and select your local Essentials Project folder.
              </li>
              <li className="pt-1">
                <strong>Manual Upload:</strong> Upload the PBS file(s) you want to edit.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}