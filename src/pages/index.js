import Head from "next/head";
import styles from "../assets/styles/index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>
      <h1 className={styles.title}>Configuração inicial</h1>
    </>
  );
}
