import clsx from "clsx";
import { ReactNode } from "react";

type Alignment = "left" | "center" | "right";

export interface DocsTableProps {
  headers: Array<ReactNode>;
  alignment?: Alignment[];
  rows: Array<Array<ReactNode>>;
}

export function DocsTable ({ headers, alignment, rows }: DocsTableProps) {
  return (
    <div className="inline-block rounded-lg overflow-hidden">
      <table className="select-none border border-gray-600/75">
        <thead className="bg-blue-400/10">
          <tr>
            {headers?.map((header, i) => (
              <th key={i} className="px-12 py-2 text-center font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-all duration-300 ease-in-out hover:bg-blue-400/5"
            >
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={clsx(
                    "px-4 py-2 border-t border-gray-600/75",
                    "hover:bg-blue-400/5 transition-all duration-300 ease-in-out",
                    alignment && `text-${alignment[colIndex]}`
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};