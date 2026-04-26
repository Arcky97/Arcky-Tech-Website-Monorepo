import { DocInputType } from "ui"

export function DocsInputTextArea ({label, value = "", width, placeholder = ""}: DocInputType) {
  return (
    <div className="my-4 p-2 text-left">
      <label className="label-box">{label}</label>
      <textarea
        value={value}
        readOnly
        className={`content-box-w${width || 50} min-h-18`}
        placeholder={placeholder}
      />
    </div>

  )
}