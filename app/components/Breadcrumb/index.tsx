import Link from "next/link";
import { Fragment, ReactNode } from "react";

export type BreadcrumbItemType = {
  title: ReactNode;
  href?: string;
};
export type BreadcrumbProps = {
  items?: BreadcrumbItemType[];
  splitIcon?: ReactNode;
};

export default function Breadcrumb({ items, splitIcon }: BreadcrumbProps) {
  return (
    <div className="mb-3 inline-block  justify-self-start rounded-sm text-xl font-semibold text-secondary-main dark:text-primary-main">
      {items?.map((item, index) => {
        return (
          <Fragment key={index}>
            {index !== 0 && (splitIcon || <span>{" > "}</span>)}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-secondary-lighter dark:hover:text-primary-light"
              >
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
