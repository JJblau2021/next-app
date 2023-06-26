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
      className={`relative flex h-24 w-40 items-center justify-center overflow-hidden rounded-md  bg-[#008C5E] p-3 hover:bg-[#3BA75C] active:bg-[#00715F]`}
    >
      <h5 className="overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </h5>
      {cover && (
        <Image
          className="absolute bottom-0 right-0"
          src={cover}
          alt=""
          width={20}
          height={20}
        />
      )}
    </a>
  );
}
