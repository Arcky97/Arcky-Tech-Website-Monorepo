import Link from "next/link";

const LINKS = [
  {
    href: "/terms-of-service",
    text: "Terms of Service"
  },
  {
    href: "/privacy-policy",
    text: "Privacy Policy"
  },
  {
    href: "/cookie-policy",
    text: "Cookie Policy"
  }
];

export function Footer() {
  return(
    <footer id="footer" className="flex flex-col h-30 bg-gray-900 border-gray-600/75 border-t text-white py-8 text-center w-full items-center mx-auto">
      <div className="flex gap-4 text-sm mb-2">
        {LINKS.map(({href, text}, index) => (
          <div key={`item-${index}`} className="flex gap-4">
            <Link
              href={href}
              className="text-gray-400 hover:text-white hover:text-[0.9rem] transition-all ease-in-out duration-300"
            >
              {text}
            </Link>
            {index < LINKS.length - 1 && <span>|</span>}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Arcky-Tech. All rights reserved.</p>
    </footer>
  )
}