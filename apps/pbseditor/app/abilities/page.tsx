"use client";
import { ColorButton, LabelAndTooltip } from "ui";
import InputSingleSelect from "ui/src/components/InputSingleSelect";

export default function Abilites() {
  const handleChange = (value: any) => {

  }

  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="head1">Abilities Editor</h1>
        </div>
        <div className="space-x-4">
          <ColorButton
            text="Wiki"
            color="green-700"
            extraClass="min-w-22"
          />
          <ColorButton
            text="Settings"
            color="green-700"
            extraClass="min-w-22"
          />
        </div>

      </div>
      <div>
        <LabelAndTooltip
          label={["Current Ability PBS File:"]}
          infoData={["Change the current PBS file for Abilities."]}
        />
        <InputSingleSelect
          width={62.5}
          initValue={"abilities.txt"}
          handleChange={(value) => handleChange(value)}
          options={[{ value: "abilities.txt", label: "abilities.txt"}]}
          placeholder="Select Ability"
          isDisabled={false}
        />
      </div>
    </div>
  )
}