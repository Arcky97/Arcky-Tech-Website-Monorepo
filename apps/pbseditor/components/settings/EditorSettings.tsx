//import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { LabelAndTooltip } from "ui";

export default function EditorSettings () {
  //const { config, updatePreferences } = usePBSConfig()

  return (
    <>
      <LabelAndTooltip
        label={["language"]}
        infoData={["Set the Editor to a prefered language."]}
      />
      
    </>
  )
}