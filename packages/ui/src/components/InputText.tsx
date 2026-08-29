
type InputTextProps = {
  value: string;
  placeholder: string;
  handleChange: (e: string) => void;
  width: number;
  key?: string;
  readOnly?: boolean;
  disabled?: boolean;
  table?: boolean;
}

export default function InputText({ value, placeholder, handleChange, width, key, readOnly, disabled, table}: InputTextProps) {
  return (
    <input
      key={key}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(String(e.target.value))}
      readOnly={readOnly}
      className={`content-box-w${width} ${!table && "mb-4"}`}
      disabled={disabled}
    />
  )
}