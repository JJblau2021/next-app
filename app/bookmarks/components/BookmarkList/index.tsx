import Card from "@/app/components/Card";
import type { IndexBookmarkType } from "@/public/bookmarks";

export default function BookmarkList({
  bookmarks,
  parent,
}: {
  bookmarks: IndexBookmarkType[];
  parent?: React.ReactNode;
}) {
  const bookmarkList = bookmarks.map((bookmark) => {
    const { title, children, icon, url, index } = bookmark;
    const gridClassName =
      "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center place-items-center sm:gap-7 xl:grid-cols-6";
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
          {parent ? (
            <>
              {parent}
              <span>
                {" > "}
                {title}
              </span>
            </>
          ) : (
            title
          )}
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
  return <div className="grid gap-7 pb-24 sm:pb-0">{bookmarkList}</div>;
}
