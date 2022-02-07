import "normalize.css";
import "../assets/styles/global.scss";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
