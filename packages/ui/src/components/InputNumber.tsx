
type InputNumberProps = {
  value: number,
  range: Record<string, number>,
  placeholder: string,
  handleChange: (e: number) => void;
  handleBlur?: () => void;
  width: number,
  extra?: string,
  noValidation?: boolean,
  table?: boolean,
  disabled?: boolean,
  addKey?: string,
  readOnly?: boolean
}

export default function InputNumber({ value, range, placeholder, handleChange, handleBlur, width, extra, noValidation = false, table = false, disabled = false, addKey = undefined, readOnly = false }: InputNumberProps) {
  return (
    <div className={`flex ${table ? "items-center justify-center" : ""}`}>
      <div className={`${table ? "" : "relative"}`}>
        <input
          readOnly={readOnly}
          type="number"
          key={addKey || "no key"}
          min={range?.min ?? 1}
          max={range?.max ?? 99}
          step={range?.step ?? 1}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(Number(e.target.value))}
          onBlur={handleBlur}
          disabled={disabled}
          className={`content-box-w${width} ${!table && "mb-4"}`}
        />
        {extra && (
          <span className={`${table ? "relative right-10": "absolute top-2 right-7"} text-gray-400 pointer-events-none`}>
            {extra}
          </span>
        )}
      </div>
    </div>
  )
}