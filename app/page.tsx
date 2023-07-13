// import Link from "next/link";
import "./page.css";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center  pt-14 sm:pt-0">
      <div className="grid justify-items-center text-center">
        <div className="card relative inline-grid text-7xl font-bold uppercase leading-none sm:inline-block">
          {/* <Image
            width={434}
            height={72}
            src="https://s1.ax1x.com/2023/07/11/pCWgBOU.png"
            alt="dark"
            className="opacity-0 dark:opacity-100"
          />
          <Image
            width={434}
            height={72}
            src="https://s1.ax1x.com/2023/07/11/pCWg0yT.png"
            alt="light"
            className="absolute top-4 opacity-100 dark:opacity-0"
          /> */}
          <span className="logo jjblau mr-0 tracking-wide sm:mr-2">jjblau</span>
          <span className="logo">2021</span>
        </div>
        <div className="card card-bg-2 mt-6 inline-block text-xl font-bold">
          既然不知道该写些什么，那就铭记住这个无知的瞬间吧！
        </div>
      </div>
    </div>
  );
}
