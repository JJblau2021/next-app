"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const DEFAULT_COVER = "https://s1.ax1x.com/2023/07/05/pCytq6U.png";

type Props = {
  title?: React.ReactNode;
  cover?: string;
  url?: string;
  id: string;
  type?: "primary" | "secondary";
};

export default function Card({
  title,
  cover,
  url,
  id,
  type = url ? "primary" : "secondary",
}: Props) {
  const Content = (
    <>
      <lord-icon
        target="a"
        style={{ width: 32, height: 32 }}
        src={`https://cdn.lordicon.com/${url ? "pmegrqxm" : "fpmskzsv"}.json`}
        trigger="hover"
        colors="primary:#1a3c33"
      />
      <h5 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-4 font-semibold">
        {title}
      </h5>
      <Image
        className="shrink-0 rounded-full"
        src={cover || DEFAULT_COVER}
        alt=""
        width={32}
        height={32}
        onError={(e) => {
          (e.target as HTMLImageElement).src = DEFAULT_COVER;
        }}
      />
    </>
  );
  if (type === "primary") {
    return (
      <a
        href={url}
        target="_blank"
        className={clsx(
          "card-btn inline-flex h-16 w-[190px] items-center rounded-2xl bg-white bg-opacity-80 p-4 shadow-md",
          `card-bg-${type}`
        )}
        id={id}
      >
        {Content}
      </a>
    );
  }
  return (
    <Link
      href={`/bookmarks/${id}`}
      className={clsx(
        "card-btn inline-flex h-16 w-[190px] items-center rounded-2xl bg-white bg-opacity-80 p-4 shadow-md",
        `card-bg-${type}`
      )}
      id={id}
    >
      {Content}
    </Link>
  );
}
