"use client"
import Select from "react-select";
import { selectStyles } from "ui";

interface InputSelectProps {
  label: string,
  width: number,
  initValue: string,
  initLabel?: string,
  placeholder: string,
  options: readonly ({ value: string; label: string; })[],
  isClearable?: boolean
}

export function DocsInputSelect ({label, width, initValue, initLabel, placeholder, options, isClearable = false }: InputSelectProps) {
  if (!options) return <div>no options</div> // I added this because it otherwise crashes when options is undefined
  
  return (
    <div className="my-4 p-2 text-left">
      <span className="label-box">{label}</span>
      <div style={{ width }}>
        <Select
          id="select"
          value={{ value: initValue, label: initLabel || initValue }}
          options={options}
          placeholder={placeholder}
          isSearchable
          isClearable={isClearable}
          isDisabled={options.length <= 1}
          styles={selectStyles}
          menuPlacement="auto"
        />
      </div>
    </div>
  )
}