import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.scss";
import ApiTvmaze from "../services/api-tvmaze";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const fetchResults = async () => {
    const { data } = await ApiTvmaze.searchPersonName(search);
    console.log('data==>', data);
    setResults(data);
  };

  const handleSubmit = (text) => {
    setSearch(text.target.value);
  };

  return (
    <>
      <Head>
        <title>Home | Barraca da Fofoca</title>
      </Head>

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

            {/* Search results */}
            <div className={styles.list}>
              {
                results.map((res, index) => {
                    console.log('res=>', res);
                    const artist = res;
                    const urlSlug = `/artist/${res?.person?.id}`;
                    console.log('urlSlug=>', urlSlug);
                return (
                  <Link
                    key={index}
                    href={{
                      pathname:  `/artist/${res?.person?.id}`,
                      query: {data: 'test0', data1: 'teste1'}
                    }}
                    as={`/artist/${res?.person?.id}`}
                  >

                    <a className={styles.list__item} test={res}>
                        {
                          // TODO: add image fallback
                            res?.person?.image &&
                            <div className={styles.list__item__img_container}>
                                <Image
                                src={res?.person?.image?.medium}
                                alt={res?.person?.name}
                                width={30}
                                height={30}
                                />
                            </div>
                        }
                      <p>{res?.person?.name}</p>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <Image src="/images/hero-right.png" alt="Fofoca" width={500} height={500} />
        </div>
      </main>
    </>
  );
}
