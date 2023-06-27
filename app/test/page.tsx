import json from "@/public/bookmarks.json";

export default function TestPage() {
  const bookmarks = json;

  return <div className="text-red-200">{bookmarks[0].title}</div>;
}
