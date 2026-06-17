import Select from "react-select";

interface Props {
  index: number;
  options: { value: string, label: string }[];
  onChange: (value: string) => void;
}

export default function Dropdown({ index, options, onChange }: Props) {
  return (
    <>
      <Select
        options={options}
        placeholder="Type or Select"
        menuPlacement={index >= 4 ? "top" : "bottom"}
        styles={{
          option: (provided, { isFocused, isSelected}) => ({
            ...provided,
            backgroundColor: isSelected ? '#081635' : isFocused ? '#2563eb' : 'transparent',
            color: isFocused || isSelected ? 'fff' : 'gray'
          })
        }}
        className="w-50"
        onChange={(e) => onChange(e?.value ?? "")}
        isClearable
        isSearchable
      />
    </>
  )
}