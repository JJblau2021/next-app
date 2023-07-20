"use client";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { json } from "@codemirror/lang-json";
import Icon from "@/app/components/Icon";
import { useState } from "react";
import { copyText } from "@/app/utils/clipboard";

export default function CodeBlock({
  children: {
    props: { className, children },
  },
}: any) {
  const fileName = className.replace(/language-/, "test.");
  const [copyed, setCopyed] = useState<boolean>(false);
  function onCopyClick() {
    setCopyed(true);
    copyText(children);
  }

  return (
    <div className="group relative">
      <span
        className="absolute right-1 top-1 z-10 inline-block cursor-pointer text-xl text-secondary-main opacity-0 group-hover:opacity-100 dark:text-primary-main"
        onClick={onCopyClick}
        onMouseLeave={() => setTimeout(setCopyed, 300, false)}
      >
        <Icon icon="file-copy" type={copyed ? "fill" : "line"} />
      </span>
      <SandpackProvider
        theme="dark"
        template="static"
        files={{
          [fileName]: {
            code: children,
            active: true,
          },
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            readOnly
            showReadOnly={false}
            showTabs={false}
            style={{
              height: "auto",
            }}
            additionalLanguages={[
              {
                name: "json",
                extensions: ["json"],
                language: json(),
              },
            ]}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
