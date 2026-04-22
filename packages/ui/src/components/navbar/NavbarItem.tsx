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
  return (
    <>
      <Link
        href={href}
        className="flex items-center space-x-2 hover:text-gray-400"
        onClick={action}
      >
        <IconComp className={`${
          isShrunk 
            ? "w-5 h-5 lg:w-6 lg:h-6" 
            : "w-6 h-6 lg:w-7 lg:h-7"
          } transition-all duration-300 ease-in-out`
        }/>
          <span className={`${isShrunk ? "text-md" : "text-lg"}
          hidden md:inline transition-all duration-300 ease-in-out`}>{text}</span>
      </Link>
    </>
  )
}