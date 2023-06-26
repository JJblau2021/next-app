import json from "@/public/bookmarks.json";

export default function TestPage() {
  const bookmarks = json;

  return <div>{bookmarks[0].title}</div>;
}
