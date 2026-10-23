import { usePBSConfig } from "@/providers/PBSConfigProvider";

import { DEFAULT_ABILITY_FLAGS, DEFAULT_ENCOUNTER_TYPES, DEFAULT_EVOLUTIONS, DEFAULT_TYPE_FLAGS } from "@/config/defaultDefinitions";
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
      <hr className="horRule"/>

      <EditableConfigList
        label="Encounter Types"
        fixedData={DEFAULT_ENCOUNTER_TYPES}
        data={config.definitions.encounterTypes}
        setData={(data) => updateDefinitions({ encounterTypes: data })}
        placeholder="Add Encounter Types"
      />
      <hr className="horRule"/>
      <EditableConfigList
        label="Evolutions"
        fixedData={DEFAULT_EVOLUTIONS}
        data={config.definitions.evolutions}
        setData={(data) => updateDefinitions({ evolutions: data })}
        placeholder={["Evolution", "Parameter"]}
        doubleInput
      />
      <hr className="horRule"/>
      <EditableConfigList
        label="Type Flags"
        fixedData={DEFAULT_TYPE_FLAGS}
        data={config.definitions.typeFlags}
        setData={(data) => updateDefinitions({ typeFlags: data })}
        placeholder={"Add Type Flag"}
      />
    </>
  )
}