import type { MDXComponents } from "mdx/types";
import CodeBlock from "./components/CodeBlock";
import LordIcon from "../components/LordIcon";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
function H1(p: any) {
  return (
    <h1 className="mb-8 flex items-center text-5xl font-bold">
      <LordIcon
        icon="vufjamqa"
        target="h1"
        className="mr-2 text-secondary-main dark:text-primary-light"
      />
      <span>{p.children}</span>
    </h1>
  );
}
function H2(p: any) {
  return <h2 className="my-4 text-2xl font-medium" {...p} />;
}
function H3(p: any) {
  return <h3 className="my-2 text-lg font-medium" {...p} />;
}
function P(p: any) {
  return <p className="my-2" {...p} />;
}
function OL(p: any) {
  return <ol className="my-1 font-medium" {...p} />;
}
function UL(p: any) {
  return <ul className="my-1" {...p} />;
}
function InlineCode(p: any) {
  return (
    <span
      className="inline-block rounded-sm bg-tertiary-lighter bg-opacity-70 px-2 text-secondary-alt dark:bg-tertiary-alt dark:bg-opacity-80 dark:text-secondary-lighter"
      {...p}
    />
  );
}
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    ol: OL,
    ul: UL,
    pre: CodeBlock as any,
    code: InlineCode,
    ...components,
  };
}
