import Link from "next/link";
import * as Icons from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";

interface NavbarProps {
  href: string;
  icon?: keyof typeof Icons;
  text?: string;
  isShrunk?: boolean;
  action?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function NavbarItem({ href, icon, text, isShrunk, action }: NavbarProps) {
  const IconComp = Icons[icon || "HomeIcon"] as ComponentType<SVGProps<SVGElement>>;
  const isExternal = href?.startsWith("http");

  if (!href) {
    console.warn("NavbarItem missing href");
    return null;
  }

  const linkBlock = (
    <>
      <IconComp className={`${
        isShrunk 
          ? "w-5 h-5 lg:w-6 lg:h-6" 
          : "w-6 h-6 lg:w-7 lg:h-7"
        } transition-all duration-300 ease-in-out`
      }/>
      <span className={`${isShrunk ? "text-md" : "text-lg"}
        hidden md:inline transition-all duration-300 ease-in-out`}
      >
        {text}
      </span>
    </>
  )

  return isExternal ? 
  (
    <a
      href={href}
      target="_blank"
      className="flex items-center space-x-2 hover:text-gray-400"
      rel="noopener noreferrer"
    >
      {linkBlock}
    </a>
  ) : (
    <Link
      href={href}
      className="flex items-center space-x-2 hover:text-gray-400"
      onClick={action}
    >
      {linkBlock}
    </Link>
  )
}