import { readFileSync } from "fs";
import { compile as compileMdx } from "@mdx-js/mdx";
import { visit } from "unist-util-visit";
import { transform } from "@babel/core";
import { prepareMDX } from "../utils/prepareMDX";

export default async function Page(props: { params: { mdPath?: string[] } }) {
  const mdxNode = await readMdxFile(props.params?.mdPath);
  return mdxNode;
}

async function readMdxFile(pathArr?: string[]) {
  const rootDir = process.cwd() + "/app/mdx/content";
  const path = (pathArr || []).join("/") || "index";
  let mdx;
  try {
    mdx = readFileSync(`${rootDir}/${path}.md`, "utf-8");
  } catch {
    mdx = readFileSync(`${rootDir}/index.md`, "utf-8");
  }
  const jsxCode = await compileMdx(mdx, {
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
    return name;
  };
  const evalJSCode = new Function("require", "exports", jsCode);
  evalJSCode(fakeRequire, fakeExports);
  const reactTree = fakeExports.default({});
  const { children } = prepareMDX(reactTree.props.children);
  return children;
}
