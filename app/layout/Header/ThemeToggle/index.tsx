"use client";

import Icon from "@/app/components/Icon";
import "./index.css";

export default function ThemeToggle() {
  function onThemeToggle() {
    const html = document.querySelector("html");
    if (!html) return;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
  return (
    <div
      onClick={onThemeToggle}
      className="relative h-8 w-[70px] cursor-pointer select-none rounded-full border-2 border-current bg-primary-lighter text-xl text-primary-alt dark:bg-quaternary-alt dark:text-primary-lighter"
    >
      <div className="theme_slot_transition absolute left-[40px] top-1 inline-block h-[1em] w-[1em] rounded-full border-2 border-secondary-main bg-secondary-light dark:left-[8px] dark:border-primary-lighter dark:bg-primary-main"></div>
      <div className="theme_icon_transition ml-[10px] inline-block translate-x-[-2px] rotate-[15deg] text-secondary-main opacity-100 dark:translate-x-1 dark:rotate-0 dark:opacity-0">
        <Icon icon="sun" />
      </div>
      <div className="theme_icon_transition ml-[10px] inline-block translate-x-[-4px] rotate-[15deg] text-primary-lighter opacity-0 dark:translate-x-0 dark:rotate-0 dark:opacity-100">
        <Icon icon="moon" />
      </div>
    </div>
  );
}
