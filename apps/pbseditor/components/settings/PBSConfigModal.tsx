import { ColorButton } from "ui";
import ProjectSettings from "./ProjectSettings";
import { motion } from "framer-motion";
import EditorSettings from "./EditorSettings";
import DefinitionSettings from "./DefinitionSettings";
import { useT } from "next-i18next/client";

export default function PBSConfigModal({ isOpen, onClose, onCompleteSetup, requireSetup = false }: { isOpen: boolean, onClose: () => void, onCompleteSetup: () => Promise<void>, requireSetup?: boolean }) {
  const { t: tSettings } = useT('settings');
  const { t: tButtons } = useT('buttons');

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
            {tSettings('header')}
          </h1>
          {requireSetup ? (
            <ColorButton
              color="blue-800"
              text={tButtons('finishsetup')}
              action={handleOnCompleteSetup}
            />
          ) : (
            <ColorButton
              color="red-800"
              text={tButtons('close')}
              action={handleClose}
            />
          )}
          <p></p>
        </div>
        {/* Body */}
        <div className="modal-body">
          <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">{tSettings('general.header')}</h2>
          {/* First time setup */}
          {requireSetup && (
            <div className="text-white mt-4">
              <p className="lg:text-lg text-base font-bold">{tSettings('welcome.part1')}</p>
              <br/>
              <p className="text-gray-200">{tSettings('welcome.part2')}</p>
              <ul className="list-disc pl-6 lg:text-base text-sm">
                <li className="pt-1">
                  <strong>{tSettings('welcome.option1.strong')}</strong> {tSettings('welcome.option1.par')}
                </li>
                <li className="pt-1">
                  <strong>{tSettings('welcome.option2.strong')}</strong> {tSettings('welcome.option2.par')}
                </li>
              </ul>
            </div>
          )}
          <div className="">
            {/* Project Settings */}
            <ProjectSettings/>
            <hr className="horRule"/>
            {/* Editor Settings */}
            <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">{tSettings('preferences.header')}</h2>
            <EditorSettings/>
            <hr className="horRule"/>
            {/* Definition Settings */}
            <h2 className="head2 sticky top-0 bg-gray-950 z-5 shadow-gray-950 shadow-lg mb-8">{tSettings('definitions.header')}</h2>
            <DefinitionSettings/>
          </div>
        </div>
      </motion.div>
    </div>
  )
}