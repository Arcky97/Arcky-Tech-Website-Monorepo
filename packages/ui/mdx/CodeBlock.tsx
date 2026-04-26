"use client"
import { useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import ruby from "highlight.js/lib/languages/ruby";
import json from "highlight.js/lib/languages/json";
import plaintext from "highlight.js/lib/languages/plaintext";
import pgsql from "highlight.js/lib/languages/pgsql";
import bash from "highlight.js/lib/languages/bash";
import scss from "highlight.js/lib/languages/scss";
import makefile from "highlight.js/lib/languages/makefile";
import nginx from "highlight.js/lib/languages/nginx";
import yaml from "highlight.js/lib/languages/yaml";

import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("json", json);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("pgsql", pgsql);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("makefile", makefile);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("yaml", yaml);

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock ({ children, language = "text", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlightedLines = useMemo(() => {
    const lines = children.trimEnd().split("\n");

    return lines.map((line) => {
      try {
        const { value } = hljs.highlight(line, {
          language,
          ignoreIllegals: true,
        });
        return value;
      } catch (error) {
        console.error(error);
        return line;
      }
    });
  }, [children, language]);

  const handleCopy = () => {
    const cleaned = children
      .split("\n")
      .filter(line => !line.startsWith("--"))
      .map(line => (line.startsWith("++") ? line.slice(2) : line))
      .join("\n");
    navigator.clipboard.writeText(cleaned);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const showHeader = language || filename;

  return (
    <div className="relative mt-6 mb-4 overflow-auto text-sm font-mono rounded-lg text-gray-300">

      {/* Conditional header */}
      {showHeader && (
        <div className="flex justify-between items-center bg-gray-800/50 border-x border-t border-gray-600/75 px-3 py-1 rounded-md rounded-b-none text-xs text-gray-200 font-semibold">
          <div className="flex-1 text-left truncate">
            {language && <span className="capitalize">{language}</span>}
          </div>
          <div className="flex-1 text-center truncate">
            {filename && <span>{filename}</span>}
          </div>
          <div className="flex-1 text-right">
            <button
              onClick={handleCopy}
              className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Code content */}
      <div 
        className={`pt-2 pb-2 border-x border-b border-gray-600/75 px-2 leading-relaxed tracking-wider ${showHeader ? "" : "border-t"}`}>
        {highlightedLines.map((line, i) => {
          let lineStyle= "";
          let content = line;

          if (line.startsWith("--")) {
            lineStyle = "bg-red-600/25 hover:bg-red-500/25";
            content = line.slice(2);
          } else if (line.startsWith("++")) {
            lineStyle = "bg-green-600/25 hover:bg-green-500/25";
            content = line.slice(2);
          }

          return (
            <div
              key={`line-${i}`}
              className={`grid grid-cols-[2rem_1fr] gap-2 py-0.5 hover:bg-gray-800 rounded-lg transition-all duration-200 ease-in-out ${lineStyle}`}
            >
              <div className="text-right pr-2 text-gray-500 select-none">
                {i + 1}
              </div>
              <div
                className="text-left whitespace-pre-wrap indent-[-0.6rem] pl-2"
                dangerouslySetInnerHTML={{ __html: content || " " }}
              />
            </div>
          );
        })}
      </div>
      {/* Copy buttton at bottom if no header */}
      {!showHeader && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
};