import { env } from "@/config/env";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNav() {
  const path = usePathname();
  return (
    <nav className="flex gap-4 px-2 py-2 text-white text-left sticky top-0 w-full bg-gray-900 justify-end text-md">
      <Link href={`${path}/home`}>Dashboard Home</Link>

    </nav>
  )
}