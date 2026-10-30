import { defaultDefinitions } from "@/config/defaultDefinitions";
import { EditableConfigListProps } from "@/types/props/editable-config-list.type";
import { useT } from "next-i18next/client";
import { useState } from "react";
import { ColorButton } from "ui";

export default function EditableConfigList(props: EditableConfigListProps) {
  const [newInput, setNewInput] = useState<string | [string, string]>(
    props.doubleInput ? ["", ""] : ""
  );
  const { t: tSettings } = useT("settings");

  console.log(props.label);

  const isDuplicate = props.doubleInput
    ? typeof newInput !== "string" &&
      [...props.data, ...props.fixedData].some(
        ([first, second]) =>
          first.toLowerCase() === newInput[0].toLowerCase() &&
          (second ?? "").toLowerCase() === newInput[1].toLowerCase()
      )
    : typeof newInput === "string" &&
      [...props.data, ...props.fixedData].some(
        (value) => value.toLowerCase() === newInput.toLowerCase()
      );

  const addData = () => {
    if (props.doubleInput === true) {
      if (typeof newInput === "string" || !newInput[0] || isDuplicate) return;

      const value: [string, string?] = [newInput[0], newInput[1] || undefined];
      props.setData([...props.data, value]);
      setNewInput(["", ""]);
    } else {
      if (typeof newInput !== "string" || !newInput || isDuplicate) return;

      props.setData([...props.data, newInput]);
      setNewInput("");
    }
  }

  const removeData = (index: number) => {
    if (props.doubleInput === true) {
      props.setData(props.data.filter((_, itemIndex) => itemIndex !== index));
    } else {
      props.setData(props.data.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">
      <div className="w-full lg:flex-1 lg:basis-0 min-w-0">
        <div className="flex flex-col select-none">
          <label className="label-box">{tSettings("definitions.default", { name: tSettings(`definitions.options.${props.label}.label`)})}</label>
          <ul className="mb-2 overflow-y-scroll max-h-70 lg:h-56 lg:max-h-56">
            {(() => {
              if (props.fixedData.length < 1) {
                return (
                  <li key={`fixed-0`} className="border border-[#4a5565] rounded px-1 py-3 mb-1 items-center flex justify-center text-center text-white h-55">{tSettings('definitions.nodefault', { name: tSettings(`definitions.options.${props.label}.label`).toLowerCase()})}</li>
                )
              }
              return props.fixedData.map((c, i) => {
                const value = Array.isArray(c) ? c.join(' - ') : c;
                return (
                  <li key={`fixed-${i}`} className="border border-[#4a5565] rounded px-1 h-13 mb-1 flex justify-between items-center text-white">
                    {value}
                  </li>
                )
              })
            })()}
          </ul>
        </div>
      </div>
      <div className="w-full lg:flex-1 lg:basis-0 min-w-0">
        <div className="flex flex-col select-none">
          <label className="label-box">{tSettings('definitions.custom', { name: tSettings(`definitions.options.${props.label}.label`)})}</label>
          <ul className="mb-2 overflow-y-scroll max-h-70 lg:h-56 lg:max-h-56">
            {(() => {
              if (props.data.length < 1) {
                return (
                  <li key={`fixed-0`} className="border border-[#4a5565] rounded px-1 py-3 mb-1 items-center flex justify-center text-center text-white lg:h-55">{tSettings('definitions.nocustom', { name: tSettings(`definitions.options.${props.label}.label`).toLowerCase()})}</li>
                )
              }
              return props.data.map((c, i) => {
                const value = Array.isArray(c) ? c.join(' - ') : c;
                return (
                  <li key={`data-${i}`} className="border border-[#4a5565] rounded p-1 mb-1 flex justify-between items-center text-white">
                    {value}
                    <ColorButton
                      color="red-800"
                      text={"Remove"}
                      action={() => removeData(i)}
                      extraClass="min-w-22"
                      padding="px-1 py-2"
                    />
                  </li>
                )
              })
            })()}
          </ul>
        </div>
        <div className="flex flex-col select-none mb-4">
          <div className={`${props.doubleInput ? "" : "lg:flex" } items-center gap-3 min-w-0`}>
            {(() => {
              if (!props.doubleInput) {
                return (
                  <input
                    type="text"
                    placeholder={props.placeholder}
                    value={typeof newInput === "string" ? newInput : ""}
                    onChange={(e) => setNewInput(e.target.value)}
                    className="content-box-wauto lg:flex-1 lg:min-w-0 min-w-full lg:mb-0 mb-2"
                  />
                )
              }
              const input = typeof newInput === "string" ? ["", ""] : newInput;
              return (
                <div className="flex flex-col sm:flex-row gap-3 mb-2">
                  <input
                    type="text"
                    placeholder={props.placeholder[0]}
                    value={input[0]}
                    onChange={(e) => setNewInput([e.target.value, input[1]])}
                    className="content-box-wauto sm:flex-1 sm:basis-0 min-w-0"
                  />
                  <input
                    type="text"
                    placeholder={props.placeholder[1]}
                    value={input[1]}
                    onChange={(e) => setNewInput([input[0], e.target.value])}
                    className="content-box-wauto sm:flex-1 sm:basis-0 min-w-0"
                  />
                </div>
              )
            })()}
            <ColorButton
              color="blue-700"
              text={"Add New"}
              action={addData}
              extraClass={`shrink-0 ${props.doubleInput ? "w-full" : "lg:min-w-22 w-full lg:w-auto"} `}
              padding="px-3 py-2"
              disabled={
                props.doubleInput
                  ? typeof newInput === "string" || !newInput[0] || isDuplicate
                  : typeof newInput !== "string" || !newInput || isDuplicate
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}