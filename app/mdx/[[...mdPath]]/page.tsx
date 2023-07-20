import { readFileSync } from "fs";
import { compile as compileMdx } from "@mdx-js/mdx";
import { visit } from "unist-util-visit";
import { transform } from "@babel/core";
import { prepareMDX } from "../utils/prepareMDX";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { remarkPlugins } from "../plugins/markdownToHtml";
import { useMDXComponents } from "@/app/mdx-components";

export default async function Page(props: { params: { mdPath?: string[] } }) {
  const mdxNode = await useMdxFile(props.params?.mdPath);
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white bg-opacity-80 p-4 dark:bg-quaternary-alt dark:opacity-80">
      {mdxNode}
    </div>
  );
}

async function useMdxFile(pathArr?: string[]) {
  const rootDir = process.cwd() + "/app/mdx/content";
  const path = (pathArr || []).join("/") || "index";
  const mdxComponentNames = Object.keys(useMDXComponents({}));
  let mdx;
  try {
    mdx = readFileSync(`${rootDir}/${path}.md`, "utf-8");
  } catch {
    mdx = readFileSync(`${rootDir}/index.md`, "utf-8");
  }
  const mdxWithFakeImport =
    mdx +
    "\n\n" +
    mdxComponentNames.map((name) => `import ${name} from '${name}'`).join("\n");
  const jsxCode = await compileMdx(mdxWithFakeImport, {
    remarkPlugins: [...remarkPlugins, remarkGfm, remarkFrontmatter],
    rehypePlugins: [
      function rehypeMetaAsAttributes() {
        return (tree) => {
          visit(tree, "element", (node) => {
            if (node.tagName === "code" && node.data && node.data.meta) {
              node.properties.meta = node.data.meta;
            }
          });
        };
      },
    ],
  });
  const jsCode = await transform(jsxCode, {
    plugins: [require("@babel/plugin-transform-modules-commonjs")],
    presets: [require("@babel/preset-react")],
  }).code;
  const fakeExports: any = {};
  const fakeRequire = (name: string) => {
    if (name === "react/jsx-dev-runtime") {
      return require("react/jsx-dev-runtime");
    }
    if (name === "react/jsx-runtime") {
      return require("react/jsx-runtime");
    }
    return name;
  };
  const evalJSCode = new Function("require", "exports", jsCode);
  evalJSCode(fakeRequire, fakeExports);
  const reactTree = fakeExports.default({
    components: useMDXComponents({}),
  });
  const { children } = prepareMDX(reactTree.props.children);
  return children;
}
