// import Link from "next/link";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[548px] text-center">
        <div className="card relative inline-block text-7xl font-bold uppercase leading-none">
          <Image
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
          />
        </div>
        <div className="card card-bg-2 mt-6 inline-block text-xl font-bold">
          既然不知道该写些什么，那就铭记住这个无知的瞬间吧！
        </div>
      </div>
    </div>
  );
}
