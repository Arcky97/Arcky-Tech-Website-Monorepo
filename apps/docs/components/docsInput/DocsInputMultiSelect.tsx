"use client"
import Select from "react-select";
import { multiSelectStyles } from "ui";

interface InputMultiSelectProps {
  label: string,
  initValue: string[],
  placeholder: string,
  options: readonly ({ value: string, label: string })[]
}

export function DocsInputMultiSelect ({ label, initValue, placeholder, options}: InputMultiSelectProps) {
  return (
    <div className="my-4 p-2 text-left">
      <span className="label-box">{label}</span>
      <div className="inline-flex">
        <Select
          value={initValue.map(inVal => ({ value: inVal, label: inVal }))}
          options={options}
          placeholder={placeholder}
          isSearchable
          isMulti
          isClearable={true}
          styles={multiSelectStyles}
          menuPlacement="auto"
        />
      </div>  
    </div>

  )
}