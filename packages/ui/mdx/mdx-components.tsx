// packages/ui/mdx/mdx-components.tsx
import { DocsHeader as Header } from "./Header";

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="head1">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="head2">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="head3">{children}</h3>
  ),
  Header
};