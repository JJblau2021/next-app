import Header from "./Header";
import "./globals.css";

export const metadata = {
  title: "JJBLAU 2021",
  description: "A personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      </head>
      <body>
        <Header />
        <main className="main h-[100vh] w-[100vw] p-20 pt-24">{children}</main>
      </body>
    </html>
  );
}
