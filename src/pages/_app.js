import "normalize.css";
import "../assets/styles/global.scss";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/organisms/Layout/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(session);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
