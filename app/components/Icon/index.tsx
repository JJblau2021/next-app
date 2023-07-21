export default function Icon({
  icon,
  type = "line",
}: {
  icon: string;
  type?: "fill" | "line";
}) {
  return (
    <svg className="inline-block h-[1em] w-[1em] overflow-hidden fill-current align-[-0.15em] leading-none">
      <use xlinkHref={`/remixIcon.svg#ri-${icon}-${type}`} />
    </svg>
  );
}
