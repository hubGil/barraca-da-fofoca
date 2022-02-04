import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.scss";
import ApiImdb from "../services/api-imdb";

export default function Home() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    const { data } = await ApiImdb.getAutoComplete(search);
    setSearch(() => "");
    // const [listName, name, ...rest] = data;'
    const famousName = data.d[0].id;

    const response = await ApiImdb.getFamousInfo(famousName);
    console.log(response.data);

    // setResults(result.d);
  };

  const handleSubmit = (text) => {
    setSearch(text.target.value);
  };

  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>
      {/* <h1>Home</h1>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <main>

        </main>
        <h1 className={styles.title}>Barrafa da fofoca</h1>
        <div style={{ display: "flex" }}>
          <input type={"text"} onChange={(t) => setSearch(t.target.value)} />
          <button onClick={async () => await fetchResults()}>Buscar...</button>
        </div>
      </div> */}
      <main>
        <div className={styles.container}>
          <div className={styles.contant}>
            <h1>Barraca da fofoca</h1>
            <p>Saiba o que andam falando do seu artista favorito</p>
            <input
              type="text"
              onChange={handleSubmit}
              value={search}
              placeholder="digite o nome do artista"
            />
            <button onClick={fetchResults}>Buscar</button>
          </div>
          <img src="/images/hero-right.png" alt="" />
        </div>
      </main>
    </>
  );
}
