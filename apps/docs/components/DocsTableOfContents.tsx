"use client";
import { useRef } from "react";
import { LinkWithPreview, useMainRef, useResponsiveColumns } from "ui";

type Item = {
  title: string;
  anchorId: string;
};

type Props = {
  items: Item[];
  offset?: number;
}

export function DocsTableOfContents({ items, offset = 60 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useMainRef();

  const columns = useResponsiveColumns(Math.ceil(items.length / 15));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const mainEl = mainRef?.current;
    if (!mainEl) return;

    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.classList.add("highlight-blink");
      setTimeout(() => element.classList.remove("highlight-blink"), 2000);
    } else {
      return;
    }

    const targetPosition = element.getBoundingClientRect().top + mainEl.scrollTop - offset;
    mainEl.scrollTo({ top: targetPosition, behavior: 'smooth' });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <div ref={containerRef} className="w-full flex justify-left">
      <ul 
        className="list-none pl-0 pb-4 space-y-2"
        style={{
          columnCount: columns,
          columnGap: "2rem",
        }}  
      >
        {items.map(({ title, anchorId }) => (
          <li key={anchorId} className="flex gap-2">
            <span className="shrink-0 text-gray-400">•</span>
            <LinkWithPreview
              href={`#${anchorId}`}
              title={title}
              className="text-blue-400 hover:underline"
              onClick={(e) => handleClick(e, anchorId)}
              containerRef={containerRef}

            >
              {title}
            </LinkWithPreview>
          </li>
        ))}
      </ul>
    </div>
  );
}