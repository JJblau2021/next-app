import bookmarks from "./bookmarks.json";

export type BookmarkType = {
  url?: string | null;
  title: string;
  icon?: string | null;
  children?: BookmarkType[];
};

export type IndexBookmarkType = Omit<BookmarkType, "children"> & {
  index: string;
  parentIndex?: string;
  children?: IndexBookmarkType[];
};

function addBookmarkIndex(
  bookmarks: BookmarkType[],
  parentIndex?: string
): IndexBookmarkType[] {
  return bookmarks.map((bookmark, index) => {
    const curIndex = parentIndex ? `${parentIndex}-${index}` : `${index}`;
    return {
      ...bookmark,
      index: curIndex,
      parentIndex,
      children: bookmark.children
        ? addBookmarkIndex(bookmark.children, curIndex)
        : [],
    };
  });
}

export default addBookmarkIndex(bookmarks);
