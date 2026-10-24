import { usePBSConfig } from "@/providers/PBSConfigProvider";

import { DEFAULT_ABILITY_FLAGS, DEFAULT_ENCOUNTER_TYPES, DEFAULT_EVOLUTIONS, DEFAULT_TYPE_FLAGS } from "@/config/defaultDefinitions";
import EditableConfigList from "./EditableConfigList";

type DefinitionType = {
  label: string;
  data: string[] | [string, string?][];
  fixedData: string[] | [string, string?][];
  setData: (data: string[]) => void;
  placeholder: string;
  doubleInput?: boolean;
}



export default function DefinitionSettings () {
  const { config, updateDefinitions } = usePBSConfig();

  const definitions: Record<string, DefinitionType> = {
    ability: {
      label: "Abilities Flags",
      data: config.definitions.abilityFlags,
      fixedData: DEFAULT_ABILITY_FLAGS,
      setData: (data) => updateDefinitions({ abilityFlags: data }),
      placeholder: "Add Ability"
    }
  }

  return (
    <div className="p-2">
      <EditableConfigList
        label={definitions.ability.label}
        fixedData={definitions.ability.fixedData as string[]}
        data={definitions.ability.data as string[]}
        setData={definitions.ability.setData}
        placeholder={definitions.ability.placeholder}
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
    </div>
  )
}