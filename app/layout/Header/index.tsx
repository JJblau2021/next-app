"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Icon from "@/app/components/Icon";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const scrollTop = (e.target as Document).documentElement.scrollTop;
      if (scrollTop > 64) {
        document
          .getElementById("header")
          ?.classList.add("bg-opacity-80", "dark:bg-opacity-80");
        document.getElementById("header")?.classList.add("shadow-md");
      } else {
        document
          .getElementById("header")
          ?.classList.remove("bg-opacity-80", "dark:bg-opacity-80");
        document.getElementById("header")?.classList.remove("shadow-md");
      }
    });
  }, []);
  return (
    <header
      id="header"
      className="fixed top-0 z-10 flex h-16 w-full items-center bg-white bg-opacity-0 p-4 hover:bg-opacity-80  hover:shadow-md dark:bg-quaternary-alt dark:bg-opacity-0 dark:hover:bg-quaternary-alt dark:hover:bg-opacity-80"
    >
      <div className="flex items-center">
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
      <nav className="ml-auto mr-4 flex gap-4">
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
  );
}
