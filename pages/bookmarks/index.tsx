import Card from "@/components/Card";
import bookmarks from "@/public/bookmarks.json";

export default function BookmarksPage() {
  const bookmarkList = bookmarks.map((bookmark, index) => {
    const { title, children, icon, url } = bookmark;
    if (url) {
      return <Card key={index} title={title} cover={icon} url={url} />;
    }
    return (
      <div key={index} className="grid gap-2  p-2">
        <h4 className="inline-block justify-self-start  rounded-sm px-6 text-lg text-[#4B4737] ">
          {title}
        </h4>
        <div className="grid grid-cols-6 place-content-center place-items-center gap-6 px-6">
          {children?.map(({ title, icon, url }, index) => (
            <Card key={index} cover={icon} url={url} title={title} />
          ))}
        </div>
      </div>
    );
  });
  return (
    <div className="grid gap-6 bg-gradient-to-tr from-[#36C486] to-[#ffeb68]">
      {bookmarkList}
    </div>
  );
}
