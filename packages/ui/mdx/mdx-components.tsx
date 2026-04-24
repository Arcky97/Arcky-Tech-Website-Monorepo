// packages/ui/mdx/mdx-components.tsx
import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { DocsHeader as Header } from "./Header";
import { TextColor } from "./../src/components/TextColor"

function wrapWithKeys(children: ReactNode) {
  return Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child,  { key: i })
  });
}

export const mdxComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="head1">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="head2">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="head3">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-white text-base font-normal text-left">
      {children}
    </p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "revert" }}>
      {wrapWithKeys(children)}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "decimal" }}>
      {wrapWithKeys(children)}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="ml-6 text-gray-300 leading-relaxed text-md mb-2 wrap-break-word">
      {children}
    </li>
  ),


  hr: () => (
    <hr className="horRule"/>
  ),

  strong: ({ children }: { children: ReactNode }) => (
    <strong className="text-blue-300">
      {children}
    </strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="text-orange-100">
      {children}
    </em>
  ),

  Bl: ({ children }: { children: ReactNode }) => (
    <TextColor color="blue-400">
      {children}
    </TextColor>
  ),
  Gr: ({ children }: { children: ReactNode }) => (
    <TextColor color="green-500">
      {children}
    </TextColor>
  ),
  Rd: ({ children }: { children: ReactNode }) => (
    <TextColor color="red-600">
      {children}
    </TextColor>
  ),
  Gy: ({ children }: { children: ReactNode }) => (
    <TextColor color="gray-300">
      {children}
    </TextColor>
  ),
  Yl: ({ children }: { children: ReactNode }) => (
    <TextColor color="yellow-400">
      {children}
    </TextColor>
  ),
  Or: ({ children }: { children: ReactNode }) => (
    <TextColor color="orange-400">
      {children}
    </TextColor>
  ),
  Cen: ({ children}: { children: ReactNode }) => (
    <div className="text-center mt-5">{children}</div>
  ),
  Header
};