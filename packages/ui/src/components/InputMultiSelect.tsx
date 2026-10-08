"use client";
import Select from "react-select";
import { multiSelectStyles } from "../lib";

type InputSelectOption<T> = {
  value: T;
  label: string;
};

type InputSelectProps<T> = {
  maxWidth: number;
  initValue: T[] | "";
  initLabel: string;
  handleChange: (option: InputSelectOption<T>[] | null) => void;
  options: InputSelectOption<T>[];
  placeholder: string;
  isDisabled: boolean;
  isClearable: boolean;
  placement: "top" | "bottom" | "auto";
  noMargin: boolean;
};

export default function InputMultiSelect<T>({
  maxWidth,
  initValue,
  initLabel,
  handleChange,
  options,
  placeholder,
  isDisabled,
  isClearable,
  placement,
  noMargin
}: InputSelectProps<T>) {
  const selectedOptions =
    initValue !== "" && initValue.length > 0
      ? initValue.map(val => options.find(option => option.value === val) ?? {
          value: val,
          label: initLabel || String(val),
        })
      : [];

  return (
    <div className={`inline-flex ${maxWidth ? `max-w-${maxWidth}` : ""}`}>
      <Select<InputSelectOption<T>, true>
        value={selectedOptions}
        onChange={newValue => handleChange(newValue ? [...newValue] : null)}
        options={options}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        isMulti
        menuPortalTarget={document.body}
        styles={multiSelectStyles as typeof multiSelectStyles & import("react-select").StylesConfig<InputSelectOption<T>, true>}
        isDisabled={isDisabled}
        menuPlacement={placement || "auto"}
        menuPosition="fixed"
        menuShouldBlockScroll
        menuShouldScrollIntoView={false}
      />
    </div>
  );
}