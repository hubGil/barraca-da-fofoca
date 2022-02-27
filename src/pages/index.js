import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ApiTvmaze from "../services/api-tvmaze";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
<<<<<<< HEAD
  const [about, setAbout] = useState([]);
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    const { data } = await ApiImdb.getAutoComplete(search);

    // const [listName, name, ...rest] = data;'
    // const aboutName = data.d[0].id;

    // const response = await ApiImdb.getAboutInfo(aboutName);
    // console.log(response.data);

    setAbout(data.d);
=======
  const [results, setResults] = useState([]); // API results
  const [search, setSearch] = useState(""); // input value
  const [searchActive, setSearchActive] = useState(false); // Show/NotShow search result

  const fetchResults = async () => {
    const { data } = await ApiTvmaze.searchPersonName(search);
    setResults(data);
    setSearchActive(true);
>>>>>>> add-newHome
  };

  const handleSubmit = (text) => {
    setSearch(text.target.value);
    setSearchActive(false);
  };

  useEffect(() => {
    if (!search) {
      setSearchActive(false);
      setResults("");
    }
  }, [search]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Barraca da fofoca</h1>
          <p>Saiba o que andam falando do seu artista favorito</p>
          <input
            type="text"
            onChange={handleSubmit}
            value={search}
            placeholder="digite o nome do artista"
            onKeyDown={(e) => (e.key === "Enter" ? fetchResults() : "")}
          />
          <button onClick={fetchResults}>Buscar</button>

<<<<<<< HEAD
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
              {about
                .filter((item) => {
                  return item.s.includes("Actor") || item.s.includes("Actress");
                })
                .map((res, k) => {
                  return (
                    <a key={k} href={`/fofoca/${res.id}`}>
                      <div className={styles.list__item}>
=======
          {/* Search results */}
          <div className={styles.list}>
            {/* Results */}
            {!!results.length &&
              searchActive &&
              results.map((res, index) => {
                return (
                  <Link
                    key={index}
                    href={{
                      pathname: `/artist/${res?.person?.id}`,
                      query: { data: "test0", data1: "teste1" },
                    }}
                    as={`/artist/${res?.person?.id}`}
                  >
                    <a className={styles.list__item} test={res}>
                      {res?.person?.image && (
>>>>>>> add-newHome
                        <div className={styles.list__item__img_container}>
                          <Image
                            src={res?.person?.image?.medium}
                            alt={res?.person?.name}
                            width={30}
                            height={30}
                          />
                        </div>
                      )}
                      {
                        // Image fallback
                        !res?.person?.image && (
                          <div className={styles.list__item__img_container}>
                            <Image
                              src="https://via.placeholder.com/30x30.png?text=X"
                              alt={res?.person?.name}
                              width={30}
                              height={30}
                            />
                          </div>
                        )
                      }
                      <p>{res?.person?.name}</p>
                    </a>
                  </Link>
                );
              })}
            {/* No results */}
            {!results?.length && searchActive && (
              <div className={styles.list__item}>Sem resultados</div>
            )}
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
  );
}
