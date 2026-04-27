import { MDXComponents } from "mdx/types";
import { Children, cloneElement, isValidElement } from "react";
import { InlineCode, LinkWithPreview, TextColor as TC, ColorButton } from "ui";

function wrapWithKeys(children: React.ReactNode) {
  return Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child, { key: i });
  });
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="head1">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="head2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="head3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-white text-base font-normal text-left">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "revert"}}>
        {wrapWithKeys(children)}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-base font-normal text-left marker:text-white mt-2" style={{ listStyleType: "decimal"}}>
        {wrapWithKeys(children)}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-6 text-gray-300 leading-relaxed text-md mb-2 wrap-break-word">{children}</li>
    ),
    code:({children}) => (
      <InlineCode>{children}</InlineCode>
    ),
    hr: () => (
      <hr className="horRule"/>
    ),
    a: (props) => <LinkWithPreview {...props} />,
    strong: ({children}) => (
      <strong className="text-blue-300">{children}</strong>
    ),
    em: ({children}) => (
      <em className="text-orange-100">{children}</em>
    ),
    Bl: ({children}) => (
      <TC color="blue-400">{children}</TC>
    ),
    Gr: ({children}) => (
      <TC color="green-500">{children}</TC>
    ),
    Rd: ({children}) => (
      <TC color="red-600">{children}</TC>
    ),
    Gy: ({children}) => (
      <TC color="gray-300">{children}</TC> 
    ),
    Yl: ({children}) => (
      <TC color="yellow-400">{children}</TC>
    ),
    Or: ({children}) => (
      <TC color="orange-400">{children}</TC>
    ),
    Cen: ({children}) => (
      <div className="text-center mt-5">{children}</div>
    ),
    ColorButton,
    ...components
  }
}