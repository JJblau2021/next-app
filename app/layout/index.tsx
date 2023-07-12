import Header from "./Header";
import "@/app/globals.css";

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
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        ></meta>
        {/* <script src="//at.alicdn.com/t/c/font_4152893_pc5dun30as.js" /> */}
      </head>
      <body className="dark:text-primary-lighter">
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });

                  // Detect whether the browser is Mac to display platform specific content
                  // An example of such content can be the keyboard shortcut displayed in the search bar
                  document.documentElement.classList.add(
                      window.navigator.platform.includes('Mac')
                      ? "platform-mac" 
                      : "platform-win"
                  );
                })();
              `,
          }}
        />
        <Header />
        <main className="main h-[100vh] w-[100vw] p-3 pt-20 sm:p-20 sm:pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
