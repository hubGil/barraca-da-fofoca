import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ApiTvmaze from "../services/api-tvmaze";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = useState([]); // API results
  const [search, setSearch] = useState(""); // input value
  const [searchActive, setSearchActive] = useState(false); // Show/NotShow search result
  const [searchEmpty, setSearchEmpty] = useState(false);

  const fetchResults = async () => {
    try {
      if (search.length === 0) {
        setSearchEmpty(true);
        return;
      }
      const { data } = await ApiTvmaze.searchPersonName(search);
      setResults(data);
      setSearchActive(true);
      setSearchEmpty(false);
    } catch (e) {
      console.log(e);
    }
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
          {searchEmpty && (
            <p>
              Poxa, não quer saber sobre ninguem. <br />
              😢
            </p>
          )}
          <button onClick={fetchResults}>Buscar</button>

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
