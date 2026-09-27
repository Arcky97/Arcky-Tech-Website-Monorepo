"use client";
import Select from "react-select";
import { selectStyles } from "../lib";

type InputSelectOption<T> = {
  value: T;
  label: string;
};

type InputSelectProps<T> = {
  width: number;
  initValue: T | "";
  initLabel: string;
  handleChange: (option: InputSelectOption<T> | null) => void;
  options: InputSelectOption<T>[];
  placeholder: string;
  isDisabled: boolean;
  isClearable: boolean;
  placement: "top" | "bottom" | "auto";
};

export default function InputSelect<T>({
  width,
  initValue,
  initLabel,
  handleChange,
  options,
  placeholder,
  isDisabled,
  isClearable,
  placement,
}: InputSelectProps<T>) {
  const selectedOption =
    initValue !== ""
      ? {
          value: initValue as T,
          label: initLabel || String(initValue),
        }
      : null;

  return (
    <div style={{ width }}>
      <Select<InputSelectOption<T>, false>
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        isSearchable
        isClearable={isClearable}
        menuPortalTarget={document.body}
        styles={selectStyles as typeof selectStyles & import("react-select").StylesConfig<InputSelectOption<T>, false>}
        isDisabled={isDisabled}
        menuPlacement={placement || "auto"}
        menuPosition="fixed"
        menuShouldBlockScroll
        menuShouldScrollIntoView={false}
      />
    </div>
  );
}