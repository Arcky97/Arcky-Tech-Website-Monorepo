"use client";
import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { selectProjectFolder } from "@/services/pbsProjectService";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { ColorButton, LabelAndTooltip, ToggleSwitch } from "ui";
import InputText from "ui/src/components/InputText";

export default function ProjectSettings () {
  const { t: tSettings } = useT('settings');
  const { t: tButtons } = useT('buttons');
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
          : tSettings('general.error')
      )
    }
  };

  return (
    <div className="p-2">
      <LabelAndTooltip
        label={[tSettings('general.fileaccess.label')]}
        infoData={[tSettings('general.fileaccess.info')]}
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
              label={[tSettings('general.projectfolder.label')]}
              infoData={[tSettings('general.projectfolder.info')]}
            />
            <div className="flex space-x-4 mb-4">
              <InputText
                readOnly
                value={config.project.pbsFolder}
                placeholder={tSettings('general.projectfolder.placeholder')}
                width={38}
                table
              />
              <ColorButton
                text={tButtons('changeproject')}
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
        label={[tSettings('general.installedplugins.label')]}
        infoData={[tSettings('general.installedplugins.info')]}
      />
      <div className="flex space-x-8">
        <div>
          <ToggleSwitch
            label={tSettings('general.installedplugins.armp.label')}
            state={config.project.arckyRMPlugin}
            onChange={(value) => updateProject({ arckyRMPlugin: value })}
            className="mb-4"
          />
        </div>
        <div>
          <ToggleSwitch
            label={tSettings('general.installedplugins.apmp.label')}
            state={config.project.arckyPMPlugin}
            onChange={(value) => updateProject({ arckyPMPlugin: value })}
            className="mb-4"
          />
        </div>
      </div>
    </div>
  )
}