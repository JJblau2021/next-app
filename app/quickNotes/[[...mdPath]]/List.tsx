import Icon from "@/app/components/Icon";
import Link from "next/link";

export default function List({
  list,
}: {
  list: { path: string; name: string }[];
}) {
  return (
    <div className="grid gap-2">
      {list.map((item) => (
        <Link
          className="flex items-center gap-2 rounded-xl px-4 py-0.5 hover:bg-secondary-lighter active:bg-secondary-light dark:hover:bg-primary-main dark:active:bg-primary-alt"
          key={item.path}
          href={`/quickNotes/${item.path}`}
        >
          <div className="h-6 text-2xl leading-none text-tertiary-light dark:text-tertiary-lighter">
            <Icon icon="leaf" />
          </div>
          <span className="text-sm"> {item.name}</span>
        </Link>
      ))}
    </div>
  );
}
