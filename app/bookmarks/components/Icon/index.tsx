export default function Icon({ icon }: { icon: string }) {
  return (
    <svg className="h-[1em] w-[1em] overflow-hidden fill-current align-[-0.15em]">
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}
