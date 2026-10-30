import { usePBSConfig } from "@/providers/PBSConfigProvider";
import { defaultDefinitions } from "@/config/defaultDefinitions";
import EditableConfigList from "./EditableConfigList";
import { useState } from "react";
import InputSingleSelect from "ui/src/components/InputSingleSelect";
import { definitionsConfig } from "@/config/defintionsConfig";
import { definitionOptions, DefinitionOption } from "@/config/definitionOptions";
import { useT } from "next-i18next/client";

export default function DefinitionSettings () {
  const { config, updateDefinitions } = usePBSConfig();
  const [choiceOption, setChoiceOption] = useState<DefinitionOption | null>({ label: "abilitypbs", value: "abilities" });
  const { t: tSettings } = useT('settings');

  const definitions = definitionsConfig.map(def => ({
    ...def,
    fixedData: defaultDefinitions[def.defKey],
    data: config.definitions[def.defKey],
    setData: (data: string[] | [string, string?][]) =>
      updateDefinitions({
        [def.defKey]: data
      })
  }));

  const filterOptions = (choice: DefinitionOption | null) => {
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
        initLabel={tSettings(`definitions.options.${choiceOption?.label || definitionOptions[0].label}.label`)}
        handleChange={(option) => setChoiceOption(option as DefinitionOption | null)}
        options={definitionOptions.map(option => ({ value: option.value, label: tSettings(`definitions.options.${option.label}.label`)}))}
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