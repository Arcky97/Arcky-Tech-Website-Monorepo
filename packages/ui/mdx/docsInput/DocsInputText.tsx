import { DocInputType } from "ui"

export function DocsInputText ({label, value = "", width}: DocInputType) {
  return (
    <div className="my-4 p-2 text-left">
      <label className="label-box">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className={`content-box-w${width}`}
      />
    </div>
  )
}