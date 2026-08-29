
type InputTextProps = {
  value: string;
  placeholder: string;
  handleChange: (e: string) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
  width: number;
  key?: string;
  readOnly?: boolean;
  disabled?: boolean;
  table?: boolean;
}

export default function InputText({ value, placeholder, handleChange, handleFocus, handleBlur, width, key, readOnly, disabled, table}: InputTextProps) {
  return (
    <input
      key={key}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => handleChange(String(e.target.value))}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={readOnly}
      className={`content-box-w${width} ${!table && "mb-4"}`}
      disabled={disabled}
    />
  )
}