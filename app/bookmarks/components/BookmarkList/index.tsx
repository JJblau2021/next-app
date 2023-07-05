import Card from "@/app/components/Card";
import type { IndexBookmarkType } from "@/public/bookmarks";

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: IndexBookmarkType[];
}) {
  const bookmarkList = bookmarks.map((bookmark) => {
    const { title, children, icon, url, index } = bookmark;
    const gridClassName =
      "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center gap-7 xl:grid-cols-6";
    if (url) {
      return (
        <div className={gridClassName} key={index}>
          <Card title={title} cover={icon as string} url={url} id={index} />
        </div>
      );
    }
    return (
      <div key={index} className="grid gap-2">
        <h4 className="mb-3 inline-block  justify-self-start rounded-sm text-xl font-semibold text-white">
          {title}
        </h4>
        <div className={gridClassName}>
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
