import { ColorButton } from "ui";
import ProjectSettings from "./ProjectSettings";
import { motion } from "framer-motion";
import EditorSettings from "./EditorSettings";

export default function PBSConfigModal({ isOpen, onClose, onCompleteSetup, requireSetup = false }: { isOpen: boolean, onClose: () => void, onCompleteSetup: () => Promise<void>, requireSetup?: boolean }) {

  const handleClose = () => {
    if (requireSetup) return;

    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleOnCompleteSetup = () => {

    setTimeout(() => {
      onCompleteSetup();
    }, 150);
  }

  return (
    <div
      className={`modal-overlay ${
        isOpen ? "show" : "hide pointer-events-none"
      } backdrop-blur-[5px]`}
      onClick={handleClose}
    >
      <motion.div
        className={`modal-content ${
          isOpen ? "show" : "hide"
        } lg:max-w-[85%] max-w-[95%] min-w-[45%] lg:max-h-[90dvh] max-h-[95dvh] relative overflow-y-scroll`}
        layout="size"
        transition={{
          layout: {
            duration: 0.35,
            ease: "easeInOut"
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h1 className="modal-title">
            PBS Editor Settings
          </h1>
          {requireSetup ? (
            <ColorButton
              color="blue-800"
              text="Finish Setup"
              action={handleOnCompleteSetup}
            />
          ) : (
            <ColorButton
              color="red-800"
              text="Close"
              action={handleClose}
            />
          )}
          <p></p>
        </div>
        {/* Body */}
        {/* First time setup */}
        {requireSetup && (
          <div className="modal-body text-white">
            <p className="lg:text-lg text-base font-bold">Hello and welcome to Arcky&apos;s PBS Editor!</p>
            <br/>
            <p className="text-gray-200">To get started, choose how you want to provide your PBS files:</p>
            <ul className="list-disc pl-6 lg:text-base text-sm">
              <li className="pt-1">
                <strong>Project Folder:</strong> Grant file access and select your local Essentials Project folder.
              </li>
              <li className="pt-1">
                <strong>Manual Upload:</strong> Upload the PBS file(s) you want to edit.
              </li>
            </ul>
          </div>
        )}
        <div className="modal-body">
          {/* Project Settings */}
          <ProjectSettings/>
          {/* Editor Settings */}
          <EditorSettings/>
          {/* Definition Settings */}
        </div>
      </motion.div>
    </div>
  )
}