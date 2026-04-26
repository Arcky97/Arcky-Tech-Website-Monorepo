import { StylesConfig } from "react-select";

export const selectStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isDisabled ? "#364153" : "#1e2939",
    boxShadow: "none",
    color: "white",
    border: "1px solid #4a5565",
    borderRadius: "0.5rem",
    padding: "0.125rem",
    width: "100%"
 }),
 menu: (base) => ({
  ...base,
  backgroundColor: "#1e2939",
  width: "100%",
  zIndex: 100
 }),
 menuList: (base) => ({
   ...base,
   maxHeight: "200px",
   border: "1px solid #1e2939",
   borderRadius: "0.5rem"
 }),
 option: (base, state) => ({
  ...base,
  backgroundColor: state.isSelected
    ? "#364153"
    : state.isFocused
      ? "#4a5565"
      : "#1e2939",
  color: state.isSelected ? "#99a1af" : "white",
  cursor: state.isSelected ? "cursor" : "pointer",
  borderRadius: "0.5rem"
 }),
 singleValue: (base) => ({
  ...base,
  color: "white"
 }),
 input: (base) => ({
  ...base,
  color: "white"
 }),
 placeholder: (base) => ({
  ...base,
  color: "#94a3b8"
 })
}