"use client";
import clsx from "clsx";
import { CodeBlock } from "./CodeBlock";
import { useAutoHeightCollapse } from "ui";

type VersionKey = "v211" | "v201";

export const SettingsVersions = ({ v201, v211 }: { v201: string; v211: string }) => {
  const v211Collapse = useAutoHeightCollapse({ defaultOpen: true });
  const v201Collapse = useAutoHeightCollapse({ defaultOpen: false });

  const collapseFor = {
    v211: v211Collapse,
    v201: v201Collapse,
  } as const;

  const sections: Array<{ title: string; version: VersionKey; code: string }> = [
    { title: "Example v3.0.0+ (Essentials v21.1+)", version: "v211", code: v211 },
    { title: "Example ≤ v2.7.0 (Essentials v20.1)", version: "v201", code: v201 },
  ];

  return (
    <div>
      <br />
      {sections.map(({ title, version, code }) => {
        const { isOpen, animating, toggle, setRef, panelStyle, onTransitionEnd } =
          collapseFor[version];

        return (
          <div key={version}>
            <div className="flex items-center">
              <h3 className="head3">{title}</h3>
              <button
                type="button"
                className="pl-3 mt-1 pt-2.25 text-gray-300 hover:text-gray-50 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={toggle}
                aria-expanded={isOpen}
                aria-controls={`code-${version}`}
                disabled={animating}
              >
                {isOpen ? "Collapse" : "Expand"}
              </button>
            </div>

            <div
              id={`code-${version}`}
              role="region"
              aria-label={`Code block for ${title}`}
              ref={setRef}
              className={clsx(
                "overflow-hidden",
                "transition-[height] duration-500 ease-in-out",
                "motion-reduce:transition-none"
              )}
              style={panelStyle}
              onTransitionEnd={onTransitionEnd}
            >
              <CodeBlock language="ruby">{code || "#No Essentials version specific code added."}</CodeBlock>
            </div>
          </div>
        );
      })}
    </div>
  );
};
