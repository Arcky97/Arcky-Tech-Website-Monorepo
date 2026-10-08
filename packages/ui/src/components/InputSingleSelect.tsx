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
  initLabel?: string;
  handleChange: (option: InputSelectOption<T> | null) => void;
  options: InputSelectOption<T>[];
  placeholder: string;
  isDisabled: boolean;
  isClearable?: boolean;
  placement?: "top" | "bottom" | "auto";
  noMargin?: boolean;
  table?: boolean;
};

export default function InputSingleSelect<T>({
  width,
  initValue,
  initLabel,
  handleChange,
  options,
  placeholder,
  isDisabled,
  isClearable = false,
  placement = "auto",
  noMargin = false,
  table = false
}: InputSelectProps<T>) {
  const selectedOption =
    initValue !== ""
      ? {
          value: initValue as T,
          label: initLabel || String(initValue),
        }
      : null;

  return (
    <div className={`${table ? "flex" : ""} ${noMargin ? "" : "mb-4"}`}>
        <Select<InputSelectOption<T>, false>
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          isSearchable
          isClearable={isClearable}
          styles={selectStyles as typeof selectStyles & import("react-select").StylesConfig<InputSelectOption<T>, false>}
          isDisabled={isDisabled}
          menuPlacement={placement}
          menuPosition="fixed"
          menuShouldBlockScroll
          menuShouldScrollIntoView={false}
          className={`items-center justify-center my-3 w-${width}`}
        />
    </div>
  );
}