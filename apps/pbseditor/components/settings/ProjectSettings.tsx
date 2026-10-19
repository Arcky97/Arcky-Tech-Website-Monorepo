"use client";
import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { selectProjectFolder } from "@/services/pbsProjectService";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ColorButton, LabelAndTooltip, ToggleSwitch } from "ui";
import InputText from "ui/src/components/InputText";

export default function ProjectSettings () {
  const { config, updateProject } = usePBSConfig();
  const [folderError, setFolderError] = useState<string | null>(null);

  const handleSelectProjectFolder = async () => {
    try {
      setFolderError(null);

      const selected = await selectProjectFolder();

      updateProject({
        pbsFolder: selected.handle.name,
        fileAccess: true,
        arckyRMPlugin: selected.plugins.arckyRMPlugin,
        arckyPMPlugin: selected.plugins.arckyPMPlugin
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setFolderError(
        error instanceof Error
          ? error.message
          : "Failed to select project folder."
      )
    }
  };

  return (
    <>
      <LabelAndTooltip
        label={["File Access"]}
        infoData={["Grant the Editor access to your chosen Project folder on your pc."]}
      />
      <ToggleSwitch
        state={config.project.fileAccess}
        onChange={(value) => updateProject({ fileAccess: value})}
        className="mb-4"
      />
      <AnimatePresence initial={false}>
        {config.project.fileAccess && (
          <motion.div
            key="project-folder-settings"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeInOut",
              layout: {
                duration: 0.35,
                ease: "easeInOut"
              }
            }}
            className="overflow-hidden"
          >
            <LabelAndTooltip
              label={["Project Folder"]}
              infoData={["The path on your computer which contains the Essentials Project folder."]}
            />
            <div className="flex space-x-4 mb-4">
              <InputText
                readOnly
                value={config.project.pbsFolder}
                placeholder="No Project Selected"
                width={38}
                table
              />
              <ColorButton
                text="Change Project"
                color="blue-800"
                action={handleSelectProjectFolder}
              />
            </div>
            {folderError && (
              <p className="text-red-400 text-sm" role="alert">
                {folderError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LabelAndTooltip
        label={["Installed Plugins"]}
        infoData={["When file access is enabled, the editor will automatically detect the plugins you have installed."]}
      />
      <div className="flex space-x-8">
        <div>
          <ToggleSwitch
            label="Arcky's Region Map"
            state={config.project.arckyRMPlugin}
            onChange={(value) => updateProject({ arckyRMPlugin: value })}
            className="mb-4"
          />
        </div>
        <div>
          <ToggleSwitch
            label="Arcky's Poké Market"
            state={config.project.arckyPMPlugin}
            onChange={(value) => updateProject({ arckyPMPlugin: value })}
            className="mb-4"
          />
        </div>
      </div>
    </>
  )
}