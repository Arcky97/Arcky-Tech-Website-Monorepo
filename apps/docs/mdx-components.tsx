import { Children, cloneElement, isValidElement } from "react";
import type { MDXComponents } from "mdx/types";
import { DocsHeader as Header } from "./components/DocsHeader";
import { CodeBlock } from "./components/CodeBlock";
import { InlineCode, LinkWithPreview, MediaGallery, TextColor as TC, ColorButton, ImageWithCaption } from "ui"
import { Callout } from "./components/Callout";
import { DocsTable as Table } from "./components/DocsTable";
import { DocsPokeMarketSpeeches as PMSpeeches, DocsShelfSpeeches as SHSpeeches, DocsSpeciesSpeeches as SPSpeeches} from "./components/Speeches";
import { YouTubeEmbed } from "./components/YoutubeEmbed";
import { DocsVersionBlock as VerBlock } from "./components/DocsVerBlock";
import { DocsInputText as InputText } from "./components/docsInput/DocsInputText";
import { DocsInputNumber as InputNumber } from "./components/docsInput/DocsInputNumber";
import { DocsInputSelect as InputSelect } from "./components/docsInput/DocsInputSelect";
import { DocsInputMultiSelect as InputMultiSelect } from "./components/docsInput/DocsInputMultiSelect";
import { DocsInputToggle as InputToggle } from "./components/docsInput/DocsInputToggle";
import { DocsInputTextArea as InputTextArea } from "./components/docsInput/DocsInputTextArea";

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
    pre:({children}) => {
      const codeString = children?.props?.children ?? "";
      const className = children?.props?.className ?? "";

      let language = "text";
      let filename: string | undefined;

      if (className.startsWith("language-")) {
        const parts = className.replace("language-", "").split(":");
        language = parts[0];
        if (parts[1]) filename = parts[1];
      }
      return <CodeBlock language={language} filename={filename}>{codeString}</CodeBlock>
    },
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
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-200 my-4 bg-linear-85 from-gray-800/80 to-gray-900">
        {children}
      </blockquote>
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
    Header,
    ImageWithCaption,
    MediaGallery,
    Callout,
    TC,
    Table,
    PMSpeeches,
    SHSpeeches,
    SPSpeeches,
    YouTubeEmbed,
    ColorButton,
    VerBlock,
    InputText,
    InputNumber,
    InputSelect,
    InputMultiSelect,
    InputToggle,
    InputTextArea,
    ...components
  }
}