import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { defaultDefinitions } from "@/config/defaultDefinitions";
import EditableConfigList from "./EditableConfigList";
import { useState } from "react";
import InputSingleSelect from "ui/src/components/InputSingleSelect";
import { definitionsConfig } from "@/config/defintionsConfig";
import { definitionOptions } from "@/config/definitionOptions";

export default function DefinitionSettings () {
  const { config, updateDefinitions } = usePBSConfig();
  const [choiceOption, setChoiceOption] = useState<{ label: string, value: string } | null>({ label: "Abilities", value: "abilities" });

  const definitions = definitionsConfig.map(def => ({
    ...def,
    fixedData: defaultDefinitions[def.defKey],
    data: config.definitions[def.defKey],
    setData: (data: string[] | [string, string?][]) =>
      updateDefinitions({
        [def.defKey]: data
      })
  }));

  const filterOptions = (choice: { label: string, value: string} | null) => {
    if (!choice) return definitions;
    return definitions.filter(def => (
      def.filters.includes(choice.value)
    ));
  }

  return (
    <div className="p-2">
      <InputSingleSelect
        width="w-50"
        initValue={choiceOption?.value || definitionOptions[0].value}
        initLabel={choiceOption?.label || definitionOptions[0].label}
        handleChange={(option) => setChoiceOption(option)}
        options={definitionOptions}
      />
      {filterOptions(choiceOption).map((option, index) => {
        if (option.doubleInput) {
          return (
            <EditableConfigList
              key={index}
              {...option}
              data={option.data as [string, string?][]}
              fixedData={option.fixedData as [string, string?][]}
            />
          );
        }

        return (
          <EditableConfigList
            key={index}
            {...option}
            data={option.data as string[]}
            fixedData={option.fixedData as string[]}
          />
        );
      })}
    </div>
  );
}