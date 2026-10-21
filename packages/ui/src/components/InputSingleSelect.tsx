"use client";
import Select from "react-select";
import { selectStyles } from "../lib";
import { useEffect, useState } from "react";

type InputSelectOption<T> = {
  value: T;
  label: string;
};

type InputSelectProps<T> = {
  width: string;
  initValue: T | "";
  initLabel?: string;
  handleChange: (option: InputSelectOption<T> | null) => void;
  options: InputSelectOption<T>[];
  placeholder?: string;
  isDisabled?: boolean;
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
  table = false,
}: InputSelectProps<T>) {
  const [menuPortalTarget, setMenuPortalTarget] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setMenuPortalTarget(document.body);
  }, []);

  const selectedOption =
    initValue !== ""
      ? {
          value: initValue as T,
          label: initLabel || String(initValue),
        }
      : null;

  return (
    <div
      className={`${
        table ? "flex" : ""
      } ${noMargin ? "" : "mb-4"} items-center justify-center my-3`}
    >
      <div className={width}>
        <Select<InputSelectOption<T>, false>
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          isSearchable
          isClearable={isClearable}
          styles={{
            ...selectStyles,
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          } as typeof selectStyles &
            import("react-select").StylesConfig<
              InputSelectOption<T>,
              false
            >}
          isDisabled={isDisabled}
          menuPlacement={placement}
          menuPosition="fixed"
          menuPortalTarget={menuPortalTarget ?? undefined}
          menuShouldBlockScroll
          menuShouldScrollIntoView={false}
        />
      </div>
    </div>
  );
}