import Card from "@/components/Card";
import type { IndexBookmarkType } from "@/public/bookmarks";

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: IndexBookmarkType[];
}) {
  const bookmarkList = bookmarks.map((bookmark) => {
    const { title, children, icon, url, index } = bookmark;
    if (url) {
      return (
        <Card
          key={index}
          title={title}
          cover={icon as string}
          url={url}
          id={index}
        />
      );
    }
    return (
      <div key={index} className="grid gap-2">
        <h4 className="mb-3 inline-block  justify-self-start rounded-sm text-xl font-semibold text-white">
          {title}
        </h4>
        <div className="grid grid-cols-6 place-content-center place-items-center gap-7 ">
          {children?.map(({ title, icon, url, index }) => (
            <Card
              key={index}
              cover={icon as string}
              url={url || ""}
              title={title}
              id={index}
            />
          ))}
        </div>
      </div>
    );
  });
  return <div className="grid gap-7">{bookmarkList}</div>;
}
