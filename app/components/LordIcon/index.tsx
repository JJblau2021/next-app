import clsx from "clsx";

export type LordIconProps = {
  icon: string;
  trigger?: string;
  target?: string;
  style?: React.CSSProperties;
  className?: string;
};
export default function LordIcon({
  icon,
  trigger = "hover",
  target,
  style,
  className,
}: LordIconProps) {
  return (
    <lord-icon
      src={`https://cdn.lordicon.com/${icon}.json`}
      class={clsx("current-color", className)}
      style={{
        width: "1em",
        height: "1em",
        ...(style || {}),
      }}
      trigger={trigger}
      target={target}
    />
  );
}
