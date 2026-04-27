import { DocInputType } from "ui";

export function DocsInputNumber ({ label, value, width }: DocInputType) {
  const values = Array.isArray(value) ? value : [value];
  const labels = Array.isArray(label) ? label : [label];
  const widths = Array.isArray(width) ? width : [width];

  return (
    <div className="my-4 p-2 text-left">
      {labels.length <= 1 && (
        <label className="label-box">{labels[0]}</label>
      )}
      <div className="flex space-x-4">
        {values.map((v, index) => {
          const currentLabel = labels[index];
          const currentWidth = widths[index] ?? widths[0];

          return (
            <div key={index} className="">
              {labels.length > 1 && currentLabel && (
                <label className="label-box">{currentLabel}</label>
              )}
              <input
                type="number"
                value={v}
                readOnly
                className={`content-box-w${currentWidth}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};