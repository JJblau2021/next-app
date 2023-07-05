import bookmarks from "@/public/bookmarks";
import BookmarkList from "./components/BookmarkList";

export default function BookmarksPage() {
  return <BookmarkList bookmarks={bookmarks} />;
}
