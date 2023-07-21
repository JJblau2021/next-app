const retext = require("retext");
const smartypants = require("retext-smartypants");
import { visit } from "unist-util-visit";

function check(parent) {
  if (parent.tagName === "script") return false;
  if (parent.tagName === "style") return false;
  return true;
}

export default function fn(options) {
  const processor = retext().use(smartypants, options);

  function transformer(tree) {
    visit(tree, "text", (node, index, parent) => {
      if (check(parent)) node.value = String(processor.processSync(node.value));
    });
  }

  return transformer;
}
