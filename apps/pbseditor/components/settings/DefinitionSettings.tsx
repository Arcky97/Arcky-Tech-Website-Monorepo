import { usePBSConfig } from "@/providers/PBSConfigProvider";

import { DEFAULT_ABILITY_FLAGS, DEFAULT_EVOLUTIONS } from "@/config/defaultDefinitions";
import EditableConfigList from "./EditableConfigList";

export default function DefinitionSettings () {
  const { config, updateDefinitions } = usePBSConfig();

  return (
    <>
      <EditableConfigList
        label="Abilities Flags"
        fixedData={DEFAULT_ABILITY_FLAGS}
        data={config.definitions.abilityFlags}
        setData={(data) => updateDefinitions({ abilityFlags: data })}
        placeholder="Add Ability"
      />
      <EditableConfigList
        label="Evolutions"
        fixedData={DEFAULT_EVOLUTIONS}
        data={config.definitions.evolutions}
        setData={(data) => updateDefinitions({ evolutions: data })}
        placeholder={["Evolution", "Parameter"]}
        doubleInput
      />
    </>
  )
}