import { readFileSync } from "fs";
import { compile as compileMdx } from "@mdx-js/mdx";
import { visit } from "unist-util-visit";
import { transform } from "@babel/core";
import { prepareMDX } from "../utils/prepareMDX";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { remarkPlugins } from "../plugins/markdownToHtml";
import { useMDXComponents as getMDXComponents } from "@/app/mdx-components";
import pages from "../pages.json";
import { H1 } from "@/app/mdx-components";
import Icon from "@/app/components/Icon";
import List from "./List";
import Breadcrumb from "@/app/components/Breadcrumb";

export default async function Page(props: { params: { mdPath?: string[] } }) {
  const mdPath = props.params?.mdPath;
  if (!mdPath || mdPath.length === 0) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl bg-white bg-opacity-80 p-4 dark:bg-quaternary-alt dark:bg-opacity-80">
        <H1>Quick Notes</H1>
        <div className="mb-3 flex gap-2 rounded-2xl bg-quaternary-lighter p-4 dark:bg-tertiary-alt">
          <span className="text-2xl leading-none text-quaternary-main">
            <Icon icon="book-open" />
          </span>
          <span>
            <strong>写在开头：</strong>
            闲暇时间记录下的快速笔记，点击下方链接查看
          </span>
        </div>
        <List list={pages} />
      </div>
    );
  }
  const mdxNode = await getMdxFile(props.params?.mdPath);
  return (
    <div className="mx-auto max-w-4xl rounded-2xl bg-white bg-opacity-80 p-4 dark:bg-quaternary-alt dark:bg-opacity-80">
      <Breadcrumb
        items={[
          {
            title: "Quick Notes",
            href: "/quickNotes",
          },
          {
            title: mdPath[mdPath.length - 1],
          },
        ]}
      />
      {mdxNode}
    </div>
  );
}

async function getMdxFile(pathArr?: string[]) {
  const rootDir = process.cwd() + "/app/quickNotes/content";
  const path = (pathArr || []).join("/") || "index";
  const mdxComponentNames = Object.keys(getMDXComponents({}));
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
    components: getMDXComponents({}),
  });
  const { children } = prepareMDX(reactTree.props.children);
  return children;
}
