"use client"
import Select from "react-select";
import { multiSelectStyles } from "ui";

interface InputMultiSelectProps {
  label: string,
  maxWidth: number,
  initValue: string,
  initLabel?: string,
  placeholder: string,
  options: readonly ({ value: string, label: string })[]
}

export function DocsInputMultiSelect ({ label, maxWidth, initValue, initLabel, placeholder, options}: InputMultiSelectProps) {
  return (
    <div className="my-4 p-2 text-left">
      <span className="label-box">{label}</span>
      <div className="inline-flex">
        <Select
          value={{ value: initValue, label: initLabel || initValue }}
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