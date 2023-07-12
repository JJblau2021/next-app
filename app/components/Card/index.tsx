"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";

const DEFAULT_COVER = "https://s1.ax1x.com/2023/07/05/pCytq6U.png";

type Props = {
  title?: React.ReactNode;
  cover?: string;
  url?: string;
  id: string;
  type?: "primary" | "secondary";
};

const cardTypes = {
  primary: "card-btn-primary",
  secondary: "card-btn-secondary",
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
      <h5 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-4 font-semibold">
        {title}
      </h5>
      <span className="text-2xl">
        <Icon icon={url ? "send-plane-2" : "folder-2"} />
      </span>
    </>
  );

  const className = clsx("card card-btn w-full min-w-[190px]", cardTypes[type]);
  if (type === "primary") {
    return (
      <a href={url} target="_blank" className={className} id={id}>
        {Content}
      </a>
    );
  }
  return (
    <Link href={`/bookmarks/${id}`} className={className} id={id}>
      {Content}
    </Link>
  );
}
