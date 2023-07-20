import { Suspense, lazy, memo } from "react";

const CodeBlock = lazy(() => import("./CodeBlock"));

export default memo(function CodeBlockWrapper(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CodeBlock {...props} />
    </Suspense>
  );
});
