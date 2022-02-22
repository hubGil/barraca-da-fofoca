import { useState } from "react";
import styles from "./index.module.scss";
import ApiImdb from "../services/api-imdb";
import Image from "next/image";

export default function Home() {
  const [famous, setFamous] = useState([]);
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    const { data } = await ApiImdb.getAutoComplete(search);

    // const [listName, name, ...rest] = data;'
    // const famousName = data.d[0].id;

    // const response = await ApiImdb.getFamousInfo(famousName);
    // console.log(response.data);

    setFamous(data.d);
  };

  const handleSubmit = (text) => {
    setSearch(text.target.value);
  };

  return (
    <>
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
            <div className={styles.list}>
              {famous
                .filter((item) => {
                  return item.s.includes("Actor") || item.s.includes("Actress");
                })
                .map((res, k) => {
                  return (
                    <a key={k} href={`/fofoca/${res.id}`}>
                      <div className={styles.list__item}>
                        <div className={styles.list__item__img_container}>
                          <Image
                            src={res.i?.imageUrl}
                            alt={res.l}
                            width={res.i?.width}
                            height={res.i?.height}
                          />
                        </div>
                        <p value={res.id}>{res.l}</p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
          <Image
            src="/images/hero-right.png"
            alt="Fofoca"
            width={500}
            height={500}
          />
        </div>
      </main>
    </>
  );
}
