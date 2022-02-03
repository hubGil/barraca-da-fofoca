import "normalize.css";
import "../assets/styles/global.scss";
import { Header } from "../components/organisms/Header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
