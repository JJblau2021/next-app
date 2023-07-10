import bookmarks, { IndexBookmarkType } from "@/public/bookmarks";
import BookmarkList from "../components/BookmarkList";
import Link from "next/link";

export default function Page({ params }: { params: { index: string } }) {
  const curBookmarks = useBookmarks(params.index);
  return (
    <BookmarkList
      bookmarks={curBookmarks}
      parent={
        <Link className="hover:text-primary-alt" href="/bookmarks">
          Bookmarks
        </Link>
      }
    />
  );
}

function useBookmarks(index: string) {
  const indexArr = index.split("-");
  let curBookmark: IndexBookmarkType | undefined = void 0;
  let curBookmarks = bookmarks;
  for (let i = 0; i < indexArr.length; i++) {
    const index = indexArr[i];
    const indexNum = Number(index);
    if (isNaN(indexNum)) return bookmarks;

    const bookmark = curBookmarks[indexNum];
    if (bookmark) {
      curBookmark = bookmark;
      if (bookmark.children) {
        curBookmarks = bookmark.children;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  if (curBookmark) {
    return [curBookmark];
  }
  return bookmarks;
}
