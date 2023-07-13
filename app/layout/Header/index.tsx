"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import Icon from "@/app/components/Icon";
import ThemeToggle from "./ThemeToggle";
import "./index.css";
import clsx from "clsx";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function Header() {
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const scrollTop = (e.target as Document).documentElement.scrollTop;
      if (scrollTop > 64) {
        document
          .getElementById("header")
          ?.classList.add(
            "bg-opacity-80",
            "dark:bg-opacity-80",
            "shadow-2",
            "dark:shadow-1",
            "backdrop-blur-md"
          );
      } else {
        document
          .getElementById("header")
          ?.classList.remove(
            "bg-opacity-80",
            "dark:bg-opacity-80",
            "shadow-2",
            "dark:shadow-1",
            "backdrop-blur-md"
          );
      }
    });
  }, []);
  const pathname = usePathname();
  const { activeNavPath, showNav } = useMemo(() => {
    if (pathname === "/" || pathname === "/bookmarks") {
      return {
        showNav: true,
        activeNavPath: pathname,
      };
    }
    if (pathname.startsWith("/bookmarks")) {
      return {
        showNav: false,
        activeNavPath: "/bookmarks",
      };
    }
    return {
      showNav: false,
      activeNavPath: "/",
    };
  }, [pathname]);

  return (
    <>
      <header
        id="header"
        className="fixed top-0 z-10 flex h-16 w-full items-center bg-white bg-opacity-0 p-4 hover:bg-opacity-80 hover:shadow-2  hover:backdrop-blur-md dark:bg-quaternary-alt dark:bg-opacity-0 dark:shadow-1 dark:hover:bg-quaternary-alt dark:hover:bg-opacity-80 dark:hover:shadow-1"
      >
        <div className="mr-auto flex items-center">
          <Image
            width={32}
            height={32}
            alt="avatar"
            src="https://avatars.githubusercontent.com/u/84095503?v=4"
            className="mr-4 rounded-full"
          />
          <Link className="text-2xl font-bold uppercase" href="/">
            jjblau2021
          </Link>
        </div>
        <nav className="mr-4 hidden gap-4 sm:flex">
          <Link href="/">Home</Link>
          <Link href="/bookmarks">Bookmarks</Link>
        </nav>
        <ThemeToggle />
        <a
          className="ml-4 text-[32px]"
          href="https://github.com/JJblau2021/next-app"
          target="github"
        >
          <Icon icon="github" type="fill" />
        </a>
      </header>
      <nav
        className={clsx(
          "footer fixed bottom-4 left-4 flex justify-between gap-4 p-3 backdrop-blur-md sm:hidden",
          showNav || "translate-y-24"
        )}
      >
        <div
          className={clsx(
            "nav_slot",
            activeNavPath === "/bookmarks" && "translate-x-[44%]"
          )}
        ></div>
        <Link
          href="/"
          className={clsx("nav_item", activeNavPath === "/" && "active")}
          replace
        >
          <span>
            <Icon icon="home" />
          </span>
        </Link>
        <Link
          href="/bookmarks"
          replace
          className={clsx(
            "nav_item",
            activeNavPath === "/bookmarks" && "active"
          )}
        >
          <span>
            <Icon icon="book-mark" />
          </span>
        </Link>
      </nav>
    </>
  );
}
