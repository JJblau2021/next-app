import fs from "fs";
import { FileStore, stableHash } from "metro-cache";
import { Fragment } from "react";
export default async function Page(props) {
  const a = await fetchMDXContent();
  return (
    <div>
      {JSON.stringify(props)}
      {a.content}
    </div>
  );
}

const DISK_CACHE_BREAKER = 7;

async function fetchMDXContent(markdownPath) {
  const rootDir = process.cwd() + "/app/mdx/content";
  // Read MDX from the file.
  const path = (markdownPath || []).join("/") || "index";
  // let mdx
  // try {
  //   mdx = fs.readFileSync(rootDir + path + '.md', 'utf8')
  // } catch {
  //   mdx = fs.readFileSync(rootDir + path + '/index.md', 'utf8')
  // }

  const mdx = fs.readFileSync(rootDir + "/dir/hello.md", "utf8");

  const { compile: compileMDX } = await import("@mdx-js/mdx");
  const jsx = await compileMDX(mdx);

  const { transform } = require("@babel/core");
  const jsCode = await transform(jsx, {
    plugins: [require("@babel/plugin-transform-modules-commonjs")],
    presets: [require("@babel/preset-react")],
  });

  // Prepare environment for MDX.
  let fakeExports = {};
  const fakeRequire = (name) => {
    if (name === "react/jsx-runtime") {
      return require("react/jsx-runtime");
    } else {
      // For each fake MDX import, give back the string component name.
      // It will get serialized later.
      return name;
    }
  };
  const evalJSCode = new Function("require", "exports", jsCode);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // THIS IS A BUILD-TIME EVAL. NEVER DO THIS WITH UNTRUSTED MDX (LIKE FROM CMS)!!!
  // In this case it's okay because anyone who can edit our MDX can also edit this file.
  evalJSCode(fakeRequire, fakeExports);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const reactTree = fakeExports.default({});
  const { prepareMDX } = require("../utils/prepareMDX");

  // Pre-process MDX output and serialize it.
  let { children } = prepareMDX(reactTree.props.children);

  // const store = new FileStore({
  //   root: process.cwd() + '/.cache/metro-cache',
  // })
  // const hash = Buffer.from(stableHash({
  //   mdx,
  //   DISK_CACHE_BREAKER,
  //   lockfile: fs.readFileSync(process.cwd() + '/pnpm-lock.yaml', 'utf8'),
  // }))
  // const cached = await store.get(hash)
  // if (cached) {
  //   console.log('Reading compiled MDX for /' + path + ' from .cache/metro-cache')
  //   return cached
  // }
  // if (process.env.NODE_ENV === 'production') {
  //   console.log('Cache miss for MDX for /' + path + ' from .cache/metro-cache')
  // }
  const output = {
    content: JSON.stringify(children),
  };

  // await store.set(hash, )
  return output;
}

// Deserialize a client React tree from JSON.
function reviveNodeOnClient(key, val) {
  if (Array.isArray(val) && val[0] == "$r") {
    // Assume it's a React element.
    let type = val[1];
    const key = val[2];
    let props = val[3];
    if (type === "wrapper") {
      type = Fragment;
      props = { children: props.children };
    }

    if (!type) {
      console.error("Unknown type: " + type);
      type = Fragment;
    }
    return {
      $$typeof: Symbol.for("react.element"),
      type: type,
      key: key,
      ref: null,
      props: props,
      _owner: null,
    };
  } else {
    return val;
  }
}

// Serialize a server React tree node to JSON.
function stringifyNodeOnServer(key, val) {
  if (val != null && val.$$typeof === Symbol.for("react.element")) {
    // Remove fake MDX props.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mdxType, originalType, parentName, ...cleanProps } = val.props;
    return [
      "$r",
      typeof val.type === "string" ? val.type : mdxType,
      val.key,
      cleanProps,
    ];
  } else {
    return val;
  }
}
