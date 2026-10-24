import { ColorButton } from "ui";
import ProjectSettings from "./ProjectSettings";
import { motion } from "framer-motion";
import EditorSettings from "./EditorSettings";
import DefinitionSettings from "./DefinitionSettings";

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
        } lg:max-w-[85%] max-w-[95%] min-w-[35%] max-h-[95dvh] relative`}
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
        <div className="modal-body">
          <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">General</h2>
          {/* First time setup */}
          {requireSetup && (
            <div className="text-white mt-4">
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
          <div className="">
            {/* Project Settings */}
            <ProjectSettings/>
            <hr className="horRule"/>
            {/* Editor Settings */}
            <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">Preferences</h2>
            <EditorSettings/>
            <hr className="horRule"/>
            {/* Definition Settings */}
            <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">Definitions</h2>
            <DefinitionSettings/>
          </div>
        </div>
      </motion.div>
    </div>
  )
}