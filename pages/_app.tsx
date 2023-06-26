import "@/app/globals.css";
export default function App({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: any) => page);
  return getLayout(<Component {...pageProps} />);
}
