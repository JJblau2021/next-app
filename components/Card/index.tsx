import Image from "next/image";

type Props = {
  title?: React.ReactNode;
  cover?: string;
  url?: string;
};

export default function Card({ title, cover, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      className="card-bg-btn inline-flex h-16 w-[190px] items-center rounded-2xl bg-white bg-opacity-80 p-4 shadow-md"
    >
      <Image
        className="shrink-0 rounded-full"
        src={cover || ""}
        alt=""
        width={32}
        height={32}
      />
      <h5 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-4 font-semibold">
        {title}
      </h5>
    </a>
  );
}
