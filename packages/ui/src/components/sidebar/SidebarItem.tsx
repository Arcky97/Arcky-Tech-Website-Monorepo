"use client";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useAutoHeightCollapse } from "./../../hooks";

export interface MenuItem {
  name?: string;
  path: string;
  icon?: React.ReactNode;
  text: string;
  noPage?: boolean;
  disabled?: boolean;
  subItems?: MenuItem[];
  defaultOpen?: boolean;
}

interface SidebarItemProps {
  item: MenuItem;
  parentPath: string;
  basePath: string;
  pathname: string;
  mainDocs?: boolean;
  onLeafClick?: (e: React.MouseEvent<HTMLElement>, href: string, path: string) => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  parentPath,
  basePath,
  pathname,
  mainDocs,
  onLeafClick,
}) => {
  let { name, path, icon, text, subItems, noPage, disabled, defaultOpen } = item;

  const isHashLink = path.startsWith("#");
  const isAbsolutePath = path.startsWith("/");
  if (mainDocs && name) path = name;

  const prefix = parentPath || basePath;
  const normalizePath = (base: string, sub: string) =>
    `${base.replace(/\/$/, "")}/${sub.replace(/^\//, "")}`;

  const fullPath = isHashLink
    ? normalizePath(prefix, path)
    : isAbsolutePath
      ? path
      : prefix
        ? normalizePath(prefix, path)
        : path;

  const isDeepest = !subItems || subItems.length === 0;

  const isParentActive = !isDeepest && (
    pathname.startsWith(fullPath + "/") || pathname === fullPath || path === ""
  );
  const isLeafActive = isDeepest && pathname === fullPath;
  const isActive = isLeafActive || isParentActive;

  const isDisabled = disabled ?? false;

  const collapse = useAutoHeightCollapse({
    defaultOpen: !!defaultOpen || isParentActive,
    observeContentResize: false,
  });
  const { isOpen, animating, toggle, setRef, panelStyle, onTransitionEnd } = collapse;

  useEffect(() => {
    if (!isDeepest) {
      const shouldBeOpen = isParentActive;
      if (shouldBeOpen && !isOpen) collapse.open();
      if (!shouldBeOpen && isOpen) collapse.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isParentActive]);

  // Id voor aria-controls
  const regionId = useMemo(
    () => `submenu-${fullPath.replace(/[^a-zA-Z0-9_-]/g, "_")}`,
    [fullPath]
  );

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out",
          isActive
            ? "bg-blue-900 hover:bg-blue-700 cursor-pointer"
            : isDisabled
              ? "bg-gray-900 cursor-not-allowed"
              : "hover:bg-blue-700 cursor-pointer"
        )}
      >
        {isDeepest && isHashLink ? (
          <Link
            href={fullPath.replace("/#", "#")}
            className="flex items-center gap-3 w-full"
            onClick={(e) => onLeafClick?.(e, fullPath.replace("/#", "#"), path)}
          >
            {icon}
            <span className="transition-opacity duration-300 ease-in-out">{text}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <>
              {!noPage && !isDisabled ? (
                <Link
                  href={fullPath}
                  className={clsx("flex items-center gap-3 grow", isDisabled && "cursor-not-allowed")}
                >
                  {icon}
                  <span className="transition-opacity duration-300 ease-in-out">{text}</span>
                </Link>
              ) : (
                <div
                  className={clsx("flex items-center gap-3 grow", isDisabled && "text-gray-500")}
                  onClick={() => {
                    if (!isDisabled) toggle();
                  }}
                >
                  {icon}
                  <span className="transition-opacity duration-300 ease-in-out">{text}</span>
                </div>
              )}
            </>
            {!isDeepest && (
              <button
                onClick={toggle}
                className={clsx(
                  "p-1 rounded transition-colors",
                  !isDisabled ? "hover:bg-blue-600" : "cursor-not-allowed text-gray-500"
                )}
                aria-label="Toggle Submenu"
                aria-expanded={isOpen}
                aria-controls={regionId}
                disabled={isDisabled || animating}
              >
                <ChevronDownIcon
                  className={clsx(
                    "w-5 h-5 transition-transform duration-300 ease-in-out",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {subItems && (
        <div
          id={regionId}
          role="region"
          aria-label={`Submenu for ${text}`}
          ref={setRef}
          className={clsx(
            "overflow-hidden",
            "transition-[height] duration-300 ease-in-out",
            "motion-reduce:transition-none"
          )}
          style={panelStyle}
          onTransitionEnd={onTransitionEnd}
        >
          <div className="ml-6 pt-2">
            {subItems.map((child) => (
              <SidebarItem
                key={`${fullPath}/${child.path}`}
                item={child}
                parentPath={fullPath}
                basePath={basePath}
                pathname={pathname}
                mainDocs={mainDocs}
                onLeafClick={onLeafClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
