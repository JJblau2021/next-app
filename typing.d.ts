declare module "@/public/bookmarks.json" {
  type Bookmark = {
    title: string;
    icon?: string;
    url?: string;
    children?: Bookmark[];
  };
  declare const bookmarks: Bookmark[];
  export default bookmarks;
}
